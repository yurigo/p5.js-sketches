function setup() {
  const s = min(windowWidth, windowHeight) * 0.9;
  createCanvas(s, s);
  background(20, 30, 40);
  strokeWeight(3);
}

function windowResized() {
  const s = min(windowWidth, windowHeight) * 0.9;
  resizeCanvas(s, s);
  redraw();
}

function draw() {
  background(20, 30, 40);

  // Draw animated bezier curves
  let time = millis() * 0.001;

  // Multiple flowing bezier curves
  for (let i = 0; i < 5; i++) {
    let offset = i * 0.3;

    // Calculate control points with animation
    let x1 = 50 + sin(time + offset) * 25;
    let y1 = 80 + i * 55;

    let cx1 = 100 + cos(time * 0.7 + offset) * 50;
    let cy1 = 100 + sin(time * 0.5 + offset) * 40;

    let cx2 = 300 + cos(time * 0.3 + offset) * 60;
    let cy2 = 150 + sin(time * 0.8 + offset) * 30;

    let x2 = 350 + sin(time * 1.2 + offset) * 15;
    let y2 = 100 + i * 55;

    // Color gradient based on curve index
    let r = map(i, 0, 4, 255, 100);
    let g = map(i, 0, 4, 100, 255);
    let b = map(i, 0, 4, 150, 200);

    stroke(r, g, b, 180);
    noFill();

    // Draw bezier curve
    bezier(x1, y1, cx1, cy1, cx2, cy2, x2, y2);

    // Draw control points
    fill(r, g, b, 120);
    noStroke();
    circle(cx1, cy1, 8);
    circle(cx2, cy2, 8);

    // Draw guide lines to control points
    stroke(r, g, b, 60);
    strokeWeight(1);
    line(x1, y1, cx1, cy1);
    line(cx2, cy2, x2, y2);

    strokeWeight(3);
  }

  // Draw title
  fill(255);
  textAlign(CENTER);
  textSize(18);
  text("Animated Bezier Curves", width / 2, 35);
}
