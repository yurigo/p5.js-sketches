let s;
let c;

function preload() {
  soundFormats('mp3', 'ogg');
  s = loadSound('./assets/doorbell');
}

function setup() {
  const s = min(windowWidth, windowHeight) * 0.9;
  createCanvas(s, s);
  background(45, 52, 54);
  c = color(random(255), random(255), random(255));
}

function windowResized() {
  const s = min(windowWidth, windowHeight) * 0.9;
  resizeCanvas(s, s);
  redraw();
}

function draw() {
  background(c)
}

function mousePressed(){
  c = color(random(255), random(255), random(255));
  s.play();
}

function touchStarted() {
  mousePressed();
  return false; // prevent default touch behavior
}