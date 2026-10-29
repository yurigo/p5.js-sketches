class Vehicle {
  constructor(x, y) {
    this.position = createVector(x, y);
    this.velocity = p5.Vector.random2D().mult(random(0.3, 1));
    this.acceleration = createVector(0, 0);
    this.r = 4;
    this.maxspeed = 1.5;
    this.maxforce = 0.05;
    this.semilla = random(1000); // desfase propio para noise()
    this.edad = 0; 
  }

  update() {
    this.velocity.add(this.acceleration);
    this.velocity.limit(this.maxspeed);
    this.position.add(this.velocity);
    this.acceleration.mult(0);
    this.edad++;
  }

  applyForce(force) {
    this.acceleration.add(force);
  }

  // Ir hacia un objetivo
  seek(target, peso = 1) {
    let desired = p5.Vector.sub(target, this.position);
    desired.setMag(this.maxspeed);
    let steer = p5.Vector.sub(desired, this.velocity);
    steer.limit(this.maxforce);
    steer.mult(peso);
    this.applyForce(steer);
  }

  // huir de un punto
  flee(target, peso = 1) {
    let desired = p5.Vector.sub(this.position, target);
    desired.setMag(this.maxspeed);
    let steer = p5.Vector.sub(desired, this.velocity);
    steer.limit(this.maxforce);
    steer.mult(peso);
    this.applyForce(steer);
  }

  // Deambular siguiendo un campo de noise():
  // cada punto del espacio sugiere una dirección que cambia lentamente.
  wander(escala, peso = 1) {
    const n = noise(
      this.position.x * escala,
      this.position.y * escala,
      frameCount * 0.002 + this.semilla
    );
    const angulo = n * TWO_PI * 2;
    let desired = p5.Vector.fromAngle(angulo).setMag(this.maxspeed);
    let steer = p5.Vector.sub(desired, this.velocity);
    steer.limit(this.maxforce);
    steer.mult(peso);
    this.applyForce(steer);
  }

  // lo que sale por un lado entra por el otro
  edges() {
    const m = 20;
    if (this.position.x < -m) this.position.x = width + m;
    if (this.position.x > width + m) this.position.x = -m;
    if (this.position.y < -m) this.position.y = height + m;
    if (this.position.y > height + m) this.position.y = -m;
  }

  distanciaA(otro) {
    return p5.Vector.dist(this.position, otro.position);
  }
}


// Se dibuja con blendMode(ADD), así que los halos que se solapan

function halo(x, y, d, col, a) {
  noStroke();
  fill(col[0], col[1], col[2], 18 * a);
  circle(x, y, d * 2.6);
  fill(col[0], col[1], col[2], 45 * a);
  circle(x, y, d * 1.3);
  fill(col[0], col[1], col[2], 160 * a);
  circle(x, y, d * 0.45);
}

function mezclarColores(a, b) {
  const hA = hue(color(a[0], a[1], a[2]));
  const hB = hue(color(b[0], b[1], b[2]));
  const diferencia = ((hB - hA + 540) % 360) - 180; // camino más corto
  const h = (hA + diferencia / 2 + 360) % 360;
  colorMode(HSB, 360, 100, 100);
  const c = color(h, 80, 100);
  colorMode(RGB, 255);
  return [red(c), green(c), blue(c)];
}
