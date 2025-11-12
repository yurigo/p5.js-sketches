let mic;
let cnv;
let micLevel = 0;
let particles = [];
let ripples = [];

function setup() {
  const s = min(windowWidth, windowHeight) * 0.9;
  cnv = createCanvas(s, s);
  cnv.mousePressed(handleCanvasClick);
  cnv.touchStarted(handleCanvasClick);
  
  // Create audio input (microphone)
  mic = new p5.AudioIn();
  
  textAlign(CENTER, CENTER);
}

function windowResized() {
  const s = min(windowWidth, windowHeight) * 0.9;
  resizeCanvas(s, s);
}

function draw() {
  background(15, 15, 35, 25); // Slight transparency for trails
  
  // Title
  fill(255, 200, 100);
  noStroke();
  textSize(24);
  text('🎤 Microphone Visualizer 🎤', width / 2, 50);
  
  // Get microphone level
  micLevel = mic.getLevel();
  
  if (!mic.enabled) {
    // Instructions
    fill(255);
    textSize(18);
    text('Click to enable microphone', width / 2, height / 2 - 20);
    text('Make some noise!', width / 2, height / 2 + 20);
  } else {
    // Draw visualization
    
    // Central circle that pulses with sound
    let circleSize = map(micLevel, 0, 0.3, 50, 300);
    let circleColor = map(micLevel, 0, 0.3, 0, 360);
    
    colorMode(HSB, 360, 100, 100);
    fill(circleColor, 80, 90, 0.7);
    noStroke();
    circle(width / 2, height / 2, circleSize);
    
    // Outer ring
    noFill();
    stroke(circleColor, 80, 90);
    strokeWeight(3);
    circle(width / 2, height / 2, circleSize + 20);
    
    colorMode(RGB, 255);
    
    // Create particles based on sound level
    if (micLevel > 0.05 && frameCount % 2 === 0) {
      for (let i = 0; i < int(micLevel * 100); i++) {
        particles.push(new Particle(width / 2, height / 2, micLevel));
      }
    }
    
    // Create ripples on loud sounds
    if (micLevel > 0.15 && frameCount % 5 === 0) {
      ripples.push(new Ripple(width / 2, height / 2));
    }
    
    // Update and display particles
    for (let i = particles.length - 1; i >= 0; i--) {
      particles[i].update();
      particles[i].display();
      if (particles[i].isDead()) {
        particles.splice(i, 1);
      }
    }
    
    // Update and display ripples
    for (let i = ripples.length - 1; i >= 0; i--) {
      ripples[i].update();
      ripples[i].display();
      if (ripples[i].isDead()) {
        ripples.splice(i, 1);
      }
    }
    
    // Draw waveform bars at bottom
    drawWaveformBars();
    
    // Display volume level
    fill(255);
    textSize(14);
    text('Volume: ' + nf(micLevel * 100, 1, 1) + '%', width / 2, height - 30);
  }
}

function drawWaveformBars() {
  let barCount = 20;
  let barWidth = width / barCount;
  
  colorMode(HSB, 360, 100, 100);
  noStroke();
  
  for (let i = 0; i < barCount; i++) {
    let barHeight = map(micLevel, 0, 0.3, 5, 80);
    barHeight *= random(0.5, 1.5); // Add variation
    
    let hue = map(i, 0, barCount, 0, 360);
    fill(hue, 80, 90);
    
    let x = i * barWidth;
    let y = height - barHeight - 50;
    
    rect(x, y, barWidth - 2, barHeight, 2);
  }
  
  colorMode(RGB, 255);
}

function handleCanvasClick() {
  userStartAudio();
  
  if (!mic.enabled) {
    mic.start();
  }
  return false; // prevent default behavior
}

// Particle class
class Particle {
  constructor(x, y, level) {
    this.x = x;
    this.y = y;
    let angle = random(TWO_PI);
    let speed = map(level, 0, 0.3, 1, 5);
    this.vx = cos(angle) * speed;
    this.vy = sin(angle) * speed;
    this.alpha = 255;
    this.size = random(3, 8);
    this.hue = random(30, 60);
  }
  
  update() {
    this.x += this.vx;
    this.y += this.vy;
    this.alpha -= 5;
  }
  
  display() {
    colorMode(HSB, 360, 100, 100, 255);
    fill(this.hue, 80, 100, this.alpha);
    noStroke();
    circle(this.x, this.y, this.size);
    colorMode(RGB, 255);
  }
  
  isDead() {
    return this.alpha <= 0;
  }
}

// Ripple class
class Ripple {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.diameter = 0;
    this.alpha = 255;
  }
  
  update() {
    this.diameter += 5;
    this.alpha -= 5;
  }
  
  display() {
    noFill();
    colorMode(HSB, 360, 100, 100, 255);
    stroke(180, 80, 100, this.alpha);
    strokeWeight(2);
    circle(this.x, this.y, this.diameter);
    colorMode(RGB, 255);
  }
  
  isDead() {
    return this.alpha <= 0;
  }
}
