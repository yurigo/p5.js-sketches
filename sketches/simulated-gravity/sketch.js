// Ball properties
let ball = {
  x: 0,
  y: 0,
  vy: 0,
  radius: 30
};

// Physics constants
let gravity = 0.6;
let bounce = 0.8;

function setup() {
  const s = min(windowWidth, windowHeight) * 0.9;
  createCanvas(s, s);
  
  // Initialize ball at top center
  ball.x = width / 2;
  ball.y = ball.radius;
  ball.vy = 0;
}

function windowResized() {
  const s = min(windowWidth, windowHeight) * 0.9;
  resizeCanvas(s, s);
}

function draw() {
  background(26, 26, 26);
  
  // Apply gravity (acceleration)
  ball.vy += gravity;
  
  // Update position
  ball.y += ball.vy;
  
  // Check floor collision
  if (ball.y + ball.radius > height) {
    ball.y = height - ball.radius;
    ball.vy *= -bounce;
  }
  
  // Draw ground line
  stroke(100);
  strokeWeight(3);
  line(0, height - 2, width, height - 2);
  
  // Draw the ball
  fill(100, 150, 255);
  stroke(255, 150);
  strokeWeight(2);
  circle(ball.x, ball.y, ball.radius * 2);
  
  // Draw velocity vector
  stroke(255, 100, 100);
  strokeWeight(2);
  line(ball.x, ball.y, ball.x, ball.y + ball.vy * 5);
  
  // Instructions
  fill(255, 180);
  noStroke();
  textAlign(CENTER);
  textSize(16);
  text("Click to reset", width / 2, 30);
}

function mousePressed() {
  // Only respond to clicks on the canvas
  if (mouseX < 0 || mouseX > width || mouseY < 0 || mouseY > height) {
    return;
  }
  // Reset ball to top
  ball.x = mouseX;
  ball.y = ball.radius;
  ball.vy = 0;
}

function touchStarted() {
  // Only respond to touches on the canvas
  if (touches.length > 0) {
    const touch = touches[0];
    if (touch.x < 0 || touch.x > width || touch.y < 0 || touch.y > height) {
      return;
    }
  }
  mousePressed();
  return false; // prevent default touch behavior
}
