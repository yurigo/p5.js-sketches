function setup() {
  createCanvas(800, 800);
  noLoop();
}

function draw() {
  // Sky gradient
  drawSky();
  
  // Mountain layers
  drawMountains();
  
  // Sun/Moon
  drawSun();
  
  // Clouds
  drawClouds();
  
  // Trees
  drawTrees();
  
  // Ground
  drawGround();
}

function drawSky() {
  // Gradient from light blue to soft pink
  for (let y = 0; y < height; y++) {
    let alpha = map(y, 0, height, 0, 1);
    let skyColor = lerpColor(color(173, 216, 230), color(255, 218, 185), alpha);
    stroke(skyColor);
    line(0, y, width, y);
  }
}

function drawSun() {
  // Simple sun circle
  fill(255, 223, 186);
  noStroke();
  circle(650, 150, 120);
  
  // Sun rays (minimal lines)
  stroke(255, 223, 186, 150);
  strokeWeight(2);
  for (let i = 0; i < 8; i++) {
    let angle = i * PI/4;
    let x1 = 650 + cos(angle) * 80;
    let y1 = 150 + sin(angle) * 80;
    let x2 = 650 + cos(angle) * 100;
    let y2 = 150 + sin(angle) * 100;
    line(x1, y1, x2, y2);
  }
}

function drawMountains() {
  // Back mountains (light)
  fill(180, 200, 220, 180);
  noStroke();
  triangle(0, 400, 300, 200, 500, 400);
  triangle(200, 400, 450, 180, 700, 400);
  
  // Middle mountains (medium)
  fill(140, 170, 200, 200);
  triangle(0, 500, 200, 300, 400, 500);
  triangle(300, 500, 550, 250, 800, 500);
  
  // Front mountains (dark)
  fill(100, 130, 160);
  triangle(0, 600, 150, 450, 300, 600);
  triangle(500, 600, 700, 400, 800, 600);
}

function drawClouds() {
  fill(255, 255, 255, 200);
  noStroke();
  
  // Simple cloud shapes
  ellipse(200, 120, 80, 40);
  ellipse(230, 110, 60, 35);
  ellipse(180, 110, 50, 30);
  
  ellipse(500, 180, 100, 50);
  ellipse(540, 170, 70, 40);
  ellipse(470, 170, 60, 35);
}

function drawTrees() {
  stroke(101, 67, 33);
  strokeWeight(8);
  
  // Tree trunks
  line(150, 550, 150, 650);
  line(680, 580, 680, 680);
  line(400, 570, 400, 670);
  
  // Tree foliage (simple circles)
  fill(76, 153, 76);
  noStroke();
  circle(150, 530, 80);
  circle(680, 560, 100);
  circle(400, 550, 90);
  
  // Smaller trees
  stroke(101, 67, 33);
  strokeWeight(4);
  line(300, 600, 300, 650);
  line(550, 620, 550, 670);
  
  fill(76, 153, 76);
  noStroke();
  circle(300, 590, 50);
  circle(550, 610, 60);
}

function drawGround() {
  // Simple ground plane
  fill(139, 169, 101);
  noStroke();
  rect(0, 650, width, 150);
  
  // Grass details (minimal lines)
  stroke(76, 153, 76);
  strokeWeight(2);
  for (let x = 50; x < width; x += 30) {
    let grassHeight = random(10, 25);
    line(x, 650, x, 650 - grassHeight);
    line(x + 10, 650, x + 10, 650 - random(8, 20));
  }
  
  // Path
  fill(200, 180, 140);
  noStroke();
  quad(350, 650, 450, 650, 500, height, 300, height);
}