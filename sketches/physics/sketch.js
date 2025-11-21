let balls = [];
let gravity = 0.5;
let friction = 0.98;
let bounce = 0.7;
let cnv;

function setup() {
  const s = min(windowWidth, windowHeight) * 0.9;
  cnv = createCanvas(s, s);
  cnv.mousePressed(handleCanvasClick);
  cnv.touchStarted(handleCanvasClick);
  // Create balls
  for (let i = 0; i < 10; i++) {
    balls.push(new Ball(random(width), random(height / 2), random(10, 30)));
  }
}

function windowResized() {
  const s = min(windowWidth, windowHeight) * 0.9;
  resizeCanvas(s, s);
  redraw();
}

function draw() {
  background(26, 26, 26);

  // Update and display all balls
  for (let ball of balls) {
    ball.update();
    ball.display();
  }

  // Check collisions between balls
  for (let i = 0; i < balls.length; i++) {
    for (let j = i + 1; j < balls.length; j++) {
      balls[i].checkCollision(balls[j]);
    }
  }

  // Instructions
  fill(255, 180);
  textAlign(CENTER);
  textSize(16);
  text("Click to add balls • Press 'r' to reset", width / 2, height - 30);
}

class Ball {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.vel = createVector(random(-5, 5), random(-2, 2));
    this.acc = createVector(0, 0);
    this.radius = random(15, 35);
    this.mass = this.radius * 0.1;
    this.color = [random(100, 255), random(100, 255), random(100, 255)];
    this.trail = [];
  }

  update() {
    // Apply gravity
    this.acc.add(0, gravity);

    // Update physics
    this.vel.add(this.acc);
    this.vel.mult(friction);
    this.pos.add(this.vel);
    this.acc.mult(0);

    // Boundary collision
    this.checkBoundaries();

    // Update trail
    this.trail.push({ x: this.pos.x, y: this.pos.y, life: 100 });
    if (this.trail.length > 20) {
      this.trail.shift();
    }

    // Update trail life
    for (let i = this.trail.length - 1; i >= 0; i--) {
      this.trail[i].life -= 5;
      if (this.trail[i].life <= 0) {
        this.trail.splice(i, 1);
      }
    }
  }

  display() {
    // Draw trail
    for (let i = 0; i < this.trail.length; i++) {
      let point = this.trail[i];
      let alpha = map(point.life, 0, 100, 0, 100);
      let size = map(i, 0, this.trail.length - 1, 2, this.radius / 2);

      fill(this.color[0], this.color[1], this.color[2], alpha);
      noStroke();
      circle(point.x, point.y, size);
    }

    // Draw ball
    fill(this.color[0], this.color[1], this.color[2]);
    stroke(255, 100);
    strokeWeight(2);
    circle(this.pos.x, this.pos.y, this.radius * 2);

    // Draw velocity vector (for visualization)
    stroke(255, 150);
    strokeWeight(1);
    let velMag = this.vel.mag() * 10;
    line(
      this.pos.x,
      this.pos.y,
      this.pos.x + this.vel.x * 10,
      this.pos.y + this.vel.y * 10
    );
  }

  checkBoundaries() {
    // Floor
    if (this.pos.y + this.radius > height) {
      this.pos.y = height - this.radius;
      this.vel.y *= -bounce;
    }

    // Ceiling
    if (this.pos.y - this.radius < 0) {
      this.pos.y = this.radius;
      this.vel.y *= -bounce;
    }

    // Right wall
    if (this.pos.x + this.radius > width) {
      this.pos.x = width - this.radius;
      this.vel.x *= -bounce;
    }

    // Left wall
    if (this.pos.x - this.radius < 0) {
      this.pos.x = this.radius;
      this.vel.x *= -bounce;
    }
  }

  checkCollision(other) {
    let distance = p5.Vector.dist(this.pos, other.pos);
    let minDistance = this.radius + other.radius;

    if (distance < minDistance) {
      // Calculate collision response
      let overlap = minDistance - distance;
      let direction = p5.Vector.sub(this.pos, other.pos);
      direction.normalize();

      // Separate balls
      let separation = p5.Vector.mult(direction, overlap / 2);
      this.pos.add(separation);
      other.pos.sub(separation);

      // Calculate velocities after collision
      let relativeVel = p5.Vector.sub(this.vel, other.vel);
      let velAlongNormal = p5.Vector.dot(relativeVel, direction);

      if (velAlongNormal > 0) return; // Objects separating

      let restitution = 0.8;
      let j = -(1 + restitution) * velAlongNormal;
      j /= 1 / this.mass + 1 / other.mass;

      let impulse = p5.Vector.mult(direction, j);

      this.vel.add(p5.Vector.div(impulse, this.mass));
      other.vel.sub(p5.Vector.div(impulse, other.mass));
    }
  }
}

function handleCanvasClick() {
  // Add new ball at mouse position
  balls.push(new Ball(mouseX, mouseY));
  return false;
}

function keyPressed() {
  if (key === "r" || key === "R") {
    // Reset simulation
    balls = [];
    for (let i = 0; i < 8; i++) {
      balls.push(new Ball(random(100, width - 100), random(50, 200)));
    }
  }
}
