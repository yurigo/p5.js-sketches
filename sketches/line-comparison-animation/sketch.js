let xoff = 0; // para avanzar en noise
let xpos = 0; // posición horizontal

function setup() {
  const s = min(windowWidth, windowHeight) * 0.9;
  createCanvas(s, s);
  background(0);
  stroke(255);

  background(0);
  fill(255);
  noStroke();
  textSize(16);
  stroke(255);
  text("noise()", 10, 20);
  text("random()", 10, height / 2 + 20);
}

function windowResized() {
  const s = min(windowWidth, windowHeight) * 0.9;
  resizeCanvas(s, s);
  background(0);
  fill(255);
  noStroke();
  textSize(16);
  stroke(255);
  text("noise()", 10, 20);
  text("random()", 10, height / 2 + 20);
}

function draw() {
  // --- Línea con noise() (arriba) ---
  let y1 = noise(xoff) * (height / 2); // mitad superior
  point(xpos, y1);

  // --- Línea con random() (abajo) ---
  let y2 = random(height / 2, height); // mitad inferior
  point(xpos, y2);

  // Avanzamos
  xoff += 0.01;
  xpos++;

  // Cuando llegamos al final, reseteamos
  if (xpos >= width) {
    xpos = 0;
    xoff = 0;
    background(0);
    fill(255);
    noStroke();
    textSize(16);
    stroke(255);
    text("noise()", 10, 20);
    text("random()", 10, height / 2 + 20);
  }
}
