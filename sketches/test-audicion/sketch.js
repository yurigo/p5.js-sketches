// Test de audición con p5.sound
// - Genera un tono que va aumentando de frecuencia
// - Muestra la frecuencia en pantalla
// - Pulsa cualquier tecla para pausar/reanudar el aumento
// - Pulsa 'R' para reiniciar a la frecuencia mínima

let osc; // Oscilador
let started = false; // ¿AudioContext desbloqueado y oscilador iniciado?
let isIncreasing = true; // ¿Estamos aumentando la frecuencia?
let cnv;
let pauseButton;
let restartButton;

// Rango de frecuencias (puedes ajustarlo a tus necesidades)
const MIN_FREQ = 220; // La3
const MAX_FREQ = 20000; // ~20 kHz, rango común para test simple
let freq = MIN_FREQ;

// Velocidad de subida en Hz por segundo
const RISE_RATE = 1000; // sube ~120 Hz por segundo

// Button sizing constants
const BUTTON_WIDTH = 120;
const BUTTON_HEIGHT = 50;
const BUTTON_GAP = 10;

function setup() {
  const s = min(windowWidth, windowHeight) * 0.9;
  cnv = createCanvas(s, s);
  cnv.mousePressed(handleCanvasClick);
  cnv.touchStarted(handleCanvasClick);
  colorMode(HSB, 360, 100, 100);
  textAlign(CENTER, CENTER);
  textFont("monospace");
  noStroke();

  // Prepara el oscilador pero no lo inicia aún (por políticas del navegador)
  osc = new p5.Oscillator("sine");
  osc.amp(0.15, 0.05); // amplitud suave
  osc.freq(freq);

  createControlButtons();
}

function createControlButtons() {
  const totalWidth = BUTTON_WIDTH * 2 + BUTTON_GAP;
  const canvasX = (windowWidth - width) / 2;
  const canvasY = (windowHeight - height) / 2;
  const startX = canvasX + width / 2 - totalWidth / 2;
  const y = canvasY + height - BUTTON_HEIGHT - 10;

  // Botón de pausa/reanudar
  pauseButton = createButton("PAUSAR");
  pauseButton.position(startX, y);
  pauseButton.size(BUTTON_WIDTH, BUTTON_HEIGHT);
  pauseButton.style("font-family", "monospace");
  pauseButton.style("font-weight", "bold");
  pauseButton.style("border", "none");
  pauseButton.style("cursor", "pointer");
  pauseButton.style("background", "#ff9800");
  pauseButton.style("color", "white");
  pauseButton.style("font-size", "16px");
  pauseButton.style("border-radius", "8px");
  pauseButton.style("touch-action", "manipulation");
  pauseButton.mousePressed(() => {
    startAudioOnce();
    isIncreasing = !isIncreasing;
    pauseButton.html(isIncreasing ? "PAUSAR" : "REANUDAR");
  });

  // Botón de reinicio
  restartButton = createButton("REINICIAR");
  restartButton.position(startX + BUTTON_WIDTH + BUTTON_GAP, y);
  restartButton.size(BUTTON_WIDTH, BUTTON_HEIGHT);
  restartButton.style("font-family", "monospace");
  restartButton.style("font-weight", "bold");
  restartButton.style("border", "none");
  restartButton.style("cursor", "pointer");
  restartButton.style("background", "#4caf50");
  restartButton.style("color", "white");
  restartButton.style("font-size", "16px");
  restartButton.style("border-radius", "8px");
  restartButton.style("touch-action", "manipulation");
  restartButton.mousePressed(() => {
    startAudioOnce();
    freq = MIN_FREQ;
    osc.freq(freq);
    isIncreasing = true;
    pauseButton.html("PAUSAR");
  });
}

function repositionControlButtons() {
  const totalWidth = BUTTON_WIDTH * 2 + BUTTON_GAP;
  const canvasX = (windowWidth - width) / 2;
  const canvasY = (windowHeight - height) / 2;
  const startX = canvasX + width / 2 - totalWidth / 2;
  const y = canvasY + height - BUTTON_HEIGHT - 10;

  pauseButton.position(startX, y);
  pauseButton.size(BUTTON_WIDTH, BUTTON_HEIGHT);
  restartButton.position(startX + BUTTON_WIDTH + BUTTON_GAP, y);
  restartButton.size(BUTTON_WIDTH, BUTTON_HEIGHT);
}

function windowResized() {
  const s = min(windowWidth, windowHeight) * 0.9;
  resizeCanvas(s, s);
  repositionControlButtons();
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
      ? "Subiendo frecuencia…"
      : "Pausado"
    : "Haz clic para iniciar el audio";
  text(status, width / 2, height * 0.6);

  textSize(width * 0.035);
  text("Usa los botones para controlar", width / 2, height * 0.7);
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

function handleCanvasClick() {
  startAudioOnce();
  return false; // prevent default behavior
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
