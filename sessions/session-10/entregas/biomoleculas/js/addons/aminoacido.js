class Aminoacido extends Molecula {

  constructor(x, y) {
    super(x, y, color(80, 160, 255), 10, 2);
    this.maxEnlaces = 2;
    this.velocidadBase = this.velocidad;
    this.largoEnlace = 26;
    this.largoMaxCadena = 5;
    this.plegada = false;
    this.orden = 0;
  }

  interactuar(otra) {
    if (!(otra instanceof Aminoacido)) return;

    let minimo = (this.plegada || otra.plegada) ? 11 : 18;
    this.separar(otra, minimo);
    if (this.pausa > 0 || otra.pausa > 0) return;

    let d = dist(this.x, this.y, otra.x, otra.y);
    if (d >= 24) return;

    let estoyLibre = this.enlaces.length < this.maxEnlaces;
    let ellaEstaLibre = otra.enlaces.length < otra.maxEnlaces;
    if (!estoyLibre || !ellaEstaLibre) return;

    let miCadena = this.cadena();
    let mismaCadena = miCadena.includes(otra);
    let largoTotal = miCadena.length + otra.cadena().length;

    if (!mismaCadena && largoTotal <= this.largoMaxCadena) {
      this.enlaces.push(otra);
      otra.enlaces.push(this);
      this.plegarSiCompleta();
    }
  }

  plegarSiCompleta() {
    let cadena = this.cadena();
    if (cadena.length >= this.largoMaxCadena && !this.plegada) {
      let orden = this.ordenCadena();
      let cx = 0;
      let cy = 0;
      for (let i = 0; i < orden.length; i++) {
        orden[i].plegada = true;
        orden[i].orden = i;
        cx += orden[i].x;
        cy += orden[i].y;
      }
      crearParticulas(cx / orden.length, cy / orden.length, this.color, 14);
      sonar('formar');
    }
  }

  mover() {
    let cadena = this.cadena();

    if (cadena.length < this.largoMaxCadena) this.plegada = false;

    this.velocidad = this.velocidadBase / (1 + this.enlaces.length);
    if (this.plegada) this.velocidad *= 0.5;

    for (let otra of this.enlaces) {
      let sumaX = cos(this.angulo) + cos(otra.angulo);
      let sumaY = sin(this.angulo) + sin(otra.angulo);
      this.angulo = atan2(sumaY, sumaX);
    }

    super.mover();

    if (this.plegada) {
      let cx = 0;
      let cy = 0;
      for (let m of cadena) {
        cx += m.x;
        cy += m.y;
      }
      cx = cx / cadena.length;
      cy = cy / cadena.length;

      let radio = 2.7 * cadena.length;
      let angulo = TWO_PI * this.orden / cadena.length + frameCount * 0.01;
      this.x = lerp(this.x, cx + cos(angulo) * radio, 0.15);
      this.y = lerp(this.y, cy + sin(angulo) * radio, 0.15);
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

  dibujar() {
    super.dibujar();

    // Solo el eslabón 0 dibuja lo común a toda la proteína
    if (this.plegada && this.orden === 0) {
      let cadena = this.cadena();

      // Línea que cierra el anillo
      let ultimo = cadena.find((m) => m.orden === this.largoMaxCadena - 1);
      if (ultimo) {
        stroke(255, 255, 255, 200);
        strokeWeight(3);
        line(this.x, this.y, ultimo.x, ultimo.y);
      }

      // Centro de la proteína
      let cx = 0;
      let cy = 0;
      for (let m of cadena) {
        cx += m.x;
        cy += m.y;
      }
      cx = cx / cadena.length;
      cy = cy / cadena.length;

      // Círculo que la envuelve, "respirando" despacio
      let respiracion = sin(frameCount * 0.05) * 3;
      let radio = 2.7 * cadena.length;
      fill(80, 160, 255, 30);
      stroke(80, 160, 255, 140);
      strokeWeight(2);
      circle(cx, cy, radio * 2 + this.tamano + 16 + respiracion);
    }
  }

  ordenCadena() {
    let cadena = this.cadena();
    let actual = cadena.find((m) => m.enlaces.length <= 1);
    let anterior = null;
    let orden = [actual];

    while (true) {
      let siguiente = actual.enlaces.find((e) => e !== anterior);
      if (!siguiente) break;
      orden.push(siguiente);
      anterior = actual;
      actual = siguiente;
    }
    return orden;
  }
}