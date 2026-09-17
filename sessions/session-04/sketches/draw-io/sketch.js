let circulos = [];


function setup() {
    noStroke();
    createCanvas(800, 600);
    background(220);

    for (let i = 0 ; i < 50 ; i++){
        let c = {
            x: random(0,width),
            y: random(0, height),
            d: random(5,30)
        }
        circulos.push(c);
    }
}

function draw() {
    // console.log(circulos)
    background(0)
    fill(255);
    pintaCirculos(circulos);
    // background(220);

    // let speed = dist(mouseX, mouseY, pmouseX, pmouseY) + 1;
    // console.log(speed)

    // strokeWeight( map(1/speed,0,Infinity,1,10) );
    // stroke("green")
    // strokeWeight(1)
    line(pmouseX,pmouseY,mouseX,mouseY);

    // drawSatellite("red", 50, frameCount/10, frameCount/40);
    // drawSatellite("salmon", 100, frameCount/20, frameCount/40);
    // drawSatellite("yellow", 150, frameCount/40, frameCount/40);
    // drawSatellite("blue", 200, frameCount/40, frameCount/10);
    // drawSatellite("magenta", 400, frameCount/1, frameCount/PI);
    // drawSatellite("green", 400, frameCount, frameCount/90);
}

function keyPressed(){
    if(key === "R" || key === "r"){
        background(220);
    }
}



function drawSatellite(color, distance, faseX, faseY){
    push();
    noStroke();
    fill(color);
    
    circle(
        mouseX + distance * Math.sin(faseX),
        mouseY + distance * Math.cos(faseY),
        5
    )
    pop();
}


function pintaCirculos(){
    // for (let i = 0; i < circulos.length; i++){
    //     circle(circulos[i].x, circulos[i].y, circulos[i].x)
    // }

    for (const circulo of circulos) {
        circle(circulo.x, circulo.y, circulo.d);
    }

    // circulos.forEach(c => {
    //     // console.log(c)
    //     circle(c.x, c.y, c.d);
    // })

}