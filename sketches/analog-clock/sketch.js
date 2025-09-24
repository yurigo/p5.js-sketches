function setup() {
  createCanvas(400, 400);
  // Animation needed to update the clock in real-time
}

function draw() {
  background(15, 15, 35);

  // Title
  fill(255);
  // textAlign(CENTER);
  // textSize(width * 0.06); // Responsive title size
  // text("Analog Clock", width / 2, height * 0.12);

  // Move origin to center of the canvas
  translate(width / 2, height / 2);

  // Get current time
  let h = hour();
  let m = minute();
  let s = second();

  // Draw clock face
  drawClockFace();

  // Draw numbers 1-12
  drawNumbers();

  // Calculate angles for hands (in radians)
  // Subtract PI/2 to start from 12 o'clock position
  let secondAngle = map(s, 0, 60, 0, TWO_PI) - PI / 2;
  let minuteAngle = map(m + s / 60, 0, 60, 0, TWO_PI) - PI / 2;
  let hourAngle = map((h % 12) + m / 60, 0, 12, 0, TWO_PI) - PI / 2;

  // Draw clock hands (responsive sizing)
  let clockRadius = min(width, height) * 0.4;
  drawHand(hourAngle, clockRadius * 0.5, 8, color(255, 100, 100)); // Hour hand - red, short, thick
  drawHand(minuteAngle, clockRadius * 0.75, 5, color(100, 255, 100)); // Minute hand - green, medium
  drawHand(secondAngle, clockRadius * 0.85, 2, color(100, 100, 255)); // Second hand - blue, long, thin

  // Draw center dot
  fill(255, 200, 100);
  noStroke();
  circle(0, 0, 20);
}

function drawClockFace() {
  let clockRadius = min(width, height) * 0.4; // 40% of canvas size

  // Outer circle
  stroke(255);
  strokeWeight(4);
  noFill();
  circle(0, 0, clockRadius * 2);

  // Hour marks
  strokeWeight(6);
  for (let i = 0; i < 12; i++) {
    let angle = map(i, 0, 12, 0, TWO_PI) - PI / 2;
    let x1 = cos(angle) * clockRadius * 0.93;
    let y1 = sin(angle) * clockRadius * 0.93;
    let x2 = cos(angle) * clockRadius * 0.87;
    let y2 = sin(angle) * clockRadius * 0.87;
    line(x1, y1, x2, y2);
  }

  // Minute marks
  strokeWeight(2);
  for (let i = 0; i < 60; i++) {
    if (i % 5 !== 0) {
      // Skip hour positions
      let angle = map(i, 0, 60, 0, TWO_PI) - PI / 2;
      let x1 = cos(angle) * clockRadius * 0.93;
      let y1 = sin(angle) * clockRadius * 0.93;
      let x2 = cos(angle) * clockRadius * 0.9;
      let y2 = sin(angle) * clockRadius * 0.9;
      line(x1, y1, x2, y2);
    }
  }
}

function drawNumbers() {
  let clockRadius = min(width, height) * 0.4;

  fill(255);
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(clockRadius * 0.2); // Responsive text size

  for (let i = 1; i <= 12; i++) {
    let angle = map(i, 0, 12, 0, TWO_PI) - PI / 2;
    let x = cos(angle) * clockRadius * 0.77;
    let y = sin(angle) * clockRadius * 0.77;
    text(i, x, y);
  }
}

function drawHand(angle, length, weight, handColor) {
  push();
  stroke(handColor);
  strokeWeight(weight);
  strokeCap(ROUND);

  // Calculate end position
  let x = cos(angle) * length;
  let y = sin(angle) * length;

  line(0, 0, x, y);
  pop();
}
