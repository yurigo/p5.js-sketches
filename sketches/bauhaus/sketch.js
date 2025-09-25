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
  // Large red rectangle - responsive positioning
  fill(RED[0], RED[1], RED[2]);
  noStroke();
  rect(width * 0.125, height * 0.375, width * 0.75, height * 0.5);

  // Blue circle - responsive positioning and size
  fill(BLUE[0], BLUE[1], BLUE[2]);
  circle(width * 0.75, height * 0.3125, width * 0.225);

  // Yellow triangle - responsive positioning
  fill(YELLOW[0], YELLOW[1], YELLOW[2]);
  triangle(width * 0.5, height * 0.125, width * 0.4375, height * 0.25, width * 0.5625, height * 0.25);

  // Black geometric shapes - responsive positioning and sizing
  fill(BLACK[0], BLACK[1], BLACK[2]);
  rect(width * 0.125, height * 0.5, width * 0.1875, height * 0.05);
  rect(width * 0.25, height * 0.625, width * 0.05, height * 0.15);

  // White rectangle with black border - responsive
  stroke(BLACK[0], BLACK[1], BLACK[2]);
  strokeWeight(2);
  fill(WHITE[0], WHITE[1], WHITE[2]);
  rect(width * 0.5625, height * 0.5625, width * 0.25, height * 0.1875);

  // Small red circles - responsive positioning and sizing
  noStroke();
  fill(RED[0], RED[1], RED[2]);
  circle(width * 0.1875, height * 0.6875, width * 0.0375);
  circle(width * 0.4, height * 0.6, width * 0.03);

  // Blue rectangles - responsive
  fill(BLUE[0], BLUE[1], BLUE[2]);
  rect(width * 0.75, height * 0.5, width * 0.15, height * 0.0375);
  rect(width * 0.8125, height * 0.625, width * 0.0375, height * 0.1);

  // Diagonal lines - responsive positioning
  stroke(BLACK[0], BLACK[1], BLACK[2]);
  strokeWeight(3);
  line(width * 0.4375, height * 0.4375, width * 0.625, height * 0.5);
  line(width * 0.125, height * 0.8125, width * 0.375, height * 0.75);

  strokeWeight(1);
  line(width * 0.6875, height * 0.1875, width * 0.875, height * 0.375);
}

function drawGrid() {
  stroke(0, 0, 0, 30);
  strokeWeight(1);

  // Responsive grid spacing
  let gridSpacing = width * 0.125;

  // Vertical lines
  for (let x = 0; x <= width; x += gridSpacing) {
    line(x, 0, x, height);
  }

  // Horizontal lines
  for (let y = 0; y <= height; y += gridSpacing) {
    line(0, y, width, y);
  }
}

function drawTypography() {
  // Title in Bauhaus style - responsive sizing and positioning
  fill(BLACK[0], BLACK[1], BLACK[2]);
  textAlign(LEFT);
  textSize(width * 0.06);
  textStyle(BOLD);
  text("BAUHAUS", width * 0.0625, height * 0.1);

  // Subtitle - responsive
  textSize(width * 0.03);
  textStyle(NORMAL);
  fill(RED[0], RED[1], RED[2]);
  text("FORM FOLLOWS FUNCTION", width * 0.0625, height * 0.95);

  // Geometric text arrangement - responsive
  textAlign(CENTER);
  textSize(width * 0.06);
  fill(BLUE[0], BLUE[1], BLUE[2]);
  push();
  translate(width * 0.875, height * 0.875);
  rotate(PI / 4);
  text("DESIGN", 0, 0);
  pop();
}
