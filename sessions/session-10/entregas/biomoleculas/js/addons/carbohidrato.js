class Carbohidrato extends Molecula {

  constructor(x, y) {
    super(x, y, color(255, 150, 40), 10, 3.5);
    this.maxEnlaces = 2;
    this.velocidadBase = 3;
    this.largoEnlace = 40; // distancia ideal entre eslabones
    this.pegadoA = null; // el lípido al que está pegado (null = libre)
  }

  interactuar(otra) {
    if (!(otra instanceof Carbohidrato)) return;


    if (this.pegadoA || otra.pegadoA) return; // los pegados no se enlazan ni se separan
    this.separar(otra, 20); // nunca se solapan
    if (this.pausa > 0 || otra.pausa > 0) return; // recién rotas: no se enlazan aún

    let d = dist(this.x, this.y, otra.x, otra.y);
    if (d >= 26) return;

    let estoyLibre = this.enlaces.length < this.maxEnlaces;
    let ellaEstaLibre = otra.enlaces.length < otra.maxEnlaces;
    if (!estoyLibre || !ellaEstaLibre) return;

    let miCadena = this.cadena();
    let mismaCadena = miCadena.includes(otra);
    let largoTotal = miCadena.length + otra.cadena().length;

    if (!mismaCadena && largoTotal <= 8) {
      this.enlaces.push(otra);
      otra.enlaces.push(this);
    }
  }

  mover() {
    if (this.pegadoA) {
      this.seguirLiposoma();
      return;
    }
    this.velocidad = this.velocidadBase / (1 + this.enlaces.length);

    // NUEVO: me oriento hacia la misma dirección que mis enlazadas
    for (let otra of this.enlaces) {
      let sumaX = cos(this.angulo) + cos(otra.angulo);
      let sumaY = sin(this.angulo) + sin(otra.angulo);
      this.angulo = atan2(sumaY, sumaX);
    }

    super.mover();

    for (let otra of this.enlaces) {
      let d = dist(this.x, this.y, otra.x, otra.y);
      if (d > 0) {
        let error = d - this.largoEnlace; // positivo = lejos, negativo = cerca
        this.x += ((otra.x - this.x) / d) * error * 0.1;
        this.y += ((otra.y - this.y) / d) * error * 0.1;
      }
    }
  }
  // Pegado al borde exterior del liposoma
  seguirLiposoma() {
    let lip = this.pegadoA;

    // Si el liposoma se rompe, el carbohidrato se suelta
    if (!lip.formado || lip.consumida) {
      this.pegadoA = null;
      this.pausa = 60;
      return;
    }

    let c = lip.centro();
    let a = atan2(lip.y - c.y, lip.x - c.x); // dirección del centro hacia el lípido
    this.x = lerp(this.x, lip.x + cos(a) * 16, 0.2);
    this.y = lerp(this.y, lip.y + sin(a) * 16, 0.2);
  }
}