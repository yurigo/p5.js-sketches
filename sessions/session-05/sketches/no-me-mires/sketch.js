
let shyBalls = [];

function setup() {
    createCanvas(800, 800);
    colorMode(HSL);

    // Creamos 10 bolas vergonzosas
    for (let i = 0; i < 10; i++) {
        shyBalls.push({
            x: random(100, width - 100),
            y: random(100, height - 100)
        });
    }
}

function draw() {

    background(220);

    // TÍTULO
    fill(0, 0, 20);
    // textAlign(CENTER);
    // textSize(32);
    // text("NO ME MIRES", width / 2, 50);


    // BOLAS VERGONZOSAS
    for (let bola of shyBalls) {

        const distancia = dist(mouseX, mouseY, bola.x, bola.y);

        // Cuanto más cerca está el ratón,
        // más "vergonzosa" se vuelve la bola
        const vergonzosidad = map(distancia, 0, 500, 50, 100);

        fill(0, 100, vergonzosidad);

        circle(bola.x, bola.y, 100);
    }


    // BOLA QUE SIGUE AL RATÓN
    const hue = map(mouseY, 0, height, 0, 360);
    const d = map(mouseX, 0, width, 30, 100);

    fill(hue, 100, 50);
    circle(mouseX, mouseY, d);
}
