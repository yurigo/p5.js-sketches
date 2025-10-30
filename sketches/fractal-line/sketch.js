function setup() {
  const s = min(windowWidth, windowHeight) * 0.9;
  createCanvas(s, s);
  background(45, 52, 54);
  stroke(255);
  drawLine(10, 400);
  noLoop();
}

function windowResized() {
  const s = min(windowWidth, windowHeight) * 0.9;
  resizeCanvas(s, s);
  redraw();
}

function drawLine(x, len) {
  stroke(random(255), random(255), random(255));
  if (len < 5) return;
  line(x, height / 2, x + len, height / 2);
  drawLine(x + len / 2, len / 2);
}
