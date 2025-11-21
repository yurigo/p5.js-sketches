let video;
let bodyPose;
let poses = [];

// Theremin sound variables
let thereminOsc;
let audioStarted = false;
let modelLoaded = false;

// Theremin parameters
let minFreq = 200; // Lowest pitch (Hz)
let maxFreq = 1000; // Highest pitch (Hz)
let currentFreq = 440;
let currentAmp = 0;

// UI controls
let waveformButtons = [];
const waveforms = [
  { name: "Sine", type: "sine" },
  { name: "Triangle", type: "triangle" },
  { name: "Square", type: "square" },
  { name: "Sawtooth", type: "sawtooth" }
];

// Button sizing constants
const WAVEFORM_BUTTON_WIDTH = 80;
const WAVEFORM_BUTTON_HEIGHT = 40;
const WAVEFORM_BUTTON_GAP = 8;

function preload() {
  bodyPose = ml5.bodyPose("MoveNet", modelReady);
}

function modelReady() {
  modelLoaded = true;
  console.log("Model loaded!");
  
  // Update UI to show start button
  const loadingStatus = document.getElementById('loading-status');
  const startButton = document.getElementById('start-button');
  const instructions = document.getElementById('instructions');
  
  if (loadingStatus) loadingStatus.style.display = 'none';
  if (startButton) {
    startButton.style.display = 'block';
    startButton.onclick = startSketch;
  }
  if (instructions) instructions.style.display = 'block';
}

function startSketch() {
  if (!audioStarted) {
    // Ensure oscillators are initialized
    if (!thereminOsc) {
      console.warn("Oscillator not ready yet");
      return;
    }
    
    userStartAudio();
    thereminOsc.start();
    audioStarted = true;
    
    // Hide the overlay
    const overlay = document.getElementById('start-overlay');
    if (overlay) overlay.classList.add('hidden');
  }
}

function gotPoses(results) {
  poses = results;
  console.log(results);
}

function setup() {
  const s = min(windowWidth, windowHeight) * 0.9;
  createCanvas(s, s);

  video = createCapture(VIDEO, { flipped: true });
  video.size(width, height);
  video.hide();

  bodyPose.detectStart(video, gotPoses);

  // Create a single oscillator for the theremin
  thereminOsc = new p5.Oscillator("sine");
  thereminOsc.freq(currentFreq);
  thereminOsc.amp(0);

  createWaveformButtons();
}

function createWaveformButtons() {
  const totalWidth = WAVEFORM_BUTTON_WIDTH * waveforms.length + WAVEFORM_BUTTON_GAP * (waveforms.length - 1);
  const canvasX = (windowWidth - width) / 2;
  const canvasY = (windowHeight - height) / 2;
  const startX = canvasX + width / 2 - totalWidth / 2;
  const y = canvasY + height - WAVEFORM_BUTTON_HEIGHT - 10;

  waveforms.forEach((wf, i) => {
    const btn = createButton(wf.name);
    const x = startX + i * (WAVEFORM_BUTTON_WIDTH + WAVEFORM_BUTTON_GAP);
    
    btn.position(x, y);
    btn.size(WAVEFORM_BUTTON_WIDTH, WAVEFORM_BUTTON_HEIGHT);
    btn.style("font-family", "monospace");
    btn.style("font-weight", "bold");
    btn.style("border", "2px solid #333");
    btn.style("cursor", "pointer");
    btn.style("background", i === 0 ? "#ffd700" : "#1a1a2e");
    btn.style("color", i === 0 ? "#000" : "#fff");
    btn.style("font-size", "12px");
    btn.style("border-radius", "6px");
    btn.style("touch-action", "manipulation");
    
    btn.mousePressed(() => {
      if (!audioStarted || !thereminOsc) return;
      thereminOsc.setType(wf.type);
      
      // Update button styles
      waveformButtons.forEach((b, j) => {
        if (j === i) {
          b.style("background", "#ffd700");
          b.style("color", "#000");
        } else {
          b.style("background", "#1a1a2e");
          b.style("color", "#fff");
        }
      });
    });
    
    waveformButtons.push(btn);
  });
}

function repositionWaveformButtons() {
  const totalWidth = WAVEFORM_BUTTON_WIDTH * waveforms.length + WAVEFORM_BUTTON_GAP * (waveforms.length - 1);
  const canvasX = (windowWidth - width) / 2;
  const canvasY = (windowHeight - height) / 2;
  const startX = canvasX + width / 2 - totalWidth / 2;
  const y = canvasY + height - WAVEFORM_BUTTON_HEIGHT - 10;

  waveformButtons.forEach((btn, i) => {
    const x = startX + i * (WAVEFORM_BUTTON_WIDTH + WAVEFORM_BUTTON_GAP);
    btn.position(x, y);
    btn.size(WAVEFORM_BUTTON_WIDTH, WAVEFORM_BUTTON_HEIGHT);
  });
}

function windowResized() {
  const s = min(windowWidth, windowHeight) * 0.9;
  resizeCanvas(s, s);
  repositionWaveformButtons();
}

function draw() {
  image(video, 0, 0, width, height);

  // Don't process if audio hasn't started
  if (!audioStarted) {
    return;
  }

  // Track hands for theremin control
  let leftHandDetected = false;
  let rightHandDetected = false;
  let leftHandY = 0;
  let rightHandY = 0;

  // Loop through all detected people
  for (let i = 0; i < poses.length; i++) {
    let pose = poses[i];

    // Get wrist keypoints (hands)
    let leftWrist = pose.keypoints.find((kp) => kp.name === "left_wrist");
    let rightWrist = pose.keypoints.find((kp) => kp.name === "right_wrist");

    // Draw visualization for left hand (pitch control)
    if (leftWrist && leftWrist.confidence > 0.3) {
      drawHand(leftWrist, color(255, 100, 255), "PITCH"); // Magenta
      leftHandDetected = true;
      leftHandY = leftWrist.y;
    }

    // Draw visualization for right hand (volume control)
    if (rightWrist && rightWrist.confidence > 0.3) {
      drawHand(rightWrist, color(100, 255, 255), "VOLUME"); // Cyan
      rightHandDetected = true;
      rightHandY = rightWrist.y;
    }
  }

  // Control theremin based on hand positions
  if (leftHandDetected && rightHandDetected) {
    // Map left hand Y position to frequency (inverted: higher = higher pitch)
    currentFreq = map(leftHandY, 0, height, maxFreq, minFreq);
    currentFreq = constrain(currentFreq, minFreq, maxFreq);

    // Map right hand Y position to amplitude (inverted: higher = louder)
    currentAmp = map(rightHandY, 0, height, 1.0, 0);
    currentAmp = constrain(currentAmp, 0, 1.0);

    // Apply smooth transitions
    thereminOsc.freq(currentFreq, 0.05);
    thereminOsc.amp(currentAmp, 0.05);
  } else {
    // Fade out if both hands aren't detected
    thereminOsc.amp(0, 0.1);
  }

  // Display current frequency and amplitude
  displayThereminInfo();
}

// Draw a hand visualization
function drawHand(keypoint, handColor, label) {
  // Flip x-coordinate to match the flipped video
  let x = width - keypoint.x;
  let y = keypoint.y;

  // Draw glow effect
  push();
  noStroke();
  for (let i = 3; i > 0; i--) {
    fill(handColor.levels[0], handColor.levels[1], handColor.levels[2], 30);
    ellipse(x, y, 60 * i, 60 * i);
  }

  // Draw main circle
  fill(handColor);
  stroke(255);
  strokeWeight(3);
  ellipse(x, y, 60, 60);

  // Draw center dot
  fill(255);
  noStroke();
  ellipse(x, y, 15, 15);

  // Draw label
  fill(255);
  textAlign(CENTER, CENTER);
  textSize(12);
  text(label, x, y - 50);
  pop();
}

// Display current theremin parameters
function displayThereminInfo() {
  push();
  fill(0, 200);
  noStroke();
  rect(10, 10, 200, 80, 10);

  fill(255);
  textAlign(LEFT, TOP);
  textSize(14);
  text(`Frequency: ${currentFreq.toFixed(1)} Hz`, 20, 20);
  text(`Amplitude: ${(currentAmp * 100).toFixed(0)}%`, 20, 40);
  if (thereminOsc) {
    text(`Wave: ${thereminOsc.getType()}`, 20, 60);
  }
  pop();
}

// Mouse click handling removed - using dedicated start button instead

// Keyboard controls for waveform selection
function keyPressed() {
  if (!audioStarted || !thereminOsc) return;

  if (key === "1") {
    thereminOsc.setType("sine");
  } else if (key === "2") {
    thereminOsc.setType("triangle");
  } else if (key === "3") {
    thereminOsc.setType("square");
  } else if (key === "4") {
    thereminOsc.setType("sawtooth");
  }
}
