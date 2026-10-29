class Onda {

  constructor(x, y, col, expansion = 1.5) {
  this.x = x;
  this.y = y;
  this.color = col;
  this.radio = 4;
  this.vida = 255;
  this.expansion = expansion; // cuánto crece por frame
}

actualizar() {
  this.radio += this.expansion;
  this.vida -= 6;
}

  estaMuerta() {
    return this.vida <= 0;
  }

  dibujar() {
    noFill();
    stroke(red(this.color), green(this.color), blue(this.color), this.vida);
    strokeWeight(2);
    circle(this.x, this.y, this.radio * 2);
  }
}