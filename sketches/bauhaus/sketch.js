// Bauhaus color palette
const RED = [220, 50, 47];
const BLUE = [38, 139, 210];
const YELLOW = [255, 213, 0];
const BLACK = [0, 0, 0];
const WHITE = [255, 255, 255];

function setup() {
  const s = min(windowWidth, windowHeight) * 0.9;
  createCanvas(s, s);
  background(255);
  noLoop();
}

function windowResized() {
  const s = min(windowWidth, windowHeight) * 0.9;
  resizeCanvas(s, s);
  redraw();
}

function draw() {
  background(255);

  // Main geometric composition
  drawBauhausComposition();

  // Grid overlay
  drawGrid();

  // Typography element
  drawTypography();
}

function drawBauhausComposition() {
  // Large red rectangle
  fill(RED[0], RED[1], RED[2]);
  noStroke();
  rect(50, 150, 300, 200);

  // Blue circle
  fill(BLUE[0], BLUE[1], BLUE[2]);
  circle(300, 125, 90);

  // Yellow triangle
  fill(YELLOW[0], YELLOW[1], YELLOW[2]);
  triangle(200, 50, 175, 100, 225, 100);

  // Black geometric shapes
  fill(BLACK[0], BLACK[1], BLACK[2]);
  rect(50, 200, 75, 20);
  rect(100, 250, 20, 60);

  // White rectangle with black border
  stroke(BLACK[0], BLACK[1], BLACK[2]);
  strokeWeight(2);
  fill(WHITE[0], WHITE[1], WHITE[2]);
  rect(225, 225, 100, 75);

  // Small red circles
  noStroke();
  fill(RED[0], RED[1], RED[2]);
  circle(75, 275, 15);
  circle(160, 240, 12);

  // Blue rectangles
  fill(BLUE[0], BLUE[1], BLUE[2]);
  rect(300, 200, 60, 15);
  rect(325, 250, 15, 40);

  // Diagonal lines
  stroke(BLACK[0], BLACK[1], BLACK[2]);
  strokeWeight(3);
  line(175, 175, 250, 200);
  line(50, 325, 150, 300);

  strokeWeight(1);
  line(275, 75, 350, 150);
}

function drawGrid() {
  stroke(0, 0, 0, 30);
  strokeWeight(1);

  // Vertical lines
  for (let x = 0; x <= width; x += 50) {
    line(x, 0, x, height);
  }

  // Horizontal lines
  for (let y = 0; y <= height; y += 50) {
    line(0, y, width, y);
  }
}

function drawTypography() {
  // Title in Bauhaus style
  fill(BLACK[0], BLACK[1], BLACK[2]);
  textAlign(LEFT);
  textSize(24);
  textStyle(BOLD);
  text("BAUHAUS", 25, 40);

  // Subtitle
  textSize(12);
  textStyle(NORMAL);
  fill(RED[0], RED[1], RED[2]);
  text("FORM FOLLOWS FUNCTION", 25, 380);

  // Geometric text arrangement
  textAlign(CENTER);
  textSize(24);
  fill(BLUE[0], BLUE[1], BLUE[2]);
  push();
  translate(600, 600);
  rotate(PI / 4);
  text("DESIGN", 0, 0);
  pop();
}
