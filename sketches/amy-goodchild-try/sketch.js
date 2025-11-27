// "Geometric constellation" style
// Yuri + Echo, p5.js

let points = [];
const NUM_PERIMETER_POINTS = 200; // puntos en el perímetro
const NUM_INTERIOR_POINTS = 100; // puntos en el interior
const NEIGHBORS = 5; // cuántos vecinos conectar
const MAX_DIST = 150; // distancia máxima de conexión

function setup() {
  const s = min(windowWidth, windowHeight) * 0.9;
  createCanvas(s, s);
  background(45, 52, 54);

  colorMode(HSB, 360, 100, 100);
  noLoop(); // dibujo estático

  generatePoints();
}

function windowResized() {
  const s = min(windowWidth, windowHeight) * 0.9;
  resizeCanvas(s, s);
  redraw();
}

function draw() {
  background(0);
  drawNetwork();
}

function generatePoints() {
  points = [];

  const cx = width / 2;
  const cy = height / 2;
  const baseR = min(width, height) * 0.35;

  // 1. Generar puntos en el perímetro (como antes)
  for (let i = 0; i < NUM_PERIMETER_POINTS; i++) {
    // ángulo alrededor del círculo
    const t = map(i, 0, NUM_PERIMETER_POINTS, 0, TWO_PI);

    // ruido en el radio para deformar la "corona"
    const n = noise(i * 0.05);
    const rOffset = map(n, 0, 1, -baseR * 0.35, baseR * 0.35);
    const r = baseR + rOffset;

    let x = cx + cos(t) * r;
    let y = cy + sin(t) * r;

    // un poco de jitter extra
    x += random(-10, 10);
    y += random(-10, 10);

    points.push(createVector(x, y));
  }

  // 2. Generar puntos en el interior del círculo
  for (let i = 0; i < NUM_INTERIOR_POINTS; i++) {
    // generar un punto aleatorio dentro del círculo
    const angle = random(TWO_PI);
    // usar sqrt para distribución uniforme en el área
    const r = sqrt(random(1)) * baseR * 0.9; // 0.9 para mantenerlos dentro

    let x = cx + cos(angle) * r;
    let y = cy + sin(angle) * r;

    // jitter adicional
    x += random(-8, 8);
    y += random(-8, 8);

    points.push(createVector(x, y));
  }
}

function drawNetwork() {
  // dos colores para hacer un pequeño gradiente
  const c1 = color(190, 20, 100); // azul claro
  const c2 = color(140, 30, 100); // verdoso

  strokeWeight(1);

  for (let i = 0; i < points.length; i++) {
    const p = points[i];

    // calcular distancias a todos los demás puntos
    let neighbors = [];
    for (let j = 0; j < points.length; j++) {
      if (i === j) continue;
      const q = points[j];
      const d = p5.Vector.dist(p, q);
      neighbors.push({ idx: j, dist: d });
    }

    // ordenar por distancia ascendente
    neighbors.sort((a, b) => a.dist - b.dist);

    // conectar con los N vecinos más cercanos
    for (let k = 0; k < NEIGHBORS; k++) {
      const nb = neighbors[k];
      if (nb.dist > MAX_DIST) continue;

      const q = points[nb.idx];

      // factor para el gradiente según la posición vertical
      const t = map((p.y + q.y) * 0.5, 0, height, 0, 1);
      const col = lerpColor(c1, c2, t);
      stroke(col);

      line(p.x, p.y, q.x, q.y);
    }
  }
}
