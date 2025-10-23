// Motion-controlled ball with proper device motion permission + physics integration
// iOS 13+ requires an explicit user gesture to grant motion sensor access.
// This sketch shows a small button to enable motion on supported devices.

let ax = 0,
  ay = 0,
  az = 0; // raw acceleration (including gravity)
let vx = 0,
  vy = 0; // velocity we integrate from acceleration
let xpos, ypos; // position
let friction = 0.98; // simple damping to avoid runaway speeds
let accelScale = 1.2; // scale factor to tune sensitivity
let permissionBtn; // UI button for iOS permission

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
  createCanvas(windowWidth, windowHeight);

  xpos = width / 2;
  ypos = height / 2;

  // iOS 13+ requires a user gesture to grant access
  if (
    typeof DeviceMotionEvent !== "undefined" &&
    typeof DeviceMotionEvent.requestPermission === "function"
  ) {
    // Show a small enable button
    permissionBtn = createButton("Enable Motion");
    permissionBtn.position(16, 16);
    permissionBtn.style("padding", "10px 14px");
    permissionBtn.style("border-radius", "8px");
    permissionBtn.style("border", "1px solid #444");
    permissionBtn.style("background", "#1a1a2e");
    permissionBtn.style("color", "#ffd700");
    permissionBtn.style("font-family", "monospace");
    permissionBtn.mousePressed(async () => {
      try {
        const resp = await DeviceMotionEvent.requestPermission();
        if (resp === "granted") {
          startMotion();
          permissionBtn.remove();
        }
      } catch (err) {
        console.error("DeviceMotion permission error:", err);
      }
    });
  } else {
    // Other platforms: start listening right away
    startMotion();
  }
}

function draw() {
  background(0);

  // Integrate acceleration into velocity; flip Y so tilting up moves ball up
  vx += (ax || 0) * accelScale;
  vy += (ay ? -ay : 0) * accelScale;

  // Apply simple friction
  vx *= friction;
  vy *= friction;

  // Update position
  xpos += vx;
  ypos += vy;

  // Collide with edges and bounce
  const r = 12.5; // radius of the ball
  if (xpos > width - r) {
    xpos = width - r;
    vx *= -0.8;
  }
  if (xpos < r) {
    xpos = r;
    vx *= -0.8;
  }
  if (ypos > height - r) {
    ypos = height - r;
    vy *= -0.8;
  }
  if (ypos < r) {
    ypos = r;
    vy *= -0.8;
  }

  // Draw ball
  noStroke();
  fill(255, 0, 0);
  ellipse(xpos, ypos, r * 2, r * 2);

  // Debug text
  fill(255);
  noStroke();
  textSize(14);
  text("ax: " + nf(ax, 1, 2), 25, 25);
  text("ay: " + nf(ay, 1, 2), 25, 45);
  text("az: " + nf(az, 1, 2), 25, 65);
  text("vx: " + nf(vx, 1, 2), 25, 90);
  text("vy: " + nf(vy, 1, 2), 25, 110);
}

function startMotion() {
  // Listen for motion events; prefer includingGravity for broader support
  window.addEventListener(
    "devicemotion",
    (e) => {
      const a = e.accelerationIncludingGravity || e.acceleration;
      if (!a) return;
      // Use floats (parseInt would zero-out small values!)
      ax = typeof a.x === "number" ? a.x : 0;
      ay = typeof a.y === "number" ? a.y : 0;
      az = typeof a.z === "number" ? a.z : 0;
    },
    true
  );
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  // keep the ball on-screen after resize
  xpos = constrain(xpos, 0, width);
  ypos = constrain(ypos, 0, height);
}
