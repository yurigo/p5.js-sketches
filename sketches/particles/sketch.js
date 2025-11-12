let particleSystem;
let emitters = [];

function setup() {
  const s = min(windowWidth, windowHeight) * 0.9;
  createCanvas(s, s);

  particleSystem = new ParticleSystem();

  // Create multiple emitters
  emitters.push(new Emitter(width / 2, height / 2, "fountain"));
  emitters.push(new Emitter(width * 0.25, height * 0.25, "explosion"));
  emitters.push(new Emitter(width * 0.75, height * 0.75, "spiral"));
}

function windowResized() {
  const s = min(windowWidth, windowHeight) * 0.9;
  resizeCanvas(s, s);
  // Recenter emitters proportionally if desired (simple approach keeps current positions)
  redraw();
}

function draw() {
  background(10, 10, 10, 50);

  // Update and display particle system
  particleSystem.update();
  particleSystem.display();

  // Update emitters
  for (let emitter of emitters) {
    emitter.update();
    emitter.emit();
  }

  // Instructions
  fill(255, 180);
  textAlign(CENTER);
  textSize(14);
  text(
    "Click and drag to move emitters • Press SPACE to toggle",
    width / 2,
    height - 20
  );
}

class Particle {
  constructor(x, y, type = "default") {
    this.pos = createVector(x, y);
    this.vel = createVector(random(-2, 2), random(-3, -1));
    this.acc = createVector(0, 0);
    this.life = 255;
    this.maxLife = 255;
    this.size = random(2, 8);
    this.type = type;

    // Different particle types
    switch (type) {
      case "fire":
        this.color = [random(200, 255), random(100, 200), random(0, 50)];
        this.vel = createVector(random(-1, 1), random(-4, -2));
        this.life = random(100, 200);
        this.maxLife = this.life;
        break;
      case "spark":
        this.color = [255, random(200, 255), random(100, 200)];
        this.vel = createVector(random(-5, 5), random(-5, 5));
        this.life = random(50, 150);
        this.maxLife = this.life;
        break;
      case "smoke":
        this.color = [random(100, 150), random(100, 150), random(100, 150)];
        this.vel = createVector(random(-0.5, 0.5), random(-2, -0.5));
        this.size = random(5, 15);
        break;
      default:
        this.color = [random(100, 255), random(100, 255), random(150, 255)];
    }
  }

  update() {
    // Apply forces based on type
    if (this.type === "fire") {
      this.acc.add(0, -0.1); // Buoyancy
      this.acc.add(random(-0.05, 0.05), 0); // Turbulence
    } else if (this.type === "smoke") {
      this.acc.add(0, -0.05);
      this.acc.add(random(-0.02, 0.02), 0);
    }

    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.mult(0);

    this.life -= random(1, 3);

    // Size change over time
    let lifeRatio = this.life / this.maxLife;
    if (this.type === "smoke") {
      this.size += 0.1; // Smoke expands
    }
  }

  display() {
    let alpha = map(this.life, 0, this.maxLife, 0, 255);
    fill(this.color[0], this.color[1], this.color[2], alpha);
    noStroke();

    if (this.type === "spark") {
      // Draw sparks as lines
      stroke(this.color[0], this.color[1], this.color[2], alpha);
      strokeWeight(2);
      line(
        this.pos.x,
        this.pos.y,
        this.pos.x - this.vel.x * 3,
        this.pos.y - this.vel.y * 3
      );
    } else {
      circle(this.pos.x, this.pos.y, this.size);
    }
  }

  isDead() {
    return this.life <= 0;
  }
}

class ParticleSystem {
  constructor() {
    this.particles = [];
  }

  addParticle(x, y, type) {
    this.particles.push(new Particle(x, y, type));
  }

  update() {
    for (let i = this.particles.length - 1; i >= 0; i--) {
      this.particles[i].update();
      if (this.particles[i].isDead()) {
        this.particles.splice(i, 1);
      }
    }
  }

  display() {
    for (let particle of this.particles) {
      particle.display();
    }
  }
}

class Emitter {
  constructor(x, y, type) {
    this.pos = createVector(x, y);
    this.type = type;
    this.active = true;
    this.timer = 0;
  }

  update() {
    this.timer++;

    // Move emitter in pattern
    if (this.type === "spiral") {
      let angle = this.timer * 0.05;
      this.pos.x = width / 2 + cos(angle) * 100;
      this.pos.y = height / 2 + sin(angle) * 100;
    }
  }

  emit() {
    if (!this.active) return;

    switch (this.type) {
      case "fountain":
        if (this.timer % 3 === 0) {
          for (let i = 0; i < 3; i++) {
            particleSystem.addParticle(
              this.pos.x + random(-10, 10),
              this.pos.y,
              "fire"
            );
          }
        }
        break;

      case "explosion":
        if (this.timer % 60 === 0) {
          // Explode every 60 frames
          for (let i = 0; i < 20; i++) {
            particleSystem.addParticle(this.pos.x, this.pos.y, "spark");
          }
          for (let i = 0; i < 10; i++) {
            particleSystem.addParticle(this.pos.x, this.pos.y, "smoke");
          }
        }
        break;

      case "spiral":
        if (this.timer % 2 === 0) {
          particleSystem.addParticle(this.pos.x, this.pos.y, "default");
        }
        break;
    }
  }
}

function mousePressed() {
  // Find closest emitter and start dragging
  for (let emitter of emitters) {
    let distance = dist(mouseX, mouseY, emitter.pos.x, emitter.pos.y);
    if (distance < 50) {
      emitter.pos.x = mouseX;
      emitter.pos.y = mouseY;
    }
  }
}

function touchStarted() {
  mousePressed();
  return false; // prevent default touch behavior
}

function mouseDragged() {
  // Continue dragging
  for (let emitter of emitters) {
    let distance = dist(mouseX, mouseY, emitter.pos.x, emitter.pos.y);
    if (distance < 50) {
      emitter.pos.x = mouseX;
      emitter.pos.y = mouseY;
    }
  }
}

function keyPressed() {
  if (key === " ") {
    // Toggle all emitters
    for (let emitter of emitters) {
      emitter.active = !emitter.active;
    }
  }
}
