// AC.02 — SISTEMA VIVO · "PIGMENTO"
// Tras 6 relaciones un agente muere (con un sonido propio) y renace como primario puro.

const BG = [9, 8, 13];
const PRIM = [[236, 40, 52], [252, 214, 38], [36, 100, 240]];   // rojo, amarillo, azul
const NAMES = ['Rojo', 'Amarillo', 'Azul'];
const MAX_ENC = 6;                   // relaciones que aguanta un agente antes de morir
const TOTAL = 120;                   // número de agentes
const PERCEPTION = 95;               // distancia a la que un agente nota a otro
const TOUCH = 30;                    // distancia a la que dos agentes se encuentran

// ================= PIGMENT =================
// Utilidades de color. Cada agente guarda 3 pesos [rojo, amarillo, azul] que suman 1.
class Pigment {
  // Color = media de los tres primarios ponderada por los pesos.
  static mix(w) {
    return [0, 1, 2].map(j => w[0] * PRIM[0][j] + w[1] * PRIM[1][j] + w[2] * PRIM[2][j]);
  }
  // Diferencia entre dos composiciones (0 = iguales, 1 = totalmente distintas).
  static distance(a, b) {
    return (abs(a[0] - b[0]) + abs(a[1] - b[1]) + abs(a[2] - b[2])) / 2;
  }
  // Acerca un color a un gris pálido; k va de 0 (nada) a 1 (todo el desgaste).
  static fade(c, k) {
    const gray = [205, 205, 215];
    return c.map((v, j) => lerp(v, gray[j], k * 0.85));
  }
}

// ================= AGENT =================
// Clase base de un habitante 
// Cada color la extiende (Rojo.js, Amarillo.js, Azul.js) y aporta su forma y su movimiento.
class Agent {
  // fam: 0 rojo, 1 amarillo, 2 azul. traits: rasgos propios de cada color.
  constructor(fam, traits) {
    this.fam = fam;
    this.maxSpeed = traits.maxSpeed;
    this.noiseForce = traits.noiseForce;
    this.size = traits.size;
    this.position = createVector(random(width), random(height));
    this.velocity = p5.Vector.random2D().mult(random(0.8, 1.5));
    this.acceleration = createVector(0, 0);
    this.seed = random(1000);
    this.pigment = [0, 0, 0];
    this.pigment[fam] = 1;           // nace como primario puro
    this.cooldown = 0;               // pausa tras un encuentro
    this.encounters = 0;             // relaciones acumuladas
    this.color = Pigment.mix(this.pigment);
  }

  applyForce(force) { this.acceleration.add(force); }

  // Reacción ante otro agente cercano (d = distancia entre los dos).
  // Cadena cíclica: rojo busca amarillo, amarillo busca azul, azul busca rojo.
  perceive(other, d, social) {
    const dir = p5.Vector.sub(other.position, this.position).normalize();
    const closeness = map(d, 0, PERCEPTION, 1, 0);
    if (other.fam === (this.fam + 1) % 3) {              // lo que desea: se acerca
      this.applyForce(dir.mult(0.045 * social * closeness));
    } else if (other.fam === (this.fam + 2) % 3) {       // quien le persigue: huye un poco
      this.applyForce(dir.mult(-0.02 * social * closeness));
    } else if (d < 32) {                                 // misma familia: espacio personal
      this.applyForce(dir.mult(-map(d, 0, 32, 0.04, 0)));
    }
  }

  // Encuentro con otro agente: intercambian pigmento, se desvían y se gastan.
  // Devuelve true si el encuentro ocurrió.
  meet(other, mix) {
    if (this.cooldown > 0 || other.cooldown > 0) return false;
    if (Pigment.distance(this.pigment, other.pigment) < 0.08) return false;   // casi iguales
    const mine = this.pigment.slice();
    for (let k = 0; k < 3; k++) {
      this.pigment[k] = lerp(this.pigment[k], other.pigment[k], mix);
      other.pigment[k] = lerp(other.pigment[k], mine[k], mix);
    }
    this.cooldown = other.cooldown = 45;
    this.encounters++; other.encounters++;
    this.velocity.rotate(random(-1.2, 1.2));             // cambio de dirección
    other.velocity.rotate(random(-1.2, 1.2));
    return true;
  }

  isDead() { return this.encounters >= MAX_ENC; }

  update() {
    this.cooldown--;
    this.wander();
    this.fleeMouse();
    this.edges();
    this.move();
    this.bounce();
    // cada relación baja la saturación 1/MAX_ENC
    this.color = Pigment.fade(Pigment.mix(this.pigment), this.encounters / MAX_ENC);
  }

  wander() {                                             // movimiento autónomo con noise()
    const angle = noise(this.position.x * 0.0018, this.position.y * 0.0018,
                        frameCount * 0.0015 + this.seed) * TWO_PI * 2;
    this.applyForce(p5.Vector.fromAngle(angle).mult(this.noiseForce));
  }

  fleeMouse() {                                          // el ratón repele siempre
    const d = dist(mouseX, mouseY, this.position.x, this.position.y);
    if (d < 200) {
      const away = p5.Vector.sub(this.position, createVector(mouseX, mouseY)).normalize();
      this.applyForce(away.mult(map(d, 0, 200, 0.6, 0)));
    }
  }

  edges() {                                              // empuje suave hacia dentro junto a los bordes
    const edge = 70, e = 0.12, f = createVector(0, 0);
    if (this.position.x < edge) f.x = map(this.position.x, 0, edge, e, 0);
    if (this.position.x > width - edge) f.x = -map(this.position.x, width - edge, width, 0, e);
    if (this.position.y < edge) f.y = map(this.position.y, 0, edge, e, 0);
    if (this.position.y > height - edge) f.y = -map(this.position.y, height - edge, height, 0, e);
    this.applyForce(f);
  }

  move() {
    this.velocity.add(this.acceleration);
    this.velocity.limit(this.maxSpeed);
    this.position.add(this.velocity);
    this.acceleration.mult(0);
  }

  bounce() {                                             // rebote hacia dentro con ángulo aleatorio
    const m = this.size, speed = max(this.velocity.mag(), 1.2);
    let hit = false, nx = 0, ny = 0;
    if (this.position.x < m)          { this.position.x = m;          nx = 1;  hit = true; }
    if (this.position.x > width - m)  { this.position.x = width - m;  nx = -1; hit = true; }
    if (this.position.y < m)          { this.position.y = m;          ny = 1;  hit = true; }
    if (this.position.y > height - m) { this.position.y = height - m; ny = -1; hit = true; }
    if (hit) {
      const angle = atan2(ny, nx) + random(-1.0, 1.0);
      this.velocity = p5.Vector.fromAngle(angle).mult(speed);
    }
  }

  show() {
    noStroke(); fill(...this.color);
    push();
    translate(this.position.x, this.position.y);
    rotate(this.velocity.heading());
    this.shape(this.size);
    pop();
  }

  shape(R) {}                                            // cada color dibuja la suya
}

// ================= BURST =================
// Partícula de muerte: único sistema secundario, con tiempo de vida (ttl) limitado.
class Burst {
  constructor(x, y, c) {
    this.position = createVector(x, y);
    this.velocity = p5.Vector.random2D().mult(random(0.5, 5));
    this.c = c;
    this.maxTtl = this.ttl = random(50, 100);
  }
  isDead() { return this.ttl <= 0; }
  update() {
    this.velocity.mult(0.96);
    this.position.add(this.velocity);
    this.ttl--;
  }
  show() {
    noStroke();
    fill(this.c[0], this.c[1], this.c[2], map(this.ttl, 0, this.maxTtl, 0, 220));
    circle(this.position.x, this.position.y, 4);
  }
}

// ================= ECOSYSTEM =================
// Clase de cada color, por índice (Rojo.js, Amarillo.js y Azul.js se cargan después de este archivo).
function colorClass(i) { return [Rojo, Amarillo, Azul][i]; }

class Ecosystem {
  constructor(sound) {
    this.sound = sound;
    this.params = { mix: 0.3, social: 1 };         // parámetros que evolucionan solos
    this.reset();
  }

  reset() {
    this.agents = []; this.bursts = []; this.deaths = 0;
    for (let f = 0; f < 3; f++)
      for (let i = 0; i < TOTAL / 3; i++) this.agents.push(new (colorClass(f))());
    this.share = this.computeShare();
  }

  // Cantidad de cada color en el mundo (suma de 1).
  computeShare() {
    const s = [0, 0, 0];
    for (const a of this.agents) for (let k = 0; k < 3; k++) s[k] += a.pigment[k] / this.agents.length;
    return s;
  }

  update() {
    const t = frameCount * 0.0004;                 // evolución lenta de las reglas
    this.params.mix = map(noise(t), 0, 1, 0.15, 0.5);
    this.params.social = map(noise(t + 50), 0, 1, 0.5, 1.7);

    this.interact();
    for (let i = 0; i < this.agents.length; i++) {
      this.agents[i].update();
      if (this.agents[i].isDead()) this.kill(i);
    }
    for (const b of this.bursts) b.update();
    this.bursts = this.bursts.filter(b => !b.isDead());   // elimina las partículas agotadas
    this.share = this.computeShare();
  }

  // Relaciones entre todos los pares de agentes.
  interact() {
    const A = this.agents;
    for (let i = 0; i < A.length; i++) {
      for (let j = i + 1; j < A.length; j++) {
        const a = A[i], b = A[j];
        const d = dist(a.position.x, a.position.y, b.position.x, b.position.y);
        if (d > PERCEPTION) continue;
        a.perceive(b, d, this.params.social);
        b.perceive(a, d, this.params.social);
        if (d < TOUCH + (a.size + b.size) / 2 && a.meet(b, this.params.mix)) this.sound.encounter(a, b, this.share);
      }
    }
  }

  // Muerte: libera los tres primarios, suena y el agente es sustituido por un
  // nuevo primario puro de la familia menos poblada.
  kill(i) {
    const dead = this.agents[i];
    for (let k = 0; k < 3; k++)
      for (let n = 0; n < 14; n++) this.bursts.push(new Burst(dead.position.x, dead.position.y, PRIM[k]));
    this.sound.death();
    const count = [0, 0, 0];
    for (const a of this.agents) count[a.fam]++;
    this.agents[i] = new (colorClass(count.indexOf(min(count))))();
    this.deaths++;
  }

  show() {
    for (const a of this.agents) a.show();
    for (const b of this.bursts) b.show();
  }
}

// ================= SOUND SYSTEM =================
// Solo osciladores controlados con frecuencia y amplitud (como en la sesión 08).
//   Encuentro: una nota corta, siempre la misma, que suena SOLO al chocarse y se apaga enseguida.
//     Su volumen depende de cuánto hay en el mundo de los colores que chocan:
//     si son colores abundantes suena más fuerte, si son escasos casi no se oye.
//   Muerte: una nota grave y corta.
// El audio empieza con el primer clic o tecla (el navegador pide un gesto del usuario).
class SoundSystem {
  constructor() {
    this.on = false; this.muted = false; this.msg = '';
    this.blipLevel = 0; this.thudLevel = 0;
    if (typeof p5.Oscillator === 'undefined') {
      this.msg = 'SIN SONIDO: falta cargar p5.sound en index.html (o usa p5 1.x, no 2.x)';
      return;
    }
    this.blip = new p5.Oscillator('sine'); this.blip.freq(midiToFreq(72)); this.blip.amp(0);
    this.thud = new p5.Oscillator('sine'); this.thud.freq(55); this.thud.amp(0);
  }

  start() {
    if (this.on || !this.blip) return;
    userStartAudio();
    this.blip.start(); this.thud.start();
    this.on = true;
  }

  toggleMute() { this.muted = !this.muted; }

  // a y b son los agentes que chocan; share, la cantidad de cada color en el mundo.
  encounter(a, b, share) {
    const amount = (share[a.fam] + share[b.fam]) / 2;
    this.blipLevel = max(this.blipLevel, map(amount, 0, 1, 0, 0.7));
  }
  death() { this.thudLevel = 0.5; }

  // Cada fotograma los sonidos se apagan solos hasta llegar al silencio.
  update() {
    if (!this.on) return;
    this.blipLevel *= 0.85;                        // la nota del choque se apaga rápido
    this.thudLevel *= 0.92;                        // la de la muerte, algo más larga que la del choque
    if (this.blipLevel < 0.003) this.blipLevel = 0;
    if (this.thudLevel < 0.003) this.thudLevel = 0;
    const vol = this.muted ? 0 : 1;
    this.blip.amp(this.blipLevel * vol, 0.02);
    this.thud.amp(this.thudLevel * vol, 0.02);
  }
}

// ================= HUD =================
class Hud {
  show(world, sound) {
    noStroke(); textSize(12);

    // cantidad de cada color, en texto y con su propio color
    textAlign(LEFT, TOP);
    fill(255, 120); text('COLOR EN EL MUNDO', 16, 16);
    for (let k = 0; k < 3; k++) {
      fill(...PRIM[k]);
      text(NAMES[k] + '  ' + round(world.share[k] * 100) + ' %', 16, 36 + k * 18);
    }

    // estado del sonido y ayuda
    textAlign(LEFT, BOTTOM);
    if (sound.msg) { fill(255, 120, 120); text(sound.msg, 16, height - 34); }
    else if (!sound.on) { fill(255, 150); text('haz clic o pulsa una tecla para activar el sonido', 16, height - 34); }
    fill(255, 90);
    text('mueve el ratón: repele · R: reiniciar · M: silencio · S: captura', 16, height - 14);
    textAlign(RIGHT, BOTTOM); text('muertes: ' + world.deaths, width - 16, height - 14);
  }
}

// ================= SKETCH (p5.js) =================
let world, sound, hud;

function setup() {
  createCanvas(windowWidth, windowHeight);
  sound = new SoundSystem();
  world = new Ecosystem(sound);
  hud = new Hud();
}

function draw() {
  background(BG);                       // sin rastros
  world.update();
  world.show();
  sound.update();
  hud.show(world, sound);
}

function windowResized() { resizeCanvas(windowWidth, windowHeight); }

function keyPressed() {
  sound.start();
  const k = key.toLowerCase();
  if (k === 'r') world.reset();
  else if (k === 'm') sound.toggleMute();
  else if (k === 's') saveCanvas('sistema-vivo', 'png');
}

function mousePressed() { sound.start(); }
