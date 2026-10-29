// ------------------------------------------------------------
// PARTICULA
// Sistema secundario: puntitos que salen cuando pasa algo
// (una burbuja explota o una burbuja contagia a otra).
// Viven poco tiempo: se van apagando hasta desaparecer.
// ------------------------------------------------------------

class Particula {
  constructor(x, y, r, g, b, fuerza) {
    this.x = x;
    this.y = y;

    // Sale disparada en una dirección al azar
    this.vx = random(-fuerza, fuerza);
    this.vy = random(-fuerza, fuerza);

    this.r = r;
    this.g = g;
    this.b = b;

    this.vida = 127; // empieza al 50% de opacidad y baja hasta 0
    this.tamano = random(1, 3);
  }

  actualizar() {
    this.x = this.x + this.vx;
    this.y = this.y + this.vy;

    // Se va frenando poco a poco
    this.vx = this.vx * 0.95;
    this.vy = this.vy * 0.95;

    this.vida = this.vida - 3;
  }

  dibujar() {
    noStroke();
    fill(this.r, this.g, this.b, this.vida);
    circle(this.x, this.y, this.tamano * 2);
  }

  estaMuerta() {
    return this.vida <= 0;
  }
}
