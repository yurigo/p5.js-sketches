function setup() {
  const s = min(windowWidth, windowHeight) * 0.9;
  createCanvas(s, s);
  noLoop();
}

function windowResized() {
  const s = min(windowWidth, windowHeight) * 0.9;
  resizeCanvas(s, s);
  redraw();
}

function draw() {
  // Sky gradient
  drawSky();

  // Mountain layers
  drawMountains();

  // Sun/Moon
  drawSun();

  // Clouds
  drawClouds();

  // Trees
  drawTrees();

  // Ground
  drawGround();
}

function drawSky() {
  // Gradient from light blue to soft pink
  for (let y = 0; y < height; y++) {
    let alpha = map(y, 0, height, 0, 1);
    let skyColor = lerpColor(color(173, 216, 230), color(255, 218, 185), alpha);
    stroke(skyColor);
    line(0, y, width, y);
  }
}

function drawSun() {
  // Simple sun circle
  fill(255, 223, 186);
  noStroke();
  circle(325, 75, 60);

  // Sun rays (minimal lines)
  stroke(255, 223, 186, 150);
  strokeWeight(1);
  for (let i = 0; i < 8; i++) {
    let angle = (i * PI) / 4;
    let x1 = 325 + cos(angle) * 40;
    let y1 = 75 + sin(angle) * 40;
    let x2 = 325 + cos(angle) * 50;
    let y2 = 75 + sin(angle) * 50;
    line(x1, y1, x2, y2);
  }
}

function drawMountains() {
  // Back mountains (light)
  fill(180, 200, 220, 180);
  noStroke();
  triangle(0, 200, 150, 100, 250, 200);
  triangle(100, 200, 225, 90, 350, 200);

  // Middle mountains (medium)
  fill(140, 170, 200, 200);
  triangle(0, 250, 100, 150, 200, 250);
  triangle(150, 250, 275, 125, 400, 250);

  // Front mountains (dark)
  fill(100, 130, 160);
  triangle(0, 300, 75, 225, 150, 300);
  triangle(250, 300, 350, 200, 400, 300);
}

function drawClouds() {
  fill(255, 255, 255, 200);
  noStroke();

  // Simple cloud shapes
  ellipse(100, 60, 40, 20);
  ellipse(115, 55, 30, 18);
  ellipse(90, 55, 25, 15);

  ellipse(250, 90, 50, 25);
  ellipse(270, 85, 35, 20);
  ellipse(235, 85, 30, 18);
}

function drawTrees() {
  stroke(101, 67, 33);
  strokeWeight(4);

  // Tree trunks
  line(75, 275, 75, 325);
  line(340, 290, 340, 340);
  line(200, 285, 200, 335);

  // Tree foliage (simple circles)
  fill(76, 153, 76);
  noStroke();
  circle(75, 265, 40);
  circle(340, 280, 50);
  circle(200, 275, 45);

  // Smaller trees
  stroke(101, 67, 33);
  strokeWeight(2);
  line(150, 300, 150, 325);
  line(275, 310, 275, 335);

  fill(76, 153, 76);
  noStroke();
  circle(150, 295, 25);
  circle(275, 305, 30);
}

function drawGround() {
  // Simple ground plane
  fill(139, 169, 101);
  noStroke();
  rect(0, 325, width, 75);

  // Grass details (minimal lines)
  stroke(76, 153, 76);
  strokeWeight(1);
  for (let x = 25; x < width; x += 15) {
    let grassHeight = random(5, 12);
    line(x, 325, x, 325 - grassHeight);
    line(x + 5, 325, x + 5, 325 - random(4, 10));
  }

  // Path
  fill(200, 180, 140);
  noStroke();
  quad(175, 325, 225, 325, 250, height, 150, height);
}
