let s;
let c;
let cnv;

function preload() {
  soundFormats('mp3', 'ogg');
  s = loadSound('./assets/doorbell');
}

function setup() {
  const size = min(windowWidth, windowHeight) * 0.9;
  cnv = createCanvas(size, size);
  cnv.mousePressed(handleCanvasClick);
  cnv.touchStarted(handleCanvasClick);
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

function handleCanvasClick() {
  c = color(random(255), random(255), random(255));
  s.play();
  return false; // prevent default behavior
}