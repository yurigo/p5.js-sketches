// Azul: cuadrado, lento y pesado.
class Azul extends Agent {
  constructor() { super(2, { maxSpeed: 1.5, noiseForce: 0.06, size: 9 }); }
  shape(R) { rectMode(CENTER); rect(0, 0, R * 1.7, R * 1.7); }
}
