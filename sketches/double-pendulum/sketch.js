let pendulums = [];
let numPendulums = 50;

function setup() {
  const s = min(windowWidth, windowHeight) * 0.9;
  createCanvas(s, s);

  // inicialitzem molts pèndols amb un color diferent
  for (let i = 0; i < numPendulums; i++) {
    let c = color(random(255), random(255), random(255));
    let p = new DoublePendulum(width / 2, 200, PI / 2, PI / 2 + random(-0.001, 0.001), c);
    pendulums.push(p);
  }
}

function windowResized() {
  const s = min(windowWidth, windowHeight) * 0.9;
  resizeCanvas(s, s);
}

function draw() {
  background(0);
  translate(width / 2, height / 3);

  for (let p of pendulums) {
    p.update();
    p.show();
  }
}

// Classe per al pèndol doble
class DoublePendulum {
  constructor(originX, originY, a1, a2, c) {
    this.originX = 0; 
    this.originY = 0; 
    this.r1 = 150;  
    this.r2 = 150;  
    this.m1 = 20;   
    this.m2 = 20;   
    this.a1 = a1;   
    this.a2 = a2;   
    this.a1_v = 0;  
    this.a2_v = 0;  
    this.g = 1;     
    this.px2 = null;
    this.py2 = null;
    this.c = c;     // color assignat a aquest pèndol
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
  }

  show() {
    let x1 = this.r1 * sin(this.a1);
    let y1 = this.r1 * cos(this.a1);

    let x2 = x1 + this.r2 * sin(this.a2);
    let y2 = y1 + this.r2 * cos(this.a2);

    stroke(this.c);
    strokeWeight(1);
    line(this.originX, this.originY, x1, y1);
    line(x1, y1, x2, y2);

    fill(this.c);
    ellipse(x2, y2, 4);

    if (this.px2 != null) {
      stroke(this.c);
      line(this.px2, this.py2, x2, y2);
    }
    this.px2 = x2;
    this.py2 = y2;
  }
}