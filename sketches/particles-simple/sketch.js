let particles = [];


function setup() {
  const s = min(windowWidth, windowHeight) * 0.9;
  createCanvas(s, s);
  noStroke();

  for (let i = 0 ; i < 3; i++){
    const p = new Particles(width/2, height/2);
    particles.push(p);
  }
}

class Particles{
  // name;
  // orbit;
  // color;
  // size;
  // velocity;
  constructor(x, y){
    this.pos = createVector(x,y);
    this.vel = p5.Vector.random2D().mult(random(1,3)); // v: x:2 y:1.4
    this.life = random(100,255);
    this.color = color(random(255), random(255), random(255), this.life);
  }

  update(){
    this.pos.add(this.vel);
    this.life -= 1;
    this.color.setAlpha(this.life);
  }

  draw(){
    console.log(this.life)
    console.log(this.color)
    fill(this.color, this.life);

    ellipse(
      this.pos.x, this.pos.y, 10, 10
    );
  }
}

function windowResized() {
  const s = min(windowWidth, windowHeight) * 0.9;
  resizeCanvas(s, s);
  redraw();
}

function draw() {
  background(0,0,0);
  for (let p of particles){
    p.update();
    p.draw();
    console.log(p);
  }

  particles = particles.filter(p => p.life > 0);

  particles.push(new Particles(width/2, height/2))

  console.log(particles);
}

