function setup() {
  createCanvas(800, 800);
  background(45, 52, 54);
}

function draw() {
  background(45, 52, 54);
  
  let time = millis() * 0.001;
  
  // Face outline - organic shape
  drawFaceOutline(time);
  
  // Eyes - geometric and expressive
  drawEyes(time);
  
  // Nose - abstract line
  drawNose(time);
  
  // Mouth - dynamic curve
  drawMouth(time);
  
  // Hair/head decoration
  drawHair(time);
  
  // Facial features overlay
  drawFacialTextures(time);
}

function drawFaceOutline(time) {
  push();
  translate(width/2, height/2 + 50);
  
  stroke(240, 200, 170);
  strokeWeight(6);
  fill(255, 220, 190, 100);
  
  // Organic face shape using bezier curves
  beginShape();
  let points = 16;
  for (let i = 0; i <= points; i++) {
    let angle = map(i, 0, points, 0, TWO_PI);
    let radius = 200 + sin(angle * 3 + time) * 30 + cos(angle * 5 + time * 0.7) * 15;
    let x = cos(angle) * radius;
    let y = sin(angle) * radius * 1.2; // Slightly elongated
    vertex(x, y);
  }
  endShape(CLOSE);
  pop();
}

function drawEyes(time) {
  // Left eye - geometric
  push();
  translate(320, 300);
  rotate(sin(time * 0.5) * 0.1);
  
  fill(100, 150, 255);
  stroke(50);
  strokeWeight(3);
  ellipse(0, 0, 80, 60);
  
  // Pupil
  fill(20);
  ellipse(sin(time) * 10, cos(time * 0.7) * 5, 25, 25);
  
  // Highlight
  fill(255);
  ellipse(5, -8, 8, 8);
  pop();
  
  // Right eye - triangular
  push();
  translate(480, 310);
  rotate(-sin(time * 0.3) * 0.1);
  
  fill(255, 150, 100);
  stroke(50);
  strokeWeight(3);
  triangle(-40, 30, 40, 30, 0, -30);
  
  // Pupil
  fill(20);
  circle(sin(time * 1.2) * 8, cos(time * 0.9) * 6, 20);
  pop();
}

function drawNose(time) {
  stroke(200, 180, 160);
  strokeWeight(4);
  
  let noseX = width/2 + sin(time * 0.2) * 5;
  let noseY = 400;
  
  // Abstract nose as flowing line
  noFill();
  beginShape();
  curveVertex(noseX - 20, noseY - 40);
  curveVertex(noseX, noseY - 20);
  curveVertex(noseX + sin(time) * 10, noseY);
  curveVertex(noseX - 10, noseY + 20);
  curveVertex(noseX + 15, noseY + 30);
  endShape();
}

function drawMouth(time) {
  push();
  translate(width/2, 500);
  
  stroke(200, 100, 120);
  strokeWeight(8);
  noFill();
  
  // Dynamic mouth expression
  let mouthWidth = 100 + sin(time * 0.8) * 20;
  let mouthCurve = sin(time * 0.5) * 30;
  
  bezier(-mouthWidth/2, 0, 
         -mouthWidth/4, mouthCurve, 
         mouthWidth/4, mouthCurve, 
         mouthWidth/2, 0);
  pop();
}

function drawHair(time) {
  stroke(80, 60, 40);
  strokeWeight(3);
  
  // Hair strands around the head
  for (let i = 0; i < 20; i++) {
    let angle = map(i, 0, 20, -PI, 0);
    let x = width/2 + cos(angle) * 250;
    let y = height/2 + sin(angle) * 200 + 50;
    
    let endX = x + cos(angle + PI/2 + sin(time + i)) * (50 + sin(time * 0.3 + i) * 20);
    let endY = y + sin(angle + PI/2 + sin(time + i)) * (50 + sin(time * 0.3 + i) * 20);
    
    line(x, y, endX, endY);
  }
}

function drawFacialTextures(time) {
  // Abstract facial texture dots
  fill(255, 200, 150, 80);
  noStroke();
  
  for (let i = 0; i < 30; i++) {
    let x = width/2 + random(-150, 150) + sin(time + i) * 10;
    let y = height/2 + random(-100, 100) + cos(time * 0.7 + i) * 8;
    let size = random(2, 8) + sin(time * 2 + i) * 2;
    
    circle(x, y, size);
  }
}