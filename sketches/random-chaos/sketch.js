function setup() {
  const s = min(windowWidth, windowHeight) * 0.9;
  createCanvas(s, s);
  noStroke();
  fill(200, 100, 255, 150);
}

function windowResized() {
  const s = min(windowWidth, windowHeight) * 0.9;
  resizeCanvas(s, s);
  redraw();
}

function draw(){
    for (let i = 0; i < width; i += 20) {
      ellipse(i, random(height), 15);
    }
}
