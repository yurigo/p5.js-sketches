class Ball{

    px;
    py;
    d;
    c;
    vx;
    vy;
    ttl;

    constructor(px, py, d){
        this.px = px;
        this.py = py;
        this.d = d;
        this.c = 255;
        this.vx = 0;
        this.vy = random(-2,-5);
        this.grow = true;
        this.ttl = 50;
    }

    draw(){
        noStroke();
        
        const v = map(this.ttl, 0, 50, 0 , 255);
        const size = map(this.ttl, 0, 50, 100, 3)

        fill(v, v, v, this.ttl);
        
        circle(this.px, this.py, size);
    }

    updateLife(){
        this.ttl--;
    }

    isAlive(){
        return this.ttl > 0;
    }

    updatePosition(){
        this.px = this.px + this.vx;
        this.py = this.py + this.vy;
    }

    update(){
        this.updatePosition();
        this.updateLife();
    }

}