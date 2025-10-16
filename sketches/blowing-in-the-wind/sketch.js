// let particles = [];

// function setup() {
//   const s = min(windowWidth, windowHeight) * 0.9;
//   createCanvas(s, s);

//   for (let i = 0; i < 1000; i++) {
//     particles.push(createVector(random(width), random(height)));
//   }
// }

// function windowResized() {
//   const s = min(windowWidth, windowHeight) * 0.9;
//   resizeCanvas(s, s);
//   redraw();
// }

// const CONSTANT = 0.001;

// function draw() {
//   noStroke();
//   fill(20);
//   rect(0, 0, width, height); // trail
//   fill(255);

//   for (let p of particles) {
//     let angle =
//       noise(p.x * CONSTANT, p.y * CONSTANT, frameCount * CONSTANT) * TWO_PI * 2;
//     p.x += cos(angle);
//     p.y += sin(angle);
//     ellipse(p.x, p.y, 2);

//     if (p.x < 0) p.x = width;
//     if (p.x > width) p.x = 0;
//     if (p.y < 0) p.y = height;
//     if (p.y > height) p.y = 0;
//   }
// }

let particles = [];
const CONSTANT = 0.001;
let attraction = 1; // +1 = atracción, -1 = repulsión

function setup() {
  const s = min(windowWidth, windowHeight) * 0.9;
  createCanvas(s, s);
  noCursor(); // opcional: oculta el cursor

  for (let i = 0; i < 1000; i++) {
    particles.push(createVector(random(width), random(height)));
  }
}

function windowResized() {
  const s = min(windowWidth, windowHeight) * 0.9;
  resizeCanvas(s, s);
  redraw();
}

function draw() {
  noStroke();
  fill(20, 40); // trail con leve transparencia
  rect(0, 0, width, height);
  fill(255);

  for (let p of particles) {
    // Dirección general según ruido Perlin
    let angle =
      noise(p.x * CONSTANT, p.y * CONSTANT, frameCount * CONSTANT) * TWO_PI * 2;
    let vx = cos(angle);
    let vy = sin(angle);

    // Interacción con el ratón
    let d = dist(p.x, p.y, mouseX, mouseY);
    if (d < 200) {
      // zona de influencia
      let force = map(d, 0, 100, 0.5, 0); // fuerza decrece con la distancia
      let dx = (mouseX - p.x) * force * 0.02 * attraction;
      let dy = (mouseY - p.y) * force * 0.02 * attraction;
      vx += dx;
      vy += dy;
    }

    p.x += vx;
    p.y += vy;
    ellipse(p.x, p.y, 2);

    // Reaparece por el otro lado
    if (p.x < 0) p.x = width;
    if (p.x > width) p.x = 0;
    if (p.y < 0) p.y = height;
    if (p.y > height) p.y = 0;
  }

  // dibuja un punto para visualizar la zona de influencia
  noFill();
  stroke(255, 80);
  ellipse(mouseX, mouseY, 200);
}

// Cambia entre atracción y repulsión con click
function mousePressed() {
  attraction *= -1;
}
