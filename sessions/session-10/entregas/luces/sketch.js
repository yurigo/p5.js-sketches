
const POR_FAMILIA = 40; // 3 × 40 = 120 agentes
const RADIO_CONEXION = 70;
const RADIO_ENCUENTRO = 14;
const RADIO_TRIPLE = 45;
const RADIO_PRISMA = 240;

let luces = [];
let particulas = [];
let ondas = [];
let capaMemoria; // capa de rastros que se acumulan y se desvanecen muy lento

let inicio = 0; // frame en que empezó la sesión actual
let inicioMs = 0;
let intensidad = 1; // fuerza de la persecución (evoluciona con noise)
let invertido = false;
let inversionManual = 0; 
let enfriamientoBlanco = 0;
let mezclas = 0;
let blancos = 0;
let conexiones = 0;
let mostrarInfo = true;

function setup() {
  createCanvas(windowWidth, windowHeight);
  capaMemoria = createGraphics(width, height);
  prepararSonido();
  reiniciar();
}

function reiniciar() {
  luces = [];
  particulas = [];
  ondas = [];
  noiseSeed(floor(random(100000)));
  inicio = frameCount;
  inicioMs = millis();
  inversionManual = 0;
  mezclas = 0;
  blancos = 0;
  capaMemoria.background(4, 5, 10);

  // Cada familia nace agrupada en su propia región
  // está separado en tres manchas de color que luego se buscan.
  for (let f = 0; f < 3; f++) {
    const angulo = (TWO_PI / 3) * f - HALF_PI;
    const cx = width / 2 + cos(angulo) * min(width, height) * 0.28;
    const cy = height / 2 + sin(angulo) * min(width, height) * 0.28;
    for (let i = 0; i < POR_FAMILIA; i++) {
      luces.push(new Luz(cx + random(-90, 90), cy + random(-90, 90), f));
    }
  }
}

function draw() {
  const t = frameCount - inicio;
  actualizarAmbiente(t);

  image(capaMemoria, 0, 0);

  blendMode(ADD); // los halos que se solapan suman su luz

  // cada luz percibe a las demás y decide
  for (const luz of luces) {
    luz.comportarse(luces, intensidad, invertido);
    aplicarPerturbaciones(luz);
  }
  for (const luz of luces) luz.vivir();

  // conexiones y encuentros
  relacionarPares();

 
  for (const luz of luces) luz.show();
  dejarRastros();

  if (mouseIsPressed) dibujarPrisma();

  for (const o of ondas) {
    o.update();
    o.draw();
  }
  for (const p of particulas) {
    p.update();
    p.draw();
  }
  ondas = ondas.filter((o) => o.isAlive());
  particulas = particulas.filter((p) => p.isAlive());

  blendMode(BLEND);

  actualizarSonido(estadisticas());
  dibujarInfo(t);
}



function actualizarAmbiente(t) {
  // La intensidad de la persecución deriva lentamente:
  // hay fases de calma (deriva libre) y fases de frenesí (espirales).
  intensidad = map(noise(t * 0.0006, 10), 0.25, 0.75, 0.1, 1.5, true);

  // Cada cierto tiempo el ciclo se invierte solo (o con la tecla I)
  const autoInversion = noise(t * 0.0004, 50) > 0.66;
  if (inversionManual > 0) inversionManual--;
  const nuevoInvertido = autoInversion !== inversionManual > 0;
  if (nuevoInvertido !== invertido) {
    invertido = nuevoInvertido;
    ondas.push(new Onda(width / 2, height / 2, [90, 90, 90], max(width, height), 120, 3));
  }

  if (enfriamientoBlanco > 0) enfriamientoBlanco--;


  if (frameCount % 2 === 0) {
    capaMemoria.blendMode(BLEND);
    capaMemoria.noStroke();
    capaMemoria.fill(4, 5, 10, 10);
    capaMemoria.rect(0, 0, width, height);
  }
}

function dejarRastros() {
  capaMemoria.blendMode(ADD);
  capaMemoria.noStroke();
  for (const luz of luces) {
    const c = luz.col;
    capaMemoria.fill(c[0], c[1], c[2], 7);
    capaMemoria.circle(luz.position.x, luz.position.y, luz.r * 2.2);
  }
}

function relacionarPares() {
  conexiones = 0;
  for (let i = 0; i < luces.length; i++) {
    const a = luces[i];
    for (let j = i + 1; j < luces.length; j++) {
      const b = luces[j];
      if (a.familia === b.familia) continue;
      const d = a.distanciaA(b);
      if (d > RADIO_CONEXION) continue;

      //  hilo del color que nace entre ambas
      conexiones++;
      const mix = mezclarColores(a.col, b.col);
      stroke(mix[0], mix[1], mix[2], map(d, 0, RADIO_CONEXION, 140, 0));
      strokeWeight(map(d, 0, RADIO_CONEXION, 1.6, 0.3));
      line(a.position.x, a.position.y, b.position.x, b.position.y);

      if (d < RADIO_ENCUENTRO && a.enfriamiento === 0 && b.enfriamiento === 0) {
        encuentro(a, b, mix);
      }
    }
  }
}

function encuentro(a, b, mix) {
  mezclas++;
  const mx = (a.position.x + b.position.x) / 2;
  const my = (a.position.y + b.position.y) / 2;

  a.enfriamiento = b.enfriamiento = 45;
  a.destello = b.destello = 1;
  a.encuentros++;
  b.encuentros++;

  // la presa sale disparada, el perseguidor se frena
  const aPersigueAB = presaDe(a.familia, invertido) === b.familia;
  const presa = aPersigueAB ? b : a;
  const cazador = aPersigueAB ? a : b;
  const impulso = p5.Vector.sub(presa.position, cazador.position);
  if (impulso.mag() < 0.01) impulso.set(p5.Vector.random2D());
  presa.velocity.add(impulso.setMag(presa.maxspeed * 2));
  cazador.velocity.mult(0.2);

  // cada 4 encuentros una luz absorbe parte del color ajeno
  if (a.encuentros % 4 === 0) a.mutar(b.col);
  if (b.encuentros % 4 === 0) b.mutar(a.col);

  // chispas y una onda del color 
  for (let k = 0; k < 9; k++) particulas.push(new Particula(mx, my, 'mezcla', mix));
  ondas.push(new Onda(mx, my, mix, 34, 30, 1.5));
  capaMemoria.blendMode(ADD);
  capaMemoria.noStroke();
  capaMemoria.fill(mix[0], mix[1], mix[2], 40);
  capaMemoria.circle(mx, my, 10);

  sonarMezcla(a.familia, b.familia, my);

  
  comprobarBlanco(mx, my);
}

function comprobarBlanco(x, y) {
  if (enfriamientoBlanco > 0) return;
  const presentes = [0, 0, 0];
  const centro = createVector(x, y);
  for (const luz of luces) {
    if (p5.Vector.dist(luz.position, centro) < RADIO_TRIPLE) presentes[luz.familia]++;
  }
  if (presentes[0] && presentes[1] && presentes[2]) {
    blanco(x, y, presentes[0] + presentes[1] + presentes[2]);
  }
}

function blanco(x, y, cantidad) {
  blancos++;
  enfriamientoBlanco = 25;
  const W = [255, 255, 255];
  for (let k = 0; k < 45; k++) particulas.push(new Particula(x, y, 'blanco', W));
  ondas.push(new Onda(x, y, W, 220, 70, 4));
  ondas.push(new Onda(x, y, W, 120, 45, 2));

  // Explosión: empuja todas las luces cercanas hacia fuera
  for (const luz of luces) {
    const d = dist(luz.position.x, luz.position.y, x, y);
    if (d < 140 && d > 0) {
      const empuje = createVector(luz.position.x - x, luz.position.y - y);
      luz.velocity.add(empuje.setMag(map(d, 0, 140, 5, 0.5)));
      luz.destello = 1;
    }
  }

  capaMemoria.blendMode(ADD);
  capaMemoria.noStroke();
  capaMemoria.fill(255, 255, 255, 25);
  capaMemoria.circle(x, y, 90);

  sonarBlanco(cantidad);
}

function aplicarPerturbaciones(luz) {
  // mientras el ratón está pulsado, atrae las luces cercanas.
  if (mouseIsPressed) {
    const raton = createVector(mouseX, mouseY);
    const d = p5.Vector.dist(luz.position, raton);
    if (d < RADIO_PRISMA) luz.seek(raton, map(d, 0, RADIO_PRISMA, 0.4, 1.6));
  }
}

function dibujarPrisma() {
  // El prisma descompone luz blanca en los tres colores de las familias
  noFill();
  stroke(255, 255, 255, 25);
  strokeWeight(1);
  circle(mouseX, mouseY, RADIO_PRISMA * 2);
  if (frameCount % 2 === 0) {
    const col = colorDeFamilia(floor(random(3)));
    const p = new Particula(
      mouseX + random(-RADIO_PRISMA, RADIO_PRISMA) * 0.6,
      mouseY + random(-RADIO_PRISMA, RADIO_PRISMA) * 0.6,
      'prisma',
      col
    );
    particulas.push(p);
  }
}

function ondaExpansiva(x, y) {
  ondas.push(new Onda(x, y, [120, 120, 140], 320, 60, 3));
  for (const luz of luces) {
    const d = dist(luz.position.x, luz.position.y, x, y);
    if (d < 320 && d > 0) {
      const empuje = createVector(luz.position.x - x, luz.position.y - y);
      luz.velocity.add(empuje.setMag(map(d, 0, 320, 6, 0.5)));
    }
  }
}

function mousePressed() {
  iniciarAudio();
}

function keyPressed() {
  iniciarAudio();
  const k = key.toLowerCase();
  if (k === 'r') reiniciar();
  else if (k === 'i') inversionManual = inversionManual > 0 ? 0 : 480;
  else if (key === ' ') ondaExpansiva(mouseX, mouseY);
  else if (k === 'h') mostrarInfo = !mostrarInfo;
  else if (k === 'm') alternarSilencio();
  else if (k === 's') saveCanvas('entre', 'png');
  else if (k === 'g') saveGif('entre', 6);
  return false; // evita que el espacio haga scroll
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  const nueva = createGraphics(width, height);
  nueva.background(4, 5, 10);
  nueva.image(capaMemoria, 0, 0);
  capaMemoria = nueva;
}


function estadisticas() {
  const velMedia = [0, 0, 0];
  const xMedia = [0, 0, 0];
  const n = [0, 0, 0];
  for (const luz of luces) {
    velMedia[luz.familia] += luz.velocity.mag();
    xMedia[luz.familia] += luz.position.x;
    n[luz.familia]++;
  }
  for (let i = 0; i < 3; i++) {
    velMedia[i] = n[i] ? velMedia[i] / n[i] : 0;
    xMedia[i] = n[i] ? xMedia[i] / n[i] : width / 2;
  }
  return { velMedia, xMedia, conexiones, invertido };
}

function dibujarInfo(t) {
  const segundos = (millis() - inicioMs) / 1000;

  if (!audioActivo) {
    noStroke();
    textAlign(CENTER, BOTTOM);
    textFont('monospace');
    textSize(11);
    fill(200, 200, 220, 140 + 80 * sin(frameCount * 0.05));
    text('clic o tecla para encender el sonido', width / 2, height - 24);
  }

  if (!mostrarInfo) return;
  const m = floor(segundos / 60);
  const s = floor(segundos % 60);
  noStroke();
  textAlign(LEFT, BOTTOM);
  textFont('monospace');
  textSize(10);
  fill(150, 150, 170, 170);
  const lineas = [
    `${nf(m, 2)}:${nf(s, 2)}   luces ${luces.length}   mezclas ${mezclas}   blancos ${blancos}`,
    `persecución ${intensidad.toFixed(2)}   ciclo ${invertido ? 'M←T←Á (invertido)' : 'M→T→Á'}   hilos ${conexiones}`,
    'ratón: prisma · espacio: onda · I: invertir · R: reiniciar · M: silencio · S/G: captura · H: info',
  ];
  for (let i = 0; i < lineas.length; i++) {
    text(lineas[i], 18, height - 16 - (lineas.length - 1 - i) * 15);
  }
}
