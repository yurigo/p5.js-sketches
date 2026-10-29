let burbujas = [];
let particulas = [];

const radioRepulsion = 80;
const fuerzaRepulsion = 2;
const fuerzaRebote = 1.5;

const radioInfluenciaFamilia = 100;
const fuerzaAtraccion = 0.05;
const fuerzaRepulsionFamilia = 0.1;

let vientoX = 0;
let vientoY = 0;
const fuerzaViento = 1.5;

const poblacionMaxima = 150;
const burbujasPorGeneracion = 10;

let sistemaIniciado = false;

function setup() {
  const canvas = createCanvas(900, 600);
  canvas.parent("zonaCanvas");
  angleMode(DEGREES);

  noLoop();
  redraw();

  let botonInicio = createButton("Start");
  botonInicio.parent("zonaCanvas");
  botonInicio.id("botonInicio");
  botonInicio.mousePressed(iniciarSistema);
}

function iniciarSistema() {
  sistemaIniciado = true;
  select("#botonInicio").remove();
  loop();
}

function generarBurbuja(impulsoX = 0, impulsoY = 0) {
  const x = random(width);
  const y = height + random(50, 400);

  if (random(1) < 0.5) {
    burbujas.push(new BurbujaPequena(x, y, impulsoX, impulsoY));
  } else {
    burbujas.push(new BurbujaMediana(x, y, impulsoX, impulsoY));
  }
}

function generarLoteDeBurbujas() {
  for (let i = 0; i < burbujasPorGeneracion; i++) {
    if (burbujas.length >= poblacionMaxima) {
      break;
    }

    const angulo = random(210, 330);
    const fuerza = random(4, 8);
    const impulsoX = cos(angulo) * fuerza;
    const impulsoY = sin(angulo) * fuerza;

    generarBurbuja(impulsoX, impulsoY);
  }
}

function reiniciar() {
  burbujas = [];
  particulas = [];
}

function draw() {
  fondoDegradado();

  if (!sistemaIniciado) {
    return;
  }

  aplicarViento();

  for (let i = 0; i < burbujas.length; i++) {
    burbujas[i].repeler(mouseX, mouseY);
  }

  for (let i = 0; i < burbujas.length; i++) {
    for (let j = i + 1; j < burbujas.length; j++) {
      const a = burbujas[i];
      const b = burbujas[j];

      if (a.eliminar || b.eliminar) continue;
      if (a.tocaA(b)) continue;

      const d = dist(a.x, a.y, b.x, b.y);

      if (d < radioInfluenciaFamilia) {
        if (a.tipo === b.tipo) {
          a.atraerA(b, fuerzaAtraccion);
          b.atraerA(a, fuerzaAtraccion);
        } else {
          a.separarDe(b, fuerzaRepulsionFamilia);
          b.separarDe(a, fuerzaRepulsionFamilia);
        }
      }
    }
  }

  for (let i = 0; i < burbujas.length; i++) {
    burbujas[i].update();
  }

  for (let i = 0; i < burbujas.length; i++) {
    for (let j = i + 1; j < burbujas.length; j++) {
      const a = burbujas[i];
      const b = burbujas[j];

      if (a.eliminar || b.eliminar) continue;

      if (a.tocaA(b)) {
        if (a.tipo === "grande" || b.tipo === "grande") {
          a.separarDe(b, fuerzaRebote);
          b.separarDe(a, fuerzaRebote);
        } else if (a.y <= height && b.y <= height) {
          a.fusionarCon(b);
        }
        break;
      }
    }
  }

  let burbujasVivas = [];
  for (let i = 0; i < burbujas.length; i++) {
    if (!burbujas[i].eliminar) {
      burbujasVivas.push(burbujas[i]);
    }
  }
  burbujas = burbujasVivas;

  for (let i = 0; i < burbujas.length; i++) {
    burbujas[i].draw();
  }

  let particulasVivas = [];
  for (let i = 0; i < particulas.length; i++) {
    const p = particulas[i];
    p.update();
    p.draw();
    if (p.vida > 0) {
      particulasVivas.push(p);
    }
  }
  particulas = particulasVivas;
}

function fondoDegradado() {
  const colorArriba = color(10, 20, 60);
  const colorAbajo = color(150, 200, 255);

  for (let y = 0; y < height; y++) {
    const inter = map(y, 0, height, 0, 1);
    const c = lerpColor(colorArriba, colorAbajo, inter);
    stroke(c);
    line(0, y, width, y);
  }
}

function aplicarViento() {
  vientoX = 0;
  vientoY = 0;

  if (keyIsDown('w') || keyIsDown('W')) {
    vientoY = fuerzaViento;
  }
  if (keyIsDown('s') || keyIsDown('S')) {
    vientoY = -fuerzaViento;
  }
  if (keyIsDown('a') || keyIsDown('A')) {
    vientoX = -fuerzaViento;
  }
  if (keyIsDown('d') || keyIsDown('D')) {
    vientoX = fuerzaViento;
  }
}

function mousePressed() {
  if (!sistemaIniciado) {
    return;
  }

  for (let i = 0; i < burbujas.length; i++) {
    const b = burbujas[i];

    if (b.contieneAlRaton(mouseX, mouseY)) {
      b.explotar();
      break;
    }
  }
}

function keyPressed() {
  if (!sistemaIniciado) {
    return;
  }

  if (key === 'r' || key === 'R') {
    reiniciar();
  }

  if (key === 'b' || key === 'B') {
    generarLoteDeBurbujas();
  }
}