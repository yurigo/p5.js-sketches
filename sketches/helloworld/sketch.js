function setup() {
  createCanvas(400, 400);
  noLoop();
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

  for (let i = -10; i <= width + 10; i = i + 20) {
    for (let j = -10; j <= height + 10; j = j + 20) {
      textSize(20);
      text("⚫", i, j);
    }
  }
  clip(mask1);
  noStroke();
  rect(100, 50, 200, 200);
  ellipse(200, 250, 200, 200);
  fill("black");
  rect(200 - 5, 50, 10, 300);
  rect(100, 175, 200, 10);
  textSize(75);
  text("🦄", 100, 150);
  rotatedText();
  noFill();
  stroke(24, 33, 150);
}

function mask1() {
  strokeWeight(4);
  circle(200, 180, width / 1.3);
}

function rotatedText() {
  push();
  textSize(75);
  translate(300, 100);
  rotate(PI);
  text("🦄", 0, 0);
  pop();
}
