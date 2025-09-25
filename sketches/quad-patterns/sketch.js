function setup() {
  // Responsive square canvas (90% of the smaller window dimension)
  const s = min(windowWidth, windowHeight) * 0.9;
  createCanvas(s, s);
  noLoop(); // Static sketch demonstrating quad() patterns
}

function windowResized() {
  // Recalculate size at 80% for a bit more margin on resize
  const s = min(windowWidth, windowHeight) * 0.9;
  resizeCanvas(s, s);
  redraw(); // In case noLoop() was removed later, keep consistency
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
  // Basic rectangular quad - responsive positioning and sizing
  fill(255, 121, 198, 150);
  stroke(255, 121, 198);
  strokeWeight(2);

  // Responsive coordinates based on canvas size
  let quadLeft = width * 0.15;
  let quadTop = height * 0.225;
  let quadRight = width * 0.35;
  let quadBottom = height * 0.35;

  // quad(x1, y1, x2, y2, x3, y3, x4, y4)
  // Starting from top-left, going clockwise
  quad(quadLeft, quadTop, quadRight, quadTop, quadRight, quadBottom, quadLeft, quadBottom);

  // Labels - responsive sizing and positioning
  fill(255);
  noStroke();
  textAlign(CENTER);
  textSize(width * 0.025);
  text("Basic Rectangle", width * 0.25, height * 0.4);
  textSize(width * 0.02);
  text("quad() function - clockwise points", width * 0.25, height * 0.43);

  // Corner indicators - responsive sizing
  let indicatorSize = width * 0.015;
  fill(255, 80, 80);
  circle(quadLeft, quadTop, indicatorSize); // Point 1
  fill(80, 255, 80);
  circle(quadRight, quadTop, indicatorSize); // Point 2
  fill(80, 80, 255);
  circle(quadRight, quadBottom, indicatorSize); // Point 3
  fill(255, 255, 80);
  circle(quadLeft, quadBottom, indicatorSize); // Point 4
}

function drawIrregularQuad() {
  // Irregular quadrilateral - responsive positioning and sizing
  fill(139, 233, 253, 150);
  stroke(139, 233, 253);
  strokeWeight(2);

  // Responsive coordinates for irregular shape - parallelogram-like
  let x1 = width * 0.65;
  let y1 = height * 0.25;
  let x2 = width * 0.85;
  let y2 = height * 0.2125;
  let x3 = width * 0.85;
  let y3 = height * 0.35;
  let x4 = width * 0.65;
  let y4 = height * 0.3875;

  quad(x1, y1, x2, y2, x3, y3, x4, y4);

  // Labels - responsive
  fill(255);
  noStroke();
  textAlign(CENTER);
  textSize(width * 0.025);
  text("Irregular Quad", width * 0.75, height * 0.425);
  textSize(width * 0.02);
  text("Non-rectangular quadrilateral", width * 0.75, height * 0.455);

  // Corner indicators with responsive sizing
  let indicatorSize = width * 0.015;
  fill(255, 80, 80);
  circle(x1, y1, indicatorSize);
  fill(80, 255, 80);
  circle(x2, y2, indicatorSize);
  fill(80, 80, 255);
  circle(x3, y3, indicatorSize);
  fill(255, 255, 80);
  circle(x4, y4, indicatorSize);

  // Corner numbers - responsive
  fill(255);
  textAlign(CENTER);
  textSize(width * 0.02);
  text("1", x1 - width * 0.025, y1 - width * 0.02);
  text("2", x2 + width * 0.025, y2 - width * 0.02);
  text("3", x3 + width * 0.025, y3 + width * 0.03);
  text("4", x4 - width * 0.025, y4 + width * 0.03);
}

function drawOverlappingQuads() {
  // Multiple overlapping quads with transparency - responsive
  let colors = [
    [255, 121, 198, 80], // Pink
    [80, 250, 123, 80], // Green
    [189, 147, 249, 80], // Purple
    [255, 184, 108, 80], // Orange
  ];

  strokeWeight(1);

  // Base coordinates - responsive
  let baseX = width * 0.15;
  let baseY = height * 0.5625;
  let offsetStep = width * 0.05;
  let offsetStepY = height * 0.0375;

  for (let i = 0; i < 4; i++) {
    fill(colors[i][0], colors[i][1], colors[i][2], colors[i][3]);
    stroke(colors[i][0], colors[i][1], colors[i][2]);

    let offsetX = i * offsetStep;
    let offsetY = i * offsetStepY;

    // Responsive quad coordinates
    quad(
      baseX + offsetX,
      baseY + offsetY,
      baseX + width * 0.15 + offsetX,
      baseY - height * 0.0125 + offsetY,
      baseX + width * 0.1625 + offsetX,
      baseY + height * 0.15 + offsetY,
      baseX + width * 0.0125 + offsetX,
      baseY + height * 0.1625 + offsetY
    );
  }

  // Labels - responsive
  fill(255);
  noStroke();
  textAlign(CENTER);
  textSize(width * 0.025);
  text("Overlapping Quads", width * 0.25, height * 0.825);
  textSize(width * 0.02);
  text("Using transparency for layered effects", width * 0.25, height * 0.855);
}

function drawPatternQuads() {
  // Grid of varied quads creating a pattern - responsive
  let cols = 3;
  let rows = 3;
  let spacing = width * 0.075; // Responsive spacing
  let startX = width * 0.6; // Responsive start position
  let startY = height * 0.55; // Responsive start position

  strokeWeight(1);

  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      let x = startX + i * spacing;
      let y = startY + j * spacing;

      // Vary the quad shape based on position
      let variation = sin((i + j) * 0.5) * width * 0.0125; // Responsive variation
      let hue = map(i + j, 0, cols + rows - 2, 0, 360);

      colorMode(HSB);
      fill(hue, 70, 90, 150);
      stroke(hue, 70, 90);

      // Create varied quad shapes - responsive sizing
      let quadSize = width * 0.05;
      quad(
        x + variation,
        y,
        x + quadSize - variation,
        y + variation,
        x + quadSize + variation,
        y + quadSize,
        x - variation,
        y + quadSize - variation
      );
    }
  }

  colorMode(RGB);

  // Labels - responsive
  fill(255);
  noStroke();
  textAlign(CENTER);
  textSize(width * 0.025);
  text("Pattern Grid", width * 0.725, height * 0.85);
  textSize(width * 0.02);
  text("Mathematical variation in quad shapes", width * 0.725, height * 0.88);
}
