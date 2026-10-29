// Rojo: triángulo, rápido e inquieto.
class Rojo extends Agent {
  constructor() { super(0, { maxSpeed: 3.2, noiseForce: 0.16, size: 8 }); }
  shape(R) { triangle(R * 1.4, 0, -R, -R * 0.8, -R, R * 0.8); }
}
