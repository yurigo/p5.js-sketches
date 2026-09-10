function setup() {
    createCanvas(800, 600);
    frameRate(1);
}

function draw() {
    background(220);

    // fill(0);
    // circle(30,30, 20);
    // strokeWeight(5)
    // line(30,30,30,70)
    // line(20,50,40,50)
    // line(30,70,20,90)
    // line(30,70,40,90)

// const p1 = new Persona(30, 30);
// console.log(p1)
// p1.draw();
// const p2 = new Persona(50, 50);
// console.log(p1)
// p2.draw();

for (let i = 0; i < 1000; i++){
    const p1 = new Persona(Math.random() * width, Math.random() * height);
    p1.draw();
}

}

class Persona{
    x;
    y;
    c;

    constructor(x,y){
        this.x = x;
        this.y = y;
        this.c = parseInt(Math.random() * 150);
    }

    draw(){

        console.log("hola", this.x , this.y);
        fill(this.c);
        circle(this.x,this.y, 20);
        stroke(this.c);
        strokeWeight(5)
        line(this.x,this.y,this.x,this.y + 40)
        line(this.x - 10, this.y + 20, this.x + 10,this.y + 20)
        line(this.x,this.y + 40, this.x - 10, this.y + 60);
        line(this.x,this.y + 40, this.x + 10, this.y + 60);

    }
}
