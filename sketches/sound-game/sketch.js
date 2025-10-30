let mic;
let fft;
let player;
let obstacles = [];
let score = 0;
let gameOver = false;
let gameStarted = false;

function setup() {
  const s = min(windowWidth, windowHeight) * 0.9;
  createCanvas(s, s);
  
  // Create audio input
  mic = new p5.AudioIn();
  
  // Create FFT to detect volume
  fft = new p5.FFT(0.8, 32);
  
  // Create player
  player = new Player();
  
  textAlign(CENTER, CENTER);
}

function windowResized() {
  const s = min(windowWidth, windowHeight) * 0.9;
  resizeCanvas(s, s);
}

function draw() {
  background(15, 15, 35);
  
  // Title
  fill(255, 200, 0);
  noStroke();
  textSize(24);
  text('🎮 Sound Jumper Game 🎮', width / 2, 40);
  
  if (!mic.enabled) {
    // Instructions
    fill(255);
    textSize(18);
    text('Click to enable microphone', width / 2, height / 2 - 40);
    textSize(14);
    text('Make noise to jump over obstacles!', width / 2, height / 2);
    text('Louder sounds = higher jumps', width / 2, height / 2 + 30);
  } else if (!gameStarted) {
    fill(100, 255, 100);
    textSize(20);
    text('Press SPACE to start!', width / 2, height / 2);
    
    // Show volume meter
    fft.setInput(mic);
    let level = mic.getLevel();
    drawVolumeMeter(level);
  } else if (gameOver) {
    fill(255, 100, 100);
    textSize(32);
    text('Game Over!', width / 2, height / 2 - 40);
    
    fill(255);
    textSize(20);
    text('Score: ' + score, width / 2, height / 2);
    text('Press SPACE to restart', width / 2, height / 2 + 40);
  } else {
    // Game playing
    fft.setInput(mic);
    let level = mic.getLevel();
    
    // Update player based on sound level
    player.update(level);
    player.display();
    
    // Create obstacles
    if (frameCount % 90 === 0) {
      obstacles.push(new Obstacle());
    }
    
    // Update and display obstacles
    for (let i = obstacles.length - 1; i >= 0; i--) {
      obstacles[i].update();
      obstacles[i].display();
      
      // Check collision
      if (obstacles[i].hits(player)) {
        gameOver = true;
      }
      
      // Remove off-screen obstacles
      if (obstacles[i].isOffScreen()) {
        obstacles.splice(i, 1);
        score++;
      }
    }
    
    // Draw ground
    stroke(100);
    strokeWeight(3);
    line(0, height - 50, width, height - 50);
    
    // Display score
    fill(255);
    textSize(18);
    textAlign(LEFT, TOP);
    text('Score: ' + score, 20, 70);
    
    // Volume indicator
    drawVolumeMeter(level);
  }
}

function drawVolumeMeter(level) {
  let meterWidth = 150;
  let meterHeight = 20;
  let meterX = width - meterWidth - 20;
  let meterY = 70;
  
  // Background
  fill(50);
  noStroke();
  rect(meterX, meterY, meterWidth, meterHeight, 5);
  
  // Level bar
  let barWidth = map(level, 0, 0.3, 0, meterWidth);
  colorMode(HSB, 360, 100, 100);
  fill(map(level, 0, 0.3, 120, 0), 80, 90);
  rect(meterX, meterY, barWidth, meterHeight, 5);
  colorMode(RGB, 255);
  
  // Label
  fill(200);
  textSize(12);
  textAlign(RIGHT, TOP);
  text('Volume', width - 20, 50);
}

function mousePressed() {
  userStartAudio();
  
  if (!mic.enabled) {
    mic.start();
  }
}

function keyPressed() {
  if (key === ' ') {
    if (!gameStarted && mic.enabled) {
      startGame();
    } else if (gameOver) {
      restartGame();
    }
  }
}

function startGame() {
  gameStarted = true;
  gameOver = false;
  score = 0;
  obstacles = [];
}

function restartGame() {
  gameOver = false;
  score = 0;
  obstacles = [];
  player.reset();
}

class Player {
  constructor() {
    this.x = 100;
    this.y = height - 100;
    this.size = 30;
    this.vy = 0;
    this.gravity = 0.5;
    this.groundY = height - 100;
    this.isJumping = false;
    this.color = color(100, 200, 255);
  }
  
  update(soundLevel) {
    // Jump when sound is loud enough
    if (soundLevel > 0.1 && !this.isJumping) {
      let jumpForce = map(soundLevel, 0.1, 0.3, -8, -15);
      this.vy = jumpForce;
      this.isJumping = true;
    }
    
    // Apply gravity
    this.vy += this.gravity;
    this.y += this.vy;
    
    // Ground collision
    if (this.y >= this.groundY) {
      this.y = this.groundY;
      this.vy = 0;
      this.isJumping = false;
    }
  }
  
  display() {
    fill(this.color);
    noStroke();
    
    // Draw player as a character
    push();
    translate(this.x, this.y);
    
    // Body
    circle(0, 0, this.size);
    
    // Eyes
    fill(255);
    circle(-7, -5, 8);
    circle(7, -5, 8);
    
    // Pupils
    fill(0);
    circle(-7, -5, 4);
    circle(7, -5, 4);
    
    // Mouth
    noFill();
    stroke(0);
    strokeWeight(2);
    arc(0, 5, 15, 10, 0, PI);
    
    pop();
  }
  
  reset() {
    this.y = this.groundY;
    this.vy = 0;
    this.isJumping = false;
  }
}

class Obstacle {
  constructor() {
    this.x = width;
    this.y = height - 50;
    this.w = random(20, 40);
    this.h = random(40, 80);
    this.speed = 5;
    this.color = color(255, 100, 100);
  }
  
  update() {
    this.x -= this.speed;
  }
  
  display() {
    fill(this.color);
    noStroke();
    rect(this.x, this.y - this.h, this.w, this.h);
    
    // Add some detail
    fill(200, 80, 80);
    rect(this.x + 5, this.y - this.h + 5, this.w - 10, 10);
  }
  
  hits(player) {
    // Check collision with player
    let hit = (player.x + player.size / 2 > this.x && 
               player.x - player.size / 2 < this.x + this.w &&
               player.y + player.size / 2 > this.y - this.h &&
               player.y - player.size / 2 < this.y);
    return hit;
  }
  
  isOffScreen() {
    return this.x + this.w < 0;
  }
}
