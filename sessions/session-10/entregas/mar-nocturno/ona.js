class Ona {

    px;
    py;
    radi;
    ttl;
    ttlMax;

    constructor(px, py) {
        this.px = px;
        this.py = py;
        this.radi = 10;
        this.ttlMax = 70;
        this.ttl = this.ttlMax;
    }

    update() {
        this.radi += 4;
        this.ttl--;
    }

    isAlive() {
        return this.ttl > 0;
    }

    draw() {
        const alfa = map(this.ttl, 0, this.ttlMax, 0, 60);

        noFill();
        stroke(190, 30, 100, alfa);
        strokeWeight(2);
        circle(this.px, this.py, this.radi * 2);
        noStroke();
    }

}