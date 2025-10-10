function setup() {
  const s = min(windowWidth, windowHeight) * 0.9;
  createCanvas(s, s);

  angleMode(DEGREES);
  noLoop();
}

function windowResized() {
  const s = min(windowWidth, windowHeight) * 0.9;
  resizeCanvas(s, s);
  redraw();
}

function draw() {
  const medioX = width / 2;
  const medioY = height / 2;

  const diametro = width / 4;
  const borde = width / 20;

  noStroke();

  for (let i = 0; i < 360; i++) {
    ellipse(
      medioX + diametro * sin(i),
      medioY + diametro * cos(i),
      borde,
      borde
    );
  }
}
