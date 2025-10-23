//You can disable this by turning on orientation lock on your iPhone https://support.apple.com/en-us/HT204547
//or Android https://www.howtogeek.com/201130/how-to-lock-screen-orientation-in-android/

let x, y, z;
let xpos, ypos;

// function setup()
// {
//   // set canvas size
//   createCanvas(400, 400);

//   // default values
//   xpos = 200;
//   ypos = 200;
//   x = 0;
//   y = 0;
// }

// function draw()
// {
//   // set background color to white
//   background(255);

//   // add/subract xpos and ypos
//   xpos = xpos + x;
//   ypos = ypos - y;

//   // wrap ellipse if over bounds
//   if(xpos > 400) { xpos = 0; }
//   if(xpos < 0) { xpos = 400; }
//   if(ypos > 400) { ypos = 0; }
//   if(ypos < 0) { ypos = 400; }

//   // draw ellipse
//   fill(255, 0, 0);
//   ellipse(xpos, ypos, 25, 25);

//   // display variables
//   fill(0);
//   noStroke();
//   text("x: " + x, 25, 25);
//   text("y: " + y, 25, 50);
//   text("z: " + z, 25, 75);
// }

// // accelerometer Data
// window.addEventListener('devicemotion', function(e)
// {
//   // get accelerometer values
//   x = parseInt(e.accelerationIncludingGravity.x);
//   y = parseInt(e.accelerationIncludingGravity.y);
//   z = parseInt(e.accelerationIncludingGravity.z);
// });

function setup() {
  rectMode(CENTER);
  // set canvas size
  createCanvas(windowWidth, windowHeight);

  // default values
  xpos = windowWidth / 2;
  ypos = windowHeight / 2;
  x = 0;
  y = 0;
}

function draw() {
  // set background color to white
  background(0);

  // add/subract xpos and ypos
  xpos = xpos + x;
  ypos = ypos - y;

  // wrap ellipse if over bounds
  if (xpos > windowWidth) {
    xpos = windowWidth;
    x = -x;
  }
  if (xpos < 0) {
    xpos = 0;
    x = -x;
  }
  if (ypos > windowHeight) {
    ypos = windowHeight;
    y = -y;
  }
  if (ypos < 0) {
    ypos = 0;
    y = -y;
  }

  // draw ellipse
  fill(255, 0, 0);
  ellipse(xpos, ypos, 25, 25);
  // music

  // display variables
  fill(255);
  noStroke();
  text("x: " + x, 25, 25);
  text("y: " + y, 25, 50);
  text("z: " + z, 25, 75);
}

// accelerometer Data
window.addEventListener("devicemotion", function (e) {
  // get accelerometer values
  x = parseInt(e.accelerationIncludingGravity.x);
  y = parseInt(e.accelerationIncludingGravity.y);
  z = parseInt(e.accelerationIncludingGravity.z);
});
