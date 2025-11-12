// Test de audición con p5.sound
// - Genera un tono que va aumentando de frecuencia
// - Muestra la frecuencia en pantalla
// - Pulsa cualquier tecla para pausar/reanudar el aumento
// - Pulsa 'R' para reiniciar a la frecuencia mínima

let osc; // Oscilador
let started = false; // ¿AudioContext desbloqueado y oscilador iniciado?
let isIncreasing = true; // ¿Estamos aumentando la frecuencia?

// Rango de frecuencias (puedes ajustarlo a tus necesidades)
const MIN_FREQ = 220; // La3
const MAX_FREQ = 20000; // ~20 kHz, rango común para test simple
let freq = MIN_FREQ;

// Velocidad de subida en Hz por segundo
const RISE_RATE = 1000; // sube ~120 Hz por segundo

function setup() {
  const s = min(windowWidth, windowHeight) * 0.9;
  createCanvas(s, s);
  colorMode(HSB, 360, 100, 100);
  textAlign(CENTER, CENTER);
  textFont("monospace");
  noStroke();

  // Prepara el oscilador pero no lo inicia aún (por políticas del navegador)
  osc = new p5.Oscillator("sine");
  osc.amp(0.15, 0.05); // amplitud suave
  osc.freq(freq);
}

function windowResized() {
  const s = min(windowWidth, windowHeight) * 0.9;
  resizeCanvas(s, s);
}

function draw() {
  // Cambia el color de fondo según la frecuencia (uso log para percepción)
  const hue = map(
    Math.log10(freq),
    Math.log10(MIN_FREQ),
    Math.log10(MAX_FREQ),
    210,
    0,
    true
  );
  background(hue, 80, 30);

  // Si está aumentando, incrementa frecuencia con deltaTime (ms)
  if (started && isIncreasing) {
    freq += RISE_RATE * (deltaTime / 1000);
    if (freq >= MAX_FREQ) {
      freq = MAX_FREQ;
      isIncreasing = false; // deja de subir al llegar al máximo
    }
    osc.freq(freq);
  }

  // UI
  fill(0, 0, 100);
  const title = "Test de audición";
  textSize(width * 0.06);
  text(title, width / 2, height * 0.18);

  textSize(width * 0.1);
  text(`${nf(freq, 1, 1)} Hz`, width / 2, height * 0.42);

  textSize(width * 0.04);
  const status = started
    ? isIncreasing
      ? "Subiendo… (pulsa tecla para pausar)"
      : "Pausado (pulsa tecla para reanudar)"
    : "Haz clic o pulsa una tecla para iniciar el audio";
  text(status, width / 2, height * 0.6);

  textSize(width * 0.035);
  text("'R' para reiniciar", width / 2, height * 0.7);
}

// Inicia el audio con interacción del usuario
function startAudioOnce() {
  if (!started) {
    userStartAudio(); // Desbloquea el AudioContext
    osc.start();
    osc.freq(freq);
    started = true;
  }
}

function mousePressed() {
  // Only respond to clicks on the canvas
  if (mouseX < 0 || mouseX > width || mouseY < 0 || mouseY > height) {
    return;
  }
  startAudioOnce();
}

function touchStarted() {
  // Only respond to touches on the canvas
  if (touches.length > 0) {
    const touch = touches[0];
    if (touch.x < 0 || touch.x > width || touch.y < 0 || touch.y > height) {
      return;
    }
  }
  mousePressed();
  return false; // prevent default touch behavior
}

function keyPressed() {
  startAudioOnce();
  if (key === "r" || key === "R") {
    freq = MIN_FREQ;
    osc.freq(freq);
    isIncreasing = true; // vuelve a subir desde el inicio
  } else {
    // Cualquier otra tecla pausa/reanuda la subida
    isIncreasing = !isIncreasing;
  }
}
