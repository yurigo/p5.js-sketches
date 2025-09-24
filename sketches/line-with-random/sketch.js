function setup() {
  const s = min(windowWidth, windowHeight) * 0.9;
  createCanvas(s, s);
  background(0);
  stroke(255);
  noFill();

  beginShape();
  for (let x = 0; x < width; x++) {
    let y = random(height);
    vertex(x, y);
  }
  endShape();
}

function windowResized() {
  const s = min(windowWidth, windowHeight) * 0.9;
  resizeCanvas(s, s);
  redraw();
}
