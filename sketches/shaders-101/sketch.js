let shader101;

function preload() {
  shader101 = loadShader("./basic.vert", "./basic.frag");
}

function setup() {
  const s = min(windowWidth, windowHeight) * 0.9;
  createCanvas(s, s, WEBGL);
  background(45, 52, 54);
}

function windowResized() {
  const s = min(windowWidth, windowHeight) * 0.9;
  resizeCanvas(s, s);
  redraw();
}

// function draw() {
//   shader(shader101);

//   shader101.setUniform("u_resolution", [width, height]);
//   // shader101.setUniform("u_time", millis() / 1000);

//   noStroke();
//   // rect a pantalla completa en WEBGL
//   rect(-width / 2, -height / 2, width, height);

//   //plane(width, height);

//   orbitControl();

//   sphere();
// }

function draw() {
  background(220);

  // Set a fixed camera position for the scene if needed
  camera(0, 0, 500, 0, 0, 0, 0, 1, 0);

  // --- Sphere 1 (Rotates with mouse interaction) ---
  push();
  // Apply rotation based on mouse movement
  // This simulates the 'orbit' effect for just this object
  rotateX(map(mouseY, 0, height, -PI, PI));
  rotateY(map(mouseX, 0, width, -PI, PI));
  shader(shader101);
  // specularMaterial(250, 0, 0);
  sphere(50);
  pop();

  // --- Sphere 2 (Static) ---
  push();
  translate(150, 0, 0);
  pointLight(255, 255, 255, 30, -40, 30);
  shader(shader101);
  // specularMaterial(255, 150, 250);
  // shininess(50);
  sphere(50);
  pop();
}
