let seedValue = 3303;

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
  randomSeed(seedValue);
  noiseSeed(seedValue);
  background(238, 34, 8);
  noStroke();

  const cols = 24;
  const rows = 24;
  const cw = width / cols;
  const ch = height / rows;

  for (let gx = 0; gx < cols; gx += 1) {
    for (let gy = 0; gy < rows; gy += 1) {
      const nx = gx * 0.18;
      const ny = gy * 0.18;
      const n = noise(nx, ny);
      const t = map(n, 0, 1, 0.15, 0.95);
      const hue = lerp(15, 330, t);
      const sat = lerp(70, 95, t);
      const bri = lerp(45, 100, t);
      const base = lerp(cw * 0.25, cw * 1.05, t);
      const jitterX = random(-cw * 0.16, cw * 0.16);
      const jitterY = random(-ch * 0.16, ch * 0.16);

      fill(hue, sat, bri, 82);
      circle(gx * cw + cw * 0.5 + jitterX, gy * ch + ch * 0.5 + jitterY, base);
    }
  }

  fill(0, 0, 100, 88);
  textAlign(RIGHT, BOTTOM);
  textSize(max(14, width * 0.025));
  text(`seed ${seedValue}`, width - 14, height - 10);
}
