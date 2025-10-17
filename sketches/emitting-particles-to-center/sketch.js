let particles = [];

function windowResized() {
  const s = min(windowWidth, windowHeight) * 0.9;
  resizeCanvas(s, s);
  redraw();
}


function setup() {
  const s = min(windowWidth, windowHeight) * 0.9;
  createCanvas(s, s);
  background(30);
  angleMode(RADIANS);
}

function draw() {
  background(30);

  // Emitir partículas de cada tipo
  for (let i = 0; i < 2; i++) {
    particles.push(new Particle('r'));
    particles.push(new Particle('g'));
    particles.push(new Particle('b'));
  }

  // Actualizar y mostrar
  for (let i = particles.length - 1; i >= 0; i--) {
    particles[i].update();
    particles[i].show();
    if (particles[i].isDead()) {
      particles.splice(i, 1);
    }
  }
}

class Particle {
  constructor(type) {
    this.lifespan = 255;
    this.center = createVector(width / 2, height / 2);
    this.type = type.toLowerCase();

    // Definir posición base y color según tipo
    if (this.type === 'r') {
      this.pos = createVector(0, 0);
      this.color = color(255, 0, 0);
    } else if (this.type === 'g') {
      this.pos = createVector(width, 0);
      this.color = color(0, 255, 0);
    } else if (this.type === 'b') {
      this.pos = createVector(width / 2, height);
      this.color = color(0, 0, 255);
    } else {
      // Por defecto centro + blanco
      this.pos = this.center.copy();
      this.color = color(255);
    }

    // Calcular ángulo base hacia el centro
    let baseAngle = p5.Vector.sub(this.center, this.pos).heading();

    // Añadir dispersión angular
    let angleDispersion = PI / 8; // 22.5 grados de dispersión
    let angle = baseAngle + random(-angleDispersion, angleDispersion);

    // Velocidad (magnitud aleatoria)
    this.vel = p5.Vector.fromAngle(angle).setMag(random(2, 3));

    this.acc = createVector(0, 0);
  }

  update() {
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.lifespan -= 3;
  }

  show() {
    noStroke();
    fill(red(this.color), green(this.color), blue(this.color), this.lifespan);
    ellipse(this.pos.x, this.pos.y, 6);
  }

  isDead() {
    return this.lifespan <= 0;
  }
}
