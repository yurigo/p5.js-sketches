// Variaciones infinitas: animación con random()
function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(30, 20);
  fill(random(255), random(255), random(255), 150);
  ellipse(random(width), random(height), random(10, 50));
}
