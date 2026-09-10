let img = [];
let sounds = [];
let psyduckSpots = [];
let seedValue = 55;

// Load the image and create a p5.Image object.
function preload() {
  sounds = [
    //"du-bist-gut-genug.mp3",
    "faaah.mp3",
    "hee-hee.mp3",
    "mac-quack.mp3",
    "rubber-duck.mp3",
  ].map((file) => loadSound(`assets/${file}`));

  for (let i = 1; i <= 151; i++) {
    img.push(
      loadImage(
        `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${i}.png`,
      ),
    );
  }
}

function setup() {
  const s = min(windowWidth, windowHeight) * 0.9;
  createCanvas(s, s);
  background(45, 52, 54);
  noLoop();

  // Parse URL query parameter for seed
  const urlParams = new URLSearchParams(window.location.search);
  const idParam = urlParams.get("id");
  if (idParam && !isNaN(idParam)) {
    seedValue = parseInt(idParam);
  }

  randomSeed(seedValue);
}

function windowResized() {
  const s = min(windowWidth, windowHeight) * 0.9;
  resizeCanvas(s, s);
  redraw();
}

function draw() {
  psyduckSpots = [];

  for (let x = 0; x < 10; x++) {
    for (let i = 0; i < 151; i++) {
      const imgX = random(width + 20) - 40;
      const imgY = random(height + 20) - 40;

      if (i === 53) {
        psyduckSpots.push({
          x: imgX,
          y: imgY,
          w: img[i].width,
          h: img[i].height,
        });
      }

      image(img[i], imgX, imgY);
    }
  }
}

function mousePressed() {
  const hitPsyduck = psyduckSpots.find(
    ({ x, y, w, h }) =>
      mouseX >= x && mouseX <= x + w && mouseY >= y && mouseY <= y + h,
  );

  if (hitPsyduck) {
    userStartAudio();
    random(sounds).play();

    push();
    noFill();
    stroke(255, 221, 51);
    strokeWeight(5);
    circle(
      hitPsyduck.x + hitPsyduck.w / 2,
      hitPsyduck.y + hitPsyduck.h / 2,
      hitPsyduck.w * 1.5,
    );
    pop();

    setTimeout(() => {
      seedValue = floor(random(1_000_000_000));
      randomSeed(seedValue);
      background(45, 52, 54);
      redraw();
    }, 250);
  }
}

function keyPressed() {
  if (key === "s" || key === "S") {
    saveCanvas(`pokemon-random-${seedValue}.png`);
  }
}
