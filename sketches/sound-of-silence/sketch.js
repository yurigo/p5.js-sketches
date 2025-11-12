function setup() {
  const s = min(windowWidth, windowHeight) * 0.9;
  createCanvas(s, s);
  background(45, 52, 54);

  polySynth = new p5.PolySynth();
}

function windowResized() {
  const s = min(windowWidth, windowHeight) * 0.9;
  resizeCanvas(s, s);
  redraw();
}

function draw() {
  background(45, 52, 54);
}

function mousePressed() {
  // Only respond to clicks on the canvas
  if (mouseX < 0 || mouseX > width || mouseY < 0 || mouseY > height) {
    return;
  }
  playSynth();
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

function playSynth() {
  userStartAudio();

  // note duration (in seconds)
  let dur = 0.1;

  // time from now (in seconds)
  let time = 0;

  // velocity (volume, from 0 to 1)
  let vel = 0.4;

  // notes can overlap with each other
  // G chord

  while (time < 10) {
    // polySynth.play("G3", vel, time, dur);
    // time = time + dur + 0.1; // add a small gap between chords
    // polySynth.play("B4", vel, time, dur);
    // time = time + dur + 0.1; // add a small gap between chords
    // polySynth.play("D4", vel, time, dur);
    // // B chord
    // time = time + dur + 0.1; // add a small gap between chords
    // polySynth.play("B4", vel, time, dur);
    // time = time + dur + 0.1; // add a small gap between chords
    // polySynth.play("D4", vel, time, dur);
    // time = time + dur + 0.1; // add a small gap between chords
    // polySynth.play("F4", vel, time, dur);
    // // C chord
    // time = time + dur + 0.1;
    // polySynth.play("C4", vel, time, dur);
    // time = time + dur + 0.1; // add a small gap between chords
    // polySynth.play("E4", vel, time, dur);
    // time = time + dur + 0.1; // add a small gap between chords
    // polySynth.play("G4", vel, time, dur);
    // // Cm chord
    // time = time + dur + 0.1;
    // polySynth.play("C4", vel, time, dur);
    // time = time + dur + 0.1;
    // polySynth.play("D#4", vel, time, dur);
    // time = time + dur + 0.1;
    // polySynth.play("G4", vel, time, dur);

    // G

    polySynth.play("C4", vel, time, dur);
    time = time + dur + 0.01; // add a small gap between chords
    polySynth.play("E4", vel, time, dur);
    time = time + dur + 0.01; // add a small gap between chords
    polySynth.play("G4", vel, time, dur);
    time = time + dur + 0.01; // add a small gap between chords
    polySynth.play("C5", vel, time, dur);
    time = time + dur + 0.1; // add a small gap between chords

    polySynth.play("C4", vel, time, dur);
    time = time + dur + 0.01; // add a small gap between chords
    polySynth.play("E4", vel, time, dur);
    time = time + dur + 0.01; // add a small gap between chords
    polySynth.play("G4", vel, time, dur);
    time = time + dur + 0.01; // add a small gap between chords
    polySynth.play("B5", vel, time, dur);
    time = time + dur + 0.1; // add a small gap between chords
    // add a small gap between chords

    polySynth.play("A4", vel, time, dur);
    time = time + dur + 0.01; // add a small gap between chords
    polySynth.play("C4", vel, time, dur);
    time = time + dur + 0.01; // add a small gap between chords
    polySynth.play("E4", vel, time, dur);
    time = time + dur + 0.01; // add a small gap between chords
    polySynth.play("A5", vel, time, dur);
    time = time + dur + 0.1; // add a small gap between chords

    polySynth.play("A4", vel, time, dur);
    time = time + dur + 0.01; // add a small gap between chords
    polySynth.play("C4", vel, time, dur);
    time = time + dur + 0.01; // add a small gap between chords
    polySynth.play("E4", vel, time, dur);
    time = time + dur + 0.01; // add a small gap between chords
    polySynth.play("G4", vel, time, dur);
    time = time + dur + 0.1; // add a small gap between chords

    polySynth.play("F3", vel, time, dur);
    time = time + dur + 0.01; // add a small gap between chords
    polySynth.play("A4", vel, time, dur);
    time = time + dur + 0.01; // add a small gap between chords
    polySynth.play("C4", vel, time, dur);
    time = time + dur + 0.01; // add a small gap between chords
    polySynth.play("F4", vel, time, dur);
    time = time + dur + 0.1; // add a small gap between chords

    polySynth.play("F3", vel, time, dur);
    time = time + dur + 0.01; // add a small gap between chords
    polySynth.play("A4", vel, time, dur);
    time = time + dur + 0.01; // add a small gap between chords
    polySynth.play("C4", vel, time, dur);
    time = time + dur + 0.01; // add a small gap between chords
    polySynth.play("E4", vel, time, dur);
    time = time + dur + 0.1; // add a small gap between chords

    // polySynth.play("A4", vel, time, dur);
    // time = time + dur + 0.1; // add a small gap between chords
    // polySynth.play("C4", vel, time, dur);
    // time = time + dur + 0.1; // add a small gap between chords
    // polySynth.play("E4", vel, time, dur);
    // time = time + dur + 0.1; // add a small gap between chords
    // polySynth.play("G4", vel, time, dur);
    // time = time + dur + 0.1; // add a small gap between chords

    polySynth.play("F3", vel, time, dur);
    time = time + dur + 0.01; // add a small gap between chords
    polySynth.play("A4", vel, time, dur);
    time = time + dur + 0.01; // add a small gap between chords
    polySynth.play("C4", vel, time, dur);
    time = time + dur + 0.01; // add a small gap between chords
    polySynth.play("F4", vel, time, dur);
    time = time + dur + 0.1; // add a small gap between chords

    polySynth.play("A4", vel, time, dur);
    time = time + dur + 0.01; // add a small gap between chords
    polySynth.play("C4", vel, time, dur);
    time = time + dur + 0.01; // add a small gap between chords
    polySynth.play("E4", vel, time, dur);
    time = time + dur + 0.01; // add a small gap between chords
    polySynth.play("G4", vel, time, dur);
    time = time + dur + 0.1; // add a small gap between chords
  }
}
