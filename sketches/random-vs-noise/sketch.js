function setup() {
  createCanvas(400, 400);
  noStroke();

  let xoff = 0; // desplazamiento en noise

  for (let i = 0; i < width; i += 20) {
    const y = random(height);
    fill(200, 100, 255, 150);
    ellipse(i, y, 15);
    fill(100, 200, 255, 150);
    let n = noise(xoff) * height;
    ellipse(i, n, 15, 15);
    xoff = xoff + 0.1;
    stroke(200, 150);
    line(i, y, i, n);
  }
}
