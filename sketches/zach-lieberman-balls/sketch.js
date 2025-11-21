function setup() {
  const s = min(windowWidth, windowHeight) * 0.9;
  createCanvas(s, s);
  noStroke();

  // Initialize fullscreen controls
  initFullscreenControls();
}

function windowResized() {
  handleFullscreenWindowResize();
}

function draw() {
  const time = frameCount / (20000 / height);
  background(0);
  for (let i = 0; i <= height; i++) {
    fill(
      127 + 127 * Math.sin(time + i * 0.01),
      127 + 127 * Math.sin(time + i * 0.011),
      127 + 127 * Math.sin(time + i * 0.012)
    );
    circle(
      width / 2 + (height / 4) * Math.sin(time + i * 0.01),
      i,
      120 + 80 * Math.sin(i * 0.013 + time)
    );
  }
}
