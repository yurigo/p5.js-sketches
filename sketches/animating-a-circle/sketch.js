let medioX = 0;
let medioY = 0;
let diametro = 0;
let velocidad = 4;

function setup() {
  const s = min(windowWidth, windowHeight) * 0.9;
  createCanvas(s, s);
  angleMode(DEGREES);
  noStroke();
}

function windowResized() {
  const s = min(windowWidth, windowHeight) * 0.9;
  resizeCanvas(s, s);
  redraw();
}

function draw() {
  // background(50, 50, 50, 20);
  noStroke();
  fill(50, 50, 50, 20);
  rect(0, 0, width, height);

  medioX = width / 2;
  medioY = height / 2;
  diametro = width / 4;
  borde = width / 20;

  // fill("blue")
  // ellipse(
  // medioX + diametro * sin(frameCount * velocidad),
  // medioY + diametro * cos(frameCount * velocidad) , 50, 50);

  stroke("yellowgreen");
  strokeWeight(borde);

  line(
    medioX + diametro * sin((frameCount - 1) * velocidad),
    medioY + diametro * cos((frameCount - 1) * velocidad),
    medioX + diametro * sin(frameCount * velocidad),
    medioY + diametro * cos(frameCount * velocidad)
  );
}

function mouseWheel(event) {
  velocidad += event.delta / 100;
  velocidad = constrain(velocidad, 0.1, 600);
  console.log(velocidad);
}
