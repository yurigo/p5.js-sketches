function drawNGon(x, y, radius, n, depth) {
  if (depth === 0 || radius < 2) {
    return;
  }
  
  const angleStep = TWO_PI / n;
  
  beginShape();
  for (let i = 0; i < n; i++) {
    const angle = i * angleStep - HALF_PI;
    const px = x + cos(angle) * radius;
    const py = y + sin(angle) * radius;
    vertex(px, py);
  }
  endShape(CLOSE);
  
  for (let i = 0; i < n; i++) {
    const angle = i * angleStep - HALF_PI;
    const px = x + cos(angle) * radius;
    const py = y + sin(angle) * radius;
    
    push();
    const hue = map(depth, 0, 5, 180, 300);
    stroke(hue, 80, 90);
    drawNGon(px, py, radius * 0.4, n, depth - 1);
    pop();
  }
}

function setup() {
  const s = min(windowWidth, windowHeight) * 0.9;
  createCanvas(s, s);
  background(45, 52, 54);
  colorMode(HSB, 360, 100, 100);
  stroke(200, 80, 90);
  strokeWeight(1);
  noFill();
  noLoop();
  
  drawNGon(width / 2, height / 2, width * 0.35, 6, 5);
}

function windowResized() {
  const s = min(windowWidth, windowHeight) * 0.9;
  resizeCanvas(s, s);
  redraw();
}
