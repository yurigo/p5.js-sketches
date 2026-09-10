let img = [];
let sounds = [];
let psyduckSpots = [];
let seedValue = 55;
let psyduckHitPending = false;

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

      if (i + 1 === 54) {
        continue; // Skip Psyduck (index 53)
      }

      image(img[i], imgX, imgY);
    }
  }

  for (let i = 0; i < 4; i++) {
    // draw Psyduck on top
    const psyduckIndex = 53;
    // psyduck position secure on the canvas:
    // - 50 to width - 50
    // - 50 to height - 50
    const psyduckX = random(width - 25) - 35; // width - 60; // -40; // random(width + 20) - 40;
    const psyduckY = random(height - 25) - 35; // height - 60; // -40; // random(height + 20) - 40;
    image(img[psyduckIndex], psyduckX, psyduckY);

    // Store the position and size of the Psyduck for click detection
    psyduckSpots.push({
      x: psyduckX,
      y: psyduckY,
      w: img[psyduckIndex].width,
      h: img[psyduckIndex].height,
    });
  }
}

function mousePressed() {
  if (psyduckHitPending) {
    return;
  }

  const hitPsyduck = psyduckSpots.find(
    ({ x, y, w, h }) =>
      mouseX >= x && mouseX <= x + w && mouseY >= y && mouseY <= y + h,
  );

  if (hitPsyduck) {
    psyduckHitPending = true;
    userStartAudio();
    random(sounds).play();

    showCapturedPokemon(hitPsyduck);

    setTimeout(() => {
      seedValue = floor(random(1_000_000_000));
      randomSeed(seedValue);
      background(45, 52, 54);
      redraw();
      psyduckHitPending = false;
    }, 250);
  }
}

function keyPressed() {
  if (key === "s" || key === "S") {
    saveCanvas(`pokemon-random-${seedValue}.png`);
  }
}

function showCapturedPokemon(pokemonSpot) {
  const x = pokemonSpot.x + pokemonSpot.w / 2;
  const y = pokemonSpot.y + pokemonSpot.h / 2;

  for (let i = 0; i < 4; i++) {
    setTimeout(() => {
      push();
      noFill();
      stroke(255, 221, 51, 220 - i * 45);
      strokeWeight(8 - i);
      circle(x, y, pokemonSpot.w * (1.1 + i * 0.25));
      pop();
    }, i * 45);
  }
}
