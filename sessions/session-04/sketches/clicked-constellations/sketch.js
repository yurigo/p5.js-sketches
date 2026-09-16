let stars = [];

function setup() {
  const s = min(windowWidth, windowHeight) * 0.82;
  createCanvas(s, s);
  noStroke();
}

function draw() {
  background(10, 12, 32);

  for (const star of stars) {
    fill(star.color);
    circle(star.x, star.y, star.size);
  }

  if (insideCanvas(mouseX, mouseY)) {
    stroke(255, 220, 120);
    strokeWeight(1.5);
    line(mouseX - 10, mouseY, mouseX + 10, mouseY);
    line(mouseX, mouseY - 10, mouseX, mouseY + 10);
    noFill();
    circle(mouseX, mouseY, 24);
  }

  drawHud();
}

function mouseClicked() {
  if (!insideCanvas(mouseX, mouseY)) {
    return false;
  }

  stars.push({
    x: mouseX,
    y: mouseY,
    size: random(10, 28),
    color: color(random(180, 255), random(180, 255), random(120, 255)),
  });

  if (stars.length > 120) {
    stars.shift();
  }

  return false;
}

function windowResized() {
  const s = min(windowWidth, windowHeight) * 0.82;
  resizeCanvas(s, s);
}

function drawHud() {
  noStroke();
  fill(10, 12, 32, 220);
  rect(16, 16, width - 32, 64, 8);

  fill(245);
  textSize(15);
  text("Haz clic para añadir estrellas", 28, 40);
  text(`mouseX: ${int(mouseX)} · mouseY: ${int(mouseY)} · total: ${stars.length}`, 28, 62);
}

function insideCanvas(x, y) {
  return x >= 0 && x <= width && y >= 0 && y <= height;
}
