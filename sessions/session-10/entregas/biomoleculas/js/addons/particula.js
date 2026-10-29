 class Particula {

  constructor(x, y, col) {
    this.x = x;
    this.y = y;
    this.color = col;

    // Sale disparada en una dirección aleatoria
    let angulo = random(TWO_PI);
    let velocidad = random(0.5, 2);
    this.vx = cos(angulo) * velocidad;
    this.vy = sin(angulo) * velocidad;

    this.vida = 255; // empieza opaca y se apaga hasta 0
  }

  actualizar() {
    this.x += this.vx;
    this.y += this.vy;
    this.vx *= 0.96; // frena poco a poco (como en un líquido)
    this.vy *= 0.96;
    this.vida -= 4;
  }

  estaMuerta() {
    return this.vida <= 0;
  }

  dibujar() {
    noStroke();
    fill(red(this.color), green(this.color), blue(this.color), this.vida);
    circle(this.x, this.y, 4);
  }
}