// Aleatoriedad pura: caos con random()
function setup() {
  createCanvas(400, 400);
  background(0);
  noStroke();
  fill(255);
  for (let i = 0; i < 500; i++) {
    ellipse(random(width), random(height), 5);
  }
}
