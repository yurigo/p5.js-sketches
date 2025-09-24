function setup() {
  createCanvas(400, 400);
  noLoop(); // Static pattern
}

function draw() {
  background(240);

  // Chess board setup - fills entire canvas
  let squareSize = min(width, height) / 8;
  let startX = 0;
  let startY = 0;
  noStroke();

  // Nested loops to create the chessboard grid
  // Outer loop for columns (i represents column index)
  for (let i = 0; i < 8; i++) {
    // Inner loop for rows (j represents row index)
    for (let j = 0; j < 8; j++) {
      // Calculate x and y position using responsive positioning
      let x = startX + i * squareSize;
      let y = startY + j * squareSize;

      // Conditional logic to alternate colors
      // If sum of indices is even, use light color; if odd, use dark color
      if ((i + j) % 2 === 0) {
        fill(240, 217, 181); // Light square
      } else {
        fill(181, 136, 99); // Dark square
      }

      // Draw the square
      rect(x, y, squareSize, squareSize);
    }
  }
}
