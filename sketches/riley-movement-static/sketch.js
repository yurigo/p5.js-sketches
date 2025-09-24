function setup() {
  createCanvas(400, 400);
  noLoop(); // Static sketch - no animation needed
}

function draw() {
  background(255);
  
  // Grid parameters
  let cols = 16;
  let rows = 16;
  let cellSize = 40;
  let startX = (width - cols * cellSize) / 2;
  let startY = (height - rows * cellSize) / 2;
  
  // Deformation line - creates the illusion of movement
  let deformationLine = width * 0.55; // 55% across the canvas
  
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
  
  // Title
  fill(80);
  textAlign(CENTER);
  textSize(16);
  text("Movement in Squares - Static (Inspired by Bridget Riley)", width/2, 40);
}
