
const MAGENTA = 0;
const TURQUESA = 1;
const AMBAR = 2;

const FAMILIAS = [
  { nombre: 'magenta', hex: '#ff2d9b', vel: [2.0, 2.8], fuerza: 0.11, r: 3.2 },
  { nombre: 'turquesa', hex: '#1de9c8', vel: [1.4, 2.0], fuerza: 0.06, r: 3.6 },
  { nombre: 'ámbar', hex: '#ffae1a', vel: [0.8, 1.3], fuerza: 0.035, r: 5.2 },
];

const RADIO_PRESA = 170;
const RADIO_DEPREDADOR = 95;
const RADIO_SEPARACION = 16;

// Color base de una familia como [r, g, b]
function colorDeFamilia(familia) {
  const c = color(FAMILIAS[familia].hex);
  return [red(c), green(c), blue(c)];
}

// A quién persigue y de quién huye una familia
function presaDe(familia, invertido) {
  return invertido ? (familia + 2) % 3 : (familia + 1) % 3;
}
function depredadorDe(familia, invertido) {
  return invertido ? (familia + 1) % 3 : (familia + 2) % 3;
}

class Luz extends Vehicle {
  constructor(x, y, familia) {
    super(x, y);
    const f = FAMILIAS[familia];
    this.familia = familia;
    this.base = colorDeFamilia(familia);
    this.col = [...this.base]; // color actual
    this.r = f.r * random(0.8, 1.2);
    this.maxspeed = random(f.vel[0], f.vel[1]);
    this.maxforce = f.fuerza;
    this.encuentros = 0;
    this.mutaciones = 0;
    this.enfriamiento = 0; // frames sin poder tener otro encuentro
    this.destello = 0; // 1 justo después de un encuentro, decae
    this.giro = random(TWO_PI);
  }

  comportarse(luces, intensidad, invertido) {
    const presaF = presaDe(this.familia, invertido);
    const depF = depredadorDe(this.familia, invertido);

    let presa = null;
    let dPresa = RADIO_PRESA;
    let depredador = null;
    let dDep = RADIO_DEPREDADOR;
    let separacion = createVector(0, 0);
    let nSep = 0;

    // un solo recorrido por todas las luces
    for (const o of luces) {
      if (o === this) continue;
      const d = this.distanciaA(o);
      if (o.familia === presaF && d < dPresa) {
        dPresa = d;
        presa = o;
      } else if (o.familia === depF && d < dDep) {
        dDep = d;
        depredador = o;
      } else if (o.familia === this.familia && d < RADIO_SEPARACION && d > 0) {
        separacion.add(p5.Vector.sub(this.position, o.position).div(d));
        nSep++;
      }
    }

    // Identidad de movimiento de cada familia
    if (this.familia === MAGENTA) {
      this.wander(0.004, 0.6);
      this.applyForce(p5.Vector.random2D().mult(0.12)); // nervio
    } else if (this.familia === TURQUESA) {
      this.wander(0.007, 1.2); // campo muy ondulado 
    } else {
      this.wander(0.0015, 0.5); // campo amplio 
    }

    // Relaciones entre familias
    if (presa) this.seek(presa.position, intensidad);
    if (depredador) this.flee(depredador.position, intensidad * 1.4);

    // Las luces de la misma familia no se pisan
    if (nSep > 0) {
      separacion.setMag(this.maxspeed);
      let steer = p5.Vector.sub(separacion, this.velocity);
      steer.limit(this.maxforce);
      this.applyForce(steer);
    }
  }

  vivir() {
    this.update();
    this.edges();
    if (this.enfriamiento > 0) this.enfriamiento--;
    this.destello *= 0.92;
    if (this.familia === AMBAR) this.giro += 0.02;
    // El color vuelve muy despacio a su base
    for (let i = 0; i < 3; i++) this.col[i] = lerp(this.col[i], this.base[i], 0.002);
  }

  // tras varios encuentros absorbe parte del color ajeno
  mutar(otroCol) {
    for (let i = 0; i < 3; i++) this.col[i] = lerp(this.col[i], otroCol[i], 0.35);
    this.mutaciones++;
    this.r = min(this.r * 1.06, FAMILIAS[this.familia].r * 2);
  }

  show() {
    const p = this.position;
    const d = this.r * 5 + this.destello * 40;
    halo(p.x, p.y, d, this.col, 0.5 + this.destello * 0.6);

    // Núcleo con forma propia de cada familia
    push();
    translate(p.x, p.y);
    const c = this.col;
    if (this.familia === MAGENTA) {
      rotate(this.velocity.heading());
      noStroke();
      fill(c[0], c[1], c[2], 230);
      triangle(this.r * 1.6, 0, -this.r, -this.r * 0.8, -this.r, this.r * 0.8);
    } else if (this.familia === TURQUESA) {
      noFill();
      stroke(c[0], c[1], c[2], 230);
      strokeWeight(1.4);
      circle(0, 0, this.r * 2.2);
    } else {
      rotate(this.giro);
      noStroke();
      fill(c[0], c[1], c[2], 220);
      rectMode(CENTER);
      square(0, 0, this.r * 1.5);
    }
    pop();
  }
}
