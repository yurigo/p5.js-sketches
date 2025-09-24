function setup() {
  createCanvas(400, 400);
  background(0);
  stroke(255);
  noFill();

  let xoff = 0;
  beginShape();
  for (let x = 0; x < width; x++) {
    let y = noise(xoff) * height;
    vertex(x, y);
    xoff += 0.02;
  }
  endShape();
}
