function setup() {
  createCanvas(400, 400);
  background(20, 30, 40);
  strokeWeight(3);
}

function draw() {
  background(20, 30, 40);
  
  // Draw animated bezier curves
  let time = millis() * 0.001;
  
  // Multiple flowing bezier curves
  for (let i = 0; i < 5; i++) {
    let offset = i * 0.3;
    
    // Calculate control points with animation
    let x1 = 100 + sin(time + offset) * 50;
    let y1 = 150 + i * 120;
    
    let cx1 = 200 + cos(time * 0.7 + offset) * 100;
    let cy1 = 200 + sin(time * 0.5 + offset) * 80;
    
    let cx2 = 600 + cos(time * 0.3 + offset) * 120;
    let cy2 = 300 + sin(time * 0.8 + offset) * 60;
    
    let x2 = 700 + sin(time * 1.2 + offset) * 30;
    let y2 = 200 + i * 120;
    
    // Color gradient based on curve index
    let r = map(i, 0, 4, 255, 100);
    let g = map(i, 0, 4, 100, 255);
    let b = map(i, 0, 4, 150, 200);
    
    stroke(r, g, b, 180);
    noFill();
    
    // Draw bezier curve
    bezier(x1, y1, cx1, cy1, cx2, cy2, x2, y2);
    
    // Draw control points
    fill(r, g, b, 120);
    noStroke();
    circle(cx1, cy1, 8);
    circle(cx2, cy2, 8);
    
    // Draw guide lines to control points
    stroke(r, g, b, 60);
    strokeWeight(1);
    line(x1, y1, cx1, cy1);
    line(cx2, cy2, x2, y2);
    
    strokeWeight(3);
  }
  
  // Draw title
  fill(255);
  textAlign(CENTER);
  textSize(24);
  text("Animated Bezier Curves", width/2, 50);
}
