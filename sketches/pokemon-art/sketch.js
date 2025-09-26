let img = [];

// Load the image and create a p5.Image object.
function preload() {
  for (let i = 1; i <= 151; i++) {
    img.push(loadImage(`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${i}.png`))
  }
}


function setup() {
  const s = min(windowWidth, windowHeight) * 0.9;
  createCanvas(s, s);
  background(45, 52, 54);
  noLoop();
}

function windowResized() {
  const s = min(windowWidth, windowHeight) * 0.9;
  resizeCanvas(s, s);
  redraw();
}

function draw() {
  for (let x = 0; x < 10; x++) {
    for (let i = 0; i < 151; i++) {
      image(img[i], random(width + 20) - 40, random(height + 20) - 40);
    }
  }
}
