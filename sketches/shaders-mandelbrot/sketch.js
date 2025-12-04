let mandelbrot;

// Load the shader and create a p5.Shader object.
function preload() {
  mandelbrot = loadShader("./mandel.vert", "./mandel.frag");
}

function setup() {
  const s = min(windowWidth, windowHeight) * 0.9;
  createCanvas(s, s, WEBGL);
  // Use the p5.Shader object.
  shader(mandelbrot);

  // Set the shader uniform p to an array.
  mandelbrot.setUniform("p", [-0.74364388703, 0.13182590421]);

  describe("A fractal image zooms in and out of focus.");
}

// function windowResized() {
//   const s = min(windowWidth, windowHeight) * 0.9;
//   resizeCanvas(s, s);
//   redraw();
// }

// function draw() {
//   // Set the shader uniform r to a value that oscillates between 0 and 2.
//   //mandelbrot.setUniform("r", sin(frameCount * 0.01) + 1);
//   fill(255);
//   // Add a quad as a display surface for the shader.
//   quad(-1, -1, 1, -1, 1, 1, -1, 1);
// }

// Note: A "uniform" is a global variable within a shader program.

// let mandelbrot;

// // Load the shader and create a p5.Shader object.
// function preload() {
//   mandelbrot = loadShader("./mandel.vert", "./mandel.frag");
// }

// function setup() {
//   createCanvas(100, 100, WEBGL);

//   // Use the p5.Shader object.
//   shader(mandelbrot);

//   // Set the shader uniform p to an array.
//   mandelbrot.setUniform("p", [-0.74364388703, 0.13182590421]);

//   describe("A fractal image zooms in and out of focus.");
// }

function draw() {
  // Set the shader uniform r to a value that oscillates between 0 and 2.
  mandelbrot.setUniform("r", sin(frameCount * 0.01) + 1);

  // Add a quad as a display surface for the shader.
  quad(-1, -1, 1, -1, 1, 1, -1, 1);
}
