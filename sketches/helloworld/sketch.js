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
  // background(150);
  // ellipse(-10,-10,100,100);
  // ellipse(0,0,100,100);
  // fill("#0000FF");
  // fill(255);
  // ellipse(800,800,100,100);
  // noStroke();
  // rect(100,100,100,200);
  // stroke(200,0,100)
  // line(0,800,800,0);
  // strokeWeight(5)
  // triangle(50,30,100,200,400,400);
  fill(255);

  for (let i = -10; i <= width + 10; i = i + 20) {
    for (let j = -10; j <= height + 10; j = j + 20) {
      textSize(20);
      text("⚫", i, j);
    }
  }
  clip(mask1);
  noStroke();
  
  // Responsive coordinates based on canvas size
  let centerX = width * 0.5;
  let centerY = height * 0.5;
  let rectSize = width * 0.5;
  let ellipseSize = width * 0.5;
  
  rect(centerX - rectSize/2, height * 0.125, rectSize, rectSize);
  ellipse(centerX, centerY + height * 0.125, ellipseSize, ellipseSize);
  fill("black");
  rect(centerX - width * 0.0125, height * 0.125, width * 0.025, height * 0.75);
  rect(centerX - rectSize/2, centerY - height * 0.0625, rectSize, height * 0.025);
  textSize(width * 0.1875);
  text("🦄", centerX - rectSize/2, centerY - height * 0.0625);
  rotatedText();
  noFill();
  stroke(24, 33, 150);
}

function mask1() {
  strokeWeight(4);
  circle(width * 0.5, height * 0.45, width / 1.3);
}

function rotatedText() {
  push();
  textSize(width * 0.1875);
  translate(width * 0.75, height * 0.25);
  rotate(PI);
  text("🦄", 0, 0);
  pop();
}
