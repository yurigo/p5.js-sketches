// ------------------------------------------------------------
// BURBUJA
// Es el agente del ecosistema. Hay 3 familias:
//   0 = rojas    1 = verdes    2 = azules
//
// Reglas entre familias (como piedra, papel, tijera):
//   las rojas persiguen a las verdes,
//   las verdes persiguen a las azules,
//   las azules persiguen a las rojas.
// ------------------------------------------------------------

class Burbuja {
  constructor(x, y, familia) {
    this.x = x;
    this.y = y;
    this.vx = random(-1, 1);
    this.vy = random(-1, 1);

    this.familia = familia;
    this.radio = random(RADIO_MIN, RADIO_MAX);

    // Cada burbuja tiene su propio punto de partida en el noise()
    // para que no se muevan todas igual
    this.semilla = random(1000);

    this.edad = 0;
    this.vidaMaxima = random(1200, 3600); // entre 20 y 60 segundos
    this.viva = true;

    this.elegirColor();
  }

  // El color depende de la familia: un canal fuerte y los otros dos flojos.
  // La transparencia nunca pasa de 127 (el 50% de 255).
  elegirColor() {
    this.r = random(0, 120);
    this.g = random(0, 120);
    this.b = random(0, 120);

    if (this.familia == 0) {
      this.r = random(180, 255);
    }
    if (this.familia == 1) {
      this.g = random(180, 255);
    }
    if (this.familia == 2) {
      this.b = random(180, 255);
    }

    this.alfa = random(60, 127);
  }

  // MOVIMIENTO AUTÓNOMO: noise() da un ángulo que cambia suavemente
  // y la burbuja acelera un poquito en esa dirección.
  mover() {
    let angulo = noise(this.semilla, frameCount * 0.01) * TWO_PI * 2;
    this.vx = this.vx + cos(angulo) * 0.05;
    this.vy = this.vy + sin(angulo) * 0.05;

    // Límite de velocidad
    this.vx = constrain(this.vx, -VELOCIDAD_MAX, VELOCIDAD_MAX);
    this.vy = constrain(this.vy, -VELOCIDAD_MAX, VELOCIDAD_MAX);

    this.x = this.x + this.vx;
    this.y = this.y + this.vy;

    // Si sale por un lado, entra por el contrario
    if (this.x < 0) this.x = width;
    if (this.x > width) this.x = 0;
    if (this.y < 0) this.y = height;
    if (this.y > height) this.y = 0;

    // Envejece. Cuando llega a su vida máxima explota sola.
    this.edad = this.edad + 1;
    if (this.edad > this.vidaMaxima) {
      this.explotar();
    }
  }

  // INTERACCIÓN: solo mientras el ratón se mueve, las burbujas
  // cercanas se sienten atraídas hacia él.
  seguirRaton() {
    let ratonSeMueve = dist(mouseX, mouseY, pmouseX, pmouseY) > 1;
    let d = dist(this.x, this.y, mouseX, mouseY);

    if (ratonSeMueve && d < RADIO_RATON && d > 1) {
      this.vx = this.vx + ((mouseX - this.x) / d) * 0.3;
      this.vy = this.vy + ((mouseY - this.y) / d) * 0.3;
    }
  }

  // RELACIONES con el resto de burbujas
  relacionar(otras) {
    let presa = (this.familia + 1) % 3; // familia a la que persigo
    let cazador = (this.familia + 2) % 3; // familia que me persigue

    for (let otra of otras) {
      if (otra == this || otra.viva == false) continue;

      let d = dist(this.x, this.y, otra.x, otra.y);
      if (d > RADIO_VISION || d < 1) continue;

      // Dirección hacia la otra burbuja (valores entre -1 y 1)
      let dx = (otra.x - this.x) / d;
      let dy = (otra.y - this.y) / d;

      // 1) ATRACCIÓN: voy hacia mi presa
      if (otra.familia == presa) {
        this.vx = this.vx + dx * 0.04;
        this.vy = this.vy + dy * 0.04;

        // 2) TRANSFORMACIÓN: si la toco, pasa a ser de mi familia
        if (d < this.radio + otra.radio) {
          this.contagiar(otra);
        }
      }

      // 3) REPULSIÓN: huyo de mi cazador
      if (otra.familia == cazador) {
        this.vx = this.vx - dx * 0.03;
        this.vy = this.vy - dy * 0.03;
      }

      // 4) CONEXIÓN: una línea fina me une a las de mi familia
      if (otra.familia == this.familia) {
        stroke(this.r, this.g, this.b, 40);
        strokeWeight(0.5);
        line(this.x, this.y, otra.x, otra.y);
      }
    }
  }

  contagiar(otra) {
    otra.familia = this.familia;
    otra.elegirColor();

    // La que contagia crece un poco (sin pasar del máximo)
    this.radio = min(this.radio + 0.5, RADIO_MAX);

    // Consecuencia visual y sonora del encuentro
    for (let i = 0; i < 4; i++) {
      particulas.push(new Particula(otra.x, otra.y, this.r, this.g, this.b, 1));
    }
    sonido.sonarContagio(this.familia, this.radio);
  }

  explotar() {
    if (this.viva == false) return;
    this.viva = false;

    for (let i = 0; i < 10; i++) {
      particulas.push(new Particula(this.x, this.y, this.r, this.g, this.b, 3));
    }
    sonido.sonarExplosion(this.familia, this.radio);
  }

  dibujar() {
    noStroke();
    fill(this.r, this.g, this.b, this.alfa);
    circle(this.x, this.y, this.radio * 2);
  }
}
