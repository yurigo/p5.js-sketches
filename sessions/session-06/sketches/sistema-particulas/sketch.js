let particulas = [];

function setup() {
    noStroke();
    createCanvas(800, 600);

    particulas.push(new Ball(width/2, height/2, random(20,30)));
    particulas.push(new Ball(width/2, height/2, random(20,30)));
    particulas.push(new Ball(width/2, height/2, random(20,30)));
    particulas.push(new Ball(width/2, height/2, random(20,30)));
}

function draw() {
    background(220);
    
    particulas.push(new Ball(width/2, height/2, random(20,30)));
    particulas.push(new Ball(width/2, height/2, random(20,30)));
    particulas.push(new Ball(width/2, height/2, random(20,30)));
    particulas.push(new Ball(width/2, height/2, random(20,30)));

    for (const particula of particulas) {
        particula.update();
        particula.draw();
    }

    // borra las particulas muertas...
    // que sinó la cpu se va a ir al garete
    // y la ram tambien...abs(
    
    particulas = particulas.filter( p => {
        return p.isAlive();
    })
}
