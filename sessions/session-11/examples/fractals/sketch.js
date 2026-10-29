let incremento = 5;

function setup(){
    createCanvas(800,600);
    // noLoop();
    angleMode(DEGREES);
}

function draw(){
    background(255);

    translate(width / 2, height / 2);

    const petalos = 3;

    for (let i = 0; i < petalos ; i++){
        push();
        stroke(
            random(150,250),
            random(150,250),
            random(150,250)
        );
        rotate(360/petalos * i);
        ramita(1);
        pop();
    }

}


function ramita(valor){


    if (valor > 1000){
        return;
    }

    strokeWeight(5); // pintaré una linea de grosor valor
  // pintare una linea de color random
    
    line(0, 0, valor, 0);

    translate(valor, 0); 
    rotate(45);


    ramita(valor + incremento);
}

function mouseWheel(event){
    
    if (event.delta > 0) {
        // direction = '▲';
        incremento += 0.1;
    } else {
      if (incremento < 1 ) return;
    // direction = '▼';
    incremento -= 0.1
  }
  
}
