// Variaciones infinitas: animación con random()
function setup() {
  const s = min(windowWidth, windowHeight) * 0.9;
  createCanvas(s, s);
}

function windowResized() {
  const s = min(windowWidth, windowHeight) * 0.9;
  resizeCanvas(s, s);
  redraw();
}

function draw() {
  background(30, 20);
  fill(random(255), random(255), random(255), 150);
  ellipse(random(width), random(height), random(10, 50));
}
