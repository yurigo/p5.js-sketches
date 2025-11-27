let video;
let bodyPose;
let poses = [];

// Sound variables
let leftElbowOsc;
let rightElbowOsc;
let audioStarted = false;
let modelLoaded = false;

function preload() {
  bodyPose = ml5.bodyPose("MoveNet", modelReady);
}

function modelReady() {
  modelLoaded = true;
  console.log("Model loaded!");
  
  // Update UI to show start button
  const loadingStatus = document.getElementById('loading-status');
  const startButton = document.getElementById('start-button');
  const instructions = document.getElementById('instructions');
  
  if (loadingStatus) loadingStatus.style.display = 'none';
  if (startButton) {
    startButton.style.display = 'block';
    startButton.onclick = startSketch;
  }
  if (instructions) instructions.style.display = 'block';
}

function startSketch() {
  if (!audioStarted) {
    // Ensure oscillators are initialized
    if (!leftElbowOsc || !rightElbowOsc) {
      console.warn("Oscillators not ready yet");
      return;
    }
    
    userStartAudio();
    leftElbowOsc.start();
    rightElbowOsc.start();
    audioStarted = true;
    
    // Hide the overlay
    const overlay = document.getElementById('start-overlay');
    if (overlay) overlay.classList.add('hidden');
  }
}

function gotPoses(results) {
  poses = results;
  console.log(results);
}

function setup() {
  const s = min(windowWidth, windowHeight) * 0.9;
  createCanvas(s, s);

  video = createCapture(VIDEO, { flipped: true });
  video.size(width, height);
  video.hide();

  bodyPose.detectStart(video, gotPoses);

  // Create oscillators for each elbow (but don't start yet)
  leftElbowOsc = new p5.Oscillator("sine");
  leftElbowOsc.freq(220); // A3 note
  leftElbowOsc.amp(0);

  rightElbowOsc = new p5.Oscillator("sine");
  rightElbowOsc.freq(330); // E4 note
  rightElbowOsc.amp(0);
}

// function windowResized() {
//   const s = min(windowWidth, windowHeight) * 0.9;
//   resizeCanvas(s, s);
//   redraw();
// }

function draw() {
  image(video, 0, 0, width, height);

  // Don't process if audio hasn't started
  if (!audioStarted) {
    return;
  }

  // Draw detected poses and elbows
  let leftElbowDetected = false;
  let rightElbowDetected = false;

  // Loop through all detected people
  for (let i = 0; i < poses.length; i++) {
    let pose = poses[i];

    // Get elbow keypoints
    let leftElbow = pose.keypoints.find((kp) => kp.name === "left_elbow");
    let rightElbow = pose.keypoints.find((kp) => kp.name === "right_elbow");

    // Draw balls for each detected elbow
    if (leftElbow && leftElbow.confidence > 0.3) {
      drawElbowBall(leftElbow, color(255, 100, 100)); // Red ball
      leftElbowDetected = true;
    }

    if (rightElbow && rightElbow.confidence > 0.3) {
      drawElbowBall(rightElbow, color(100, 100, 255)); // Blue ball
      rightElbowDetected = true;
    }
  }

  // Control sound based on whether any elbows were detected
  if (leftElbowDetected) {
    leftElbowOsc.amp(0.3, 0.1); // Fade in
  } else {
    leftElbowOsc.amp(0, 0.1); // Fade out
  }

  if (rightElbowDetected) {
    rightElbowOsc.amp(0.3, 0.1); // Fade in
  } else {
    rightElbowOsc.amp(0, 0.1); // Fade out
  }
}

// Draw a ball on the elbow position
function drawElbowBall(keypoint, ballColor) {
  // Flip x-coordinate to match the flipped video
  let x = width - keypoint.x;
  let y = keypoint.y;

  // Draw glow effect
  push();
  noStroke();
  for (let i = 3; i > 0; i--) {
    fill(ballColor.levels[0], ballColor.levels[1], ballColor.levels[2], 30);
    ellipse(x, y, 40 * i, 40 * i);
  }

  // Draw main ball
  fill(ballColor);
  stroke(255);
  strokeWeight(3);
  ellipse(x, y, 40, 40);

  // Draw center dot
  fill(255);
  noStroke();
  ellipse(x, y, 10, 10);
  pop();
}

// Mouse click handling removed - using dedicated start button instead
