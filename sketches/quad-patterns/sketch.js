function setup() {
  createCanvas(800, 800);
  noLoop(); // Static sketch demonstrating quad() patterns
}

function draw() {
  background(40, 42, 54);
  
  // Title
  fill(255);
  textAlign(CENTER);
  textSize(24);
  text("Quadrilateral Patterns with quad()", width/2, 40);
  
  textSize(14);
  text("Exploring the quad() function with different shapes and patterns", width/2, 65);
  
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
  quad(120, 120, 280, 120, 280, 220, 120, 220);
  
  // Labels
  fill(255);
  noStroke();
  textAlign(CENTER);
  textSize(12);
  text("Basic Rectangle", 200, 250);
  text("quad(120,120, 280,120, 280,220, 120,220)", 200, 265);
  
  // Corner indicators
  fill(255, 80, 80);
  circle(120, 120, 8); // Point 1
  fill(80, 255, 80);
  circle(280, 120, 8); // Point 2
  fill(80, 80, 255);
  circle(280, 220, 8); // Point 3
  fill(255, 255, 80);
  circle(120, 220, 8); // Point 4
}

function drawIrregularQuad() {
  // Irregular quadrilateral
  fill(139, 233, 253, 150);
  stroke(139, 233, 253);
  strokeWeight(2);
  
  // Irregular shape - parallelogram-like
  quad(520, 140, 680, 110, 680, 200, 520, 230);
  
  // Labels
  fill(255);
  noStroke();
  textAlign(CENTER);
  textSize(12);
  text("Irregular Quad", 600, 260);
  text("quad(520,140, 680,110, 680,200, 520,230)", 600, 275);
  
  // Corner indicators with numbers
  fill(255, 80, 80);
  circle(520, 140, 8);
  fill(80, 255, 80);
  circle(680, 110, 8);
  fill(80, 80, 255);
  circle(680, 200, 8);
  fill(255, 255, 80);
  circle(520, 230, 8);
  
  // Corner numbers
  fill(255);
  textSize(10);
  text("1", 510, 145);
  text("2", 690, 115);
  text("3", 690, 205);
  text("4", 510, 235);
}

function drawOverlappingQuads() {
  // Multiple overlapping quads with transparency
  let colors = [
    [255, 121, 198, 80],  // Pink
    [80, 250, 123, 80],   // Green
    [189, 147, 249, 80],  // Purple
    [255, 184, 108, 80]   // Orange
  ];
  
  strokeWeight(1);
  
  for (let i = 0; i < 4; i++) {
    fill(colors[i][0], colors[i][1], colors[i][2], colors[i][3]);
    stroke(colors[i][0], colors[i][1], colors[i][2]);
    
    let offsetX = i * 20;
    let offsetY = i * 15;
    
    quad(120 + offsetX, 350 + offsetY, 
         240 + offsetX, 340 + offsetY, 
         250 + offsetX, 450 + offsetY, 
         130 + offsetX, 460 + offsetY);
  }
  
  // Labels
  fill(255);
  noStroke();
  textAlign(CENTER);
  textSize(12);
  text("Overlapping Quads", 200, 520);
  text("Using transparency for layered effects", 200, 535);
}

function drawPatternQuads() {
  // Grid of varied quads creating a pattern
  let cols = 3;
  let rows = 3;
  let spacing = 60;
  let startX = 480;
  let startY = 340;
  
  strokeWeight(1);
  
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      let x = startX + i * spacing;
      let y = startY + j * spacing;
      
      // Vary the quad shape based on position
      let variation = sin((i + j) * 0.5) * 10;
      let hue = map(i + j, 0, cols + rows - 2, 0, 360);
      
      colorMode(HSB);
      fill(hue, 70, 90, 150);
      stroke(hue, 70, 90);
      
      // Create varied quad shapes
      quad(x + variation, y,
           x + 40 - variation, y + variation,
           x + 40 + variation, y + 40,
           x - variation, y + 40 - variation);
    }
  }
  
  colorMode(RGB);
  
  // Labels
  fill(255);
  noStroke();
  textAlign(CENTER);
  textSize(12);
  text("Pattern Grid", 575, 560);
  text("Mathematical variation in quad shapes", 575, 575);
}