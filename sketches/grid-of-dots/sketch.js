function setup() {
  createCanvas(800, 800);
  noLoop(); // Static sketch - no animation needed
}

function draw() {
  background(20, 20, 30);
  
  // Set dot properties
  fill(100, 200, 255);
  noStroke();
  
  // Nested loops to create a grid of dots
  // Outer loop for x-axis (columns)
  for (let x = 50; x < width; x = x + 40) {
    // Inner loop for y-axis (rows)
    for (let y = 50; y < height; y = y + 40) {
      // Draw a circle at each grid position
      circle(x, y, 20);
    }
  }
  
  // Title
  fill(255);
  textAlign(CENTER);
  textSize(24);
  text("Grid of Dots - Nested Loops", width/2, 30);
}