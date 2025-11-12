let polySynth;
let isPlaying = false;

// Happy Birthday melody with chord harmonization
// Format: [notes array for chord, duration in seconds]
const melody = [
  [['C4', 'E4'], 0.4], [['C4', 'E4'], 0.2], [['D4', 'F4'], 0.6], 
  [['C4', 'E4'], 0.6], [['F4', 'A4'], 0.6], [['E4', 'G4'], 1.2],
  
  [['C4', 'E4'], 0.4], [['C4', 'E4'], 0.2], [['D4', 'F4'], 0.6], 
  [['C4', 'E4'], 0.6], [['G4', 'B4'], 0.6], [['F4', 'A4'], 1.2],
  
  [['C4', 'E4'], 0.4], [['C4', 'E4'], 0.2], [['C5', 'E5'], 0.6], 
  [['A4', 'C5'], 0.6], [['F4', 'A4'], 0.6], [['E4', 'G4'], 0.6], [['D4', 'F4'], 1.2],
  
  [['Bb4', 'D5'], 0.4], [['Bb4', 'D5'], 0.2], [['A4', 'C5'], 0.6], 
  [['F4', 'A4'], 0.6], [['G4', 'B4'], 0.6], [['F4', 'A4'], 1.2]
];

let currentNote = 0;
let particles = [];

function setup() {
  const s = min(windowWidth, windowHeight) * 0.9;
  createCanvas(s, s);
  
  // Create PolySynth (can play multiple notes at once)
  polySynth = new p5.PolySynth();
  
  textAlign(CENTER, CENTER);
  textSize(24);
}

function windowResized() {
  const s = min(windowWidth, windowHeight) * 0.9;
  resizeCanvas(s, s);
}

function draw() {
  background(15, 15, 35);
  
  // Draw particles
  for (let i = particles.length - 1; i >= 0; i--) {
    particles[i].update();
    particles[i].display();
    if (particles[i].isDead()) {
      particles.splice(i, 1);
    }
  }
  
  // Draw title
  fill(255, 100, 200);
  noStroke();
  text('🎵 Happy Birthday Song 🎵', width / 2, 60);
  
  fill(255, 150, 220);
  textSize(16);
  text('Using p5.PolySynth (Harmonized Chords)', width / 2, 90);
  
  // Draw instruction
  if (!isPlaying) {
    fill(255);
    textSize(20);
    text('Click to play!', width / 2, height / 2);
  } else {
    // Show current notes (chord)
    fill(255, 100, 200);
    textSize(36);
    if (currentNote < melody.length) {
      let notes = melody[currentNote][0];
      text(notes.join(' + '), width / 2, height / 2);
    }
    
    // Draw progress bar
    let progress = currentNote / melody.length;
    let barWidth = width * 0.8;
    let barHeight = 20;
    let barX = width * 0.1;
    let barY = height - 60;
    
    noFill();
    stroke(100);
    strokeWeight(2);
    rect(barX, barY, barWidth, barHeight, 10);
    
    fill(255, 100, 200);
    noStroke();
    rect(barX, barY, barWidth * progress, barHeight, 10);
  }
  
  // Check if song is finished
  if (isPlaying && currentNote >= melody.length) {
    stopSong();
  }
}

function mousePressed() {
  if (!isPlaying) {
    userStartAudio();
    startSong();
  } else {
    stopSong();
  }
}

function touchStarted() {
  mousePressed();
  return false; // prevent default touch behavior
}

function startSong() {
  isPlaying = true;
  currentNote = 0;
  
  // Schedule all notes
  let time = 0;
  
  for (let i = 0; i < melody.length; i++) {
    let [notes, duration] = melody[i];
    let vel = 0.4; // velocity (volume)
    
    // Play each note in the chord
    for (let note of notes) {
      polySynth.play(note, vel, time, duration * 0.9);
    }
    
    // Schedule particle creation and note display update
    setTimeout(() => {
      if (isPlaying) {
        currentNote = i;
        createParticles(notes.length);
      }
    }, time * 1000);
    
    time += duration;
  }
  
  // Schedule stop
  setTimeout(() => {
    if (isPlaying) {
      currentNote = melody.length;
    }
  }, time * 1000);
}

function stopSong() {
  isPlaying = false;
  currentNote = 0;
  particles = [];
}

function createParticles(count) {
  for (let i = 0; i < count * 3; i++) {
    particles.push(new Particle(width / 2, height / 2));
  }
}

// Particle class for visual effect
class Particle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    let angle = random(TWO_PI);
    let speed = random(1, 3);
    this.vx = cos(angle) * speed;
    this.vy = sin(angle) * speed;
    this.alpha = 255;
    this.size = random(5, 15);
    this.hue = random(300, 340);
  }
  
  update() {
    this.x += this.vx;
    this.y += this.vy;
    this.vy += 0.05; // gravity
    this.alpha -= 3;
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
