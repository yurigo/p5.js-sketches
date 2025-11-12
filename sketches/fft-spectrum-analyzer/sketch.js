let mic;
let fft;
let spectrum = [];
let waveform = [];

function setup() {
  const s = min(windowWidth, windowHeight) * 0.9;
  createCanvas(s, s);
  
  // Create audio input
  mic = new p5.AudioIn();
  
  // Create FFT analyzer
  fft = new p5.FFT(0.8, 256);
  
  textAlign(CENTER, CENTER);
}

function windowResized() {
  const s = min(windowWidth, windowHeight) * 0.9;
  resizeCanvas(s, s);
}

function draw() {
  background(15, 15, 35);
  
  // Title
  fill(100, 255, 255);
  noStroke();
  textSize(24);
  text('📊 FFT Spectrum Analyzer 📊', width / 2, 40);
  
  if (!mic.enabled) {
    // Instructions
    fill(255);
    textSize(18);
    text('Click to enable microphone', width / 2, height / 2 - 20);
    text('Play music or make sounds to see the frequency spectrum!', width / 2, height / 2 + 20);
  } else {
    // Get FFT data
    fft.setInput(mic);
    spectrum = fft.analyze();
    waveform = fft.waveform();
    
    // Draw spectrum (frequency bars)
    drawSpectrum();
    
    // Draw waveform
    drawWaveform();
    
    // Draw labels
    drawLabels();
  }
}

function drawSpectrum() {
  let barWidth = width / spectrum.length;
  
  colorMode(HSB, 360, 100, 100);
  noStroke();
  
  for (let i = 0; i < spectrum.length; i++) {
    let x = i * barWidth;
    let h = map(spectrum[i], 0, 255, 0, height * 0.4);
    
    // Color based on frequency (low = red, high = purple)
    let hue = map(i, 0, spectrum.length, 0, 280);
    fill(hue, 80, 90);
    
    rect(x, height * 0.5 - h, barWidth - 1, h);
  }
  
  colorMode(RGB, 255);
}

function drawWaveform() {
  stroke(100, 255, 255);
  strokeWeight(2);
  noFill();
  
  beginShape();
  for (let i = 0; i < waveform.length; i++) {
    let x = map(i, 0, waveform.length, 0, width);
    let y = map(waveform[i], -1, 1, height * 0.55, height * 0.8);
    vertex(x, y);
  }
  endShape();
  
  // Draw center line
  stroke(80, 80, 100);
  strokeWeight(1);
  line(0, height * 0.675, width, height * 0.675);
}

function drawLabels() {
  fill(100, 255, 255);
  textSize(14);
  textAlign(LEFT, CENTER);
  
  // Spectrum label
  text('Frequency Spectrum', 20, height * 0.5 - height * 0.4 - 15);
  
  // Waveform label
  text('Waveform', 20, height * 0.55 + 5);
  
  // Frequency labels
  textSize(11);
  fill(150);
  textAlign(CENTER, CENTER);
  
  let freqLabels = ['Bass', 'Mid', 'Treble'];
  let positions = [0.15, 0.5, 0.85];
  
  for (let i = 0; i < freqLabels.length; i++) {
    text(freqLabels[i], width * positions[i], height * 0.5 + 10);
  }
  
  // Draw frequency range indicators
  noFill();
  stroke(100, 100, 150, 100);
  strokeWeight(1);
  
  // Bass range (0-25%)
  rect(0, height * 0.5 - height * 0.4, width * 0.25, height * 0.4);
  
  // Mid range (25-70%)
  rect(width * 0.25, height * 0.5 - height * 0.4, width * 0.45, height * 0.4);
  
  // Treble range (70-100%)
  rect(width * 0.7, height * 0.5 - height * 0.4, width * 0.3, height * 0.4);
  
  // Additional info
  fill(200);
  textSize(12);
  textAlign(CENTER, CENTER);
  
  // Get energy in different frequency bands
  let bass = fft.getEnergy('bass');
  let mid = fft.getEnergy('mid');
  let treble = fft.getEnergy('treble');
  
  text('Bass: ' + int(bass), width * 0.125, height - 60);
  text('Mid: ' + int(mid), width * 0.5, height - 60);
  text('Treble: ' + int(treble), width * 0.875, height - 60);
  
  // Visual indicators for each band
  colorMode(HSB, 360, 100, 100);
  
  // Bass indicator
  fill(0, map(bass, 0, 255, 0, 100), 90);
  circle(width * 0.125, height - 30, map(bass, 0, 255, 10, 30));
  
  // Mid indicator
  fill(120, map(mid, 0, 255, 0, 100), 90);
  circle(width * 0.5, height - 30, map(mid, 0, 255, 10, 30));
  
  // Treble indicator
  fill(240, map(treble, 0, 255, 0, 100), 90);
  circle(width * 0.875, height - 30, map(treble, 0, 255, 10, 30));
  
  colorMode(RGB, 255);
}

function mousePressed() {
  // Only respond to clicks on the canvas
  if (mouseX < 0 || mouseX > width || mouseY < 0 || mouseY > height) {
    return;
  }
  userStartAudio();
  
  if (!mic.enabled) {
    mic.start();
  }
}

function touchStarted() {
  // Only respond to touches on the canvas
  if (touches.length > 0) {
    const touch = touches[0];
    if (touch.x < 0 || touch.x > width || touch.y < 0 || touch.y > height) {
      return;
    }
  }
  mousePressed();
  return false; // prevent default touch behavior
}
