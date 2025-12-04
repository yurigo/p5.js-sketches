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

function draw() {
  shader(shader101);

  shader101.setUniform("u_resolution", [width, height]);
  // shader101.setUniform("u_time", millis() / 1000);

  noStroke();
  // rect a pantalla completa en WEBGL
  rect(-width / 2, -height / 2, width, height);

  //plane(width, height);

  orbitControl();

  sphere();
}
