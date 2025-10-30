function branch(len) {
  line(0, 0, 0, -len);
  translate(0, -len);
  if (len > 10) {
    push();
    rotate(PI / 6);
    branch(len * 0.67);
    pop();
    push();
    rotate(-PI / 6);
    branch(len * 0.67);
    pop();
  }
}
function setup() {
  const s = min(windowWidth, windowHeight) * 0.9;
  createCanvas(s, s);
  background(45, 52, 54);
  stroke(255);
  noLoop();
  translate(width / 2, height);
  branch(100);
}

function windowResized() {
  const s = min(windowWidth, windowHeight) * 0.9;
  resizeCanvas(s, s);
  redraw();
}
