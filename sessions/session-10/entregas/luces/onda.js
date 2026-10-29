class Onda {
  constructor(x, y, col, radioMax, ttl, grosor) {
    this.x = x;
    this.y = y;
    this.col = col;
    this.radioMax = radioMax;
    this.ttl = ttl;
    this.ttlMax = ttl;
    this.grosor = grosor;
  }

  update() {
    this.ttl--;
  }

  draw() {
    const t = 1 - this.ttl / this.ttlMax; // progreso 0 → 1
    const radio = this.radioMax * (1 - pow(1 - t, 3)); 
    const a = 1 - t;
    noFill();
    stroke(this.col[0], this.col[1], this.col[2], 180 * a);
    strokeWeight(this.grosor * a + 0.5);
    circle(this.x, this.y, radio * 2);
  }

  isAlive() {
    return this.ttl > 0;
  }
}
