// Mic'n'Frac - Microphone Reactive Fractal
// A recursive fractal tree that reacts to microphone input in real-time

let mic;
let fft;
let amplitude;

// Audio parameters
let micLevel = 0;
let bass = 0;
let mid = 0;
let treble = 0;

// Fractal parameters (default values)
let branchLength = 120;
let branchAngle = Math.PI / 4;
let recursionDepth = 8;
let branchColor = 0;

function setup() {
  const s = min(windowWidth, windowHeight) * 0.9;
  createCanvas(s, s);
  
  // Create audio input (microphone)
  mic = new p5.AudioIn();
  
  // Create FFT analyzer for frequency data
  fft = new p5.FFT(0.8, 256);
  
  // Create amplitude analyzer for overall volume
  amplitude = new p5.Amplitude();
  
  textAlign(CENTER, CENTER);
  angleMode(RADIANS);
}

function windowResized() {
  const s = min(windowWidth, windowHeight) * 0.9;
  resizeCanvas(s, s);
}

function draw() {
  background(15, 15, 35);
  
  // Title
  fill(255, 200, 100);
  noStroke();
  textSize(20);
  text('🎤🌳 Mic\'n\'Frac 🌳🎤', width / 2, 30);
  
  if (!mic.enabled) {
    // Instructions
    fill(255);
    textSize(16);
    text('Click to enable microphone', width / 2, height / 2 - 30);
    text('Make sounds to grow and animate the fractal tree!', width / 2, height / 2);
    textSize(12);
    fill(200);
    text('Amplitude controls branch length', width / 2, height / 2 + 40);
    text('Frequency controls color and angle', width / 2, height / 2 + 60);
    text('Energy controls recursion depth', width / 2, height / 2 + 80);
  } else {
    // Get audio data
    fft.setInput(mic);
    amplitude.setInput(mic);
    
    let spectrum = fft.analyze();
    micLevel = amplitude.getLevel();
    
    // Get energy in different frequency bands
    bass = fft.getEnergy('bass');
    mid = fft.getEnergy('mid');
    treble = fft.getEnergy('treble');
    
    // Map audio parameters to fractal properties
    
    // 1. Amplitude → Branch length
    branchLength = map(micLevel, 0, 0.3, 80, 160);
    branchLength = constrain(branchLength, 80, 160);
    
    // 2. Bass frequency → Branch angle
    branchAngle = map(bass, 0, 255, Math.PI / 6, Math.PI / 3);
    
    // 3. Mid frequency → Hue/Color
    branchColor = map(mid, 0, 255, 100, 300);
    
    // 4. Energy (overall) → Recursion depth
    let totalEnergy = (bass + mid + treble) / 3;
    recursionDepth = int(map(totalEnergy, 0, 200, 5, 10));
    recursionDepth = constrain(recursionDepth, 5, 10);
    
    // Draw the fractal tree
    push();
    translate(width / 2, height - 80);
    stroke(255);
    strokeWeight(2);
    drawFractalTree(branchLength, recursionDepth, 0);
    pop();
    
    // Draw audio level indicators
    drawAudioIndicators();
    
    // Draw parameter display
    drawParameterDisplay();
  }
}

// Recursive function to draw the fractal tree
function drawFractalTree(len, depth, currentDepth) {
  if (depth <= 0 || len < 3) {
    return;
  }
  
  // Color based on depth and frequency
  colorMode(HSB, 360, 100, 100);
  let hue = (branchColor + currentDepth * 20) % 360;
  let brightness = map(currentDepth, 0, recursionDepth, 100, 60);
  stroke(hue, 80, brightness);
  
  // Line thickness decreases with depth
  let weight = map(depth, 0, recursionDepth, 1, 4);
  strokeWeight(weight);
  
  // Draw the branch
  line(0, 0, 0, -len);
  
  // Move to the end of the branch
  translate(0, -len);
  
  // Draw sub-branches
  // Left branch
  push();
  rotate(-branchAngle);
  drawFractalTree(len * 0.67, depth - 1, currentDepth + 1);
  pop();
  
  // Right branch
  push();
  rotate(branchAngle);
  drawFractalTree(len * 0.67, depth - 1, currentDepth + 1);
  pop();
  
  // Add a middle branch occasionally for more complexity
  if (depth > recursionDepth / 2 && micLevel > 0.1) {
    push();
    rotate(sin(frameCount * 0.05) * branchAngle * 0.3);
    drawFractalTree(len * 0.5, depth - 1, currentDepth + 1);
    pop();
  }
  
  colorMode(RGB, 255);
}

function drawAudioIndicators() {
  let barHeight = 60;
  let barWidth = width / 3 - 20;
  let y = height - barHeight - 10;
  
  colorMode(HSB, 360, 100, 100);
  
  // Bass indicator
  fill(0, 80, 90);
  noStroke();
  rect(10, y + barHeight - map(bass, 0, 255, 0, barHeight), barWidth, map(bass, 0, 255, 0, barHeight), 3);
  fill(255);
  textSize(10);
  text('BASS', 10 + barWidth / 2, y - 5);
  
  // Mid indicator
  fill(120, 80, 90);
  rect(width / 3 + 5, y + barHeight - map(mid, 0, 255, 0, barHeight), barWidth, map(mid, 0, 255, 0, barHeight), 3);
  fill(255);
  text('MID', width / 3 + 5 + barWidth / 2, y - 5);
  
  // Treble indicator
  fill(240, 80, 90);
  rect(width * 2 / 3, y + barHeight - map(treble, 0, 255, 0, barHeight), barWidth, map(treble, 0, 255, 0, barHeight), 3);
  fill(255);
  text('TREBLE', width * 2 / 3 + barWidth / 2, y - 5);
  
  colorMode(RGB, 255);
}

function drawParameterDisplay() {
  fill(200);
  textSize(11);
  textAlign(LEFT, CENTER);
  
  let x = 15;
  let y = 60;
  let lineHeight = 18;
  
  text('🔊 Volume: ' + nf(micLevel * 100, 1, 1) + '%', x, y);
  text('📏 Branch Length: ' + int(branchLength), x, y + lineHeight);
  text('📐 Branch Angle: ' + nf(degrees(branchAngle), 1, 1) + '°', x, y + lineHeight * 2);
  text('🌿 Recursion Depth: ' + recursionDepth, x, y + lineHeight * 3);
  text('🎨 Color Hue: ' + int(branchColor) + '°', x, y + lineHeight * 4);
  
  textAlign(CENTER, CENTER);
}

function mousePressed() {
  userStartAudio();
  
  if (!mic.enabled) {
    mic.start();
  }
}
