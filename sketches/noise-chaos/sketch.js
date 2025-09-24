function setup() {
  createCanvas(400, 400);
  noStroke();
  fill(200, 100, 255, 150);

  let xoff = 0; // desplazamiento en noise
  for (let x = 0; x < width; x += 20) {
    let n = noise(xoff) * height; // valor entre 0 y alto de canvas
    ellipse(x, n, 15, 15);
    xoff += 0.1; // avanzamos en la “dimensión del ruido”
  }
}
