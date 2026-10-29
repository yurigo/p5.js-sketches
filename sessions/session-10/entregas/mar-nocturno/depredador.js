class Depredador {

    px;
    py;
    d;
    vx;
    vy;

    constructor(px, py, d) {
        this.px = px;
        this.py = py;
        this.d = d;
        this.vx = random(-2, 2);
        this.vy = random(-2, 2);
    }

    update() {
        this.updateVelocitat();
        this.updatePosition();
    }

    // patrulla: canvia de rumb poc a poc, però sempre va ràpid
    updateVelocitat() {
        this.vx += random(-0.15, 0.15);
        this.vy += random(-0.15, 0.15);

        this.vx = constrain(this.vx, -2.5, 2.5);
        this.vy = constrain(this.vy, -2.5, 2.5);
    }

    updatePosition() {
        this.px = this.px + this.vx;
        this.py = this.py + this.vy;

        if (this.px < 0) this.px = width;
        if (this.px > width) this.px = 0;
        if (this.py < 0) this.py = height;
        if (this.py > height) this.py = 0;
    }

    draw() {
        noStroke();

        // halo vermellós
        fill(355, 85, 80, 8);
        circle(this.px, this.py, this.d * 3.5);

        fill(355, 85, 80, 18);
        circle(this.px, this.py, this.d * 2);

        // cos fosc amb vora vermella
        stroke(355, 90, 85, 70);
        strokeWeight(2);
        fill(225, 80, 3);
        circle(this.px, this.py, this.d);
        noStroke();
    }

}