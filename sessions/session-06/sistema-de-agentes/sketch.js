let shyBalls = [];

function setup() {
    createCanvas(800, 600);
        colorMode(HSL);

    for (let i = 0; i < 100; i++){
        shyBalls.push(new Ball(
            random(100, width - 100),
            random(100, height - 100),
            random(50, 150)
        ))
    }
}

function draw() {
    background(220);

    for (let bola of shyBalls) {
        bola.updateColor(mouseX, mouseY);

        bola.updateLineasConstelacion(shyBalls);

        bola.updateSize();
        bola.updatePosition();
        bola.pintate();
    }

}
