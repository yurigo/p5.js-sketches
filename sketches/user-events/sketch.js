
let isEpileptic = false;
let isCirculitos = false;
let listOfBalls = [];
let cnv;

function setup() {
  randomSeed(new Date());
  const s = min(windowWidth, windowHeight) * 0.9;
  cnv = createCanvas(s, s);
  cnv.mousePressed(handleCanvasPress);
  cnv.touchStarted(handleCanvasPress);
  cnv.mouseReleased(handleCanvasRelease);
  background(45, 52, 54);
}

function windowResized() {
  const s = min(windowWidth, windowHeight) * 0.9;
  resizeCanvas(s, s);
  redraw();
}

function draw(){
  // ellipse(mouseX, mouseY, 10, 10);
  if (isEpileptic){
    background(random(255),random(255),random(255));
  }

  if (isCirculitos){

    const ball = {
      x: random(100, width-100),
      y: random(100, width-100),
      d: random(10,50),
      color: {
        r: random(255),
        g: random(255),
        b: random(255)
      }
    }

    console.log(ball)

    listOfBalls.push(ball);


  }

  drawAllBalls(listOfBalls);
}

function handleCanvasPress(){
  isEpileptic = true;
  return false;
}

function handleCanvasRelease(){
  isEpileptic = false;
  return false;
}

function mouseDragged(){
  // ellipse(mouseX, mouseY, 10, 10);
}

function keyPressed(){
  if (key == 'a') isEpileptic = true;
  if (key == 'b') isCirculitos = true;
}

function keyReleased(e){
  if (key == 'a') isEpileptic = false;
  if (key == 'b') isCirculitos = false;
}

function drawAllBalls(list){
  console.log(list)
  for (b of list){
    fill(b.color.r, b.color.g, b.color.b);
    ellipse(b.x, b.y, b.d, b.d);
  }
}