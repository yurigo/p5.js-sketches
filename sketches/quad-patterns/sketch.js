function setup() {
  createCanvas(400, 400);
  noLoop(); // Static sketch demonstrating quad() patterns
}

function draw() {
  background(40, 42, 54);

  // Title
  fill(255);
  textAlign(CENTER);
  textSize(18);
  text("Quadrilateral Patterns with quad()", width / 2, 25);

  textSize(11);
  text(
    "Exploring the quad() function with different shapes and patterns",
    width / 2,
    45
  );

  // Basic quad example (top-left)
  drawBasicQuad();

  // Irregular quad example (top-right)
  drawIrregularQuad();

  // Overlapping quads pattern (bottom-left)
  drawOverlappingQuads();

  // Animated-style quad pattern (bottom-right)
  drawPatternQuads();
}

function drawBasicQuad() {
  // Basic rectangular quad
  fill(255, 121, 198, 150);
  stroke(255, 121, 198);
  strokeWeight(2);

  // quad(x1, y1, x2, y2, x3, y3, x4, y4)
  // Starting from top-left, going clockwise
  quad(60, 90, 140, 90, 140, 140, 60, 140);

  // Labels
  fill(255);
  noStroke();
  textAlign(CENTER);
  textSize(10);
  text("Basic Rectangle", 100, 160);
  text("quad(60,90, 140,90, 140,140, 60,140)", 100, 172);

  // Corner indicators
  fill(255, 80, 80);
  circle(60, 90, 6); // Point 1
  fill(80, 255, 80);
  circle(140, 90, 6); // Point 2
  fill(80, 80, 255);
  circle(140, 140, 6); // Point 3
  fill(255, 255, 80);
  circle(60, 140, 6); // Point 4
}

function drawIrregularQuad() {
  // Irregular quadrilateral
  fill(139, 233, 253, 150);
  stroke(139, 233, 253);
  strokeWeight(2);

  // Irregular shape - parallelogram-like
  quad(260, 100, 340, 85, 340, 140, 260, 155);

  // Labels
  fill(255);
  noStroke();
  textAlign(CENTER);
  textSize(10);
  text("Irregular Quad", 300, 170);
  text("quad(260,100, 340,85, 340,140, 260,155)", 300, 182);

  // Corner indicators with numbers
  fill(255, 80, 80);
  circle(260, 100, 6);
  fill(80, 255, 80);
  circle(340, 85, 6);
  fill(80, 80, 255);
  circle(340, 140, 6);
  fill(255, 255, 80);
  circle(260, 155, 6);

  // Corner numbers
  fill(255);
  textSize(8);
  text("1", 252, 105);
  text("2", 348, 90);
  text("3", 348, 145);
  text("4", 252, 160);
}

function drawOverlappingQuads() {
  // Multiple overlapping quads with transparency
  let colors = [
    [255, 121, 198, 80], // Pink
    [80, 250, 123, 80], // Green
    [189, 147, 249, 80], // Purple
    [255, 184, 108, 80], // Orange
  ];

  strokeWeight(1);

  for (let i = 0; i < 4; i++) {
    fill(colors[i][0], colors[i][1], colors[i][2], colors[i][3]);
    stroke(colors[i][0], colors[i][1], colors[i][2]);

    let offsetX = i * 20;
    let offsetY = i * 15;

    quad(
      60 + offsetX,
      225 + offsetY,
      120 + offsetX,
      220 + offsetY,
      125 + offsetX,
      285 + offsetY,
      65 + offsetX,
      290 + offsetY
    );
  }

  // Labels
  fill(255);
  noStroke();
  textAlign(CENTER);
  textSize(10);
  text("Overlapping Quads", 100, 330);
  text("Using transparency for layered effects", 100, 342);
}

function drawPatternQuads() {
  // Grid of varied quads creating a pattern
  let cols = 3;
  let rows = 3;
  let spacing = 30;
  let startX = 240;
  let startY = 220;

  strokeWeight(1);

  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      let x = startX + i * spacing;
      let y = startY + j * spacing;

      // Vary the quad shape based on position
      let variation = sin((i + j) * 0.5) * 5;
      let hue = map(i + j, 0, cols + rows - 2, 0, 360);

      colorMode(HSB);
      fill(hue, 70, 90, 150);
      stroke(hue, 70, 90);

      // Create varied quad shapes
      quad(
        x + variation,
        y,
        x + 20 - variation,
        y + variation,
        x + 20 + variation,
        y + 20,
        x - variation,
        y + 20 - variation
      );
    }
  }

  colorMode(RGB);

  // Labels
  fill(255);
  noStroke();
  textAlign(CENTER);
  textSize(10);
  text("Pattern Grid", 290, 340);
  text("Mathematical variation in quad shapes", 290, 352);
}
