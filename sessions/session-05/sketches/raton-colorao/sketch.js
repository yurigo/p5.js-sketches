let shyx = 0;
let shyy = 0;

function setup() {
    createCanvas(800, 600);
    colorMode(HSL);

    shyx = random(100, width - 100);
    shyy = random(100, height - 100);
    // shyx = random(0 , width);
    // shyy = random(0 , height);
}

let i = 0;

function draw() {

    background(220);

    const distancia = dist(mouseX, mouseY, shyx, shyy);

    // if (distancia > 100){
    //     fill("white")
    // }
    // else{
    //     fill("red")
    // }

    const vergonzosidad = map(distancia, 0, 500, 50, 100)

    fill(0, 100, vergonzosidad)


    circle(shyx, shyy, 100);


    const hue = map(mouseY, 0, height, 0, 360);
    const d = map(mouseX, 0, width, 30, 100)
    fill(hue, 100, 50);
    circle(mouseX, mouseY, d);
}