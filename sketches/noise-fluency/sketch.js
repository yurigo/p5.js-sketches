// Ruido coherente: fluidez con noise()
function setup() {
  const s = min(windowWidth, windowHeight) * 0.9;
  createCanvas(s, s);
  background(0);
  stroke(255);
  noFill();
  let yoff = 0;
  for (let y = 0; y < height; y += 10) {
    beginShape();
    let xoff = 0;
    for (let x = 0; x < width; x += 10) {
      let n = noise(xoff, yoff) * 100;
      vertex(x, y + n);
      xoff += 0.1;
    }
    endShape();
    yoff += 0.1;
  }
}

function windowResized() {
  const s = min(windowWidth, windowHeight) * 0.9;
  resizeCanvas(s, s);
  redraw();
}
