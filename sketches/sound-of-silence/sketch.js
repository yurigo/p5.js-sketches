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

function mousePressed(){
  playSynth()
}

function playSynth() {
  userStartAudio();

  // note duration (in seconds)
  let dur = 1.5;

  // time from now (in seconds)
  let time = 0;

  // velocity (volume, from 0 to 1)
  let vel = 0.1;

  // notes can overlap with each other
  polySynth.play('G2', vel, 0, dur);
  polySynth.play('C3', vel, time += 1/3, dur);
  polySynth.play('G3', vel, time += 1/3, dur);
}