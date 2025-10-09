

function setup() {
    const s = min(windowWidth, windowHeight) * 0.9;
  createCanvas(s, s);

  angleMode(DEGREES);

  const medioX = width/2;
  const medioY = height/2;

  const diametro = 300;

  noStroke();

  for (let i = 0; i < 360 ; i ++){
    ellipse(
      medioX + diametro * sin(i), 
      medioY + diametro * cos(i) , 50, 50);
  }
}


