

function setup() {

    createCanvas(800, 600);
    background(200);
}

let x = 500;
let v = 10;


function draw() {
    background(43);
    fill(255,0,0)
    circle(width/4, x, 90)
    fill(0,255,0)
    circle(width/2, height/2, 90)
    fill(0,0,255)
    circle(3 * width / 4, height/2, 90)


    if (x + 45 > height){
        v *= -1;
    }

    if (x - 45 < 0){
        v *= -1;
    }

    x = x + v;
}
