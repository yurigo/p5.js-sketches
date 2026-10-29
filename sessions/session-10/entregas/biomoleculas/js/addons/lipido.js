class Lipido extends Molecula {

  constructor(x, y) {
    super(x, y, color(255, 220, 80), 15, 0.8); // <- pon aquí TUS valores
    this.maxEnlaces = 3;
    this.velocidadBase = this.velocidad;
    this.largoEnlace = 30;
    this.tamanoLiposoma = 6; // al juntarse 6, se cierran en anillo
    this.formado = false;
    this.orden = 0;
  }

  interactuar(otra) {
    if (!(otra instanceof Lipido)) return;

    this.separar(otra, 18);
    if (this.pausa > 0 || otra.pausa > 0) return; // recién rotas: no se enlazan aún

    let d = dist(this.x, this.y, otra.x, otra.y);

    // Efecto hidrofóbico: se acercan suavemente entre sí
    if (d < 100 && d > 0 && !this.formado && !otra.formado) {
      let fx = ((otra.x - this.x) / d) * 0.08;
      let fy = ((otra.y - this.y) / d) * 0.08;
      this.x += fx;
      this.y += fy;
      otra.x -= fx;
      otra.y -= fy;
    }

    if (d >= 28) return;

    let estoyLibre = this.enlaces.length < this.maxEnlaces;
    let ellaEstaLibre = otra.enlaces.length < otra.maxEnlaces;
    if (!estoyLibre || !ellaEstaLibre) return;

    let miCadena = this.cadena();
    let mismoGrupo = miCadena.includes(otra);
    let largoTotal = miCadena.length + otra.cadena().length;

    if (!mismoGrupo && largoTotal <= this.tamanoLiposoma) {
      this.enlaces.push(otra);
      otra.enlaces.push(this);
      this.formarSiCompleto();
    }
  }

  // Si el grupo ya tiene 8 lípidos, se cierra el liposoma
  formarSiCompleto() {
    let grupo = this.cadena();
    if (grupo.length >= this.tamanoLiposoma && !this.formado) {
      let cx = 0;
      let cy = 0;
      for (let i = 0; i < grupo.length; i++) {
        grupo[i].formado = true;
        grupo[i].orden = i; // cada uno recuerda su sitio en el anillo
        cx += grupo[i].x;
        cy += grupo[i].y;
      }
      crearParticulas(cx / grupo.length, cy / grupo.length, this.color, 14);
      sonar('formar');
    }
  }

  // Centro del grupo (media de las posiciones)
  centro() {
    let grupo = this.cadena();
    let cx = 0;
    let cy = 0;
    for (let m of grupo) {
      cx += m.x;
      cy += m.y;
    }
    return { x: cx / grupo.length, y: cy / grupo.length, n: grupo.length };
  }

  mover() {
    let grupo = this.cadena();

    // Si el grupo se rompe, la membrana se abre
    if (grupo.length < this.tamanoLiposoma) this.formado = false;

    this.velocidad = this.velocidadBase / (1 + this.enlaces.length);

    for (let otra of this.enlaces) {
      let sumaX = cos(this.angulo) + cos(otra.angulo);
      let sumaY = sin(this.angulo) + sin(otra.angulo);
      this.angulo = atan2(sumaY, sumaX);
    }

    super.mover();

    if (this.formado) {
      let c = this.centro();
      let radio = 3.2 * c.n;
      let angulo = TWO_PI * this.orden / c.n + frameCount * 0.005;
      this.x = lerp(this.x, c.x + cos(angulo) * radio, 0.15);
      this.y = lerp(this.y, c.y + sin(angulo) * radio, 0.15);
    } else {
      for (let otra of this.enlaces) {
        let d = dist(this.x, this.y, otra.x, otra.y);
        if (d > 0) {
          let error = d - this.largoEnlace;
          this.x += ((otra.x - this.x) / d) * error * 0.1;
          this.y += ((otra.y - this.y) / d) * error * 0.1;
        }
      }
    }
  }

  // Dentro del liposoma no se dibujan líneas de enlace
  dibujarEnlaces() {
    if (this.formado) return;
    super.dibujarEnlaces();
  }

  dibujar() {
    // Cola: una línea corta que apunta al centro del grupo
    if (this.formado) {
      let c = this.centro();
      let a = atan2(c.y - this.y, c.x - this.x);
      stroke(this.color);
      strokeWeight(3);
      line(this.x, this.y, this.x + cos(a) * 10, this.y + sin(a) * 10);

      // Solo el lípido 0 dibuja la membrana del conjunto
      if (this.orden === 0) {
        fill(255, 220, 80, 25);
        stroke(255, 220, 80, 100);
        strokeWeight(1.5);
        circle(c.x, c.y, 3.2 * c.n * 2 + this.tamano + 12);
      }
    }
    super.dibujar(); // la cabeza (el círculo)
  }
}