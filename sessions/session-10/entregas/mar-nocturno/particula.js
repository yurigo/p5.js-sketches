class Particula {

    px;
    py;
    vx;
    vy;
    ttl;
    ttlMax;
    hue;

    constructor(px, py, hue) {
        this.px = px;
        this.py = py;

        // sortida en una direcció aleatòria (explosió)
        const angle = random(0, TWO_PI);
        const velocitat = random(1, 4);
        this.vx = cos(angle) * velocitat;
        this.vy = sin(angle) * velocitat;

        this.ttlMax = random(30, 55);
        this.ttl = this.ttlMax;
        this.hue = hue;
    }

    update() {
        this.updatePosition();
        this.updateLife();
    }

    updatePosition() {
        // frega: cada frame perd una mica de velocitat
        this.vx *= 0.95;
        this.vy *= 0.95;

        this.px = this.px + this.vx;
        this.py = this.py + this.vy;
    }

    updateLife() {
        this.ttl--;
    }

    isAlive() {
        return this.ttl > 0;
    }

    draw() {
        const alfa = map(this.ttl, 0, this.ttlMax, 0, 90);
        const mida = map(this.ttl, 0, this.ttlMax, 1, 7);

        noStroke();

        fill(this.hue, 50, 100, alfa * 0.3);
        circle(this.px, this.py, mida * 3);

        fill(this.hue, 20, 100, alfa);
        circle(this.px, this.py, mida);
    }

}