let leftColor;
let topColor;
let rightColor;

function setup() {
  const s = min(windowWidth, windowHeight) * 0.9;
  createCanvas(s, s);
  // randomSeed(30);
  noLoop();
}

function windowResized() {
  const s = min(windowWidth, windowHeight) * 0.9;
  resizeCanvas(s, s);
  redraw();
}

function draw() {

  leftColor = color(random(0, 50), random(0,50), random(0, 50));
  rightColor = color(random(100, 150), random(100, 150), random(100, 150));
  topColor = color(random(170, 220), random(170, 220), random(170, 220));

  
  let cubeSize = parseInt(width / 8);
  background(255);
  
  let cols = width / cubeSize;
  let rows = height / (cubeSize * 0.75);
  
  for (let y = -cubeSize; y <= rows; y++) {
    for (let x = -cubeSize; x <= cols; x++) {
      let xpos = x * cubeSize;
      let ypos = y * cubeSize * 0.75;
      
      if (y % 2 == 1) {
        xpos += cubeSize / 2;
      }
      
      drawCube(xpos, ypos, cubeSize);
    }
  }
}

function drawCube(x, y, size) {
  // Colores para las caras
  // let left = color(50);
  // let right = color(150);
  // let top = color(220);
  

  
  push();
  translate(x, y);
  
  // Cara superior
  fill(topColor);
  beginShape();
  vertex(0, 0);
  vertex(size / 2, -size / 4);
  vertex(size, 0);
  vertex(size / 2, size / 4);
  endShape(CLOSE);
  
  // Cara izquierda
  fill(leftColor);
  beginShape();
  vertex(0, 0);
  vertex(size / 2, size / 4);
  vertex(size / 2, size * 3 / 4);
  vertex(0, size / 2);
  endShape(CLOSE);
  
  // Cara derecha
  fill(rightColor);
  beginShape();
  vertex(size / 2, size / 4);
  vertex(size, 0);
  vertex(size, size / 2);
  vertex(size / 2, size * 3 / 4);
  endShape(CLOSE);
  
  pop();
}

function keyPressed() {
  if ((key === 's') || (key === 'S')) {
    saveCanvas("nombre.png");
  }
}


