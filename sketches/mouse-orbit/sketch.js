const planets = [];


function setup() {
  const s = min(windowWidth, windowHeight) * 0.9;
  createCanvas(s, s);
  angleMode(DEGREES);
  noStroke();

  // planets = [
  //   {
  //     r: 10,
  //     color: "red",
  //     size: 10,
  //     v: 10,
  //   },
  //   {
  //     r: 14,
  //     color: "green",
  //     size: 8,
  //     v: 20,
  //   }
  // ]

  // // quiero crear la tierra:
  // const tierra = new Planet("earth", 23, "turquoise", 13, 22);
  // const mars = new Planet("mars", 40, "orangedark", 17, 10);
  // //etc.
  // planets.push(tierra);
  // planets.push(mars);

  // planets.push(new Planet("earth", 23, "turquoise", 13, 22));
  // planets.push(new Planet("mars", 40, "darkorange", 17, 10));

  planets.push(new Planet("earth", 23, "turquoise", 13, 22));
  planets.push(new Planet("mars", 40, "darkorange", 17, 10));
  planets.push(new Planet("venus", 35, "gold", 25, 18));
  planets.push(new Planet("jupiter", 90, "sandybrown", 5, 30));
  planets.push(new Planet("saturn", 80, "khaki", 40, 25));
  planets.push(new Planet("neptune", 50, "royalblue", 33, 12));
  planets.push(new Planet("mercury", 20, "gray", 10, 5));
  planets.push(new Planet("uranus", 60, "lightblue", 45, 20));

}

class Planet{
  // name;
  // orbit;
  // color;
  // size;
  // velocity;
  constructor(name, orbit, color, size, velocity){
    this.name = name;
    this.orbit = orbit;
    this.color = color;
    this.size = size;
    this.velocity = velocity;
  }

  draw(){
    fill(this.color);
    ellipse(
      mouseX + this.orbit * sin((millis()) * this.velocity / 100),
      mouseY + this.orbit * cos((millis()) * this.velocity / 100),
      this.size,
      this.size,
  );
  }
}

function windowResized() {
  const s = min(windowWidth, windowHeight) * 0.9;
  resizeCanvas(s, s);
  redraw();
}

function draw() {
  // background(50, 50, 50, 20);
  noStroke();
  fill(50, 50, 50);
  rect(0, 0, width, height);

  medioX = width / 2;
  medioY = height / 2;
  diametro = width / 8;
  borde = width / 20;

  // fill("blue")
  // ellipse(
  // medioX + diametro * sin(frameCount * velocidad),
  // medioY + diametro * cos(frameCount * velocidad) , 50, 50);

  // fill("yellowgreen");

  // ellipse(
  //   mouseX + diametro * sin((millis()) * 1),
  //   mouseY + diametro * cos((millis()) * 1),
  //   10,
  //   10,
  // );


  for (p of planets){
    p.draw();
  }

}

