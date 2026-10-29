class Medusa {

    px;
    py;
    d;
    vx;
    vy;
    fase;
    pols;

    constructor(px, py, d) {
        this.px = px;
        this.py = py;
        this.d = d;
        this.vx = random(-0.2, 0.2);
        this.vy = random(-0.2, 0.2);
        this.fase = random(0, TWO_PI);
        this.pols = 0;
    }

    update() {
        this.updatePols();
        this.updateVelocitat();
        this.updatePosition();
    }

    // pols va de -1 a 1 i fa que la campana s'obri i es tanqui
    updatePols() {
        this.pols = sin(frameCount * 0.03 + this.fase);
    }

    // es mou molt més lenta que les llums
    updateVelocitat() {
        this.vx += random(-0.01, 0.01);
        this.vy += random(-0.01, 0.01);

        this.vx = constrain(this.vx, -0.3, 0.3);
        this.vy = constrain(this.vy, -0.3, 0.3);
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
        // la campana s'obre i es tanca amb el pols
        const mida = this.d * map(this.pols, -1, 1, 0.8, 1.2);

        noStroke();

        // halo translúcid
        fill(280, 60, 90, 6);
        circle(this.px, this.py, mida * 2.2);

        // campana
        fill(280, 50, 95, 14);
        circle(this.px, this.py, mida);

        // tentacles que oscil·len
        stroke(280, 40, 100, 25);
        strokeWeight(1.5);
        for (let i = -2; i <= 2; i++) {
            const x0 = this.px + i * mida * 0.15;
            const y0 = this.py + mida * 0.3;
            const x1 = x0 + sin(frameCount * 0.04 + this.fase + i) * 8;
            const y1 = y0 + mida * 0.8;
            line(x0, y0, x1, y1);
        }
        noStroke();
    }

}