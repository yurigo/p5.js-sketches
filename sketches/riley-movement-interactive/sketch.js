let focus = 0.58; // 0 = extremo izquierdo, 1 = extremo derecho (controlado por el ratón)

function setup() {
  createCanvas(400, 400);
  noLoop(); // Dibujamos solo cuando cambia el foco
}

function draw() {
  background(255);

  // Parámetros ajustables
  const cols = 31;
  const easingPower = 1.1;
  const minScale = 0.01;

  // Factores relativos
  let rel = [];
  let relSum = 0;
  for (let c = 0; c < cols; c++) {
    const colCenter = (c + 0.5) / cols;
    const dist = Math.abs(colCenter - focus);
    const norm = dist / 0.5;
    const scale = minScale + (1 - minScale) * Math.pow(norm, easingPower);
    rel.push(scale);
    relSum += scale;
  }

  // Fijamos un número de filas constante para que no cambie al mover el foco
  const rows = 12; // cambia este valor si quieres más/menos filas
  const cellSize = height / rows; // altura de cada fila (constante mientras no cambie "rows")

  // --- Control para que NINGUNA columna sea más ancha que su altura (no rectángulos apaisados) ---
  // Tomamos el valor relativo máximo. Ese será el que se convierta en EXACTAMENTE un cuadrado.
  const maxRel = Math.max(...rel);
  // Cada unidad de 'rel' se traduce a este ancho base.
  const baseScale = cellSize / maxRel; // asegura que la columna más grande = cellSize (cuadrado)
  let patternWidth = relSum * baseScale;
  // Si aún así el patrón excede el canvas, comprimimos todo proporcionalmente (seguirán sin superar cellSize).
  let compress = 1;
  if (patternWidth > width) {
    compress = width / patternWidth; // ahora la mayor será más estrecha que alta, pero nunca al revés.
    patternWidth = width;
  }
  const offsetX = (width - patternWidth) / 2; // centrado horizontal

  noStroke();
  let x = offsetX;
  for (let c = 0; c < cols; c++) {
    const w = rel[c] * baseScale * compress; // siempre <= cellSize
    for (let r = 0; r < rows; r++) {
      const y = r * cellSize;
      const parity = (r + c) % 2;
      fill(parity === 0 ? 255 : 0);
      rect(x, y, w, cellSize);
    }
    x += w;
  }
}

function windowResized() {
  const s = min(windowWidth, windowHeight) * 0.8;
  resizeCanvas(s, s);
  redraw();
}

// Control del "hundimiento" (focus) con el ratón.
// mouseX de 0 a 400 -> focus de 0 a 1. Fuera de ese rango se mantiene en los extremos.
function mouseMoved() {
  const maxControlWidth = 400; // rango horizontal útil
  focus = constrain(mouseX / maxControlWidth, 0, 1);
  redraw();
}

// Soporte táctil básico
function touchMoved() {
  mouseMoved();
  return false; // previene scroll en móvil
}
