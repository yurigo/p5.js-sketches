function kochLine(x1, y1, x2, y2, depth) {
  if (depth === 0) {
    line(x1, y1, x2, y2);
    return;
  }
  
  const dx = x2 - x1;
  const dy = y2 - y1;
  
  const xa = x1 + dx / 3;
  const ya = y1 + dy / 3;
  
  const xb = x1 + 2 * dx / 3;
  const yb = y1 + 2 * dy / 3;
  
  const xc = (x1 + x2) / 2 + (dy * sqrt(3)) / 6;
  const yc = (y1 + y2) / 2 - (dx * sqrt(3)) / 6;
  
  kochLine(x1, y1, xa, ya, depth - 1);
  kochLine(xa, ya, xc, yc, depth - 1);
  kochLine(xc, yc, xb, yb, depth - 1);
  kochLine(xb, yb, x2, y2, depth - 1);
}

function setup() {
  const s = min(windowWidth, windowHeight) * 0.9;
  createCanvas(s, s);
  background(45, 52, 54);
  stroke(100, 200, 255);
  strokeWeight(1);
  noFill();
  noLoop();
  
  const centerX = width / 2;
  const centerY = height / 2;
  const radius = width * 0.35;
  
  const x1 = centerX;
  const y1 = centerY - radius;
  const x2 = centerX + radius * cos(PI / 6);
  const y2 = centerY + radius * sin(PI / 6);
  const x3 = centerX - radius * cos(PI / 6);
  const y3 = centerY + radius * sin(PI / 6);
  
  kochLine(x1, y1, x2, y2, 4);
  kochLine(x2, y2, x3, y3, 4);
  kochLine(x3, y3, x1, y1, 4);
}

function windowResized() {
  const s = min(windowWidth, windowHeight) * 0.9;
  resizeCanvas(s, s);
  redraw();
}
