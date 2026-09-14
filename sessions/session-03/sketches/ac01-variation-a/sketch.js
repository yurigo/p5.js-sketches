let seedValue = 1303;

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
  background(234, 38, 11);
  noStroke();

  const cols = 9;
  const rows = 9;
  const cw = width / cols;
  const ch = height / rows;

  for (let gx = 0; gx < cols; gx += 1) {
    for (let gy = 0; gy < rows; gy += 1) {
      const cx = gx * cw + cw * 0.5;
      const cy = gy * ch + ch * 0.5;
      const hue = random(10, 50);
      const sat = random(45, 95);
      const bri = random(60, 100);
      const shape = random(["circle", "square", "diamond"]);
      const size = random(cw * 0.3, cw * 0.92);

      fill(hue, sat, bri, 88);
      if (shape === "circle") {
        circle(cx, cy, size);
      } else if (shape === "square") {
        rectMode(CENTER);
        square(cx, cy, size);
      } else {
        push();
        translate(cx, cy);
        rotate(PI * 0.25);
        rectMode(CENTER);
        square(0, 0, size * 0.8);
        pop();
      }
    }
  }

  fill(0, 0, 100, 88);
  textAlign(RIGHT, BOTTOM);
  textSize(max(14, width * 0.025));
  text(`seed ${seedValue}`, width - 14, height - 10);
}
