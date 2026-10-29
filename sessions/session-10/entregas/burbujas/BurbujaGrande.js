class BurbujaGrande {
  x; y; tipo; radio; color; velocidadSubida; amplitudVaiven; desfaseRuido; impulsoX; impulsoY; eliminar;

  constructor(x, y, impulsoX = 0, impulsoY = 0) {
    this.x = x;
    this.y = y;
    this.tipo = "grande";
    this.radio = 40;
    this.color = color(200, 170, 255);
    this.velocidadSubida = 0.6;
    this.amplitudVaiven = 0.5;
    this.desfaseRuido = random(1000);
    this.impulsoX = impulsoX;
    this.impulsoY = impulsoY;
    this.eliminar = false;
  }

  update() {
    this.y -= this.velocidadSubida;

    const vaiven = map(noise(this.desfaseRuido + frameCount * 0.01), 0, 1, -this.amplitudVaiven, this.amplitudVaiven);
    this.x += vaiven;

    this.x += vientoX;
    this.y += vientoY;

    this.x += this.impulsoX;
    this.y += this.impulsoY;
    this.impulsoX *= 0.9;
    this.impulsoY *= 0.9;

    if (this.x - this.radio < 0) {
      this.x = this.radio;
    } else if (this.x + this.radio > width) {
      this.x = width - this.radio;
    }

    if (this.y < -this.radio) {
      this.y = height + this.radio;
      this.x = random(width);
    }
  }

  repeler(mx, my) {
    const d = dist(mx, my, this.x, this.y);

    if (d < radioRepulsion && d > 0) {
      const dx = this.x - mx;
      const dy = this.y - my;
      this.x += (dx / d) * fuerzaRepulsion;
      this.y += (dy / d) * fuerzaRepulsion;
    }
  }

  tocaA(otra) {
    const d = dist(this.x, this.y, otra.x, otra.y);
    return d < this.radio + otra.radio;
  }

  separarDe(otra, fuerza) {
    const d = dist(this.x, this.y, otra.x, otra.y);

    if (d > 0) {
      const dx = this.x - otra.x;
      const dy = this.y - otra.y;
      this.x += (dx / d) * fuerza;
      this.y += (dy / d) * fuerza;
    }
  }

  atraerA(otra, fuerza) {
    const d = dist(this.x, this.y, otra.x, otra.y);

    if (d > 0) {
      const dx = otra.x - this.x;
      const dy = otra.y - this.y;
      this.x += (dx / d) * fuerza;
      this.y += (dy / d) * fuerza;
    }
  }

  explotar() {
    for (let j = 0; j < 8; j++) {
    particulas.push(new ParticulaBurbuja(this.x, this.y, this.color));
    }
    this.eliminar = true;
  }

  contieneAlRaton(mx, my) {
    return dist(mx, my, this.x, this.y) < this.radio;
  }

  draw() {
    stroke(this.color);
    strokeWeight(2);
    noFill();
    circle(this.x, this.y, this.radio * 2);
  }
}