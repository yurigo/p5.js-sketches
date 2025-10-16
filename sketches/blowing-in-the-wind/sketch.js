import {Particle} from "./particle.js"

let particles = [];

window.setup = function setup() {
  const s = min(windowWidth, windowHeight) * 0.9;
  createCanvas(s, s);

  for (let i = 0; i < 1000; i++) {
    particles.push(new Particle(random(width), random(height)));
  }
}

window.draw = function draw() {
  noStroke();
  fill(20, 30); // trail
  rect(0, 0, width, height);

  for (let p of particles) {
    p.update();
    p.draw();
  }
}

window.windowResized = function windowResized() {
  const s = min(windowWidth, windowHeight) * 0.9;
  resizeCanvas(s, s);
  redraw();
}
