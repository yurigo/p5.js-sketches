let particles = [];


function setup() {
  const s = min(windowWidth, windowHeight) * 0.9;
  createCanvas(s, s);
  angleMode(DEGREES);
  noStroke();

  // for (let i = 0 ; i < 3; i++){
  //   const p = new Particles(width/2, height/2, i);
  //   particles.push(p);
  // }
}

function mouseWheel(event){
  console.log(event.delta);
    CONSTANT += event.delta/100

}

let CONSTANT = 10;

class Particles{
  // name;
  // orbit;
  // color;
  // size;
  // velocity;
  constructor(x, y, angle){
    this.pos = createVector(x,y);
    this.vel = createVector(cos(angle * CONSTANT), -sin(angle * CONSTANT))
    this.life = 255; //random(100,255);
    this.color = color(random(255), random(255), random(255), this.life);
  }

  update(){
    this.pos.add(this.vel);

    


    this.life -= 1;
    this.color.setAlpha(this.life);
  }

  draw(){
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
  fill(255);
  text("constante: " + CONSTANT,20,30)
  for (let p of particles){
    p.update();
    p.draw();
  }

  particles = particles.filter(p => p.life > 0);

  particles.push(new Particles(width/2, height/2, frameCount))

}

