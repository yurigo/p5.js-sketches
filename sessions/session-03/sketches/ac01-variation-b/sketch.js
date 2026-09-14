let seedValue = 2503;

function setup() {
  const s = min(windowWidth, windowHeight) * 0.82;
  createCanvas(s, s);
  colorMode(HSB, 360, 100, 100, 100);
  noLoop();
  updateSeedFromUrl();
  renderPoster();
}

function draw() {}

function windowResized() {
  const s = min(windowWidth, windowHeight) * 0.82;
  resizeCanvas(s, s);
  renderPoster();
}

function updateSeedFromUrl() {
  const params = new URLSearchParams(window.location.search);
  const seedParam = params.get("seed");
  if (seedParam !== null && !Number.isNaN(Number(seedParam))) {
    seedValue = Number(seedParam);
  }
}

function renderPoster() {
  noiseSeed(seedValue);
  background(229, 28, 9);
  strokeWeight(2);
  noFill();

  const step = max(10, width / 60);
  for (let y = 0; y <= height; y += step) {
    beginShape();
    const hue = map(y, 0, height, 180, 320);
    stroke(hue, 75, 95, 75);

    for (let x = 0; x <= width; x += step) {
      const n = noise(x * 0.008, y * 0.008);
      const dy = map(n, 0, 1, -40, 40);
      vertex(x, y + dy);
    }
    endShape();
  }

  fill(0, 0, 100, 88);
  noStroke();
  textAlign(RIGHT, BOTTOM);
  textSize(max(14, width * 0.025));
  text(`seed ${seedValue}`, width - 14, height - 10);
}
