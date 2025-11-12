// Ball properties
let ball = {
  x: 0,
  y: 0,
  vx: 0,
  vy: 0,
  radius: 25
};

// Physics constants
let gravity = 0.5;
let energyLoss = 0.75; // Loses 25% of energy on each bounce
let cnv;

function setup() {
  const s = min(windowWidth, windowHeight) * 0.9;
  cnv = createCanvas(s, s);
  cnv.mousePressed(handleCanvasClick);
  cnv.touchStarted(handleCanvasClick);
  
  // Initialize ball
  resetBall();
}

function windowResized() {
  const s = min(windowWidth, windowHeight) * 0.9;
  resizeCanvas(s, s);
}

function draw() {
  background(26, 26, 26);
  
  // Apply gravity
  ball.vy += gravity;
  
  // Update position
  ball.x += ball.vx;
  ball.y += ball.vy;
  
  // Check boundaries and lose energy
  // Floor
  if (ball.y + ball.radius > height) {
    ball.y = height - ball.radius;
    ball.vy *= -energyLoss;
    
    // Stop if velocity is very small
    if (abs(ball.vy) < 0.5) {
      ball.vy = 0;
    }
  }
  
  // Ceiling
  if (ball.y - ball.radius < 0) {
    ball.y = ball.radius;
    ball.vy *= -energyLoss;
  }
  
  // Walls
  if (ball.x + ball.radius > width) {
    ball.x = width - ball.radius;
    ball.vx *= -energyLoss;
    
    // Stop if velocity is very small
    if (abs(ball.vx) < 0.5) {
      ball.vx = 0;
    }
  }
  
  if (ball.x - ball.radius < 0) {
    ball.x = ball.radius;
    ball.vx *= -energyLoss;
    
    // Stop if velocity is very small
    if (abs(ball.vx) < 0.5) {
      ball.vx = 0;
    }
  }
  
  // Draw ground line
  stroke(100);
  strokeWeight(3);
  line(0, height - 2, width, height - 2);
  
  // Calculate energy level for color (based on total velocity)
  let speed = sqrt(ball.vx * ball.vx + ball.vy * ball.vy);
  let maxSpeed = 15;
  let energyLevel = constrain(speed / maxSpeed, 0, 1);
  
  // Color changes from blue (low energy) to red (high energy)
  let r = energyLevel * 255;
  let b = (1 - energyLevel) * 255;
  
  // Draw the ball
  fill(r, 100, b);
  stroke(255, 150);
  strokeWeight(2);
  circle(ball.x, ball.y, ball.radius * 2);
  
  // Instructions
  fill(255, 180);
  noStroke();
  textAlign(CENTER);
  textSize(16);
  text("Click to launch a new ball", width / 2, 30);
  
  // Show energy level
  textAlign(LEFT);
  textSize(14);
  text("Energy: " + nf(energyLevel * 100, 2, 1) + "%", 20, height - 20);
}

function resetBall() {
  ball.x = width / 4;
  ball.y = height / 4;
  ball.vx = random(3, 8);
  ball.vy = random(-2, 2);
}

function handleCanvasClick() {
  // Launch a new ball from mouse position
  ball.x = mouseX;
  ball.y = mouseY;
  ball.vx = random(-8, 8);
  ball.vy = random(-8, 8);
  return false; // prevent default behavior
}
