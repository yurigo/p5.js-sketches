function setup() {
  const s = min(windowWidth, windowHeight) * 0.9;
  createCanvas(s, s);
  noLoop(); // Static mandala pattern
}

function windowResized() {
  const s = min(windowWidth, windowHeight) * 0.9;
  resizeCanvas(s, s);
  redraw();
}

function draw() {
  background(15, 15, 25);

  // Title first
  fill(255);
  textAlign(CENTER);
  textSize(24);
  text("Radial Pattern - Transformations & Circular Loop", width / 2, 50);

  // Move the origin to the center of the canvas
  push();
  translate(width / 2, height / 2);

  // Set drawing properties
  stroke(255, 100, 150);
  strokeWeight(2);
  fill(100, 200, 255, 150);

  // Number of elements in the radial pattern
  let numElements = 12;

  // Loop to create radial pattern
  for (let i = 0; i < numElements; i++) {
    // Save the current transformation state
    push();

    // Rotate the canvas for each iteration
    // TWO_PI divided by numElements gives us equal spacing
    rotate((TWO_PI / numElements) * i);

    // Draw a shape at this rotation
    // The shape will be drawn at the same position each time,
    // but the canvas rotation makes it appear in different places
    fill(100, 200, 255, 150);
    stroke(255, 100, 150);
    rect(0, -150, 60, 100);

    // Draw an additional decorative element
    fill(255, 150, 100, 100);
    noStroke();
    ellipse(0, -200, 30, 30);

    // Restore the transformation state
    pop();
  }

  // Add a center circle
  fill(255, 200, 100);
  noStroke();
  circle(0, 0, 40);

  // Close the main translate
  pop();
}
