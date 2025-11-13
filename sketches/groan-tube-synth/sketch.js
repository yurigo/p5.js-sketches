// Motion-controlled groan tube simulator (waaac-woooc)
// iOS 13+ requires an explicit user gesture to grant motion sensor access.
// This sketch shows a small button to enable motion on supported devices.

const CANVAS_SIZE_PERCENT = 0.8; // canvas size as percent of smaller screen dimension

let ax = 0,
  ay = 0,
  az = 0; // raw acceleration (including gravity)
let vx = 0,
  vy = 0; // velocity we integrate from acceleration
let xpos, ypos; // position
let friction = 0.98; // simple damping to avoid runaway speeds
let accelScale = 1.2; // scale factor to tune sensitivity
let permissionBtn; // UI button for iOS permission

let invertX = false;
let invertY = false;

// Sound synthesis components
let osc; // Main oscillator
let filter; // Low-pass filter for timbre
let envelope; // Amplitude envelope
let soundEnabled = false;
let baseFreq = 220; // Base frequency (A3)
let targetFreq = 220;
let currentFreq = 220;
let targetAmp = 0;
let currentAmp = 0;
let filterFreq = 1000;

// Sound parameters (adjustable via UI)
let pitchRange = 200; // Hz range above/below base frequency
let sensitivity = 1.0;
let filterBrightness = 0.5; // 0-1

// Wait for DOM to be fully loaded before accessing elements
window.addEventListener('DOMContentLoaded', () => {
  // UI Elements
  const invertXCheckbox = document.getElementById("invertX");
  const invertYCheckbox = document.getElementById("invertY");
  const pitchRangeSlider = document.getElementById("pitchRange");
  const sensitivitySlider = document.getElementById("sensitivity");
  const brightnessSlider = document.getElementById("brightness");
  const permissionButton = document.getElementById("permissionButton");

  // Initialize checkboxes
  if (invertXCheckbox) invertXCheckbox.checked = invertX;
  if (invertYCheckbox) invertYCheckbox.checked = invertY;

  // Event listeners
  if (invertXCheckbox) {
    invertXCheckbox.addEventListener("change", () => {
      invertX = invertXCheckbox.checked;
    });
  }
  
  if (invertYCheckbox) {
    invertYCheckbox.addEventListener("change", () => {
      invertY = invertYCheckbox.checked;
    });
  }

  if (pitchRangeSlider) {
    pitchRangeSlider.addEventListener("input", (e) => {
      pitchRange = parseFloat(e.target.value);
      const valueSpan = document.getElementById("pitchRangeValue");
      if (valueSpan) valueSpan.textContent = pitchRange.toFixed(0);
    });
  }

  if (sensitivitySlider) {
    sensitivitySlider.addEventListener("input", (e) => {
      sensitivity = parseFloat(e.target.value);
      const valueSpan = document.getElementById("sensitivityValue");
      if (valueSpan) valueSpan.textContent = sensitivity.toFixed(1);
    });
  }

  if (brightnessSlider) {
    brightnessSlider.addEventListener("input", (e) => {
      filterBrightness = parseFloat(e.target.value);
      const valueSpan = document.getElementById("brightnessValue");
      if (valueSpan) valueSpan.textContent = filterBrightness.toFixed(2);
      updateFilterFrequency();
    });
  }

  if (permissionButton) {
    permissionButton.addEventListener("click", async (e) => {
      e.preventDefault();

      // iOS 13+ requires a user gesture to grant access
      if (
        typeof DeviceMotionEvent !== "undefined" &&
        typeof DeviceMotionEvent.requestPermission === "function"
      ) {
        try {
          const response = await DeviceMotionEvent.requestPermission();
          if (response === "granted") {
            startMotion();
            initializeSound();
          }
        } catch (error) {
          console.error("Error requesting motion permission:", error);
        }
      } else {
        // Other platforms: start listening right away
        startMotion();
        initializeSound();
      }
    });
  }
});

function windowResized() {
  const s = min(windowWidth, windowHeight) * CANVAS_SIZE_PERCENT;
  resizeCanvas(s, s);

  xpos = constrain(xpos, 0, width);
  ypos = constrain(ypos, 0, height);

  redraw();
}

function setup() {
  rectMode(CENTER);
  const s = min(windowWidth, windowHeight) * CANVAS_SIZE_PERCENT;
  createCanvas(s, s);

  xpos = width / 2;
  ypos = height / 2;
  
  // Note: Sound will be initialized when user clicks "Enable Motion & Sound" button
  // to comply with browser autoplay policies
}

// Initialize sound synthesis components
function initializeSound() {
  if (soundEnabled) return; // Already initialized
  
  try {
    // Resume audio context (required by browsers)
    userStartAudio();
    
    // Create oscillator with sine wave for smooth groan tube sound
    osc = new p5.Oscillator('sine');
    osc.freq(baseFreq);
    osc.amp(0);
    
    // Create low-pass filter for timbre control
    filter = new p5.Filter('lowpass');
    updateFilterFrequency();
    
    // Connect oscillator through filter
    osc.disconnect();
    osc.connect(filter);
    
    // Start oscillator
    osc.start();
    
    soundEnabled = true;
    console.log('Sound initialized successfully');
  } catch (error) {
    console.error('Error initializing sound:', error);
  }
}

// Update filter frequency based on brightness parameter
function updateFilterFrequency() {
  if (filter) {
    // Map brightness (0-1) to filter frequency (200Hz - 5000Hz)
    filterFreq = map(filterBrightness, 0, 1, 200, 5000);
    filter.freq(filterFreq);
  }
}

function draw() {
  background(0);

  // Map device acceleration to screen coordinates considering screen rotation
  const { sx, sy } = mapMotionToScreen(ax || 0, ay || 0);

  // Integrate acceleration into velocity; flip screen Y so tilting up moves ball up
  vx += sx * accelScale;
  vy += -sy * accelScale;

  // Apply simple friction
  vx *= friction;
  vy *= friction;

  // Update position
  xpos += vx;
  ypos += vy;

  // Collide with edges and bounce
  const r = 12.5; // radius of the ball
  if (xpos > width - r) {
    xpos = width - r;
    vx *= -0.8;
  }
  if (xpos < r) {
    xpos = r;
    vx *= -0.8;
  }
  if (ypos > height - r) {
    ypos = height - r;
    vy *= -0.8;
  }
  if (ypos < r) {
    ypos = r;
    vy *= -0.8;
  }

  // Calculate motion intensity for sound mapping
  const accelMagnitude = sqrt(ax * ax + ay * ay + az * az);
  const velocityMagnitude = sqrt(vx * vx + vy * vy);
  
  // Map motion to sound parameters
  if (soundEnabled) {
    updateSound(accelMagnitude, velocityMagnitude);
  }

  // Visual feedback: ball color based on sound intensity
  const intensity = constrain(currentAmp, 0, 1);
  const ballColor = lerpColor(
    color(100, 100, 100),
    color(255, 50, 50),
    intensity
  );

  // Draw ball with glow effect based on sound intensity
  noStroke();
  
  // Outer glow
  if (intensity > 0.1) {
    fill(255, 50, 50, 50 * intensity);
    ellipse(xpos, ypos, r * 4 * intensity, r * 4 * intensity);
    fill(255, 100, 50, 80 * intensity);
    ellipse(xpos, ypos, r * 3 * intensity, r * 3 * intensity);
  }
  
  // Main ball
  fill(ballColor);
  ellipse(xpos, ypos, r * 2, r * 2);

  // Visual waveform indicator
  drawWaveformIndicator(intensity);

  // Debug text
  fill(255);
  noStroke();
  textSize(12);
  const debugY = 20;
  const lineHeight = 18;
  text("Motion: " + nf(accelMagnitude, 1, 2), 10, debugY);
  text("Velocity: " + nf(velocityMagnitude, 1, 2), 10, debugY + lineHeight);
  text("Frequency: " + nf(currentFreq, 1, 1) + " Hz", 10, debugY + lineHeight * 2);
  text("Amplitude: " + nf(currentAmp, 1, 2), 10, debugY + lineHeight * 3);
  text("Sound: " + (soundEnabled ? "ON" : "OFF"), 10, debugY + lineHeight * 4);
}

// Update sound parameters based on motion
function updateSound(accelMag, velocityMag) {
  if (!osc) return;
  
  // Map acceleration magnitude to frequency
  // More motion = higher pitch (like a real groan tube)
  const motionIntensity = constrain(accelMag * sensitivity, 0, 15);
  targetFreq = baseFreq + map(motionIntensity, 0, 15, -pitchRange, pitchRange);
  targetFreq = constrain(targetFreq, 50, 1000);
  
  // Map velocity magnitude to amplitude
  // Moving = louder sound
  const velocityIntensity = constrain(velocityMag * 0.5, 0, 10);
  targetAmp = map(velocityIntensity, 0, 10, 0, 0.5);
  targetAmp = constrain(targetAmp, 0, 0.5);
  
  // Smooth transitions using lerp (exponential smoothing)
  const smoothing = 0.1;
  currentFreq = lerp(currentFreq, targetFreq, smoothing);
  currentAmp = lerp(currentAmp, targetAmp, smoothing);
  
  // Apply to oscillator
  osc.freq(currentFreq);
  osc.amp(currentAmp, 0.05); // 50ms ramp time for smoothness
}

// Draw visual feedback for sound waveform
function drawWaveformIndicator(intensity) {
  if (!soundEnabled || intensity < 0.01) return;
  
  push();
  translate(width / 2, height - 60);
  
  // Draw waveform visualization
  noFill();
  stroke(255, 200, 0, 150 * intensity);
  strokeWeight(2);
  
  const waveWidth = width * 0.6;
  const waveHeight = 30 * intensity;
  const segments = 50;
  
  beginShape();
  for (let i = 0; i <= segments; i++) {
    const x = map(i, 0, segments, -waveWidth / 2, waveWidth / 2);
    const angle = map(i, 0, segments, 0, TWO_PI * 2);
    const y = sin(angle + frameCount * 0.1) * waveHeight;
    vertex(x, y);
  }
  endShape();
  
  // Frequency indicator
  noStroke();
  fill(255, 200, 0, 200 * intensity);
  textAlign(CENTER);
  textSize(10);
  text(nf(currentFreq, 1, 0) + " Hz", 0, 25);
  
  pop();
}

function startMotion() {
  // Listen for motion events; prefer includingGravity for broader support
  window.addEventListener(
    "devicemotion",
    (e) => {
      const a = e.accelerationIncludingGravity || e.acceleration;
      if (!a) return;
      // Use floats (parseInt would zero-out small values!)
      ax = typeof a.x === "number" ? a.x : 0;
      ay = typeof a.y === "number" ? a.y : 0;
      az = typeof a.z === "number" ? a.z : 0;
    },
    true
  );
}

// --- Helpers to normalize device axes to screen axes ---
function getScreenAngle() {
  // 0, 90, 180, 270 degrees depending on orientation
  if (screen.orientation && typeof screen.orientation.angle === "number") {
    return screen.orientation.angle;
  }
  if (typeof window.orientation === "number") {
    return window.orientation; // legacy iOS/Android
  }
  return 0;
}

function rotate2D(x, y, deg) {
  const rad = (deg * Math.PI) / 180;
  const cosA = Math.cos(rad);
  const sinA = Math.sin(rad);
  return { x: x * cosA - y * sinA, y: x * sinA + y * cosA };
}

function mapMotionToScreen(axDev, ayDev) {
  // Rotate device vector into current screen orientation
  const ang = getScreenAngle();
  const r = rotate2D(axDev, ayDev, ang);
  let sx = r.x * (invertX ? -1 : 1);
  let sy = r.y * (invertY ? -1 : 1);
  return { sx, sy };
}

function keyPressed() {
  if (key === "x" || key === "X") invertX = !invertX;
  if (key === "y" || key === "Y") invertY = !invertY;
  if (key === "f" || key === "F") {
    invertX = !invertX;
    invertY = !invertY;
  }
}
