function drawCircles(x, y, radius, depth) {
  if (depth === 0 || radius < 2) {
    return;
  }
  
  const offset = sin(frameCount * 0.02 + depth) * 20;
  
  push();
  const hue = (frameCount + depth * 30) % 360;
  stroke(hue, 80, 90);
  strokeWeight(map(depth, 0, 6, 0.5, 2));
  noFill();
  circle(x, y, radius * 2);
  pop();
  
  const angle = frameCount * 0.01;
  const numCircles = 6;
  
  for (let i = 0; i < numCircles; i++) {
    const a = (TWO_PI / numCircles) * i + angle;
    const newRadius = radius * 0.5;
    const newX = x + cos(a) * (radius - newRadius + offset);
    const newY = y + sin(a) * (radius - newRadius + offset);
    
    drawCircles(newX, newY, newRadius, depth - 1);
  }
}

function setup() {
  const s = min(windowWidth, windowHeight) * 0.9;
  createCanvas(s, s);
  colorMode(HSB, 360, 100, 100);
}

function windowResized() {
  const s = min(windowWidth, windowHeight) * 0.9;
  resizeCanvas(s, s);
}

function draw() {
  background(45, 52, 54, 30);
  translate(width / 2, height / 2);
  drawCircles(0, 0, width * 0.25, 5);
}
