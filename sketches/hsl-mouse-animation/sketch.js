// HSL Mouse Animation Sketch
// Demonstrates HSL color mode with mouse-controlled animation

let particles = [];
let maxParticles = 100;

function setup() {
  createCanvas(800, 800);
  // Set color mode to HSB (Hue, Saturation, Brightness)
  // In p5.js, HSB is equivalent to HSL (Hue, Saturation, Lightness)
  colorMode(HSB, 360, 100, 100, 100);
  background(220, 20, 15); // Dark blue-gray background
}

function draw() {
  // Semi-transparent background for trail effect
  background(220, 20, 15, 20);
  
  // Calculate hue and saturation based on mouse position
  let mouseHue = map(mouseX, 0, width, 0, 360);
  let mouseSaturation = map(mouseY, 0, height, 30, 100);
  
  // Create new particles at mouse position when mouse is moving
  if (mouseX !== pmouseX || mouseY !== pmouseY) {
    if (particles.length < maxParticles) {
      particles.push(new Particle(mouseX, mouseY, mouseHue, mouseSaturation));
    }
  }
  
  // Update and draw all particles
  for (let i = particles.length - 1; i >= 0; i--) {
    particles[i].update();
    particles[i].display();
    
    // Remove dead particles
    if (particles[i].isDead()) {
      particles.splice(i, 1);
    }
  }
  
  // Draw interactive elements that respond to mouse
  drawColorWheel();
  drawMouseIndicator(mouseHue, mouseSaturation);
  
  // Instructions
  fill(0, 0, 100); // White text
  textAlign(CENTER);
  textSize(16);
  text("Move mouse to control HSL colors • X-axis = Hue • Y-axis = Saturation", width/2, height - 30);
}

function drawColorWheel() {
  // Draw a small color wheel in the corner to show HSL concept
  push();
  translate(70, 70);
  
  let wheelRadius = 50;
  let segments = 36;
  
  for (let i = 0; i < segments; i++) {
    let angle = map(i, 0, segments, 0, TWO_PI);
    let hue = map(i, 0, segments, 0, 360);
    
    fill(hue, 80, 90);
    noStroke();
    
    let x1 = cos(angle) * (wheelRadius - 10);
    let y1 = sin(angle) * (wheelRadius - 10);
    let x2 = cos(angle) * wheelRadius;
    let y2 = sin(angle) * wheelRadius;
    let x3 = cos(angle + TWO_PI/segments) * wheelRadius;
    let y3 = sin(angle + TWO_PI/segments) * wheelRadius;
    let x4 = cos(angle + TWO_PI/segments) * (wheelRadius - 10);
    let y4 = sin(angle + TWO_PI/segments) * (wheelRadius - 10);
    
    quad(x1, y1, x2, y2, x3, y3, x4, y4);
  }
  
  // Center circle
  fill(0, 0, 20);
  noStroke();
  circle(0, 0, 20);
  
  pop();
}

function drawMouseIndicator(hue, saturation) {
  // Draw current mouse color indicator
  push();
  translate(width - 70, 70);
  
  // Background circle
  fill(0, 0, 20);
  stroke(0, 0, 60);
  strokeWeight(2);
  circle(0, 0, 60);
  
  // Current color circle
  fill(hue, saturation, 85);
  noStroke();
  circle(0, 0, 40);
  
  // HSL values text
  fill(0, 0, 100);
  textAlign(CENTER);
  textSize(10);
  text(`H:${int(hue)}°`, 0, -30);
  text(`S:${int(saturation)}%`, 0, -20);
  text(`L:85%`, 0, -10);
  
  pop();
}

// Particle class for animated elements
class Particle {
  constructor(x, y, hue, saturation) {
    this.x = x;
    this.y = y;
    this.vx = random(-2, 2);
    this.vy = random(-2, 2);
    this.life = 100;
    this.maxLife = 100;
    this.hue = hue;
    this.saturation = saturation;
    this.size = random(5, 15);
    
    // Add some variation to the hue
    this.hue += random(-30, 30);
    if (this.hue < 0) this.hue += 360;
    if (this.hue > 360) this.hue -= 360;
  }
  
  update() {
    this.x += this.vx;
    this.y += this.vy;
    this.life -= 1;
    
    // Add some physics - gravity and friction
    this.vy += 0.05; // gravity
    this.vx *= 0.99; // friction
    this.vy *= 0.99;
  }
  
  display() {
    let alpha = map(this.life, 0, this.maxLife, 0, 80);
    let brightness = map(this.life, 0, this.maxLife, 30, 90);
    
    fill(this.hue, this.saturation, brightness, alpha);
    noStroke();
    
    let currentSize = map(this.life, 0, this.maxLife, 0, this.size);
    circle(this.x, this.y, currentSize);
  }
  
  isDead() {
    return this.life <= 0;
  }
}

function mousePressed() {
  // Create burst of particles on click
  let mouseHue = map(mouseX, 0, width, 0, 360);
  let mouseSaturation = map(mouseY, 0, height, 30, 100);
  
  for (let i = 0; i < 20; i++) {
    if (particles.length < maxParticles) {
      let p = new Particle(mouseX, mouseY, mouseHue, mouseSaturation);
      // Give burst particles more energy
      p.vx = random(-5, 5);
      p.vy = random(-5, 5);
      particles.push(p);
    }
  }
}

function keyPressed() {
  if (key === ' ') {
    // Clear all particles
    particles = [];
  }
}