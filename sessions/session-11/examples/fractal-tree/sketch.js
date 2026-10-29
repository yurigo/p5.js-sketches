let incremento = 5;

function setup(){
    createCanvas(800,600);
    noLoop();
    angleMode(DEGREES);
}

function draw(){
    background(255);

    translate(width / 2, height);
    rotate (-90);

    ramita(height / 3);

    // incremento+=10;

}


function ramita(valor){


    if (valor < 50){
        return;
    }

    strokeWeight(5); // pintaré una linea de grosor valor
  // pintare una linea de color random
  
  line(0, 0, valor, 0);
    translate(valor, 0); 

    
    push();
    rotate(random(30,60));
    ramita(valor/1.5);
    pop();

    push();
    rotate(random(-15,15));
    ramita(valor/1.5);
    pop();

    push();
    rotate(random(-30,-60));
    ramita(valor/1.5);
    pop();
}

function mouseWheel(event){
    
    if (event.delta > 0) {
        // direction = '▲';
        incremento += 1;
    } else {
      if (incremento < 1 ) return;
    // direction = '▼';
    incremento -= 1
  }
  
}
