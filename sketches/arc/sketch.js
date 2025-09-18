function setup() {
  createCanvas(800, 800);
  background(26, 26, 46);
  strokeWeight(4);
}

function draw() {
  background(26, 26, 46);
  
  let time = millis() * 0.001;
  
  // Central spiral of arcs
  push();
  translate(width/2, height/2);
  
  for (let i = 0; i < 20; i++) {
    let radius = 50 + i * 15;
    let rotation = time * 0.5 + i * 0.2;
    
    push();
    rotate(rotation);
    
    // Color based on radius
    let hue = map(i, 0, 20, 0, 360);
    colorMode(HSB);
    stroke(hue, 80, 90, 0.8);
    
    noFill();
    arc(0, 0, radius, radius, 0, PI + sin(time + i * 0.1) * PI/2);
    
    colorMode(RGB);
    pop();
  }
  pop();
  
  // Corner arc patterns
  drawCornerArcs(100, 100, time);
  drawCornerArcs(700, 100, time + PI/2);
  drawCornerArcs(100, 700, time + PI);
  drawCornerArcs(700, 700, time + 3*PI/2);
  
  // Pulsing central arc
  push();
  translate(width/2, height/2);
  stroke(255, 200, 100);
  strokeWeight(8);
  noFill();
  let pulseSize = 100 + sin(time * 2) * 30;
  arc(0, 0, pulseSize, pulseSize, -PI/4, PI/4);
  arc(0, 0, pulseSize, pulseSize, 3*PI/4, 5*PI/4);
  pop();
  
  // Title
  fill(255);
  textAlign(CENTER);
  textSize(24);
  text("Dynamic Arc Patterns", width/2, 50);
}

function drawCornerArcs(x, y, timeOffset) {
  push();
  translate(x, y);
  
  for (let i = 0; i < 5; i++) {
    let size = 20 + i * 15;
    let startAngle = timeOffset + i * 0.5;
    let endAngle = startAngle + PI/3 + sin(timeOffset + i) * PI/6;
    
    stroke(100 + i * 30, 150, 255 - i * 30, 0.7);
    strokeWeight(2 + i);
    noFill();
    
    arc(0, 0, size, size, startAngle, endAngle);
  }
  pop();
}