let oscillator;
let soundButton;
let oscillatorStarted = false;
let soundActive = false;

function setup() {
  const canvas = createCanvas(min(720, max(280, windowWidth - 32)), 420);
  canvas.parent('sketch');

  oscillator = new p5.Oscillator('sine');
  oscillator.freq(440);
  oscillator.amp(0);

  soundButton = createButton('Activar sonido');
  soundButton.parent('controls');
  soundButton.attribute('type', 'button');
  soundButton.attribute('aria-pressed', 'false');
  soundButton.mousePressed(toggleSound);
}

function draw() {
  background(26, 26, 46);

  const cursorX = constrain(mouseX, 0, width);
  const cursorY = constrain(mouseY, 0, height);
  const frequency = map(cursorX, 0, width, 110, 880);
  const amplitude = map(cursorY, 0, height, 0.2, 0.03);

  if (soundActive) {
    oscillator.freq(frequency, 0.08);
    oscillator.amp(amplitude, 0.08);
  }

  noStroke();
  fill(255, 215, 0);
  circle(cursorX, cursorY, 24);

  fill(204);
  textSize(16);
  text(`Frecuencia: ${round(frequency)} Hz`, 20, 30);
  text(`Amplitud: ${amplitude.toFixed(2)}`, 20, 55);
  text('Izquierda: tono grave · Derecha: tono agudo', 20, height - 42);
  text('Arriba: mayor amplitud · Abajo: menor amplitud', 20, height - 18);
}

function toggleSound() {
  userStartAudio();

  if (!oscillatorStarted) {
    oscillator.start();
    oscillatorStarted = true;
  }

  soundActive = !soundActive;
  soundButton.html(soundActive ? 'Desactivar sonido' : 'Activar sonido');
  soundButton.attribute('aria-pressed', String(soundActive));
  select('#estado').html(soundActive ? 'Sonido activado.' : 'Sonido desactivado.');
  oscillator.amp(soundActive ? 0.2 : 0, 0.1);
}

function windowResized() {
  resizeCanvas(min(720, max(280, windowWidth - 32)), 420);
}
