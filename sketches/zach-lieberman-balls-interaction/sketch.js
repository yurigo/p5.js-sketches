// Mic-reactive version: volume speeds up the spiral and inversely scales the balls.
// Requires p5.sound (already included in index.html).

let mic, amp;
let vol = 0; // smoothed volume (0..~0.3 typical)
let micActive = false;
let phase = 0; // accumulated phase to ensure consistent forward motion

// Tweak these to taste
const VOL_SMOOTHING = 0.15; // 0..1 (higher = snappier)
const VOL_MAX = 0.3; // expected loudness cap for mapping
const SPEED_MIN = 0.5;
const SPEED_MAX = 50.0; // how fast it can get at loud volume
const SIZE_QUIET_BASE = 140; // diameter base at silence
const SIZE_LOUD_BASE = 30; // diameter base at loud
const SIZE_MOD_QUIET = 100; // modulation amplitude at silence
const SIZE_MOD_LOUD = 1; // modulation amplitude at loud
let dir = -1; // direction of phase progression: -1 moves pattern downward, +1 upward

function setup() {
  const s = min(windowWidth, windowHeight) * 0.9;
  createCanvas(s, s);
  noStroke();

  // Initialize fullscreen controls
  initFullscreenControls();

  // Prepare mic and amplitude analyzer; we start mic on user gesture.
  try {
    mic = new p5.AudioIn();
    amp = new p5.Amplitude();
    amp.setInput(mic);
  } catch (e) {
    // If p5.sound isn't available for some reason, fall back to non-audio mode.
    console.warn("p5.sound init failed:", e);
  }
}

function windowResized() {
  handleFullscreenWindowResize();
}

function startMic() {
  if (!mic || micActive) return;
  // Must be called from a user gesture (click/touch/key)
  userStartAudio()
    .then(() => {
      mic.start(
        () => {
          micActive = true;
        },
        (err) => {
          console.warn("Mic start error:", err);
          micActive = false;
        }
      );
    })
    .catch((err) => {
      console.warn("Audio context start failed:", err);
    });
}

function draw() {
  // Read and smooth volume
  const raw = micActive && amp ? amp.getLevel() : 0;
  vol = lerp(vol, raw, VOL_SMOOTHING);
  const vNorm = constrain(vol / VOL_MAX, 0, 1);

  // Map volume to speed (louder -> faster)
  const speed = lerp(SPEED_MIN, SPEED_MAX, vNorm);

  // Advance phase incrementally so it never jumps backwards when speed drops
  phase += (speed * dir) / (20000 / height);
  const time = phase;

  // Map volume inversely to sizes (louder -> smaller)
  const baseSize = lerp(SIZE_QUIET_BASE, SIZE_LOUD_BASE, vNorm);
  const modAmp = lerp(SIZE_MOD_QUIET, SIZE_MOD_LOUD, vNorm);

  background(0);
  for (let i = 0; i <= height; i++) {
    fill(
      127 + 127 * Math.sin(time + i * 0.01),
      127 + 127 * Math.sin(time + i * 0.011),
      127 + 127 * Math.sin(time + i * 0.012)
    );

    const x = width / 2 + (height / 4) * Math.sin(time + i * 0.01);
    const y = i;
    const d = baseSize + modAmp * Math.sin(i * 0.013 + time);
    circle(x, y, d);
  }

  // On-screen hint to enable mic
  if (!micActive) {
    noStroke();
    fill(0, 0, 0, 140);
    rect(0, 0, width, height);
    fill(255);
    textAlign(CENTER, CENTER);
    textSize(min(width, height) * 0.04);
    text("Click to enable microphone", width / 2, height / 2);
  }
}

function mousePressed() {
  startMic();
}

function touchStarted() {
  startMic();
}

function keyPressed() {
  // Press M to toggle mic on
  if (key === "m" || key === "M") startMic();
  // Press R to reverse direction if it ever feels backwards
  if (key === "r" || key === "R") dir *= -1;
}
