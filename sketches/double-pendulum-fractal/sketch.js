const pendulums = [];
const numPendulums = 30;

class DoublePendulum {
  constructor(a1, a2) {
    this.r1 = 100;
    this.r2 = 100;
    this.m1 = 10;
    this.m2 = 10;
    this.a1 = a1;
    this.a2 = a2;
    this.a1_v = 0;
    this.a2_v = 0;
    this.g = 1;
    this.cx = width / 2;
    this.cy = height / 2 - 50;
    this.trail = [];
    this.hue = random(360);
  }
  
  update() {
    let num1 = -this.g * (2 * this.m1 + this.m2) * sin(this.a1);
    let num2 = -this.m2 * this.g * sin(this.a1 - 2 * this.a2);
    let num3 = -2 * sin(this.a1 - this.a2) * this.m2;
    let num4 = this.a2_v * this.a2_v * this.r2 + this.a1_v * this.a1_v * this.r1 * cos(this.a1 - this.a2);
    let den = this.r1 * (2 * this.m1 + this.m2 - this.m2 * cos(2 * this.a1 - 2 * this.a2));
    let a1_a = (num1 + num2 + num3 * num4) / den;
    
    num1 = 2 * sin(this.a1 - this.a2);
    num2 = this.a1_v * this.a1_v * this.r1 * (this.m1 + this.m2);
    num3 = this.g * (this.m1 + this.m2) * cos(this.a1);
    num4 = this.a2_v * this.a2_v * this.r2 * this.m2 * cos(this.a1 - this.a2);
    den = this.r2 * (2 * this.m1 + this.m2 - this.m2 * cos(2 * this.a1 - 2 * this.a2));
    let a2_a = (num1 * (num2 + num3 + num4)) / den;
    
    this.a1_v += a1_a;
    this.a2_v += a2_a;
    this.a1 += this.a1_v;
    this.a2 += this.a2_v;
    
    this.a1_v *= 0.999;
    this.a2_v *= 0.999;
  }
  
  draw() {
    const x1 = this.r1 * sin(this.a1) + this.cx;
    const y1 = this.r1 * cos(this.a1) + this.cy;
    const x2 = x1 + this.r2 * sin(this.a2);
    const y2 = y1 + this.r2 * cos(this.a2);
    
    this.trail.push({x: x2, y: y2});
    if (this.trail.length > 500) {
      this.trail.shift();
    }
    
    stroke(this.hue, 80, 90, 50);
    strokeWeight(1);
    noFill();
    beginShape();
    for (let pt of this.trail) {
      vertex(pt.x, pt.y);
    }
    endShape();
  }
}

function setup() {
  const s = min(windowWidth, windowHeight) * 0.9;
  createCanvas(s, s);
  colorMode(HSB, 360, 100, 100, 100);
  
  for (let i = 0; i < numPendulums; i++) {
    const angle = map(i, 0, numPendulums, PI / 2 - 0.1, PI / 2 + 0.1);
    pendulums.push(new DoublePendulum(angle, angle));
  }
  
  background(45, 52, 54);
}

function windowResized() {
  const s = min(windowWidth, windowHeight) * 0.9;
  resizeCanvas(s, s);
}

function draw() {
  for (let pendulum of pendulums) {
    pendulum.update();
    pendulum.draw();
  }
}
