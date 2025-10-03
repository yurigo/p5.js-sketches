let radio = 50;

const ball1 = {
  x: 100,
  y: 100,
  vx: 2,
  vy: 5,
  color: "blue"
};

const ball2 = {
  x: 700,
  y: 700,
  vx: -2,
  vy: -9,
  color: "red"
};

const ball3 = {
  x: 400,
  y: 400,
  vx: 2,
  vy: -9,
  color: "green"
};

const balls = [ball1, ball2, ball3];

function setup() {
  createCanvas(800, 800);
}

function draw() {
  background(220);
  drawBalls();
  updatePosition();
}

function drawBalls() {
  for (const ball of balls) {
    fill(ball.color);
    circle(ball.x, ball.y, 100);
  }
}

function updatePosition() {
  for (let i = 0; i < balls.length; i++) {
    const ball = balls[i];
    
    ball.x += ball.vx;
    ball.y += ball.vy;
  
    // Border collision
    if (ball.x >= width - radio || ball.x <= 0 + radio) {
      ball.vx *= -1;
    }
    
    if (ball.y >= height - radio || ball.y <= 0 + radio) {
      ball.vy *= -1;
    }

    // Ball-to-ball collision
    for (let j = i + 1; j < balls.length; j++) {
      const other = balls[j];

      let dx = other.x - ball.x;
      let dy = other.y - ball.y;
      let distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < radio * 2) {
        // Basic velocity swap
        let tempVx = ball.vx;
        let tempVy = ball.vy;

        ball.vx = other.vx;
        ball.vy = other.vy;

        other.vx = tempVx;
        other.vy = tempVy;

        // Move them apart slightly to avoid sticking
        let overlap = radio * 2 - distance;
        let adjustX = (dx / distance) * (overlap / 2);
        let adjustY = (dy / distance) * (overlap / 2);

        ball.x -= adjustX;
        ball.y -= adjustY;
        other.x += adjustX;
        other.y += adjustY;
      }
    }
  }
}
