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

    // Calculate control points with animation - now responsive
    let x1 = width * 0.125 + sin(time + offset) * width * 0.0625;
    let y1 = height * 0.2 + i * height * 0.1375;

    let cx1 = width * 0.25 + cos(time * 0.7 + offset) * width * 0.125;
    let cy1 = height * 0.25 + sin(time * 0.5 + offset) * height * 0.1;

    let cx2 = width * 0.75 + cos(time * 0.3 + offset) * width * 0.15;
    let cy2 = height * 0.375 + sin(time * 0.8 + offset) * height * 0.075;

    let x2 = width * 0.875 + sin(time * 1.2 + offset) * width * 0.0375;
    let y2 = height * 0.25 + i * height * 0.1375;

    // Color gradient based on curve index
    let r = map(i, 0, 4, 255, 100);
    let g = map(i, 0, 4, 100, 255);
    let b = map(i, 0, 4, 150, 200);

    stroke(r, g, b, 180);
    noFill();

    // Draw bezier curve
    bezier(x1, y1, cx1, cy1, cx2, cy2, x2, y2);

    // Draw control points - responsive size
    fill(r, g, b, 120);
    noStroke();
    let pointSize = width * 0.02;
    circle(cx1, cy1, pointSize);
    circle(cx2, cy2, pointSize);

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
  textSize(width * 0.045);
  text("Animated Bezier Curves", width / 2, height * 0.0875);
}
