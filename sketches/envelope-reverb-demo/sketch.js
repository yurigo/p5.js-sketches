let osc;
let env;
let reverb;
let filter;
let isReverbEnabled = false;
let isFilterEnabled = false;
let filterFreq = 1000;
let reverbTime = 3;

function setup() {
  const s = min(windowWidth, windowHeight) * 0.9;
  createCanvas(s, s);
  
  // Create oscillator
  osc = new p5.Oscillator('sawtooth');
  
  // Create envelope (ADSR)
  env = new p5.Envelope();
  env.setADSR(0.01, 0.2, 0.3, 0.5);
  env.setRange(1.0, 0);
  
  // Connect envelope to oscillator amplitude
  osc.amp(env);
  
  // Create reverb effect
  reverb = new p5.Reverb();
  reverb.set(reverbTime, 2);
  
  // Create low-pass filter
  filter = new p5.Filter('lowpass');
  filter.freq(filterFreq);
  
  osc.start();
  osc.freq(0);
  
  textAlign(CENTER, CENTER);
}

function windowResized() {
  const s = min(windowWidth, windowHeight) * 0.9;
  resizeCanvas(s, s);
}

function draw() {
  background(15, 15, 35);
  
  // Title
  fill(150, 200, 255);
  noStroke();
  textSize(24);
  text('🎚️ Envelope, Reverb & Filter Demo 🎚️', width / 2, 50);
  
  // Instructions
  fill(200);
  textSize(16);
  text('Click to play a note', width / 2, 90);
  text('Press R to toggle Reverb', width / 2, 115);
  text('Press F to toggle Filter', width / 2, 140);
  text('Mouse X controls note pitch', width / 2, 165);
  text('Mouse Y controls filter frequency', width / 2, 190);
  
  // Draw ADSR envelope visualization
  drawEnvelope();
  
  // Status display
  let statusY = height - 120;
  fill(255);
  textSize(18);
  text('Current Settings:', width / 2, statusY);
  
  fill(isReverbEnabled ? color(100, 255, 100) : color(255, 100, 100));
  text('Reverb: ' + (isReverbEnabled ? 'ON' : 'OFF'), width / 2, statusY + 30);
  
  fill(isFilterEnabled ? color(100, 255, 100) : color(255, 100, 100));
  text('Filter: ' + (isFilterEnabled ? 'ON' : 'OFF'), width / 2, statusY + 55);
  
  // Update filter frequency based on mouse Y
  if (mouseY > 0 && mouseY < height) {
    filterFreq = map(mouseY, 0, height, 5000, 100);
    filter.freq(filterFreq);
    
    fill(200);
    textSize(14);
    text('Filter Freq: ' + int(filterFreq) + ' Hz', width / 2, statusY + 80);
  }
}

function drawEnvelope() {
  let envX = width * 0.2;
  let envY = height / 2 - 20;
  let envW = width * 0.6;
  let envH = 120;
  
  // Background
  fill(30, 30, 50);
  noStroke();
  rect(envX, envY, envW, envH, 10);
  
  // Labels
  fill(150, 200, 255);
  textSize(16);
  textAlign(LEFT, CENTER);
  text('ADSR Envelope', envX + 10, envY - 15);
  
  // Draw envelope shape
  stroke(100, 255, 150);
  strokeWeight(3);
  noFill();
  
  let segmentW = envW / 4;
  
  beginShape();
  // Attack (0 to 1)
  vertex(envX, envY + envH);
  vertex(envX + segmentW * 0.05, envY);
  
  // Decay (1 to sustain level 0.3)
  vertex(envX + segmentW * 1, envY + envH * 0.7);
  
  // Sustain (flat at 0.3)
  vertex(envX + segmentW * 2.5, envY + envH * 0.7);
  
  // Release (0.3 to 0)
  vertex(envX + segmentW * 3.5, envY + envH);
  endShape();
  
  // Labels for each phase
  fill(150, 200, 255);
  textSize(12);
  textAlign(CENTER, CENTER);
  text('A', envX + segmentW * 0.25, envY + envH + 15);
  text('D', envX + segmentW * 0.75, envY + envH + 15);
  text('S', envX + segmentW * 1.75, envY + envH + 15);
  text('R', envX + segmentW * 3, envY + envH + 15);
  
  textAlign(CENTER, CENTER);
}

function mousePressed() {
  userStartAudio();
  
  // Calculate frequency based on mouse X position
  let freq = map(mouseX, 0, width, 200, 800);
  osc.freq(freq);
  
  // Disconnect and reconnect based on effect settings
  osc.disconnect();
  
  if (isFilterEnabled && isReverbEnabled) {
    osc.connect(filter);
    filter.disconnect();
    filter.connect(reverb);
  } else if (isFilterEnabled) {
    osc.connect(filter);
    filter.disconnect();
    filter.connect();
  } else if (isReverbEnabled) {
    reverb.process(osc, reverbTime, 2);
  } else {
    osc.connect();
  }
  
  // Trigger the envelope
  env.play();
}

function touchStarted() {
  mousePressed();
  return false; // prevent default touch behavior
}

function keyPressed() {
  if (key === 'r' || key === 'R') {
    isReverbEnabled = !isReverbEnabled;
    
    // Need to reconnect audio chain
    osc.disconnect();
    if (isFilterEnabled) {
      filter.disconnect();
    }
    
    if (isReverbEnabled && !isFilterEnabled) {
      reverb.process(osc, reverbTime, 2);
    } else if (isReverbEnabled && isFilterEnabled) {
      osc.connect(filter);
      filter.disconnect();
      filter.connect(reverb);
    } else if (!isReverbEnabled && isFilterEnabled) {
      osc.connect(filter);
      filter.disconnect();
      filter.connect();
    } else {
      osc.connect();
    }
  }
  
  if (key === 'f' || key === 'F') {
    isFilterEnabled = !isFilterEnabled;
    
    // Need to reconnect audio chain
    osc.disconnect();
    if (isFilterEnabled) {
      filter.disconnect();
    }
    
    if (isReverbEnabled && isFilterEnabled) {
      osc.connect(filter);
      filter.disconnect();
      filter.connect(reverb);
    } else if (!isReverbEnabled && isFilterEnabled) {
      osc.connect(filter);
      filter.disconnect();
      filter.connect();
    } else if (isReverbEnabled && !isFilterEnabled) {
      reverb.process(osc, reverbTime, 2);
    } else {
      osc.connect();
    }
  }
}
