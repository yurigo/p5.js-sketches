function setup() {
  createCanvas(800, 800);
  noLoop();

}

function draw() {

  // background(150);
  // ellipse(-10,-10,100,100);
  // ellipse(0,0,100,100);
  // fill("#0000FF");
  // fill(255);
  // ellipse(800,800,100,100);
  // noStroke();
  // rect(100,100,100,200);
  // stroke(200,0,100)
  // line(0,800,800,0);
  // strokeWeight(5)
  // triangle(50,30,100,200,400,400);
  
  for (let i = 0; i < 800; i = i + 20) {
    for (let j = 0; j < 800; j = j + 20) {
      textSize(20);
      text('🦄', i, j);
    }
  }
  
  // clip(mask1);

  noStroke();
  rect(200, 100, 400, 400);
  ellipse(400, 500, 400, 400);
  
  fill("black");
  rect(400 - 10, 100, 20, 600);
  
  rect(200, 350, 400, 20);
  
  textSize(150)
  text('🦄', 200, 300)
  
rotatedText();

  noFill();
  
  stroke(24, 33, 150);
  
  strokeWeight(10)
  circle(400, 400, 800);
  
  fill("red")
  // rect(0,0,width,height)
  
}

function mask1(){
  rect(500, 0, 100, 800)
  circle(400, 300 , 200);
  rect(200, 0, 100, 800)
  circle(400, 600 , 400);
}

function rotatedText(){
  push()
  textSize(150);
  translate(600,200);
  rotate(PI);  
  square(0,0,150)
  text('🦄', 0, 0)
  pop()
}

