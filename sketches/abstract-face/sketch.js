function setup() {
  const s = min(windowWidth, windowHeight) * 0.9;
  createCanvas(s, s);
  background(45, 52, 54);
}

function windowResized() {
  const s = min(windowWidth, windowHeight) * 0.9;
  resizeCanvas(s, s);
  redraw();
}

function draw() {
  background(45, 52, 54);

  let time = millis() * 0.001;

  // Face outline - organic shape
  drawFaceOutline(time);

  // Eyes - geometric and expressive
  drawEyes(time);

  // Nose - abstract line
  drawNose(time);

  // Mouth - dynamic curve
  drawMouth(time);

  // Hair/head decoration
  drawHair(time);

  // Facial features overlay
  drawFacialTextures(time);
}

function drawFaceOutline(time) {
  push();
  translate(width / 2, height / 2 + 20);

  stroke(240, 200, 170);
  strokeWeight(6);
  fill(255, 220, 190, 100);

  // Organic face shape using bezier curves
  beginShape();
  let points = 16;
  for (let i = 0; i <= points; i++) {
    let angle = map(i, 0, points, 0, TWO_PI);
    let radius =
      120 + sin(angle * 3 + time) * 20 + cos(angle * 5 + time * 0.7) * 10;
    let x = cos(angle) * radius;
    let y = sin(angle) * radius * 1.2; // Slightly elongated
    vertex(x, y);
  }
  endShape(CLOSE);
  pop();
}

function drawEyes(time) {
  // Left eye - geometric (responsive positioning)
  push();
  translate(width * 0.3, height * 0.45);
  rotate(sin(time * 0.5) * 0.1);

  fill(100, 150, 255);
  stroke(50);
  strokeWeight(3);
  ellipse(0, 0, width * 0.2, height * 0.15);

  // Pupil
  fill(20);
  ellipse(sin(time) * width * 0.025, cos(time * 0.7) * height * 0.0125, width * 0.0625, width * 0.0625);

  // Highlight
  fill(255);
  ellipse(width * 0.0125, -height * 0.02, width * 0.02, width * 0.02);
  pop();

  // Right eye - triangular (responsive positioning)
  push();
  translate(width * 0.7, height * 0.45);
  rotate(-sin(time * 0.3) * 0.1);

  fill(255, 150, 100);
  stroke(50);
  strokeWeight(3);
  triangle(-width * 0.1, height * 0.075, width * 0.1, height * 0.075, 0, -height * 0.075);

  // Pupil
  fill(20);
  circle(sin(time * 1.2) * width * 0.02, cos(time * 0.9) * height * 0.015, width * 0.05);
  pop();
}

function drawNose(time) {
  stroke(200, 180, 160);
  strokeWeight(4);

  let noseX = width / 2 + sin(time * 0.2) * 5;
  let noseY = height * 0.625; // Responsive Y position

  // Abstract nose as flowing line (responsive sizing)
  noFill();
  beginShape();
  curveVertex(noseX - width * 0.05, noseY - height * 0.1);
  curveVertex(noseX, noseY - height * 0.05);
  curveVertex(noseX + sin(time) * width * 0.025, noseY);
  curveVertex(noseX - width * 0.025, noseY + height * 0.05);
  curveVertex(noseX + width * 0.0375, noseY + height * 0.075);
  endShape();
}

function drawMouth(time) {
  push();
  translate(width / 2, height * 0.8); // Responsive Y position

  stroke(200, 100, 120);
  strokeWeight(8);
  noFill();

  // Dynamic mouth expression (responsive sizing)
  let mouthWidth = width * 0.25 + sin(time * 0.8) * width * 0.05;
  let mouthCurve = sin(time * 0.5) * height * 0.075;

  bezier(
    -mouthWidth / 2,
    0,
    -mouthWidth / 4,
    mouthCurve,
    mouthWidth / 4,
    mouthCurve,
    mouthWidth / 2,
    0
  );
  pop();
}

function drawHair(time) {
  stroke(80, 60, 40);
  strokeWeight(3);

  // Hair strands around the head (responsive positioning and sizing)
  for (let i = 0; i < 20; i++) {
    let angle = map(i, 0, 20, -PI, 0);
    let x = width / 2 + cos(angle) * width * 0.625;
    let y = height / 2 + sin(angle) * height * 0.5 + height * 0.125;

    let hairLength = width * 0.125 + sin(time * 0.3 + i) * width * 0.05;
    let endX =
      x + cos(angle + PI / 2 + sin(time + i)) * hairLength;
    let endY =
      y + sin(angle + PI / 2 + sin(time + i)) * hairLength;

    line(x, y, endX, endY);
  }
}

function drawFacialTextures(time) {
  // Abstract facial texture dots (responsive positioning and sizing)
  fill(255, 200, 150, 80);
  noStroke();

  for (let i = 0; i < 30; i++) {
    let x = width / 2 + random(-width * 0.375, width * 0.375) + sin(time + i) * width * 0.025;
    let y = height / 2 + random(-height * 0.25, height * 0.25) + cos(time * 0.7 + i) * height * 0.02;
    let size = random(width * 0.005, width * 0.02) + sin(time * 2 + i) * width * 0.005;

    circle(x, y, size);
  }
}
