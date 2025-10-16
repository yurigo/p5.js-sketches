const CONSTANT = 0.001;
const FORCE_RADIUS = 150;
let FORCE_STRENGTH = -3;

export class Particle {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.vel = p5.Vector.random2D().mult(random(1, 2));
    this.size = 2;
    this.life = random(100, 255);
    this.col = color(random(200, 255), random(200, 255), random(200, 255));
  }

  update() {
    // Dirección base por ruido (flujo)
    let angle =
      noise(this.pos.x * CONSTANT, this.pos.y * CONSTANT, frameCount * CONSTANT) *
      PI *
      4;
    let flow = createVector(cos(angle), sin(angle));

    // Fuerza de atracción / repulsión por el ratón
    let d = dist(this.pos.x % height, this.pos.y % width, mouseX, mouseY);
    if (d < FORCE_RADIUS) {
      let dir = createVector(mouseX - this.pos.x % height, mouseY - this.pos.y % width);
      dir.normalize();
      dir.mult(map(d, 0, FORCE_RADIUS, FORCE_STRENGTH, 0));
      flow.add(dir);
    }

    // Actualizar velocidad y posición
    this.vel = flow;
    this.pos.add(this.vel);

    // Envolvente (wrap)
    if (this.pos.x < 0) this.pos.x = width ;
    else if (this.pos.x > width) this.pos.x = 0;
    else if (this.pos.y < 0) this.pos.y = height;
    else if (this.pos.y > height) this.pos.y = 0;

  }

  draw() {
    fill(this.col, this.life);
    ellipse(this.pos.x % height, this.pos.y % width, this.size);
  }
}

window.mouseWheel = function mouseWheel(event) {
  if (event.delta > 0) {
    FORCE_STRENGTH = max(FORCE_STRENGTH - 0.5, -10);
  } else {
    FORCE_STRENGTH = min(FORCE_STRENGTH + 0.5, 10);
  }
}