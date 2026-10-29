class ParticulaBurbuja {
  x; y; vx; vy; vida;

  constructor(x, y) {
    const angulo = random(360);
    const velocidad = random(1, 3);

    this.x = x;
    this.y = y;
    this.vx = cos(angulo) * velocidad;
    this.vy = sin(angulo) * velocidad;
    this.vida = 255;
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;
    this.vida -= 6;
  }

  draw() {
    noStroke();
    fill(200, 230, 255, this.vida);
    circle(this.x, this.y, 6);
  }
}