let audioActivo = false;
let silencio = false;

let drones = [];
let filtroDrone;
let corteSuave = 300;
let sinte;
let reverb;
let ruido;
let filtroRuido;
let envRuido;
let golpe;
let envGolpe;
let ultimaNota = 0;

const FREQ_DRONES = [110, 164.81, 277.18]; // A2, E3, C#4
const ONDAS_DRONES = ['sawtooth', 'triangle', 'sine'];

// Escala pentatónica de La mayor en MIDI
const ESCALA = [57, 59, 61, 64, 66, 69, 71, 73, 76, 78, 81, 83, 85, 88];

function prepararSonido() {
  filtroDrone = new p5.LowPass();
  filtroDrone.freq(300);
  filtroDrone.res(4);

  for (let i = 0; i < 3; i++) {
    const osc = new p5.Oscillator(ONDAS_DRONES[i]);
    osc.disconnect();
    osc.connect(filtroDrone);
    osc.freq(FREQ_DRONES[i]);
    osc.amp(0);
    drones.push(osc);
  }

  sinte = new p5.PolySynth();
  sinte.setADSR(0.005, 0.3, 0.05, 1.2);
  reverb = new p5.Reverb();
  reverb.process(sinte, 4, 2);
  reverb.drywet(0.45);

  ruido = new p5.Noise('white');
  ruido.disconnect();
  filtroRuido = new p5.HighPass();
  filtroRuido.freq(2500);
  ruido.connect(filtroRuido);
  ruido.amp(0);
  envRuido = new p5.Envelope();
  envRuido.setADSR(0.002, 0.7, 0, 0.3);
  envRuido.setRange(0.12, 0);

  golpe = new p5.Oscillator('sine');
  golpe.freq(55);
  golpe.amp(0);
  envGolpe = new p5.Envelope();
  envGolpe.setADSR(0.002, 0.5, 0, 0.2);
  envGolpe.setRange(0.45, 0);
}

// Los navegadores exigen un gesto del usuario para activar el audio
function iniciarAudio() {
  if (audioActivo) return;
  userStartAudio();
  for (const osc of drones) osc.start();
  ruido.start();
  golpe.start();
  audioActivo = true;
}

function alternarSilencio() {
  silencio = !silencio;
  outputVolume(silencio ? 0 : 1, 0.3);
}

// Se llama una vez por frame con las estadísticas del sistema
function actualizarSonido(stats) {
  if (!audioActivo) return;

  for (let i = 0; i < 3; i++) {
    const velMax = FAMILIAS[i].vel[1];
    const amp = map(stats.velMedia[i], 0, velMax, 0, 0.07, true);
    drones[i].amp(amp, 0.25);
    drones[i].pan(map(stats.xMedia[i], 0, width, -0.8, 0.8, true), 0.25);
    // ciclo invertido, desafinación 
    const desafine = stats.invertido ? 1 + 0.018 * (i - 1) + 0.01 : 1;
    drones[i].freq(FREQ_DRONES[i] * desafine, 0.6);
  }

  const corteObjetivo = map(stats.conexiones, 0, 160, 180, 3200, true);
  corteSuave = lerp(corteSuave, corteObjetivo, 0.05);
  filtroDrone.freq(corteSuave);
}

// Una nota por mezcla, con límite de densidad para no saturar
function sonarMezcla(familiaA, familiaB, y) {
  if (!audioActivo || millis() - ultimaNota < 60) return;
  ultimaNota = millis();

  // 0 = violeta (M+T), 1 = lima (T+Á), 2 = coral (Á+M)
  let tipo = 2;
  if (familiaA + familiaB === 1) tipo = 0;
  else if (familiaA + familiaB === 3) tipo = 1;

  const base = floor(map(y, height, 0, 0, ESCALA.length - 4, true));
  const midi = ESCALA[base + tipo];
  sinte.play(midiToFreq(midi), random(0.12, 0.22), 0, 0.06);
}

function sonarBlanco(cantidad) {
  if (!audioActivo) return;
  envRuido.play(ruido);
  golpe.freq(90);
  golpe.freq(40, 0.4);
  envGolpe.setRange(map(cantidad, 3, 12, 0.25, 0.5, true), 0);
  envGolpe.play(golpe);
  sinte.play(midiToFreq(69), 0.15, 0, 0.3);
  sinte.play(midiToFreq(73), 0.12, 0.02, 0.3);
  sinte.play(midiToFreq(76), 0.12, 0.04, 0.3);
}
