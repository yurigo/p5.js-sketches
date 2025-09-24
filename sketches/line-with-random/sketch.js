function setup() {
  createCanvas(400, 400);
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
