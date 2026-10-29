
class Particula {
  constructor(x, y, tipo, col) {
    this.position = createVector(x, y);
    this.tipo = tipo;
    this.col = col;

    if (tipo === 'mezcla') {
      this.velocity = p5.Vector.random2D().mult(random(0.6, 2.6));
      this.ttl = random(30, 55);
      this.d = random(1.5, 3.5);
      this.rozamiento = 0.94;
    } else if (tipo === 'blanco') {
      this.velocity = p5.Vector.random2D().mult(random(2, 7));
      this.ttl = random(40, 80);
      this.d = random(1.5, 4);
      this.rozamiento = 0.95;
    } else {
      // prisma
      this.velocity = p5.Vector.random2D().mult(random(0.3, 1.2));
      this.ttl = random(50, 90);
      this.d = random(1, 2.5);
      this.rozamiento = 0.98;
    }
    this.ttlMax = this.ttl;
  }

  update() {
    this.position.add(this.velocity);
    this.velocity.mult(this.rozamiento);
    this.ttl--;
  }

  draw() {
    const a = this.ttl / this.ttlMax;
    noStroke();
    const c = this.col;
    fill(c[0], c[1], c[2], 220 * a);
    circle(this.position.x, this.position.y, this.d * (0.5 + a));
    // las blancas dejan además una pequeña aura
    if (this.tipo === 'blanco') {
      fill(c[0], c[1], c[2], 30 * a);
      circle(this.position.x, this.position.y, this.d * 5);
    }
  }

  isAlive() {
    return this.ttl > 0;
  }
}
