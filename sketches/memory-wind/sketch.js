function setup() {
  const s = min(windowWidth, windowHeight) * 0.9;
  createCanvas(s, s);
  background(45, 52, 54);
}

// ==========================================================
// RESPONSIVE
// ==========================================================

function windowResized() {
  // resizeCanvas(
  //   windowWidth,
  //   windowHeight
  // );

  const s = min(windowWidth, windowHeight) * 0.9;
  resizeCanvas(s, s);

  trailLayer = createGraphics(width, height);

  trailLayer.pixelDensity(1);

  regenerate();
}

// ==========================================================
// MEMORIA DEL VIENTO
// Campo de fuerzas generativo con partículas
// ==========================================================

const NUM_PARTICLES = 650;

let particles = [];
let trailLayer;

let seed;
let flowTime = 0;

let paletteIndex = 0;
let paused = false;
let showHUD = true;

// ----------------------------------------------------------
// PARÁMETROS PRINCIPALES
// ----------------------------------------------------------

const params = {
  noiseScale: 0.0024,
  detailScale: 0.006,

  timeSpeed: 0.00035,

  forceStrength: 0.17,
  maxSpeed: 3.2,

  fadeAmount: 8,

  mouseRadius: 220,
  mouseForce: 0.22,
};

// ----------------------------------------------------------
// PALETAS
// ----------------------------------------------------------

const palettes = [
  // viento frío
  ["#6DD5FA", "#B8F2E6", "#F4F7FF"],

  // viento cálido
  ["#FF6B6B", "#FFD166", "#FFF3D6"],

  // nocturno
  ["#8E7DBE", "#5BC0EB", "#E8E5FF"],

  // orgánico
  ["#84A98C", "#CAD2C5", "#F2E8CF"],

  // eléctrico
  ["#00F5D4", "#00BBF9", "#F15BB5"],
];

// ==========================================================
// SETUP
// ==========================================================

function setup() {
  // createCanvas(windowWidth, windowHeight);

  const s = min(windowWidth, windowHeight) * 0.9;
  createCanvas(s, s);

  // Evita gastar demasiados recursos en pantallas retina.
  pixelDensity(1);

  trailLayer = createGraphics(width, height);
  trailLayer.pixelDensity(1);

  regenerate();
}

// ==========================================================
// DRAW
// ==========================================================

function draw() {
  background(5, 7, 12);

  if (!paused) {
    // ------------------------------------------------------
    // Borra muy lentamente el pasado.
    // Esto produce persistencia / memoria visual.
    // ------------------------------------------------------

    trailLayer.push();
    trailLayer.blendMode(BLEND);
    trailLayer.noStroke();

    trailLayer.fill(5, 7, 12, params.fadeAmount);

    trailLayer.rect(0, 0, width, height);

    trailLayer.pop();

    // ------------------------------------------------------
    // Evolución temporal del campo
    // ------------------------------------------------------

    flowTime += params.timeSpeed;

    // ------------------------------------------------------
    // Actualización de partículas
    // ------------------------------------------------------

    for (let particle of particles) {
      particle.followField();
      particle.interactWithMouse();

      particle.update();
      particle.checkEdges();

      particle.display();
    }
  }

  // Dibujamos la capa acumulada
  image(trailLayer, 0, 0);

  if (showHUD) {
    drawInterface();
  }
}

// ==========================================================
// CAMPO DE FUERZAS
// ==========================================================

function getFlowForce(x, y) {
  // Ruido principal:
  // genera las grandes corrientes del campo.
  const mainNoise = noise(
    x * params.noiseScale,
    y * params.noiseScale,
    flowTime,
  );

  // Segundo ruido:
  // añade pequeñas irregularidades y turbulencia.
  const detailNoise = noise(
    x * params.detailScale + 500,
    y * params.detailScale + 500,
    flowTime * 1.7 + 200,
  );

  // Convertimos el ruido en un ángulo.
  //
  // Multiplicar por varias vueltas completas provoca
  // remolinos y cambios más ricos de dirección.
  let angle =
    mainNoise * TWO_PI * 3.5 + map(detailNoise, 0, 1, -PI * 0.65, PI * 0.65);

  // Vector que apunta en la dirección calculada.
  let force = p5.Vector.fromAngle(angle);

  // La fuerza también cambia dependiendo del segundo ruido.
  let intensity = map(detailNoise, 0, 1, 0.55, 1.5);

  force.mult(params.forceStrength * intensity);

  return {
    force: force,
    mainNoise: mainNoise,
    detailNoise: detailNoise,
  };
}

// ==========================================================
// CLASE PARTICLE
// ==========================================================

class Particle {
  constructor() {
    this.position = createVector(random(width), random(height));

    this.previousPosition = this.position.copy();

    // Cada agente tiene velocidad propia.
    this.velocity = p5.Vector.random2D();

    this.velocity.mult(random(0.2, 1.2));

    // Cada agente tiene aceleración propia.
    this.acceleration = createVector(0, 0);

    // Pequeñas diferencias individuales.
    this.speedFactor = random(0.75, 1.25);

    this.weightFactor = random(0.7, 1.3);

    // Ciclo de vida.
    this.age = 0;

    this.life = random(600, 1800);

    // Valores del campo en la posición actual.
    this.fieldNoise = 0;
    this.fieldDetail = 0;
  }

  // --------------------------------------------------------
  // Aplicar una fuerza
  // --------------------------------------------------------

  applyForce(force) {
    this.acceleration.add(force);
  }

  // --------------------------------------------------------
  // Seguir el campo generado con noise()
  // --------------------------------------------------------

  followField() {
    const field = getFlowForce(this.position.x, this.position.y);

    this.fieldNoise = field.mainNoise;

    this.fieldDetail = field.detailNoise;

    // Cada partícula responde de forma ligeramente distinta.
    let personalForce = field.force.copy();

    personalForce.mult(this.speedFactor);

    this.applyForce(personalForce);
  }

  // --------------------------------------------------------
  // Ratón = deformación externa del sistema
  // --------------------------------------------------------

  interactWithMouse() {
    if (!mouseIsPressed) return;

    if (mouseX < 0 || mouseX > width || mouseY < 0 || mouseY > height) {
      return;
    }

    let mouseVector = createVector(
      mouseX - this.position.x,
      mouseY - this.position.y,
    );

    let distance = mouseVector.mag();

    if (distance > 0 && distance < params.mouseRadius) {
      // Más cerca del ratón = más intensidad.
      let strength = map(distance, 0, params.mouseRadius, 1, 0);

      mouseVector.normalize();

      // SHIFT transforma la atracción en repulsión.
      if (keyIsDown(SHIFT)) {
        mouseVector.mult(-1);
      }

      mouseVector.mult(params.mouseForce * strength);

      this.applyForce(mouseVector);
    }
  }

  // --------------------------------------------------------
  // Actualización física
  // --------------------------------------------------------

  update() {
    this.velocity.add(this.acceleration);

    // La velocidad máxima también depende del campo.
    let localMaxSpeed =
      params.maxSpeed *
      this.speedFactor *
      map(this.fieldDetail, 0, 1, 0.65, 1.2);

    this.velocity.limit(localMaxSpeed);

    this.position.add(this.velocity);

    // La aceleración se reinicia cada frame.
    this.acceleration.mult(0);

    this.age++;

    // Eventualmente algunas partículas "olvidan"
    // su trayectoria y reaparecen.
    if (this.age > this.life) {
      this.respawn();
    }
  }

  // --------------------------------------------------------
  // Dibujar rastro
  // --------------------------------------------------------

  display() {
    const speed = this.velocity.mag();

    // ------------------------------------------------------
    // PARÁMETRO VISUAL 1:
    // COLOR según el ruido + velocidad.
    // ------------------------------------------------------

    let colorPosition = constrain(
      this.fieldNoise * 0.75 + (speed / params.maxSpeed) * 0.25,
      0,
      1,
    );

    let c = getPaletteColor(colorPosition);

    // ------------------------------------------------------
    // PARÁMETRO VISUAL 2:
    // TRANSPARENCIA según velocidad.
    //
    // Las partículas rápidas dejan marcas más visibles.
    // ------------------------------------------------------

    let alpha = map(speed, 0, params.maxSpeed * 1.4, 18, 100, true);

    c.setAlpha(alpha);

    // ------------------------------------------------------
    // PARÁMETRO VISUAL 3:
    // GROSOR según ruido local y velocidad.
    // ------------------------------------------------------

    let weight = map(this.fieldDetail, 0, 1, 0.3, 1.7);

    weight *= map(speed, 0, params.maxSpeed, 0.65, 1.3, true);

    weight *= this.weightFactor;

    // ------------------------------------------------------
    // TRAZO
    // ------------------------------------------------------

    trailLayer.push();

    // ADD hace que los cruces acumulen luminosidad.
    trailLayer.blendMode(ADD);

    trailLayer.stroke(c);
    trailLayer.strokeWeight(weight);

    trailLayer.line(
      this.previousPosition.x,
      this.previousPosition.y,
      this.position.x,
      this.position.y,
    );

    trailLayer.pop();

    // Guardamos la posición para el siguiente segmento.
    this.previousPosition.set(this.position);
  }

  // --------------------------------------------------------
  // Bordes
  // --------------------------------------------------------

  checkEdges() {
    let crossed = false;

    if (this.position.x > width) {
      this.position.x = 0;
      crossed = true;
    }

    if (this.position.x < 0) {
      this.position.x = width;
      crossed = true;
    }

    if (this.position.y > height) {
      this.position.y = 0;
      crossed = true;
    }

    if (this.position.y < 0) {
      this.position.y = height;
      crossed = true;
    }

    // Evita que aparezca una línea atravesando
    // toda la pantalla al cruzar un borde.
    if (crossed) {
      this.previousPosition.set(this.position);
    }
  }

  // --------------------------------------------------------
  // Renacer
  // --------------------------------------------------------

  respawn() {
    // Aparece en alguno de los bordes.
    const side = floor(random(4));

    if (side === 0) {
      this.position.set(0, random(height));
    } else if (side === 1) {
      this.position.set(width, random(height));
    } else if (side === 2) {
      this.position.set(random(width), 0);
    } else {
      this.position.set(random(width), height);
    }

    this.previousPosition.set(this.position);

    this.velocity = p5.Vector.random2D();

    this.velocity.mult(random(0.2, 1));

    this.acceleration.mult(0);

    this.age = 0;

    this.life = random(600, 1800);
  }
}

// ==========================================================
// COLOR
// ==========================================================

function getPaletteColor(value) {
  const palette = palettes[paletteIndex];

  let colorA;
  let colorB;
  let amount;

  // Primera mitad de la paleta.
  if (value < 0.5) {
    colorA = color(palette[0]);

    colorB = color(palette[1]);

    amount = map(value, 0, 0.5, 0, 1);
  }

  // Segunda mitad.
  else {
    colorA = color(palette[1]);

    colorB = color(palette[2]);

    amount = map(value, 0.5, 1, 0, 1);
  }

  return lerpColor(colorA, colorB, amount);
}

// ==========================================================
// REGENERACIÓN
// ==========================================================

function regenerate() {
  // Nueva semilla.
  seed = floor(Math.random() * 999999999);

  randomSeed(seed);
  noiseSeed(seed);

  // Cada semilla comienza también en una
  // posición diferente dentro del ruido 3D.
  flowTime = random(1000);

  particles = [];

  for (let i = 0; i < NUM_PARTICLES; i++) {
    particles.push(new Particle());
  }

  clearTrails();
}

// ==========================================================
// LIMPIAR
// ==========================================================

function clearTrails() {
  trailLayer.push();

  trailLayer.blendMode(BLEND);

  trailLayer.background(5, 7, 12);

  trailLayer.pop();
}

// ==========================================================
// INTERFAZ
// ==========================================================

function drawInterface() {
  push();

  noStroke();

  fill(255, 190);

  textFont("monospace");

  textSize(11);

  textAlign(LEFT, TOP);

  const state = paused ? "PAUSA" : "ACTIVO";

  text(
    `MEMORIA DEL VIENTO
seed ${seed}
${NUM_PARTICLES} partículas · ${state}

R  nueva variación
P  cambiar paleta
C  limpiar memoria
S  guardar imagen
ESPACIO  pausa
H  ocultar interfaz

RATÓN  atraer
SHIFT + RATÓN  repeler`,
    20,
    20,
  );

  pop();
}

// ==========================================================
// TECLADO
// ==========================================================

function keyPressed() {
  // Nueva semilla / nueva composición.
  if (key === "r" || key === "R") {
    regenerate();
  }

  // Cambiar paleta.
  if (key === "p" || key === "P") {
    paletteIndex = (paletteIndex + 1) % palettes.length;
  }

  // Limpiar los rastros sin cambiar el campo.
  if (key === "c" || key === "C") {
    clearTrails();
  }

  // Guardar solo la obra, sin interfaz.
  if (key === "s" || key === "S") {
    saveCanvas(trailLayer.canvas, `memoria-del-viento-${seed}`, "png");
  }

  // Ocultar HUD.
  if (key === "h" || key === "H") {
    showHUD = !showHUD;
  }

  // Pausa.
  if (keyCode === 32) {
    paused = !paused;

    // Evita comportamiento del navegador.
    return false;
  }
}
