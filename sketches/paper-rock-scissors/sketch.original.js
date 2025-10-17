// RPS Particles Battle – p5.js
// 50 ROCK vs 50 PAPER vs 50 SCISSORS
// Colisión => se aplica PPT, perdedor muere y emite una explosión de chispas.

// ---------- Config ----------
const SIDE_SCALE = 0.9;
const NUM_PER_TYPE = 50;
const R_PARTICLE = 25; // radio visible de partícula
const R_COLLISION = 50; // umbral de colisión
const SPEED = 1.2; // velocidad base
const NOISE_E = 0.002; // escala del ruido espacial
const NOISE_T = 0.01; // escala temporal del ruido
const TRAIL_ALPHA = 25; // estela del fondo
const SPARKS_PER_HIT = 16; // nº de chispas por explosión
const SPARK_SPEED = 2.4; // velocidad inicial chispa
const SPARK_LIFE = 100; // frames de vida chispa
const MAX_SPARKS = 1000; // tope por seguridad

// Interactividad opcional
let MODE_INTERACT = "none"; // 'none' | 'attract' | 'repel'
const MOUSE_R = 120;
const MOUSE_FORCE = 0.08;

// Tipos y colores
const ROCK = 0,
  PAPER = 1,
  SCISSORS = 2;
const COLORS = {
  [ROCK]: [200, 200, 220], // gris azulado
  [PAPER]: [180, 255, 180], // verde suave
  [SCISSORS]: [255, 170, 170], // rojo suave
};

// ---------- Estado ----------
let agents = []; // partículas principales
let sparks = []; // chispas de explosión

// ---------- Utilidades ----------
function winnerOf(a, b) {
  // Devuelve el ganador (ROCK/PAPER/SCISSORS) o null si empate (mismo tipo)
  if (a === b) return null;
  if (a === ROCK && b === SCISSORS) return a;
  if (a === SCISSORS && b === PAPER) return a;
  if (a === PAPER && b === ROCK) return a;
  return b;
}
function wrap(p) {
  if (p.x < 0) p.x = width;
  if (p.x > width) p.x = 0;
  if (p.y < 0) p.y = height;
  if (p.y > height) p.y = 0;
}

// ---------- Clases ----------
class Agent {
  constructor(x, y, type) {
    this.p = createVector(x, y);
    this.v = p5.Vector.random2D().mult(SPEED);
    this.type = type;
    this.phase = random(1000);
    this.isDead = false;
    this.a = p5.Vector.random2D().heading();
  }
  update(t) {
    // Viento por ruido (dirección suave)
    // const a =
    //   noise(this.p.x * NOISE_E, this.p.y * NOISE_E, t * NOISE_T + this.phase) *
    //   TWO_PI *
    //   2;

    const wind = p5.Vector.fromAngle(this.a).mult(0.6);
    this.v.add(wind).limit(SPEED * 1.6);

    // Interacción con ratón
    if (MODE_INTERACT !== "none") {
      const d = dist(this.p.x, this.p.y, mouseX, mouseY);
      if (d < MOUSE_R) {
        let dir = createVector(mouseX - this.p.x, mouseY - this.p.y).setMag(
          map(d, 0, MOUSE_R, MOUSE_FORCE, 0)
        );
        if (MODE_INTERACT === "repel") dir.mult(-1);
        this.v.add(dir);
      }
    }

    this.p.add(this.v);
    wrap(this.p);
  }
  draw() {
    const c = COLORS[this.type];
    fill(c[0], c[1], c[2]);
    noStroke();
    ellipse(this.p.x, this.p.y, R_PARTICLE * 2);
  }

  transformTo(newType) {
    this.type = newType;
  }
}

class Spark {
  constructor(x, y, color) {
    this.p = createVector(x, y);
    this.v = p5.Vector.random2D().mult(random(SPARK_SPEED * 0.4, SPARK_SPEED));
    this.life = SPARK_LIFE;
    this.hueSeed = color; //random(1000);
  }
  update(t) {
    // pequeño arrastre + viento sutil
    this.v.mult(0.97);
    const a =
      noise(
        this.p.x * NOISE_E * 2,
        this.p.y * NOISE_E * 2,
        (t + this.hueSeed) * NOISE_T
      ) *
      TWO_PI *
      2;
    this.v.add(p5.Vector.fromAngle(a).mult(0.05));
    this.p.add(this.v);
    this.life--;
    wrap(this.p);
  }
  draw(t) {
    // color viva en HSB según ruido
    colorMode(HSB, 360, 100, 100, 100);
    const h = noise(this.hueSeed + t * 0.02) * 360;
    const a = map(this.life, 0, SPARK_LIFE, 0, 80);
    fill(h, 90, 100, a);
    noStroke();
    ellipse(this.p.x, this.p.y, map(this.life, 0, SPARK_LIFE, 1, 4));
    colorMode(RGB, 255);
  }
}

// ---------- p5 ----------
function setup() {
  const s = min(windowWidth, windowHeight) * SIDE_SCALE;
  createCanvas(s, s);
  // spawn inicial 50/50/50
  for (let i = 0; i < NUM_PER_TYPE; i++)
    agents.push(new Agent(random(width), random(height), ROCK));
  for (let i = 0; i < NUM_PER_TYPE; i++)
    agents.push(new Agent(random(width), random(height), PAPER));
  for (let i = 0; i < NUM_PER_TYPE; i++)
    agents.push(new Agent(random(width), random(height), SCISSORS));
}

function windowResized() {
  const s = min(windowWidth, windowHeight) * SIDE_SCALE;
  resizeCanvas(s, s);
}

function draw() {
  // fondo con trail
  // fill(0, TRAIL_ALPHA);
  noStroke();
  rect(0, 0, width, height);

  const t = frameCount;

  // actualizar y dibujar agentes
  for (let a of agents) a.update(t);

  // detectar colisiones y resolver PPT
  // O(n^2) con n=150 es razonable; marcamos bajas y resolvemos después.
  for (let i = 0; i < agents.length; i++) {
    const A = agents[i];
    if (A.isDead) continue;
    for (let j = i + 1; j < agents.length; j++) {
      const B = agents[j];
      if (B.isDead) continue;

      const d2 = (A.p.x - B.p.x) ** 2 + (A.p.y - B.p.y) ** 2;
      if (d2 <= R_COLLISION * R_COLLISION) {
        // Solo si son de distinto tipo (si no, rebotito suave)
        if (A.type !== B.type) {
          const w = winnerOf(A.type, B.type);
          if (w !== null) {
            const loser = w === A.type ? B : A;
            const posHit = p5.Vector.add(A.p, B.p).mult(0.5);

            // marcar perdedor
            // loser.isDead = true;
            loser.transformTo(w);

            // chispas
            if (sparks.length < MAX_SPARKS) {
              for (let k = 0; k < SPARKS_PER_HIT; k++)
                sparks.push(new Spark(posHit.x, posHit.y));
            }

            // pequeño impulso al ganador para separarlos
            const winner = w === A.type ? A : B;
            const sep = p5.Vector.sub(winner.p, loser.p).setMag(1.2);
            winner.v.add(sep);
          }
        } else {
          // mismo tipo: empujón mínimo para evitar pegado
          const push = p5.Vector.sub(A.p, B.p).setMag(0.3);
          A.v.add(push);
          B.v.sub(push);
        }
      }
    }
  }

  // purgar caídos
  agents = agents.filter((a) => !a.isDead);

  // dibujar agentes
  for (let a of agents) a.draw();

  // actualizar/dibujar chispas
  for (let s of sparks) {
    s.update(t);
    s.draw(t);
  }
  sparks = sparks.filter((s) => s.life > 0);

  // HUD simple
  drawHUD();
}

function drawHUD() {
  const cR = agents.filter((a) => a.type === ROCK).length;
  const cP = agents.filter((a) => a.type === PAPER).length;
  const cS = agents.filter((a) => a.type === SCISSORS).length;
  noStroke();
  fill(255, 180);
  rect(10, 10, 145, 56, 6);
  fill(0);
  textSize(12);
  text(`ROCK: ${cR}\nPAPER: ${cP}\nSCISSORS: ${cS}`, 18, 28);

  // modo interacción
  // text(`Mode: ${MODE_INTERACT}`, 18, 64);
}

// --------- Interacción opcional ---------
// function keyPressed() {
//   if (key === "a" || key === "A") MODE_INTERACT = "attract";
//   if (key === "r" || key === "R") MODE_INTERACT = "repel";
//   if (key === "n" || key === "N") MODE_INTERACT = "none";
// }

function keyPressed() {
  if (key === "r" || key === "R") return reset();
}

function mousePressed() {
  return reset();
}

function reset() {
  agents = [];
  for (let i = 0; i < NUM_PER_TYPE; i++)
    agents.push(new Agent(random(width), random(height), ROCK));
  for (let i = 0; i < NUM_PER_TYPE; i++)
    agents.push(new Agent(random(width), random(height), PAPER));
  for (let i = 0; i < NUM_PER_TYPE; i++)
    agents.push(new Agent(random(width), random(height), SCISSORS));

  sparks = [];
  for (let i = 0; i < MAX_SPARKS; i++) sparks.push(new Spark(-100, -100, 0));
}
