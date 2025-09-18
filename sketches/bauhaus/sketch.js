// Bauhaus color palette
const RED = [220, 50, 47];
const BLUE = [38, 139, 210];
const YELLOW = [255, 213, 0];
const BLACK = [0, 0, 0];
const WHITE = [255, 255, 255];

function setup() {
  createCanvas(800, 800);
  background(255);
  noLoop();
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
  circle(600, 250, 180);
  
  // Yellow triangle
  fill(YELLOW[0], YELLOW[1], YELLOW[2]);
  triangle(400, 100, 350, 200, 450, 200);
  
  // Black geometric shapes
  fill(BLACK[0], BLACK[1], BLACK[2]);
  rect(100, 400, 150, 40);
  rect(200, 500, 40, 120);
  
  // White rectangle with black border
  stroke(BLACK[0], BLACK[1], BLACK[2]);
  strokeWeight(4);
  fill(WHITE[0], WHITE[1], WHITE[2]);
  rect(450, 450, 200, 150);
  
  // Small red circles
  noStroke();
  fill(RED[0], RED[1], RED[2]);
  circle(150, 550, 30);
  circle(320, 480, 25);
  
  // Blue rectangles
  fill(BLUE[0], BLUE[1], BLUE[2]);
  rect(600, 400, 120, 30);
  rect(650, 500, 30, 80);
  
  // Diagonal lines
  stroke(BLACK[0], BLACK[1], BLACK[2]);
  strokeWeight(6);
  line(350, 350, 500, 400);
  line(100, 650, 300, 600);
  
  strokeWeight(2);
  line(550, 150, 700, 300);
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
  textSize(48);
  textStyle(BOLD);
  text("BAUHAUS", 50, 80);
  
  // Subtitle
  textSize(16);
  textStyle(NORMAL);
  fill(RED[0], RED[1], RED[2]);
  text("FORM FOLLOWS FUNCTION", 50, 720);
  
  // Geometric text arrangement
  textAlign(CENTER);
  textSize(24);
  fill(BLUE[0], BLUE[1], BLUE[2]);
  push();
  translate(600, 600);
  rotate(PI/4);
  text("DESIGN", 0, 0);
  pop();
}