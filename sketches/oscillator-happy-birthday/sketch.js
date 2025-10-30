let osc;
let isPlaying = false;
let pitchOffset = 0; // Semitone offset (12 semitones = 1 octave)
let waveType = "sine"; // Current waveform type

// Happy Birthday melody
// Format: [note, duration in ms]
const melody = [
  ["C4", 400],
  ["C4", 200],
  ["D4", 600],
  ["C4", 600],
  ["F4", 600],
  ["E4", 1200],
  ["C4", 400],
  ["C4", 200],
  ["D4", 600],
  ["C4", 600],
  ["G4", 600],
  ["F4", 1200],
  ["C4", 400],
  ["C4", 200],
  ["C5", 600],
  ["A5", 600],
  ["F4", 600],
  ["E4", 600],
  ["D4", 1200],
  ["Bb5", 400],
  ["Bb5", 200],
  ["A5", 600],
  ["F4", 600],
  ["G4", 600],
  ["F4", 1200],
];

// Note frequencies in Hz
const noteFreqs = {
  C4: 261.63,
  D4: 293.66,
  E4: 329.63,
  F4: 349.23,
  G4: 392.0,
  A5: 440.0,
  Bb5: 466.16,
  C5: 523.25,
};

let currentNote = 0;
let noteStartTime = 0;
let particles = [];

function setup() {
  const s = min(windowWidth, windowHeight) * 0.9;
  createCanvas(s, s);

  // Create oscillator
  osc = new p5.Oscillator("sine");
  osc.amp(0);
  osc.start();

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
  fill(255, 215, 0);
  noStroke();
  text("🎵 Happy Birthday Song 🎵", width / 2, 60);

  fill(255, 165, 0);
  textSize(16);
  text(`Using p5.Oscillator (${waveType} wave)`, width / 2, 90);

  // Show pitch offset
  if (pitchOffset !== 0) {
    fill(100, 255, 100);
    textSize(14);
    text(
      `Pitch: ${pitchOffset > 0 ? "+" : ""}${pitchOffset} semitones`,
      width / 2,
      115
    );
  }

  // Draw instruction
  if (!isPlaying) {
    fill(255);
    textSize(20);
    text("Click to play!", width / 2, height / 2);

    fill(200);
    textSize(14);
    text(
      "Press 'O' to increase pitch / 'L' to decrease pitch",
      width / 2,
      height / 2 + 40
    );
    text(
      "Press 'Q' for sine / 'W' for sawtooth / 'E' for triangle / 'R' for square",
      width / 2,
      height / 2 + 60
    );
  } else {
    // Show current note
    fill(255, 215, 0);
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

    fill(255, 215, 0);
    noStroke();
    rect(barX, barY, barWidth * progress, barHeight, 10);
  }

  // Handle playing
  if (isPlaying) {
    let elapsed = millis() - noteStartTime;

    if (currentNote < melody.length) {
      let [note, duration] = melody[currentNote];

      if (elapsed >= duration) {
        currentNote++;
        noteStartTime = millis();

        if (currentNote < melody.length) {
          playNote(melody[currentNote][0]);
        } else {
          stopSong();
        }
      }
    }
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

function startSong() {
  isPlaying = true;
  currentNote = 0;
  noteStartTime = millis();
  playNote(melody[0][0]);
}

function stopSong() {
  isPlaying = false;
  osc.amp(0, 0.1);
  particles = [];
}

function playNote(note) {
  let freq = noteFreqs[note];
  // Apply pitch offset: each semitone is a factor of 2^(1/12)
  freq = freq * pow(2, pitchOffset / 12);
  osc.freq(freq, 0.05);
  osc.amp(0.3, 0.05);

  // Create particles at note position
  for (let i = 0; i < 5; i++) {
    particles.push(new Particle(width / 2, height / 2));
  }
}

function keyPressed() {
  // Press 'O' to increase pitch by a semitone
  if (key === "o" || key === "O") {
    pitchOffset++;
    // If playing, update the current note frequency
    if (isPlaying && currentNote < melody.length) {
      playNote(melody[currentNote][0]);
    }
  }
  // Press 'L' to decrease pitch by a semitone
  else if (key === "l" || key === "L") {
    pitchOffset--;
    // If playing, update the current note frequency
    if (isPlaying && currentNote < melody.length) {
      playNote(melody[currentNote][0]);
    }
  }
  // Press 'Q' to switch to sine wave
  else if (key === "q" || key === "Q") {
    waveType = "sine";
    osc.setType(waveType);
  }
  // Press 'W' to switch to sawtooth wave
  else if (key === "w" || key === "W") {
    waveType = "sawtooth";
    osc.setType(waveType);
  }
  // Press 'E' to switch to triangle wave
  else if (key === "e" || key === "E") {
    waveType = "triangle";
    osc.setType(waveType);
  }
  // Press 'R' to switch to square wave
  else if (key === "r" || key === "R") {
    waveType = "square";
    osc.setType(waveType);
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
    this.hue = random(360);
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
