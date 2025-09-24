function setup() {
  createCanvas(400, 400);
  noStroke();
  fill(200, 100, 255, 150);

  for (let i = 0; i < width; i += 20) {
    ellipse(i, random(height), 15);
  }
}
