let particles = [];

function setup() {
  const s = min(windowWidth, windowHeight) * 0.9;
  createCanvas(s, s);

  for (let i = 0; i < 1000; i++) {
    particles.push(createVector(random(width), random(height)));
  }
}

function windowResized() {
  const s = min(windowWidth, windowHeight) * 0.9;
  resizeCanvas(s, s);
  redraw();
}

const CONSTANT = 0.001;
const FORCE_RADIUS = 150; // zona de influencia del ratón
let FORCE_STRENGTH = -3; // cuánto afecta

function draw() {
  noStroke();
  fill(20, 30);
  rect(0, 0, width, height); // trail
  fill(255);

  for (let p of particles) {
    // Dirección base por ruido
    let angle =
      noise(p.x * CONSTANT, p.y * CONSTANT, frameCount * CONSTANT) * PI * 4;

    // let angle = random(p.x * CONSTANT, p.y * CONSTANT) * PI * 1;

    let vx = cos(angle);
    let vy = sin(angle);

    // Vector hacia el ratón
    let d = dist(p.x, p.y, mouseX, mouseY);
    if (d < FORCE_RADIUS) {
      let dir = createVector(mouseX - p.x, mouseY - p.y);
      dir.normalize();
      // fuerza de atracción proporcional a la distancia
      dir.mult(map(d, 0, FORCE_RADIUS, FORCE_STRENGTH, 0));
      vx += dir.x;
      vy += dir.y;
    }

    // Actualización de posición
    p.x += vx;
    p.y += vy;
    ellipse(p.x, p.y, 2);

    // Envolvente (wrap)
    if (p.x < 0) p.x = width;
    if (p.x > width) p.x = 0;
    if (p.y < 0) p.y = height;
    if (p.y > height) p.y = 0;
  }
}

function mouseWheel(event) {
  // Cambia la fuerza de atracción/repulsión con la rueda del ratón
  if (event.delta > 0) {
    FORCE_STRENGTH = max(FORCE_STRENGTH - 0.5, -10); // límite inferior
  } else {
    FORCE_STRENGTH = min(FORCE_STRENGTH + 0.5, 10); // límite superior
  }
}
