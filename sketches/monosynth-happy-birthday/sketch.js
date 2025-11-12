let monoSynth;
let isPlaying = false;

// Happy Birthday melody
// Format: [note, duration in seconds]
const melody = [
  ["C4", 0.4],
  ["C4", 0.2],
  ["D4", 0.6],
  ["C4", 0.6],
  ["F4", 0.6],
  ["E4", 1.2],
  ["C4", 0.4],
  ["C4", 0.2],
  ["D4", 0.6],
  ["C4", 0.6],
  ["G4", 0.6],
  ["F4", 1.2],
  ["C4", 0.4],
  ["C4", 0.2],
  ["C5", 0.6],
  ["A5", 0.6],
  ["F4", 0.6],
  ["E4", 0.6],
  ["D4", 1.2],
  ["A#5", 0.4],
  ["A#5", 0.2],
  ["A5", 0.6],
  ["F4", 0.6],
  ["G4", 0.6],
  ["F4", 1.2],
];

for (let i = 0; i < melody.length; i++) {
  console.log(`Note ${i + 1}: ${melody[i][0]}, Duration: ${melody[i][1]}s`);
  melody[i][1] = melody[i][1] + 0.5; // durations are already in seconds
  console.log(`Note ${i + 1}: ${melody[i][0]}, Duration: ${melody[i][1]}s`);
}

let currentNote = 0;
let scheduledTime = 0;
let particles = [];

function setup() {
  const s = min(windowWidth, windowHeight) * 0.9;
  createCanvas(s, s);

  // Create MonoSynth with custom envelope
  monoSynth = new p5.MonoSynth();

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
  fill(100, 255, 150);
  noStroke();
  text("🎵 Happy Birthday Song 🎵", width / 2, 60);

  fill(150, 255, 200);
  textSize(16);
  text("Using p5.MonoSynth (with ADSR Envelope)", width / 2, 90);

  // Draw instruction
  if (!isPlaying) {
    fill(255);
    textSize(20);
    text("Click to play!", width / 2, height / 2);
  } else {
    // Show current note
    fill(100, 255, 150);
    textSize(48);
    if (currentNote < melody.length) {
      text(melody[currentNote][0], width / 2, height / 2);
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

    fill(100, 255, 150);
    noStroke();
    rect(barX, barY, barWidth * progress, barHeight, 10);
  }

  // Check if song is finished
  if (isPlaying && currentNote >= melody.length) {
    let elapsedTime = getAudioContext().currentTime - scheduledTime;
    if (elapsedTime > 0) {
      stopSong();
    }
  }
}

function mousePressed() {
  // Only respond to clicks on the canvas
  if (mouseX < 0 || mouseX > width || mouseY < 0 || mouseY > height) {
    return;
  }
  if (!isPlaying) {
    userStartAudio();
    startSong();
  } else {
    stopSong();
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

function startSong() {
  isPlaying = true;
  currentNote = 0;

  // Schedule all notes
  scheduledTime = getAudioContext().currentTime;
  let time = 0;

  for (let i = 0; i < melody.length; i++) {
    let [note, duration] = melody[i];
    let vel = 0.5; // velocity (volume)

    console.log(`Scheduling note ${note} at time ${time.toFixed(2)}s`);
    monoSynth.play(note, vel, time, duration * 0.9);

    // Schedule particle creation and note display update
    setTimeout(() => {
      if (isPlaying) {
        currentNote = i;
        createParticles();
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

function createParticles() {
  for (let i = 0; i < 5; i++) {
    particles.push(new Particle(width / 2, height / 2));
  }
}

// Particle class for visual effect
class Particle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.vx = random(-2, 2);
    this.vy = random(-3, -1);
    this.alpha = 255;
    this.size = random(5, 15);
    this.hue = random(100, 150);
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;
    this.vy += 0.1; // gravity
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
