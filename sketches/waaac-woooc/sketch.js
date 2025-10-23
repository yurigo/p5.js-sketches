// **Important**: This code will likely not work until user permission is granted.
// You will need to add a button or a user interaction to prompt the user.

let x, y, z;
let xpos, ypos;

function setup() {
  createCanvas(400, 400);
  xpos = width / 2;
  ypos = height / 2;

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
  background(255);
  fill(0);
  noStroke();
  text("x: " + x, 25, 25);
  text("y: " + y, 25, 50);
  text("z: " + z, 25, 75);

  xpos = xpos + x * 0.05; // Adjust sensitivity
  ypos = ypos - y * 0.05; // Adjust sensitivity

  // Keep the ellipse on the screen
  xpos = constrain(xpos, 0, width);
  ypos = constrain(ypos, 0, height);

  fill(255, 0, 0);
  ellipse(xpos, ypos, 50, 50);
}

function handleMotion(e) {
  // Use accelerationIncludingGravity for more consistent results on iOS
  x = parseInt(e.accelerationIncludingGravity.x);
  y = parseInt(e.accelerationIncludingGravity.y);
  z = parseInt(e.accelerationIncludingGravity.z);
}
