let shaderA, shaderB;

function preload() {
  shaderA = loadShader("a.vert", "a.frag");
  shaderB = loadShader("b.vert", "b.frag");
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

function draw() {
  background(0);

  // Primera esfera → shader A
  shader(shaderA);
  shaderA.setUniform("u_time", millis() * 0.001);
  push();
  translate(-150, 0, 0);
  sphere(100);
  pop();

  // Segunda esfera → shader B
  shader(shaderB);
  shaderB.setUniform("u_time", millis() * 0.001);
  push();
  translate(150, 0, 0);
  sphere(100);
  pop();
}
