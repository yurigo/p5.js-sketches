function setup() {
  createCanvas(800, 800);
  // noLoop();
  background(255);
  
  let size = 60; // tamaño de cada cubo
  let w = sqrt(3) * size; // ancho hexagonal
  let h = 2 * size;       // alto hexagonal
  
  for (let y = 0; y < height + h; y += size * 1.5) {
    for (let x = 0; x < width + w; x += w) {
      let offset = (int(y / (size * 1.5)) % 2 === 0) ? 0 : w / 2;
      drawCube(x + offset, y, size);
    }
  }
}

function drawCube(x, y, s) {
  let w = sqrt(3) * s / 2;
  
  // Coordenadas de los 3 rombos
  let top    = [[0, -s], [w, -s/2], [0, 0], [-w, -s/2]];
  let left   = [[-w, -s/2], [0, 0], [0, s], [-w, s/2]];
  let right  = [[w, -s/2], [0, 0], [0, s], [w, s/2]];
  
  push();
  translate(x, y);
  
  noStroke();
  
  // colores en escala de grises como en la imagen
  fill(200); beginShape(); for (let p of top) vertex(p[0], p[1]); endShape(CLOSE);
  fill(100); beginShape(); for (let p of left) vertex(p[0], p[1]); endShape(CLOSE);
  fill(150); beginShape(); for (let p of right) vertex(p[0], p[1]); endShape(CLOSE);
  
  pop();
}

function keyPressed() {
  if ((key === 's') || (key === 'S')) {
    saveCanvas("nombre.png");
  }
}


