let trails = [];
let ripples = [];
let attractors = [];

function setup() {
  const s = min(windowWidth, windowHeight) * 0.9;
  createCanvas(s, s);
  background(15, 15, 35);

  // Create some attractors
  for (let i = 0; i < 3; i++) {
    attractors.push({
      x: random(width),
      y: random(height),
      size: random(30, 60),
      color: [random(100, 255), random(100, 255), random(100, 255)],
    });
  }
}

function windowResized() {
  const s = min(windowWidth, windowHeight) * 0.9;
  resizeCanvas(s, s);
  redraw();
}
// existing code continues...

function draw() {
  // Fade background
  fill(15, 15, 35, 20);
  noStroke();
  rect(0, 0, width, height);

  // Mouse trail effect
  if (mouseX > 0 && mouseX < width && mouseY > 0 && mouseY < height) {
    trails.push({
      x: mouseX,
      y: mouseY,
      life: 255,
      size: random(5, 15),
    });
  }

  // Update and draw trails
  for (let i = trails.length - 1; i >= 0; i--) {
    let trail = trails[i];
    trail.life -= 3;

    if (trail.life <= 0) {
      trails.splice(i, 1);
    } else {
      let alpha = map(trail.life, 0, 255, 0, 200);
      fill(100 + (mouseX / width) * 155, 150, 255, alpha);
      noStroke();
      circle(trail.x, trail.y, trail.size * (trail.life / 255));
    }
  }

  // Interactive attractors
  for (let attractor of attractors) {
    let distance = dist(mouseX, mouseY, attractor.x, attractor.y);
    let influence = map(distance, 0, 200, 50, 5);
    influence = constrain(influence, 5, 50);

    // Move attractor slightly towards mouse
    if (distance < 200) {
      attractor.x = lerp(attractor.x, mouseX, 0.02);
      attractor.y = lerp(attractor.y, mouseY, 0.02);
    }

    // Draw attractor with influence glow
    for (let r = influence; r > 0; r -= 5) {
      let alpha = map(r, 0, influence, 100, 0);
      fill(attractor.color[0], attractor.color[1], attractor.color[2], alpha);
      noStroke();
      circle(attractor.x, attractor.y, r * 2);
    }

    // Core
    fill(attractor.color[0], attractor.color[1], attractor.color[2]);
    circle(attractor.x, attractor.y, attractor.size);
  }

  // Update and draw ripples
  for (let i = ripples.length - 1; i >= 0; i--) {
    let ripple = ripples[i];
    ripple.radius += ripple.speed;
    ripple.alpha -= 5;

    if (ripple.alpha <= 0) {
      ripples.splice(i, 1);
    } else {
      stroke(ripple.color[0], ripple.color[1], ripple.color[2], ripple.alpha);
      strokeWeight(3);
      noFill();
      circle(ripple.x, ripple.y, ripple.radius);
    }
  }

  // Connection lines between mouse and attractors
  stroke(255, 100);
  strokeWeight(1);
  for (let attractor of attractors) {
    let distance = dist(mouseX, mouseY, attractor.x, attractor.y);
    if (distance < 150) {
      line(mouseX, mouseY, attractor.x, attractor.y);
    }
  }

  // Mouse cursor effect
  if (mouseX > 0 && mouseX < width && mouseY > 0 && mouseY < height) {
    stroke(255);
    strokeWeight(2);
    noFill();
    circle(mouseX, mouseY, 20 + sin(millis() * 0.01) * 5);

    // Crosshair
    line(mouseX - 15, mouseY, mouseX + 15, mouseY);
    line(mouseX, mouseY - 15, mouseX, mouseY + 15);
  }

  // Instructions
  fill(255, 150);
  textAlign(CENTER);
  textSize(16);
  text(
    "Move mouse to interact • Click to create ripples",
    width / 2,
    height - 30
  );
}

function mousePressed() {
  // Only respond to clicks on the canvas
  if (mouseX < 0 || mouseX > width || mouseY < 0 || mouseY > height) {
    return;
  }
  // Create ripple at mouse position
  ripples.push({
    x: mouseX,
    y: mouseY,
    radius: 0,
    speed: 3,
    alpha: 255,
    color: [random(100, 255), random(100, 255), random(150, 255)],
  });

  // Add burst of trails
  for (let i = 0; i < 10; i++) {
    trails.push({
      x: mouseX + random(-20, 20),
      y: mouseY + random(-20, 20),
      life: 255,
      size: random(8, 20),
    });
  }
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

function keyPressed() {
  if (key === " ") {
    // Reset attractors
    attractors = [];
    for (let i = 0; i < 3; i++) {
      attractors.push({
        x: random(width),
        y: random(height),
        size: random(30, 60),
        color: [random(100, 255), random(100, 255), random(100, 255)],
      });
    }
  }
}
