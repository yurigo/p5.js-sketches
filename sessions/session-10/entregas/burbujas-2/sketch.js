// ------------------------------------------------------------
// BURBUJAS - ecosistema generativo audiovisual
//
//   Mover el ratón : nacen burbujas y las cercanas se acercan
//   Clic           : explotan las burbujas cercanas al ratón
//   R              : reiniciar
//   S              : guardar una captura
// ------------------------------------------------------------

// Valores generales (se pueden cambiar para probar)
const MIN_BURBUJAS = 90;
const MAX_BURBUJAS = 150;
const RADIO_MIN = 2;
const RADIO_MAX = 10;
const VELOCIDAD_MAX = 2;
const RADIO_VISION = 80; // hasta dónde "ve" una burbuja a las demás
const RADIO_RATON = 300; // hasta dónde atrae el ratón
const RADIO_CLIC = 150; // hasta dónde llega la explosión del clic
const DISTANCIA_NACER = 20; // píxeles que hay que mover el ratón

let burbujas = [];
let particulas = [];
let sonido;

// Última posición del ratón en la que nació una burbuja
let ultimoX = 0;
let ultimoY = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  sonido = new Sonido();
  reiniciar();
}

function reiniciar() {
  burbujas = [];
  particulas = [];
  background(0);

  // Empezamos con 90 burbujas: 30 de cada familia
  for (let i = 0; i < MIN_BURBUJAS; i++) {
    burbujas.push(new Burbuja(random(width), random(height), i % 3));
  }
}

function draw() {
  // Contamos cuántas hay de cada familia
  let cuenta = [0, 0, 0];
  for (let b of burbujas) {
    cuenta[b.familia] = cuenta[b.familia] + 1;
  }

  // Fondo semitransparente: deja rastro de lo que se mueve.
  // Se tiñe un poco del color de la familia que más abunda.
  background(cuenta[0] / 5, cuenta[1] / 5, cuenta[2] / 5, 30);

  nacerConElRaton();

  // Agentes
  let sumaVelocidad = 0;
  for (let b of burbujas) {
    b.seguirRaton();
    b.relacionar(burbujas);
    b.mover();
    b.dibujar();
    sumaVelocidad = sumaVelocidad + dist(0, 0, b.vx, b.vy);
  }

  // Partículas
  for (let p of particulas) {
    p.actualizar();
    p.dibujar();
  }

  // Quitamos lo que ha muerto (recorriendo al revés para no saltarnos nada)
  for (let i = burbujas.length - 1; i >= 0; i--) {
    if (burbujas[i].viva == false) burbujas.splice(i, 1);
  }
  for (let i = particulas.length - 1; i >= 0; i--) {
    if (particulas[i].estaMuerta()) particulas.splice(i, 1);
  }

  // Si quedan pocas burbujas, va naciendo una nueva en cada fotograma
  if (burbujas.length < MIN_BURBUJAS) {
    burbujas.push(new Burbuja(random(width), random(height), int(random(3))));
  }

  sonido.actualizarFondo(burbujas.length, sumaVelocidad / burbujas.length);

  dibujarTexto(cuenta);
}

// Cada vez que el ratón se aleja más de 20 px del último punto, nace una burbuja
function nacerConElRaton() {
  if (dist(mouseX, mouseY, ultimoX, ultimoY) > DISTANCIA_NACER) {
    // Si ya hay el máximo, la más vieja explota para dejar sitio
    if (burbujas.length >= MAX_BURBUJAS) {
      burbujas[0].explotar();
    }
    burbujas.push(new Burbuja(mouseX, mouseY, int(random(3))));

    ultimoX = mouseX;
    ultimoY = mouseY;
  }
}

function dibujarTexto(cuenta) {
  noStroke();
  fill(255, 120);
  textSize(12);
  text(
    "rojas " + cuenta[0] + "   verdes " + cuenta[1] + "   azules " + cuenta[2] +
      "   |   mover: crear   clic: explotar   R: reiniciar   S: captura",
    15,
    height - 15
  );
}

function mousePressed() {
  userStartAudio(); // el navegador solo deja sonar después de un clic

  for (let b of burbujas) {
    if (dist(mouseX, mouseY, b.x, b.y) < RADIO_CLIC) {
      b.explotar();
    }
  }
}

function keyPressed() {
  if (key == "r" || key == "R") reiniciar();
  if (key == "s" || key == "S") saveCanvas("burbujas", "png");
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
