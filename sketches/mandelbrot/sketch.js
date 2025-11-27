// Mandelbrot interactivo (p5.js) — zoom, pan, paletas y HiDPI-safe
// Rueda: zoom donde apunta el ratón
// Arrastrar: mover
// 1–4: paletas de color
// R: reset vista

let maxIterations = 200;
let cnv;
let palette = 1;

// Vista (center x/y en plano complejo y zoom relativo)
let cx = -0.75;
let cy = 0.0;
let zoom = 1.0; // 1 = vista base [-2.5, 1] en X
const BASE_XRANGE = 3.5;

let isPanning = false;
let lastMouse;

function setup() {
  const s = floor(min(windowWidth, windowHeight) * 0.95);
  createCanvas(s, s);
  colorMode(HSB, 360, 100, 100);
  noLoop(); // Dibujamos solo cuando cambia algo
  redraw();
}

function windowResized() {
  const s = floor(min(windowWidth, windowHeight) * 0.95);
  resizeCanvas(s, s);
  redraw();
}

function draw() {
  drawMandelbrot();
}

function drawMandelbrot() {
  // Ajustar iteraciones con el zoom (más zoom → más detalle)
  maxIterations = floor(200 * log(zoom + 1) + 200);

  loadPixels();

  const aspect = width / height;
  const xRange = BASE_XRANGE / zoom;
  const yRange = xRange / aspect;

  const minX = cx - xRange / 2;
  const maxX = cx + xRange / 2;
  const minY = cy - yRange / 2;
  const maxY = cy + yRange / 2;

  const dx = (maxX - minX) / max(width - 1, 1);
  const dy = (maxY - minY) / max(height - 1, 1);

  const d = pixelDensity(); // Soporte HiDPI
  const w = width * d;
  const h = height * d;

  for (let yPhys = 0; yPhys < h; yPhys++) {
    const y = yPhys / d;
    // Nota: en p5, Y crece hacia abajo. Mapeamos para que Im crezca hacia arriba:
    const b = maxY - y * dy;

    for (let xPhys = 0; xPhys < w; xPhys++) {
      const x = xPhys / d;
      const a = minX + x * dx;

      let za = 0,
        zb = 0;
      let n = 0;

      // Iteración de Mandelbrot
      while (n < maxIterations) {
        // (za + i*zb)^2 = (za^2 - zb^2) + i*(2*za*zb)
        const aa = za * za - zb * zb;
        const bb = 2 * za * zb;
        za = aa + a;
        zb = bb + b;

        // Criterio de escape (radio 2 → |z|^2 > 4)
        if (za * za + zb * zb > 4) break;
        n++;
      }

      const idx = 4 * (xPhys + yPhys * w);

      if (n === maxIterations) {
        // Interior → negro
        pixels[idx + 0] = 0;
        pixels[idx + 1] = 0;
        pixels[idx + 2] = 0;
        pixels[idx + 3] = 255;
      } else {
        // Coloración continua (suaviza bandas)
        const zn = Math.hypot(za, zb);
        const mu = n + 1 - Math.log(Math.log(zn)) / Math.log(2);
        const c = getColor(mu, maxIterations, palette);
        pixels[idx + 0] = red(c);
        pixels[idx + 1] = green(c);
        pixels[idx + 2] = blue(c);
        pixels[idx + 3] = 255;
      }
    }
  }

  updatePixels();
}

/* ---------- Interacción ---------- */

function mouseWheel(e) {
  // Zoom hacia/desde el punto del ratón
  const zoomFactor = e.deltaY < 0 ? 1.2 : 1 / 1.2;

  // Convertir posición del ratón a coordenada compleja
  const aspect = width / height;
  const xRange = BASE_XRANGE / zoom;
  const yRange = xRange / aspect;

  const minX = cx - xRange / 2;
  const maxY = cy + yRange / 2;

  const dx = xRange / max(width - 1, 1);
  const dy = yRange / max(height - 1, 1);

  const aMouse = minX + mouseX * dx;
  const bMouse = maxY - mouseY * dy;

  // Re-centrar para que el punto bajo el ratón se mantenga al hacer zoom
  cx = aMouse + (cx - aMouse) / zoomFactor;
  cy = bMouse + (cy - bMouse) / zoomFactor;

  zoom *= zoomFactor;

  // Pedimos redraw (usamos noLoop)
  redraw();
  return false; // Evita scroll de la página
}

function handleCanvasClick() {
  isPanning = true;
  lastMouse = createVector(mouseX, mouseY);
  return false;
}

function mouseDragged() {
  if (!isPanning) return;

  const delta = createVector(mouseX - lastMouse.x, mouseY - lastMouse.y);
  lastMouse.set(mouseX, mouseY);

  // Convertir desplazamiento en píxeles → plano complejo
  const aspect = width / height;
  const xRange = BASE_XRANGE / zoom;
  const yRange = xRange / aspect;

  cx -= (delta.x / width) * xRange;
  cy += (delta.y / height) * yRange; // + porque en pantalla Y va hacia abajo

  redraw();
}

function mouseReleased() {
  isPanning = false;
}

function keyPressed() {
  if (key === "r" || key === "R") {
    cx = -0.75;
    cy = 0.0;
    zoom = 1.0;
    redraw();
  }
  if (key >= "1" && key <= "4") {
    palette = int(key);
    redraw();
  }
}

/* ---------- Paletas ---------- */

function getColor(mu, maxIter, which) {
  // mu ~ iteración continua; normalizamos
  const t = constrain(mu / maxIter, 0, 1);

  switch (which) {
    // 1) Arcoíris HSB
    case 1: {
      const hue = (360 * mu) / maxIter;
      return color(hue % 360, 80, 100);
    }
    // 2) Fuego
    case 2: {
      // degradado negro → rojo → naranja → amarillo
      const h = 20 + 40 * t; // 20–60
      const s = 90;
      const b = 30 + 70 * t; // 30–100
      return color(h, s, b);
    }
    // 3) Nocturna (azules)
    case 3: {
      const h = 210 + 60 * t; // 210–270
      const s = 60 + 40 * t;
      const b = 20 + 80 * sqrt(t);
      return color(h % 360, s, b);
    }
    // 4) Duotono (morado ↔ cian)
    default: {
      const h = lerp(290, 180, t); // 290→180
      const s = 70 + 20 * t;
      const b = 50 + 50 * t;
      return color(h, s, b);
    }
  }
}
