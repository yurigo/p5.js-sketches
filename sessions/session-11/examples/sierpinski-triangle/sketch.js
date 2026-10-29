let profundidad = 2;
let rotation = 0;
let incremento = .02;

function setup() {
    createCanvas(800, 600);
    angleMode(DEGREES)
    noStroke();
}

function draw() {
    rotation += incremento; // Ajustado para que la rotación sea fluida
    background(220);
    fill(130, 210, 255);
    
    const lado = 500;
    
    // Ahora pasamos el centro de la pantalla como (cx, cy)
    sierpinskiFromCenter(width / 2, height / 2, lado, profundidad);
}

function sierpinskiFromCenter(cx, cy, lado, nivel) {
    let altura = lado * sqrt(3) / 2;
    
    // Distancias desde el centro geométrico a los vértices
    let deCentroAVerticeSup = (2 / 3) * altura;
    let deCentroABase = (1 / 3) * altura;

    // Caso base
    if (nivel == 0) {
        push();
        translate(cx, cy);
        rotate(rotation); // ¡Ahora rotará perfectamente sobre su propio centro!
        
        fill(random(0,255), random(0,255), random(0,255))
        // Vértices definidos con respecto al centro (0,0)
        triangle(
            0, -deCentroAVerticeSup,           // Vértice Superior
            -lado / 2, deCentroABase,         // Vértice Izquierdo
            lado / 2, deCentroABase           // Vértice Derecho
        );


        pop();
        return;
    }

    // El factor de desplazamiento para los sub-triángulos desde el centro es la mitad 
    // de la distancia desde el centro a cada vértice original.
    
    // Sub-triángulo Superior
    sierpinskiFromCenter(cx, cy - deCentroAVerticeSup / 2, lado / 2, nivel - 1);
    
    // Sub-triángulo Izquierdo
    sierpinskiFromCenter(cx - lado / 4, cy + deCentroABase / 2, lado / 2, nivel - 1);
    
    // Sub-triángulo Derecho
    sierpinskiFromCenter(cx + lado / 4, cy + deCentroABase / 2, lado / 2, nivel - 1);
}

function keyPressed() {
    if (key === '1') {
        profundidad = min(profundidad + 1, 8); // Limitado a 8 para evitar crasheos por recursión
    }

    if (key === '2') {
        profundidad = max(profundidad - 1, 0);
    }
}


function mouseWheel(event){
    if (event.delta < 0){
        incremento = min(incremento + 1 , 359);
    }
    else {
        incremento = max(incremento - 1 , 1);
    }

    console.log(incremento);
    
}