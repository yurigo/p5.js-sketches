let medioX = 0;
let medioY = 0;
let diametro = 0;
let velocidad = 360 / 100;

function setup() {
  const s = min(windowWidth, windowHeight) * 0.9;
  createCanvas(s, s);
  angleMode(DEGREES);
  noStroke();
  medioX = width/2;
  medioY = height/2;
  diametro = 250;
}

function draw(){
      background(200,200,200)
      
      // fill("blue")
      // ellipse(
      // medioX + diametro * sin(frameCount * velocidad), 
      // medioY + diametro * cos(frameCount * velocidad) , 50, 50);

      stroke('blue');
      strokeWeight(50);

      line(medioX + diametro * sin((frameCount - 1) * velocidad), 
           medioY + diametro * cos((frameCount - 1) * velocidad),
           medioX + diametro * sin(frameCount * velocidad),
           medioY + diametro * cos(frameCount * velocidad));
}


