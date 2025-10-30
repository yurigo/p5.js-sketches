const maxIterations = 100;

function setup() {
  const s = min(windowWidth, windowHeight) * 0.9;
  createCanvas(s, s);
  pixelDensity(1);
  colorMode(HSB, 360, 100, 100);
  noLoop();
  drawMandelbrot();
}

function windowResized() {
  const s = min(windowWidth, windowHeight) * 0.9;
  resizeCanvas(s, s);
  redraw();
}

function draw() {
  drawMandelbrot();
}

function drawMandelbrot() {
  loadPixels();
  
  const minX = -2.5;
  const maxX = 1.0;
  const minY = -1.25;
  const maxY = 1.25;
  
  for (let x = 0; x < width; x++) {
    for (let y = 0; y < height; y++) {
      const a = map(x, 0, width, minX, maxX);
      const b = map(y, 0, height, minY, maxY);
      
      let ca = a;
      let cb = b;
      let n = 0;
      let za = 0;
      let zb = 0;
      
      while (n < maxIterations) {
        const aa = za * za - zb * zb;
        const bb = 2 * za * zb;
        
        za = aa + ca;
        zb = bb + cb;
        
        if (za * za + zb * zb > 16) {
          break;
        }
        
        n++;
      }
      
      const pix = (x + y * width) * 4;
      
      if (n === maxIterations) {
        pixels[pix + 0] = 0;
        pixels[pix + 1] = 0;
        pixels[pix + 2] = 0;
        pixels[pix + 3] = 255;
      } else {
        const hue = map(n, 0, maxIterations, 0, 360);
        const brightness = map(n, 0, maxIterations, 0, 100);
        const col = color(hue, 80, brightness);
        
        pixels[pix + 0] = red(col);
        pixels[pix + 1] = green(col);
        pixels[pix + 2] = blue(col);
        pixels[pix + 3] = 255;
      }
    }
  }
  
  updatePixels();
}
