// Amarillo: círculo, velocidad media.
class Amarillo extends Agent {
  constructor() { super(1, { maxSpeed: 2.3, noiseForce: 0.10, size: 8 }); }
  shape(R) { circle(0, 0, R * 1.8); }
}
