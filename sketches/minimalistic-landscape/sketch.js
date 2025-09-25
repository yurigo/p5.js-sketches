function setup() {
  const s = min(windowWidth, windowHeight) * 0.9;
  createCanvas(s, s);
  noLoop();
}

function windowResized() {
  const s = min(windowWidth, windowHeight) * 0.9;
  resizeCanvas(s, s);
  redraw();
}

function draw() {
  // Sky gradient
  drawSky();

  // Mountain layers
  drawMountains();

  // Sun/Moon
  drawSun();

  // Clouds
  drawClouds();

  // Trees
  drawTrees();

  // Ground
  drawGround();
}

function drawSky() {
  // Gradient from light blue to soft pink
  for (let y = 0; y < height; y++) {
    let alpha = map(y, 0, height, 0, 1);
    let skyColor = lerpColor(color(173, 216, 230), color(255, 218, 185), alpha);
    stroke(skyColor);
    line(0, y, width, y);
  }
}

function drawSun() {
  // Simple sun circle - responsive positioning and size
  fill(255, 223, 186);
  noStroke();
  circle(width * 0.8125, height * 0.1875, width * 0.15);

  // Sun rays (minimal lines) - responsive
  stroke(255, 223, 186, 150);
  strokeWeight(1);
  let sunX = width * 0.8125;
  let sunY = height * 0.1875;
  let innerRadius = width * 0.1;
  let outerRadius = width * 0.125;
  
  for (let i = 0; i < 8; i++) {
    let angle = (i * PI) / 4;
    let x1 = sunX + cos(angle) * innerRadius;
    let y1 = sunY + sin(angle) * innerRadius;
    let x2 = sunX + cos(angle) * outerRadius;
    let y2 = sunY + sin(angle) * outerRadius;
    line(x1, y1, x2, y2);
  }
}

function drawMountains() {
  // Back mountains (light) - responsive positioning
  fill(180, 200, 220, 180);
  noStroke();
  triangle(0, height * 0.5, width * 0.375, height * 0.25, width * 0.625, height * 0.5);
  triangle(width * 0.25, height * 0.5, width * 0.5625, height * 0.225, width * 0.875, height * 0.5);

  // Middle mountains (medium) - responsive
  fill(140, 170, 200, 200);
  triangle(0, height * 0.625, width * 0.25, height * 0.375, width * 0.5, height * 0.625);
  triangle(width * 0.375, height * 0.625, width * 0.6875, height * 0.3125, width, height * 0.625);

  // Front mountains (dark) - responsive
  fill(100, 130, 160);
  triangle(0, height * 0.75, width * 0.1875, height * 0.5625, width * 0.375, height * 0.75);
  triangle(width * 0.625, height * 0.75, width * 0.875, height * 0.5, width, height * 0.75);
}

function drawClouds() {
  fill(255, 255, 255, 200);
  noStroke();

  // Simple cloud shapes - responsive positioning and sizing
  let cloudSize1 = width * 0.1;
  let cloudSize2 = width * 0.075;
  let cloudSize3 = width * 0.0625;
  
  // First cloud group
  ellipse(width * 0.25, height * 0.15, cloudSize1, cloudSize1 * 0.5);
  ellipse(width * 0.2875, height * 0.1375, cloudSize2, cloudSize2 * 0.6);
  ellipse(width * 0.225, height * 0.1375, cloudSize3, cloudSize3 * 0.6);

  // Second cloud group
  let cloudSize4 = width * 0.125;
  let cloudSize5 = width * 0.0875;
  let cloudSize6 = width * 0.075;
  
  ellipse(width * 0.625, height * 0.225, cloudSize4, cloudSize4 * 0.5);
  ellipse(width * 0.675, height * 0.2125, cloudSize5, cloudSize5 * 0.57);
  ellipse(width * 0.5875, height * 0.2125, cloudSize6, cloudSize6 * 0.6);
}

function drawTrees() {
  stroke(101, 67, 33);
  strokeWeight(4);

  // Tree trunks - responsive positioning and sizing
  let tree1X = width * 0.1875;
  let tree2X = width * 0.85;
  let tree3X = width * 0.5;
  
  line(tree1X, height * 0.6875, tree1X, height * 0.8125);
  line(tree2X, height * 0.725, tree2X, height * 0.85);
  line(tree3X, height * 0.7125, tree3X, height * 0.8375);

  // Tree foliage (simple circles) - responsive sizing
  fill(76, 153, 76);
  noStroke();
  circle(tree1X, height * 0.6625, width * 0.1);
  circle(tree2X, height * 0.7, width * 0.125);
  circle(tree3X, height * 0.6875, width * 0.1125);

  // Smaller trees - responsive
  stroke(101, 67, 33);
  strokeWeight(2);
  let smallTree1X = width * 0.375;
  let smallTree2X = width * 0.6875;
  
  line(smallTree1X, height * 0.75, smallTree1X, height * 0.8125);
  line(smallTree2X, height * 0.775, smallTree2X, height * 0.8375);

  fill(76, 153, 76);
  noStroke();
  circle(smallTree1X, height * 0.7375, width * 0.0625);
  circle(smallTree2X, height * 0.7625, width * 0.075);
}

function drawGround() {
  // Simple ground plane - responsive
  fill(139, 169, 101);
  noStroke();
  rect(0, height * 0.8125, width, height * 0.1875);

  // Grass details (minimal lines) - responsive spacing and sizing
  stroke(76, 153, 76);
  strokeWeight(1);
  let grassSpacing = width * 0.0375;
  for (let x = grassSpacing * 0.67; x < width; x += grassSpacing) {
    let grassHeight = random(height * 0.0125, height * 0.03);
    line(x, height * 0.8125, x, height * 0.8125 - grassHeight);
    line(x + grassSpacing * 0.33, height * 0.8125, x + grassSpacing * 0.33, height * 0.8125 - random(height * 0.01, height * 0.025));
  }

  // Path - responsive
  fill(200, 180, 140);
  noStroke();
  quad(width * 0.4375, height * 0.8125, width * 0.5625, height * 0.8125, width * 0.625, height, width * 0.375, height);
}
