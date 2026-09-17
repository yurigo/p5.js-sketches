function setup() {
    createCanvas(800, 600);
    noStroke();
    rectMode(CENTER)
}

let colorR = 200;
let colorG = 200;
let colorB = 200;
let tamano = 300;

const CIRCULO = 0;
const CUADRADO = 1;

let figura = CIRCULO;  // circulo y el 2 es cuadrado

function draw() {
    if (!keyIsPressed){
        background(220);
    }
    
    // fill(50)
    // circle(pmouseX,pmouseY,tamano);

    // fill(colorR,colorG,colorB);
    // circle(mouseX,mouseY,tamano);
    pintaFigura();
    pintaSatelite();

}

function pintaFigura(){
    if (figura === CIRCULO){
        //fill(50)
        //circle(pmouseX,pmouseY,tamano);

        fill(colorR,colorG,colorB);
        circle(mouseX,mouseY,tamano);
    }
    else if ( figura === CUADRADO){
        //fill(50)
        //rect(pmouseX,pmouseY,tamano);

        fill(colorR,colorG,colorB);
        rect(mouseX,mouseY,tamano);
    }
}

function mouseClicked(){
    // console.log("click!!!")
    
    colorR = random(0,255)
    colorG = random(0,255)
    colorB = random(0,255)
}

function mouseWheel(event){
    if (event.delta > 0){
        tamano+=10;
    }else{
        tamano-=10;
    }
}

function keyPressed(){
    // console.log(figura)

    if (key==="e" || key==="E"){
        figura = (figura + 1) % 2
        
    }

}

function pintaSatelite(){
    //mouseX mouseY
    // fill(255,0,0);
    stroke("blue");
    strokeWeight(4)
    d = 200;                                     
    circle(
        mouseX + d * Math.sin(frameCount/40),
        mouseY + d * Math.cos(frameCount/40),
        20);
}