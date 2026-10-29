// ------------------------------------------------------------
// SONIDO
// Todo el sonido se genera con osciladores de p5.sound
// (no hace falta ningún archivo de audio).
//
//  - Un "zumbido" de fondo que cambia según el estado del sistema.
//  - Varias "voces" para los estallidos y los contagios.
//    Cada familia tiene su timbre y el tamaño decide la nota:
//    burbuja pequeña = nota aguda, burbuja grande = nota grave.
// ------------------------------------------------------------

class Sonido {
  constructor() {
    // Timbre de cada familia: 0 rojas, 1 verdes, 2 azules
    this.timbres = ["sine", "triangle", "square"];

    // Voces que se van turnando para poder sonar varias a la vez
    this.voces = [];
    for (let i = 0; i < 8; i++) {
      let voz = new p5.Oscillator(440, "sine");
      voz.amp(0);
      voz.start();
      this.voces.push(voz);
    }
    this.turno = 0;

    // Zumbido de fondo
    this.fondo = new p5.Oscillator(100, "sine");
    this.fondo.amp(0);
    this.fondo.start();
  }

  // Toca una nota corta con la siguiente voz libre
  tocar(familia, frecuencia, volumen, duracion) {
    let voz = this.voces[this.turno];
    this.turno = (this.turno + 1) % this.voces.length;

    voz.setType(this.timbres[familia]);
    voz.freq(frecuencia);
    voz.amp(volumen, 0.01); // sube rápido...
    voz.amp(0, duracion, 0.02); // ...y se apaga poco a poco
  }

  sonarExplosion(familia, radio) {
    let frecuencia = map(radio, RADIO_MIN, RADIO_MAX, 900, 200);
    this.tocar(familia, frecuencia, 0.2, 0.4);
  }

  sonarContagio(familia, radio) {
    let frecuencia = map(radio, RADIO_MIN, RADIO_MAX, 1800, 600);
    this.tocar(familia, frecuencia, 0.05, 0.1);
  }

  // El fondo depende del sistema:
  //   más burbujas  = más volumen
  //   más velocidad = sonido más agudo
  actualizarFondo(cantidad, velocidadMedia) {
    let volumen = map(cantidad, MIN_BURBUJAS, MAX_BURBUJAS, 0.02, 0.08);
    let frecuencia = map(velocidadMedia, 0, VELOCIDAD_MAX, 70, 200);

    this.fondo.amp(volumen, 0.2);
    this.fondo.freq(frecuencia, 0.2);
  }
}
