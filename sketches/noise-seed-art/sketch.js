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
  const idParam = urlParams.get("id");
  if (idParam && !isNaN(idParam)) {
    seedValue = parseInt(idParam);
  }

  // Set the random seed for deterministic results
  noiseSeed(seedValue);

  // Make sure the canvas draws initially
  background(240, 30, 8);

  noLoop(); // Static art that doesn't change over time
}

function windowResized() {
  const s = min(windowWidth, windowHeight) * 0.9;
  resizeCanvas(s, s);

  // Regenerate art with same seed for consistency
  noiseSeed(seedValue);
  generateArt();
  redraw();
}

function generateArt() {}

function draw() {
  stroke(255);
  noFill();
  let yoff = 0;
  for (let y = 0; y < height; y += 10) {
    beginShape();
    let xoff = 0;
    for (let x = 0; x < width; x += 10) {
      let n = noise(xoff, yoff) * 100;
      vertex(x, y + n);
      xoff += 0.1;
    }
    endShape();
    yoff += 0.1;
  }
}

function drawAllElements() {}

function drawElement(element) {}

// Allow clicking to generate new seed and reload
function mousePressed() {
  // Only respond to clicks on the canvas
  if (mouseX < 0 || mouseX > width || mouseY < 0 || mouseY > height) {
    return;
  }
  let newSeed = int(random(1, 10000));
  let newUrl = window.location.pathname + "?id=" + newSeed;
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
