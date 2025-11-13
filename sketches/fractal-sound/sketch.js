function windowResized() {
  const s = min(windowWidth, windowHeight) * 0.9;
  resizeCanvas(s, s);
  redraw();
}

let mic,
  fft,
  started = false;
let smoothBass = 0,
  smoothMids = 0,
  smoothHighs = 0;

function setup() {
  const s = min(windowWidth, windowHeight) * 0.9;
  createCanvas(s, s);
  colorMode(HSB, 360, 100, 100);
  noFill();
  textSize(14);
}

function startAudio() {
  userStartAudio(); // requiere gesto de usuario
  mic = new p5.AudioIn();
  mic.start(() => {
    fft = new p5.FFT(0.8, 128); // más bins para mejor análisis
    fft.setInput(mic);
    started = true;
  });
}

function mousePressed() {
  if (!started) startAudio();
}

function getAmp() {
  return mic ? mic.getLevel() : 0;
}

function getBands() {
  return fft ? fft.analyze() : [];
}

function draw() {
  // Fondo sólido (sin estelas) para evitar sensación de movimiento excesivo
  background(0, 0, 10);

  if (!started) {
    fill(60, 80, 100);
    textAlign(CENTER, CENTER);
    textSize(24);
    text("🎤 Haz click para activar el micro 🎤", width / 2, height / 2);
    textSize(16);
    fill(180, 60, 90);
    text(
      "¡Habla, canta o haz ruido para crear arte visual!",
      width / 2,
      height / 2 + 40
    );
    return;
  }

  let amp = getAmp();
  let bands = getBands();
  let bass = avg(bands, 0, 16);
  let mids = avg(bands, 16, 48);
  let highs = avg(bands, 48, 128);

  // Suavizado para transiciones más fluidas
  smoothBass = lerp(smoothBass, bass, 0.15);
  smoothMids = lerp(smoothMids, mids, 0.15);
  smoothHighs = lerp(smoothHighs, highs, 0.15);

  // Parámetros para árboles que crecerán desde el "suelo" (segmentos horizontales)
  let treeAngle = map(amp, 0, 0.15, radians(12), radians(35), true);
  let treeDepth = floor(map(smoothBass, 0, 255, 4, 7));
  let treeLen = map(smoothMids, 0, 255, 70, 120);

  // Generar terreno tipo Koch a partir de una línea base
  const y = height * 0.8;
  const a = createVector(width * 0.08, y);
  const b = createVector(width * 0.92, y);
  // Mapear nivel de detalle según sonido (permitir más iteraciones)
  // Máx 6 para mantener rendimiento (4^6 = 4096 segmentos)
  let energy = smoothBass + smoothMids;
  let iter = floor(map(energy, 0, 255 + 255, 0, 6));
  // Asegurar que con muy poco sonido no haya triángulos
  if (amp < 0.015) iter = 0;
  const segments = generateKoch(a, b, iter);

  // Dibujar segmentos del terreno
  strokeWeight(2);
  for (let i = 0; i < segments.length; i++) {
    const sgm = segments[i];
    const dx = sgm.b.x - sgm.a.x;
    const dy = sgm.b.y - sgm.a.y;
    const ang = atan2(dy, dx);
    const isGround = abs(ang) < radians(8) || abs(abs(ang) - PI) < radians(8);

    if (isGround) {
      // Suelo resaltado (marrón cálido)
      stroke(30, 60, 60);
      strokeWeight(3);
    } else {
      // Aristas del triángulo más discretas
      stroke(220, 10, 60);
      strokeWeight(1.5);
    }
    line(sgm.a.x, sgm.a.y, sgm.b.x, sgm.b.y);
  }

  // Plantar árboles SOLO en segmentos de suelo (casi horizontales)
  // En niveles profundos (segmentos creados en iteraciones altas) los árboles NO aparecen
  let drawnTrees = 0;
  const maxTrees = 120; // límite por fotograma para rendimiento
  const maxTreeLevel = 1; // árboles únicamente en niveles 0..1
  for (let i = 0; i < segments.length; i++) {
    const sgm = segments[i];
    const dx = sgm.b.x - sgm.a.x;
    const dy = sgm.b.y - sgm.a.y;
    const level = sgm.level || 0;
    if (level > maxTreeLevel) continue; // evitar árboles en niveles profundos
    // Detectar suelo: segmento casi horizontal
    const ang = atan2(dy, dx);
    const isGround = abs(ang) < radians(8) || abs(abs(ang) - PI) < radians(8);
    if (!isGround) continue; // sólo plantar en el suelo
    const len = sqrt(dx * dx + dy * dy);
    // Espaciado entre árboles
    const spacing = max(70, treeLen * 0.7);
    const count = floor(len / spacing);
    if (count <= 0) continue;
    for (let j = 0; j < count; j++) {
      if (drawnTrees >= maxTrees) break;
      const t = (j + 0.5) / count;
      const px = lerp(sgm.a.x, sgm.b.x, t);
      const py = lerp(sgm.a.y, sgm.b.y, t);
      // Perpendicular al suelo = crecer hacia arriba en pantalla
      const hue = (map(smoothHighs, 0, 255, 100, 180) + j * 3) % 360;
      push();
      translate(px, py);
      // sin rotación: el árbol ya crece hacia arriba
      drawFractalTree(treeLen * 0.8, treeDepth, treeAngle, hue, 0);
      pop();
      drawnTrees++;
    }
  }

  // Info de audio
  drawAudioInfo(amp, smoothBass, smoothMids, smoothHighs);
}

function drawFractalTree(len, depth, angle, hue, level) {
  if (depth <= 0 || len < 2) return;

  let brightness = map(depth, 0, 10, 40, 100);
  let saturation = map(level, 0, 10, 80, 40);

  stroke(hue, saturation, brightness);
  strokeWeight(map(depth, 0, 10, 0.5, 4));

  line(0, 0, 0, -len);
  translate(0, -len);

  // Ramas izquierda y derecha
  push();
  rotate(angle);
  drawFractalTree(len * 0.67, depth - 1, angle, (hue + 10) % 360, level + 1);
  pop();

  push();
  rotate(-angle);
  drawFractalTree(len * 0.67, depth - 1, angle, (hue - 10) % 360, level + 1);
  pop();

  // Sin rama aleatoria extra para estabilidad visual
}

function drawAudioInfo(amp, bass, mids, highs) {
  push();
  fill(0, 0, 100, 0.8);
  noStroke();
  textAlign(LEFT);
  textSize(12);
  text(`Amplitud: ${nf(amp, 1, 3)}`, 10, 20);

  // Barras de frecuencia
  let barWidth = 60;
  let barHeight = 8;
  let y = 35;

  fill(0, 80, 100);
  rect(10, y, map(bass, 0, 255, 0, barWidth), barHeight);
  text("Graves", 75, y + barHeight - 1);

  fill(120, 80, 100);
  rect(10, y + 12, map(mids, 0, 255, 0, barWidth), barHeight);
  text("Medios", 75, y + 12 + barHeight - 1);

  fill(240, 80, 100);
  rect(10, y + 24, map(highs, 0, 255, 0, barWidth), barHeight);
  text("Agudos", 75, y + 24 + barHeight - 1);
  pop();
}

// Genera segmentos de la curva de Koch desde a->b con 'iterations'
function generateKoch(a, b, iterations) {
  let segs = [{ a: a.copy(), b: b.copy(), level: 0 }];
  for (let n = 0; n < iterations; n++) {
    const next = [];
    for (let i = 0; i < segs.length; i++) {
      const s = segs[i];
      const v = p5.Vector.sub(s.b, s.a).mult(1 / 3);
      const p1 = p5.Vector.add(s.a, v);
      const p3 = p5.Vector.add(s.a, p5.Vector.mult(v, 2));
      // Pico del triángulo
      const vRot = v.copy();
      vRot.rotate(-PI / 3); // -60° para "subir" en horizontal
      const p2 = p5.Vector.add(p1, vRot);
      const lvl = (s.level || 0) + 1;
      next.push({ a: s.a.copy(), b: p1.copy(), level: lvl });
      next.push({ a: p1.copy(), b: p2.copy(), level: lvl });
      next.push({ a: p2.copy(), b: p3.copy(), level: lvl });
      next.push({ a: p3.copy(), b: s.b.copy(), level: lvl });
    }
    segs = next;
  }
  return segs;
}

function avg(arr, a, b) {
  if (!arr.length) return 0;
  let s = 0,
    c = 0;
  for (let i = a; i < min(b, arr.length); i++) {
    s += arr[i];
    c++;
  }
  return c ? s / c : 0;
}
