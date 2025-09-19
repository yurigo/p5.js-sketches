function setup() {
  createCanvas(800, 800);
  // Interactive sketch - continuous drawing
}

function draw() {
  background(255);
  
  // Grid parameters
  let cols = 16;
  let rows = 16;
  let cellSize = 40;
  let startX = (width - cols * cellSize) / 2;
  let startY = (height - rows * cellSize) / 2;
  
  // Interactive deformation line - follows mouse X position
  let deformationLine = mouseX;
  
  noStroke();
  
  // Nested loops to create the grid
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      let x = startX + i * cellSize;
      let y = startY + j * cellSize;
      
      // Calculate distance from deformation line
      let distanceFromLine = abs(x - deformationLine);
      
      // Create distortion effect based on distance
      let maxDistortion = cellSize * 0.7;
      let falloff = 150; // How far the effect extends
      let distortionAmount = map(distanceFromLine, 0, falloff, maxDistortion, 0);
      distortionAmount = constrain(distortionAmount, 0, maxDistortion);
      
      // Apply horizontal compression and vertical stretching
      let rectWidth = cellSize - distortionAmount * 0.4;
      let rectHeight = cellSize + distortionAmount * 0.8;
      
      // Alternate black and white squares in checkerboard pattern
      if ((i + j) % 2 === 0) {
        fill(0); // Black
      } else {
        fill(255); // White
      }
      
      // Center the distorted rectangle in the cell
      let offsetX = (cellSize - rectWidth) / 2;
      let offsetY = (cellSize - rectHeight) / 2;
      
      rect(x + offsetX, y + offsetY, rectWidth, rectHeight);
    }
  }
  
  // Interactive instructions
  fill(80);
  textAlign(CENTER);
  textSize(16);
  text("Movement in Squares - Interactive (Inspired by Bridget Riley)", width/2, 40);
  
  fill(120);
  textSize(12);
  text("Move mouse left and right to control the distortion", width/2, height - 30);
  
  // Draw deformation line indicator
  stroke(255, 0, 0, 100);
  strokeWeight(2);
  line(deformationLine, 0, deformationLine, height);
  noStroke();
}