let bola;
let fruit;
let fruitX;
let fruitY;
let frutasComidas = 0;

function setup() {
    // createCanvas(800, 600);
    noCanvas();

    bola = select('.bola');
    bola.style("position" , "absolute");
}

function draw() {
    background(220);
    
    if (!fruit){
        fruit = createDiv(random(['🍓', '🍑', '🍌', '🍎', '🍏', '🥝']));
        fruit.addClass("fruta");

        fruitX = random(0 + 60, windowWidth - 60);
        fruitY = random(0 + 60, windowHeight - 60);

        fruit.position(fruitX, fruitY);
    }

    // bola.style("top" , mouseY - 50 + "px");
    // bola.style("left" , mouseX - 50 + "px");

    bola.position(mouseX - 50, mouseY - 50);
    
    if (mouseX > fruitX - 40 &&
        mouseX < fruitX + 40 &&
        mouseY > fruitY - 40 &&
        mouseY < fruitY + 40
    ){
        comerFruta();
    }

}


function comerFruta(){
    frutasComidas++;

    const contador = select("#resultado");
    contador.html(frutasComidas);

    fruit.remove();
    fruit = null;

    bola.style("background-color", color(random(255), random(255), random(255)));
}
