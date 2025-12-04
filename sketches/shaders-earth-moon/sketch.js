let earthShader, moonShader;
let orbitAngle = 0;

function preload() {
  // Load Earth and Moon shaders
  earthShader = loadShader("a.vert", "a.frag");
  moonShader = loadShader("b.vert", "b.frag");
}

function setup() {
  const s = min(windowWidth, windowHeight) * 0.9;
  createCanvas(s, s, WEBGL);
  noStroke();
}

function windowResized() {
  const s = min(windowWidth, windowHeight) * 0.9;
  resizeCanvas(s, s);
}

function draw() {
  orbitControl();

  // Add a soft ambient light.
  ambientLight(50);

  background(0, 0, 20); // Deep space background
  noStroke();

  // Camera rotation for better view
  rotateY(frameCount * 0.002);

  // Draw Earth
  shader(earthShader);
  earthShader.setUniform("u_time", millis() * 0.001);
  push();
  rotateY(frameCount * 0.005); // Earth rotation
  sphere(120, 64, 64); // Earth radius with more detail
  pop();

  // Calculate Moon orbit position
  orbitAngle += 0.01; // Orbit speed
  let orbitRadius = 250; // Distance from Earth to Moon
  let moonX = cos(orbitAngle) * orbitRadius;
  let moonZ = sin(orbitAngle) * orbitRadius;

  // Draw Moon
  shader(moonShader);
  moonShader.setUniform("u_time", millis() * 0.001);
  push();
  translate(moonX, 0, moonZ);
  rotateY(frameCount * 0.002); // Moon rotation (slower)
  sphere(33, 64, 64); // Moon radius (about 27% of Earth) with more detail
  pop();

  // Optional: Draw orbit path
  resetShader();
  push();
  noFill();
  stroke(255, 255, 255, 30);
  strokeWeight(1);
  rotateX(HALF_PI);
  circle(0, 0, orbitRadius * 2);
  pop();
}
