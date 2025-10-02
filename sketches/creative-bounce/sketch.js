// Array to store bouncing shapes
let shapes = [];

function setup() {
  const s = min(windowWidth, windowHeight) * 0.9;
  createCanvas(s, s);
  
  // Create 5 shapes with different types
  const types = ['star', 'heart', 'triangle', 'hexagon', 'square'];
  for (let i = 0; i < 5; i++) {
    shapes.push({
      x: random(50, width - 50),
      y: random(50, height - 50),
      vx: random(-2, 2),
      vy: random(-2, 2),
      size: random(30, 50),
      type: types[i % types.length],
      hue: random(360),
      rotation: random(TWO_PI)
    });
  }
  
  colorMode(HSB);
}

function windowResized() {
  const s = min(windowWidth, windowHeight) * 0.9;
  resizeCanvas(s, s);
}

function draw() {
  background(26, 26, 26);
  
  // Update and draw each shape
  for (let shape of shapes) {
    // Update position
    shape.x += shape.vx;
    shape.y += shape.vy;
    
    // Check boundaries and bounce
    let bounced = false;
    if (shape.x - shape.size < 0 || shape.x + shape.size > width) {
      shape.vx *= -1;
      shape.x = constrain(shape.x, shape.size, width - shape.size);
      bounced = true;
    }
    
    if (shape.y - shape.size < 0 || shape.y + shape.size > height) {
      shape.vy *= -1;
      shape.y = constrain(shape.y, shape.size, height - shape.size);
      bounced = true;
    }
    
    // Change color and size on bounce
    if (bounced) {
      shape.hue = (shape.hue + random(30, 60)) % 360;
      shape.size = random(30, 50);
      shape.rotation = random(TWO_PI);
    }
    
    // Draw the shape
    push();
    translate(shape.x, shape.y);
    rotate(shape.rotation);
    fill(shape.hue, 80, 90);
    stroke(255, 100);
    strokeWeight(2);
    
    drawShape(shape.type, shape.size);
    pop();
  }
}

// Function to draw different shapes
function drawShape(type, size) {
  if (type === 'star') {
    drawStar(0, 0, size / 2, size, 5);
  } else if (type === 'heart') {
    drawHeart(0, 0, size);
  } else if (type === 'triangle') {
    triangle(0, -size, -size, size, size, size);
  } else if (type === 'hexagon') {
    drawPolygon(0, 0, size, 6);
  } else if (type === 'square') {
    rectMode(CENTER);
    rect(0, 0, size * 1.5, size * 1.5);
  }
}

// Draw a star
function drawStar(x, y, radius1, radius2, npoints) {
  let angle = TWO_PI / npoints;
  let halfAngle = angle / 2.0;
  beginShape();
  for (let a = -PI / 2; a < TWO_PI - PI / 2; a += angle) {
    let sx = x + cos(a) * radius2;
    let sy = y + sin(a) * radius2;
    vertex(sx, sy);
    sx = x + cos(a + halfAngle) * radius1;
    sy = y + sin(a + halfAngle) * radius1;
    vertex(sx, sy);
  }
  endShape(CLOSE);
}

// Draw a heart
function drawHeart(x, y, size) {
  beginShape();
  for (let a = 0; a < TWO_PI; a += 0.1) {
    let r = size * (1 - sin(a));
    let hx = x + r * cos(a) * 0.5;
    let hy = y + r * sin(a) * 0.5 - size * 0.3;
    vertex(hx, hy);
  }
  endShape(CLOSE);
}

// Draw a polygon
function drawPolygon(x, y, radius, npoints) {
  let angle = TWO_PI / npoints;
  beginShape();
  for (let a = 0; a < TWO_PI; a += angle) {
    let sx = x + cos(a) * radius;
    let sy = y + sin(a) * radius;
    vertex(sx, sy);
  }
  endShape(CLOSE);
}
