// Jiashan Wu
// https://github.com/OhJia/p5MobileWebExamples
// revised Daniel Shiffman

var x, y, z;

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  x = 0;
  y = 0;
  z = 0;

  // Request permission for iOS 13+
  if (
    typeof DeviceOrientationEvent !== "undefined" &&
    typeof DeviceOrientationEvent.requestPermission === "function"
  ) {
    DeviceOrientationEvent.requestPermission()
      .then((permissionState) => {
        if (permissionState === "granted") {
          window.addEventListener("devicemotion", handleMotion);
        } else {
          // Display a message asking the user to grant permission in settings
          createButton("Allow access to sensors").mousePressed(() => {
            window.open(
              "https://support.apple.com/guide/iphone/settings-34a528f7a3f2/ios",
              "_blank"
            );
          });
        }
      })
      .catch(console.error);
  } else {
    // Handle cases for devices older than iOS 13 or browsers that don't support the API
    window.addEventListener("devicemotion", handleMotion);
  }
}

function draw() {
  background(255, 255, 255, 255);
  translate(-width / 2, 0, -600);

  // rotate the box based on accelerometer data
  // we could use rotationX,Y here but demonstrating
  // acceleration
  x += accelerationX * 0.05;
  y += accelerationY * 0.05;
  z += accelerationZ * 0.05;
  normalMaterial();
  rotateX(x);
  rotateY(y);
  rotateZ(z);
  box(200, 200, 200);
}

function handleMotion(e) {
  // Use accelerationIncludingGravity for more consistent results on iOS
  x = parseInt(e.accelerationIncludingGravity.x);
  y = parseInt(e.accelerationIncludingGravity.y);
  z = parseInt(e.accelerationIncludingGravity.z);
}
