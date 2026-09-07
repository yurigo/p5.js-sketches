// function setup() {
//   createCanvas(400, 400);
//   noStroke();
// }

// function draw() {
//   background('yellow');

//   let casilla = width / 8;

//   for (let fila = 0; fila < 8; fila++) {
//     for (let columna = 0; columna < 8; columna++) {

//       // Alternar blanco y negro
//       if ((fila + columna) % 2 === 0) {
//     } else {
        
//         rect(columna * casilla, fila * casilla, casilla, casilla);
//             fill('red');
//       }

//     }
//   }
// }


function setup() {
  createCanvas(800, 600);
}

function draw() {
  // Cielo
  background(135, 206, 235);

  // -------------------------
  // SOL
  // -------------------------
  
  // circle()
  fill(255, 220, 70);
  noStroke();
  circle(650, 120, 100);

  // arc() - arco decorativo alrededor del sol
  noFill();
  stroke(255, 180, 40);
  strokeWeight(4);
  arc(650, 120, 130, 130, PI + QUARTER_PI, TWO_PI - QUARTER_PI);

  // -------------------------
  // NUBES
  // -------------------------
  
  // ellipse()
  noStroke();
  fill(255);
  ellipse(150, 120, 120, 55);
  ellipse(200, 110, 100, 65);
  ellipse(250, 125, 130, 50);

  // Otra nube
  ellipse(430, 180, 100, 45);
  ellipse(480, 165, 90, 60);
  ellipse(530, 180, 120, 45);

  // -------------------------
  // MONTAÑAS
  // -------------------------
  
  // triangle()
  fill(90, 120, 100);
  noStroke();
  triangle(50, 420, 280, 170, 500, 420);

  // Segunda montaña
  fill(70, 100, 85);
  triangle(300, 420, 530, 200, 760, 420);

  // Nieve en las montañas
  fill(245);
  triangle(280, 170, 220, 235, 260, 220);
  triangle(280, 170, 340, 235, 300, 220);

  triangle(530, 200, 475, 260, 515, 245);
  triangle(530, 200, 585, 260, 545, 245);

  // -------------------------
  // LAGO
  // -------------------------
  
  // quad()
  fill(50, 160, 200);
  noStroke();
  quad(0, 430, 800, 430, 800, 600, 0, 600);

  // -------------------------
  // TIERRA
  // -------------------------
  
  // rect()
  fill(80, 160, 70);
  noStroke();
  rect(0, 400, 800, 35);

  // -------------------------
  // CASA
  // -------------------------
  
  // rect() - cuerpo de la casa
  fill(210, 150, 90);
  rect(500, 340, 150, 100);

  // triangle() - tejado
  fill(150, 60, 50);
  triangle(480, 340, 575, 270, 670, 340);

  // square() - ventana
  fill(120, 200, 230);
  stroke(50);
  strokeWeight(3);
  square(530, 360, 40);

  // line() - marco de la ventana
  stroke(50);
  line(550, 360, 550, 400);
  line(530, 380, 570, 380);

  // rect() - puerta
  fill(100, 60, 40);
  rect(600, 370, 30, 70);

  // -------------------------
  // ÁRBOL
  // -------------------------
  
  // rect() - tronco
  fill(100, 60, 30);
  noStroke();
  rect(120, 320, 30, 100);

  // circle() - copa
  fill(40, 140, 60);
  circle(135, 300, 100);
  circle(100, 325, 70);
  circle(170, 325, 70);

  // -------------------------
  // CAMINO
  // -------------------------
  
  // quad()
  fill(190, 170, 120);
  noStroke();
  quad(590, 440, 630, 440, 720, 600, 450, 600);

  // -------------------------
  // PÁJAROS
  // -------------------------
  
  // arc()
  noFill();
  stroke(40);
  strokeWeight(3);
  arc(300, 100, 30, 20, PI, TWO_PI);
  arc(330, 100, 30, 20, PI, TWO_PI);

  // -------------------------
  // REFLEJO DEL SOL
  // -------------------------
  
  // ellipse()
  noStroke();
  fill(255, 220, 80, 100);
  ellipse(650, 470, 100, 15);
  ellipse(650, 500, 70, 10);
  ellipse(650, 525, 45, 7);

  // -------------------------
  // LÍNEAS DEL AGUA
  // -------------------------
  
  // line()
  stroke(180, 230, 240);
  strokeWeight(2);
  line(100, 470, 300, 470);
  line(200, 500, 400, 500);
  line(50, 540, 250, 540);
  line(300, 560, 500, 560);

  // -------------------------
  // PUNTOS / PIEDRAS
  // -------------------------
  
  // point()
  stroke(80);
  strokeWeight(5);
  point(350, 450);
  point(380, 460);
  point(420, 445);
  point(730, 455);
  point(760, 470);
}
