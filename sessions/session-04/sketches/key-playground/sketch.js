let activeSymbol = "A";
let pulses = [];
let hueValue = 200;

function setup() {
  const s = min(windowWidth, windowHeight) * 0.82;
  createCanvas(s, s);
  colorMode(HSB, 360, 100, 100, 100);
  textAlign(CENTER, CENTER);
}

function draw() {
  background(235, 40, 14);

  for (let i = pulses.length - 1; i >= 0; i -= 1) {
    pulses[i].size += 3;
    pulses[i].alpha -= 2;

    if (pulses[i].alpha <= 0) {
      pulses.splice(i, 1);
      continue;
    }

    noFill();
    stroke(pulses[i].hue, 80, 100, pulses[i].alpha);
    strokeWeight(3);
    circle(pulses[i].x, pulses[i].y, pulses[i].size);
  }

  fill(hueValue, 55, 100);
  noStroke();
  textSize(width * 0.22);
  text(activeSymbol, width / 2, height / 2);

  if (keyIsPressed && insideCanvas(mouseX, mouseY)) {
    fill(hueValue, 80, 100, 60);
    circle(mouseX, mouseY, 36 + sin(frameCount * 0.15) * 8);
  }

  drawHud();
}

function keyPressed() {
  activeSymbol = key === " " ? "␣" : key.toUpperCase();
  hueValue = (hueValue + 47) % 360;
  pulses.push({
    x: width / 2,
    y: height / 2,
    size: 20,
    alpha: 100,
    hue: hueValue,
  });

  if (pulses.length > 18) {
    pulses.shift();
  }
}

function windowResized() {
  const s = min(windowWidth, windowHeight) * 0.82;
  resizeCanvas(s, s);
}

function drawHud() {
  noStroke();
  fill(235, 40, 14, 92);
  rect(16, 16, width - 32, 92, 8);

  fill(0, 0, 100);
  textAlign(LEFT, TOP);
  textSize(15);
  text("Pulsa letras o espacio para cambiar el símbolo", 28, 28);
  text(`key: ${key || "(ninguna)"} · keyIsPressed: ${keyIsPressed}`, 28, 52);
  text("Mientras mantienes una tecla, aparece un pulso bajo el ratón", 28, 76);
  textAlign(CENTER, CENTER);
}

function insideCanvas(x, y) {
  return x >= 0 && x <= width && y >= 0 && y <= height;
}
