// DVD logo properties
let logo = {
  x: 0,
  y: 0,
  vx: 3,
  vy: 2,
  width: 120,
  height: 60
};

// Color for the logo
let logoColor;
let cornerHits = 0;

// Image mask and graphics buffer
let imgMask;
let imageHeight;
let imageWidth;
let rectBuffer;
let rectImage;

// Preload the image assets
function preload() {
  imgMask = loadImage('assets/logo.png');
}

function setup() {
  const s = min(windowWidth, windowHeight) * 0.9;
  createCanvas(s, s);
  
  // Set image dimensions based on loaded image
  imageHeight = imgMask.height / 4;
  imageWidth = imgMask.width / 4;
  
  // Update logo dimensions based on image
  logo.width = imageWidth;
  logo.height = imageHeight;
  
  // Start in center
  logo.x = width / 2 - logo.width / 2;
  logo.y = height / 2 - logo.height / 2;
  
  // Random initial color
  colorMode(HSB);
  logoColor = color(random(360), 80, 90);
}

function windowResized() {
  const s = min(windowWidth, windowHeight) * 0.9;
  resizeCanvas(s, s);
}

function draw() {
  background(0);
  
  // Update position
  logo.x += logo.vx;
  logo.y += logo.vy;
  
  let hitCorner = false;
  let hitEdge = false;
  
  // Check horizontal boundaries
  if (logo.x + logo.width > width) {
    logo.x = width - logo.width;
    logo.vx *= -1;
    hitEdge = true;
  }
  if (logo.x < 0) {
    logo.x = 0;
    logo.vx *= -1;
    hitEdge = true;
  }
  
  // Check vertical boundaries
  if (logo.y + logo.height > height) {
    logo.y = height - logo.height;
    logo.vy *= -1;
    hitEdge = true;
  }
  if (logo.y < 0) {
    logo.y = 0;
    logo.vy *= -1;
    hitEdge = true;
  }
  
  // Check if hit corner (both edges at same time)
  if ((logo.x === 0 || logo.x === width - logo.width) && 
      (logo.y === 0 || logo.y === height - logo.height)) {
    hitCorner = true;
    cornerHits++;
  }
  
  // Change color on edge hit
  if (hitEdge) {
    logoColor = color(random(360), 80, 90);
  }
  
  // Create a buffer to draw the colored rectangle
  rectBuffer = createGraphics(width, height);
  rectBuffer.noStroke();
  
  // Fill the buffer with the current logo color
  rectBuffer.fill(logoColor);
  rectBuffer.rect(0, 0, width, height);
  
  // Get the buffer as an image
  rectImage = rectBuffer.get();

  // destroy the rectBuffer you silly
  rectBuffer.remove();
  
  // Apply the logo image as a mask
  rectImage.mask(imgMask);

  
  // Draw the masked image at the logo position
  image(rectImage, logo.x, logo.y, imageWidth, imageHeight);
  
  // Draw corner hit counter
  fill(255, 200);
  textAlign(LEFT, TOP);
  textSize(16);
  textStyle(NORMAL);
  text("Corner hits: " + cornerHits, 20, 20);
  
  // Special effect when hitting corner
  if (hitCorner) {
    fill(255, 255, 255, 100);
    for (let i = 0; i < 5; i++) {
      ellipse(logo.x + logo.width / 2, logo.y + logo.height / 2, 50 + i * 30, 50 + i * 30);
    }
  }
}
