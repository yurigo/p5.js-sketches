function setup() {
  const s = min(windowWidth, windowHeight) * 0.9;
  createCanvas(s, s);
  background(0);
  stroke(255);
  noFill();
  noLoop();
}

function windowResized() {
  const s = min(windowWidth, windowHeight) * 0.9;
  resizeCanvas(s, s);
  redraw();
}
function draw() {
  background(0);
  stroke(255);
  noFill();

  // --- Línea con noise() (arriba) ---
  let xoff = 0;
  beginShape();
  for (let x = 0; x < width; x++) {
    let y = noise(xoff) * (height / 2); // mitad superior
    vertex(x, y);
    xoff += 0.02;
  }
  endShape();

  // --- Línea con random() (abajo) ---
  beginShape();
  for (let x = 0; x < width; x++) {
    let y = random(height / 2, height); // mitad inferior
    vertex(x, y);
  }
  endShape();

  // Etiquetas
  noStroke();
  fill(255);
  textSize(16);
  text("noise()", 10, 20);
  text("random()", 10, height / 2 + 20);
  noLoop();
}
