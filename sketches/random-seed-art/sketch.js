// Random Seed Art Sketch
// Demonstrates randomSeed() for deterministic generative art
// Seed value comes from URL query parameter: ?id=1234

let seedValue = 3141592654; // Default seed
let artElements = [];

function setup() {
  const s = min(windowWidth, windowHeight) * 0.9;
  createCanvas(s, s);
  
  // Use HSL color mode as instructed
  colorMode(HSB, 360, 100, 100, 100);
  
  // Parse URL query parameter for seed
  const urlParams = new URLSearchParams(window.location.search);
  const idParam = urlParams.get('id');
  if (idParam && !isNaN(idParam)) {
    seedValue = parseInt(idParam);
  }
  
  // Set the random seed for deterministic results
  randomSeed(seedValue);
  
  // Generate art elements based on the seed
  generateArt();
  
  // Make sure the canvas draws initially
  background(240, 30, 8);
  drawAllElements();
  
  noLoop(); // Static art that doesn't change over time
}

function windowResized() {
  const s = min(windowWidth, windowHeight) * 0.9;
  resizeCanvas(s, s);
  
  // Regenerate art with same seed for consistency
  randomSeed(seedValue);
  generateArt();
  redraw();
}

function generateArt() {
  artElements = [];
  
  // Create various art elements with different random characteristics
  
  // Background circles
  for (let i = 0; i < 15; i++) {
    artElements.push({
      type: 'circle',
      x: random(width),
      y: random(height),
      size: random(20, 120),
      hue: random(360),
      saturation: random(40, 80),
      brightness: random(20, 60),
      alpha: random(20, 60)
    });
  }
  
  // Flowing lines
  for (let i = 0; i < 8; i++) {
    let points = [];
    let startX = random(width);
    let startY = random(height);
    let numPoints = int(random(5, 12));
    
    for (let j = 0; j < numPoints; j++) {
      points.push({
        x: startX + random(-100, 100),
        y: startY + random(-100, 100)
      });
    }
    
    artElements.push({
      type: 'curve',
      points: points,
      hue: random(360),
      saturation: random(60, 100),
      brightness: random(70, 90),
      strokeWeight: random(2, 8)
    });
  }
  
  // Geometric shapes
  for (let i = 0; i < 12; i++) {
    let shapeType = random(['triangle', 'quad', 'pentagon']);
    artElements.push({
      type: 'polygon',
      shape: shapeType,
      x: random(width),
      y: random(height),
      size: random(30, 80),
      rotation: random(TWO_PI),
      hue: random(360),
      saturation: random(70, 100),
      brightness: random(60, 90),
      alpha: random(40, 80)
    });
  }
}

function draw() {
  // This shouldn't be called due to noLoop(), but keeping for completeness
  drawAllElements();
}

function drawAllElements() {
  // Dark background
  background(240, 30, 8);
  
  // Draw all art elements
  for (let element of artElements) {
    drawElement(element);
  }
  
  // Display seed information
  displaySeedInfo();
}

function drawElement(element) {
  switch (element.type) {
    case 'circle':
      fill(element.hue, element.saturation, element.brightness, element.alpha);
      noStroke();
      ellipse(element.x, element.y, element.size, element.size);
      break;
      
    case 'curve':
      noFill();
      stroke(element.hue, element.saturation, element.brightness, 70);
      strokeWeight(element.strokeWeight);
      beginShape();
      curveVertex(element.points[0].x, element.points[0].y);
      for (let point of element.points) {
        curveVertex(point.x, point.y);
      }
      curveVertex(element.points[element.points.length - 1].x, element.points[element.points.length - 1].y);
      endShape();
      break;
      
    case 'polygon':
      fill(element.hue, element.saturation, element.brightness, element.alpha);
      stroke(element.hue, element.saturation, element.brightness + 20, 80);
      strokeWeight(1);
      
      push();
      translate(element.x, element.y);
      rotate(element.rotation);
      
      if (element.shape === 'triangle') {
        drawTriangle(element.size);
      } else if (element.shape === 'quad') {
        drawQuad(element.size);
      } else if (element.shape === 'pentagon') {
        drawPentagon(element.size);
      }
      
      pop();
      break;
  }
}

function drawTriangle(size) {
  beginShape();
  for (let i = 0; i < 3; i++) {
    let angle = (TWO_PI / 3) * i - PI / 2;
    let x = cos(angle) * size / 2;
    let y = sin(angle) * size / 2;
    vertex(x, y);
  }
  endShape(CLOSE);
}

function drawQuad(size) {
  let halfSize = size / 2;
  quad(-halfSize, -halfSize, halfSize, -halfSize, halfSize, halfSize, -halfSize, halfSize);
}

function drawPentagon(size) {
  beginShape();
  for (let i = 0; i < 5; i++) {
    let angle = (TWO_PI / 5) * i - PI / 2;
    let x = cos(angle) * size / 2;
    let y = sin(angle) * size / 2;
    vertex(x, y);
  }
  endShape(CLOSE);
}

function displaySeedInfo() {
  // Display seed information in bottom right
  fill(0, 0, 100, 80);
  textAlign(RIGHT, BOTTOM);
  textSize(14);
  text(`${seedValue}`, width - 10, height - 10);
  
  // Instructions
  // textAlign(LEFT, BOTTOM);
  // textSize(12);
  // fill(0, 0, 100, 60);
  // text('Add ?id=NUMBER to URL for different variations', 20, height - 20);
}

// Allow clicking to generate new seed and reload
function mousePressed() {
  // Only respond to clicks on the canvas
  if (mouseX < 0 || mouseX > width || mouseY < 0 || mouseY > height) {
    return;
  }
  let newSeed = int(random(1, 10000));
  let newUrl = window.location.pathname + '?id=' + newSeed;
  window.location.href = newUrl;
}

function touchStarted() {
  // Only respond to touches on the canvas
  if (touches.length > 0) {
    const touch = touches[0];
    if (touch.x < 0 || touch.x > width || touch.y < 0 || touch.y > height) {
      return;
    }
  }
  mousePressed();
  return false; // prevent default touch behavior
}