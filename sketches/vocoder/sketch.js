// Global variables
let audioCtx;
let micStream;
let sourceNode;
let carrierOscillator;
let vocoderNode;
let inputAnalyser;
let outputAnalyser;
let inputDataArray;
let outputDataArray;
let bufferLength;
let carrierFrequencySlider;
let canvasWidth = 800;
let canvasHeight = 400;
let audioReady = false; // Flag to indicate when audio is ready
// New nodes for safer gain staging
let hp; // high-pass filter for mic
let comp; // dynamics compressor post-worklet
let master; // master gain

async function setup() {
  createCanvas(canvasWidth, canvasHeight);

  // Create the carrier frequency slider
  carrierFrequencySlider = createSlider(100, 1000, 200, 1);
  carrierFrequencySlider.position(20, 50);

  textSize(16);
  textAlign(LEFT);

  // Initialize audio
  await setupAudio();
}

function draw() {
  background(220);

  fill(0);
  text(
    "Carrier Frequency: " + carrierFrequencySlider.value() + " Hz",
    carrierFrequencySlider.x * 2 + carrierFrequencySlider.width,
    65
  );

  if (audioReady) {
    // Update vocoder effect based on slider
    updateVocoder();

    // Visualize audio
    visualizeAudio();
  } else {
    fill(0);
    text("Initializing audio...", width / 2 - 100, height / 2);
  }
}

// ... your globals stay the same ...

async function setupAudio() {
  audioCtx = new (window.AudioContext || window.webkitAudioContext)();

  if (!audioCtx.audioWorklet) {
    alert("AudioWorklet is not supported in this browser.");
    return;
  }

  try {
    await audioCtx.audioWorklet.addModule("./vocoder-worklet.js");
  } catch (err) {
    console.error("Error loading AudioWorklet module: ", err);
    alert("Failed to load the AudioWorklet module.");
    return;
  }

  try {
    // IMPORTANT: If this runs before a user gesture, Safari/Chrome may suspend.
    // Consider gating this behind a “Start” button that calls audioCtx.resume().
    micStream = await navigator.mediaDevices.getUserMedia({ audio: true });
    sourceNode = audioCtx.createMediaStreamSource(micStream);

    // Carrier
    carrierOscillator = audioCtx.createOscillator();
    carrierOscillator.type = "sawtooth";
    carrierOscillator.frequency.value = carrierFrequencySlider.value();

    // Give the worklet TWO inputs
    // Avoid explicit channelCount forcing; let Web Audio up/down-mix as needed
    vocoderNode = new AudioWorkletNode(audioCtx, "vocoder-processor", {
      numberOfInputs: 2,
      numberOfOutputs: 1,
      outputChannelCount: [1],
    });

    // Analysers
    inputAnalyser = audioCtx.createAnalyser();
    outputAnalyser = audioCtx.createAnalyser();
    inputAnalyser.fftSize = 2048;
    outputAnalyser.fftSize = 2048;
    bufferLength = inputAnalyser.frequencyBinCount;
    inputDataArray = new Uint8Array(bufferLength);
    outputDataArray = new Uint8Array(outputAnalyser.frequencyBinCount);

    // Monitor raw mic at the input analyser
    sourceNode.connect(inputAnalyser);

    // --- Safer gain staging ---
    // Mic front-end: high-pass to remove rumble/plosives
    hp = audioCtx.createBiquadFilter();
    hp.type = "highpass";
    hp.frequency.value = 80;

    // Route modulator (mic) to input 0 via HPF, carrier to input 1
    sourceNode.connect(hp);
    hp.connect(vocoderNode, 0, 0);
    carrierOscillator.connect(vocoderNode, 0, 1);

    // Post-processing: compressor → analyser → master → destination
    comp = audioCtx.createDynamicsCompressor();
    comp.threshold.value = -30;
    comp.knee.value = 20;
    comp.ratio.value = 6;
    comp.attack.value = 0.003;
    comp.release.value = 0.25;

    master = audioCtx.createGain();
    master.gain.value = 0.15; // raised for audibility; keep system volume moderate

    vocoderNode.connect(comp);
    comp.connect(outputAnalyser);
    outputAnalyser.connect(master);
    master.connect(audioCtx.destination);

    carrierOscillator.start();

    audioReady = true;
  } catch (err) {
    console.error("Error accessing microphone: ", err);
    alert(
      "An error occurred while trying to access the microphone. See console."
    );
  }
}

// In case the browser suspends AudioContext until a user gesture
function mousePressed() {
  if (audioCtx && audioCtx.state !== "running") {
    audioCtx.resume();
  }
}

function updateVocoder() {
  if (carrierOscillator) {
    carrierOscillator.frequency.value = carrierFrequencySlider.value();
  }
}

function visualizeAudio() {
  // INPUT (blue)
  inputAnalyser.getByteFrequencyData(inputDataArray);
  noStroke();
  fill(0, 0, 255);
  for (let i = 0; i < inputDataArray.length; i++) {
    const barH = inputDataArray[i] / 2;
    rect(
      (i * canvasWidth) / inputDataArray.length,
      canvasHeight / 2 - barH,
      canvasWidth / inputDataArray.length,
      barH
    );
  }

  // OUTPUT (red)
  outputAnalyser.getByteFrequencyData(outputDataArray);
  fill(255, 0, 0);
  for (let i = 0; i < outputDataArray.length; i++) {
    const barH = outputDataArray[i] / 2;
    rect(
      (i * canvasWidth) / outputDataArray.length,
      canvasHeight / 2,
      canvasWidth / outputDataArray.length,
      barH
    );
  }
}
