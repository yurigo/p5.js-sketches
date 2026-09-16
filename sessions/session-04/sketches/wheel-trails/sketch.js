let brushSize = 6;
let hueValue = 40;

function setup() {
  const s = min(windowWidth, windowHeight) * 0.82;
  createCanvas(s, s);
  colorMode(HSB, 360, 100, 100, 100);
  background(230, 40, 12);
}

function draw() {
  fill(230, 35, 10, 8);
  noStroke();
  rect(0, 0, width, height);

  if (insideCanvas(mouseX, mouseY) && insideCanvas(pmouseX, pmouseY)) {
    stroke(hueValue, 80, 100, 80);
    strokeWeight(brushSize);
    line(pmouseX, pmouseY, mouseX, mouseY);
  }

  drawHud();
}

function mouseWheel(event) {
  brushSize = constrain(brushSize + event.delta / 160, 1, 36);
  hueValue = (hueValue + event.delta / 8 + 360) % 360;
  return false;
}

function windowResized() {
  const s = min(windowWidth, windowHeight) * 0.82;
  resizeCanvas(s, s);
  background(230, 40, 12);
}

function drawHud() {
  noStroke();
  fill(230, 40, 12, 90);
  rect(16, 16, width - 32, 84, 8);

  fill(0, 0, 100);
  textSize(15);
  text("Mueve el ratón para dibujar · usa la rueda para cambiar el pincel", 28, 40);
  text(`mouseX: ${int(mouseX)} · mouseY: ${int(mouseY)}`, 28, 62);
  text(`pmouseX: ${int(pmouseX)} · pmouseY: ${int(pmouseY)} · grosor: ${nf(brushSize, 1, 1)}`, 28, 84);
}

function insideCanvas(x, y) {
  return x >= 0 && x <= width && y >= 0 && y <= height;
}
