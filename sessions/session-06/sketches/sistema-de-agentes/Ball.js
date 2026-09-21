class Ball{

    px;
    py;
    d;
    c;
    vx;
    vy;

    constructor(px, py, d){
        this.px = px;
        this.py = py;
        this.d = d;
        this.c = 255;
        this.vx = random(-1,1);
        this.vy = random(-1,1);
        this.grow = true;
    }

    pintate(){
        fill(0 , 100 , this.c);
        circle(this.px, this.py, this.d);
    }

    updateSize(){
        // mejorar este algoritmo...
        // if (this.d < 300 && this.grow){
        //     this.grow = true;
        // } else {
        //     this.grow = false;
        //     if (this.d === 0) this.grow = true;
        // }

        // if (this.grow){
        //     this.d = this.d + 1;
        // }else{
        //     this.d = this.d - 1;
        // }
    }

    updatePosition(){
        this.px = this.px + this.vx;
        this.py = this.py + this.vy;

        if (this.px < 0) this.px = width;
        if (this.px > width) this.px = 0;
        if (this.py < 0) this.py = height;
        if (this.py > height) this.py = 0;
        
    }

    updateColor(mouseX, mouseY){
        const distancia = dist(mouseX, mouseY, this.px, this.py);
        const vergonzosidad = map(distancia, 0, 500, 50, 100);

        this.c = vergonzosidad;
    }

    updateLineasConstelacion(neighbours, currentIndex){
        for (let i = currentIndex + 1; i < neighbours.length; i++){
            const n = neighbours[i];
            const distancia = dist(this.px, this.py, n.px, n.py);
            if (distancia < 300){
                line(this.px, this.py, n.px, n.py);
            }
        }
    }



}