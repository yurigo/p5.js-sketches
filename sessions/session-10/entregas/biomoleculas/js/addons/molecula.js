class Molecula {

  constructor(x, y, col, tamano, velocidad) {
    this.x = x;
    this.y = y;
    this.color = col;
    this.tamano = tamano;
    this.velocidad = velocidad;
    this.angulo = random(TWO_PI);

    this.enlaces = [];
    this.maxEnlaces = 0;

    this.ix = 0;           // impulso en x
    this.iy = 0;           // impulso en y
    this.pausa = 0;        // frames sin poder enlazarse
    this.pulso = 0;        // hinchazón momentánea
    this.consumida = false;
    this.activo = 0;
  }

  mover() {
    // Impulso recibido (se va apagando)
    this.x += this.ix;
    this.y += this.iy;
    this.ix *= 0.92;
    this.iy *= 0.92;
    if (this.pausa > 0) this.pausa--;
    if (this.activo > 0) this.activo--;
    this.pulso *= 0.9;

    // Movimiento propio
    this.x += cos(this.angulo) * this.velocidad;
    this.y += sin(this.angulo) * this.velocidad;
    this.angulo += random(-0.1, 0.1);

    // Rebote en los bordes
    if (this.x < 0 || this.x > width) {
      this.angulo = PI - this.angulo;
      this.x = constrain(this.x, 0, width);
    }
    if (this.y < 0 || this.y > height) {
      this.angulo = -this.angulo;
      this.y = constrain(this.y, 0, height);
    }
  }

  interactuar(otra) {}

  separar(otra, minimo) {
    let d = dist(this.x, this.y, otra.x, otra.y);
    if (d < minimo && d > 0) {
      let empuje = (minimo - d) * 0.15;
      let dx = (this.x - otra.x) / d;
      let dy = (this.y - otra.y) / d;
      this.x += dx * empuje;
      this.y += dy * empuje;
      otra.x -= dx * empuje;
      otra.y -= dy * empuje;
    }
  }

  revisarEnlaces() {
    this.enlaces = this.enlaces.filter(
      (otra) => dist(this.x, this.y, otra.x, otra.y) < 150
    );
  }

  cadena() {
    let visitadas = [this];
    let pendientes = [this];

    while (pendientes.length > 0) {
      let actual = pendientes.pop();
      for (let vecina of actual.enlaces) {
        if (!visitadas.includes(vecina)) {
          visitadas.push(vecina);
          pendientes.push(vecina);
        }
      }
    }
    return visitadas;
  }

  dibujarEnlaces() {
    stroke(255, 255, 255, 200);
    strokeWeight(3);
    for (let otra of this.enlaces) {
      line(this.x, this.y, otra.x, otra.y);
    }
  }

  dibujar() {
    noStroke();
    fill(this.color);
    circle(this.x, this.y, this.tamano * (1 + this.pulso * 0.6));
  }
}