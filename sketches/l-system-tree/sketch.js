let axiom = "F";
let sentence = axiom;
let len = 100;
let angle;

const rules = {
  "F": "FF+[+F-F-F]-[-F+F+F]"
};

function generate() {
  let nextSentence = "";
  for (let i = 0; i < sentence.length; i++) {
    const current = sentence.charAt(i);
    const found = rules[current];
    if (found) {
      nextSentence += found;
    } else {
      nextSentence += current;
    }
  }
  sentence = nextSentence;
  len *= 0.5;
}

function turtle() {
  background(45, 52, 54);
  resetMatrix();
  translate(width / 2, height);
  stroke(100, 200, 100);
  strokeWeight(1);
  
  for (let i = 0; i < sentence.length; i++) {
    const current = sentence.charAt(i);
    
    if (current === "F") {
      line(0, 0, 0, -len);
      translate(0, -len);
    } else if (current === "+") {
      rotate(angle);
    } else if (current === "-") {
      rotate(-angle);
    } else if (current === "[") {
      push();
    } else if (current === "]") {
      pop();
    }
  }
}

function setup() {
  const s = min(windowWidth, windowHeight) * 0.9;
  createCanvas(s, s);
  angle = radians(25);
  background(45, 52, 54);
  
  for (let i = 0; i < 4; i++) {
    generate();
  }
  
  turtle();
  noLoop();
}

function windowResized() {
  const s = min(windowWidth, windowHeight) * 0.9;
  resizeCanvas(s, s);
  redraw();
}

function draw() {
  turtle();
}
