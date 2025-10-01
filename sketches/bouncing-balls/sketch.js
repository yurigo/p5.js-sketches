// Array to store all balls
let balls = [];

function setup() {
  const s = min(windowWidth, windowHeight) * 0.9;
  createCanvas(s, s);
  
  // Create 8 balls with different positions and velocities
  for (let i = 0; i < 8; i++) {
    let x = random(50, width - 50);
    let y = random(50, height - 50);
    let vx = random(-3, 3);
    let vy = random(-3, 3);
    let r = random(15, 35);
    let col = color(random(100, 255), random(100, 255), random(100, 255));
    
    balls.push({
      x: x,
      y: y,
      vx: vx,
      vy: vy,
      radius: r,
      color: col
    });
  }
}

function windowResized() {
  const s = min(windowWidth, windowHeight) * 0.9;
  resizeCanvas(s, s);
}

function draw() {
  background(26, 26, 26);
  
  // Update and draw each ball
  for (let ball of balls) {
    // Update position
    ball.x += ball.vx;
    ball.y += ball.vy;
    
    // Check boundaries and bounce
    if (ball.x - ball.radius < 0 || ball.x + ball.radius > width) {
      ball.vx *= -1;
      ball.x = constrain(ball.x, ball.radius, width - ball.radius);
    }
    
    if (ball.y - ball.radius < 0 || ball.y + ball.radius > height) {
      ball.vy *= -1;
      ball.y = constrain(ball.y, ball.radius, height - ball.radius);
    }
    
    // Draw the ball
    fill(ball.color);
    stroke(255, 100);
    strokeWeight(2);
    circle(ball.x, ball.y, ball.radius * 2);
  }
}
