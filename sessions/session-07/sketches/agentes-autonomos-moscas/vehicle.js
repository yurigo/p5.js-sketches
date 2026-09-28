// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

// The "Vehicle" class

class Vehicle {
  constructor(x, y, c = color(127)) {
    this.position = createVector(x, y);
    this.velocity = createVector(0, 0);
    this.acceleration = createVector(0, 0);
    this.r = 6;
    this.maxspeed = random(4,80);
    this.maxforce = random(.1, .3);
    this.color = c;
  }

  // Method to update location
  update() {
    // Update velocity
    this.velocity.add(this.acceleration);
    // Limit speed
    this.velocity.limit(this.maxspeed);
    this.position.add(this.velocity);
    // Reset accelerationelertion to 0 each cycle
    this.acceleration.mult(0);
  }

  applyForce(force) {
    // We could add mass here if we want A = F / M
    this.acceleration.add(force);
  }

  // A method that calculates a steering force towards a target
  // STEER = DESIRED MINUS VELOCITY
  seek(target) {
    let desired = p5.Vector.sub(target, this.position); // A vector pointing from the location to the target

    // Scale to maximum speed
    desired.setMag(this.maxspeed);

    // Steering = Desired minus velocity
    let steer = p5.Vector.sub(desired, this.velocity);
    steer.limit(this.maxforce); // Limit to maximum steering force

    this.applyForce(steer);
  }


  // A method that calculates a steering force towards a target
  // STEER = DESIRED MINUS VELOCITY
  arrive(target) {
    let desired = p5.Vector.sub(target, this.position); // A vector pointing from the location to the target
    let d = desired.mag();
    // Scale with arbitrary damping within 100 pixels
    if (d < 100) {
      let m = map(d, 0, 100, 0, this.maxspeed);
      desired.setMag(m);
    } else {
      desired.setMag(this.maxspeed);
    }

    // Steering = Desired minus Velocity
    let steer = p5.Vector.sub(desired, this.velocity);
    steer.limit(this.maxforce);  // Limit to maximum steering force
    this.applyForce(steer);
  }


  show() {
    //{!1} Vehicle is a triangle pointing in the direction of velocity
    let angle = this.velocity.heading();
    fill(this.color);
    push();
    stroke(0);
    strokeWeight(1);
    
    translate(this.position.x, this.position.y);
    rotate(angle);
    // beginShape();
    // vertex(this.r * 2, 0);
    // vertex(-this.r * 2, -this.r);
    // vertex(-this.r * 2, this.r);
    // endShape(CLOSE);
    circle(0,0,this.r);
    circle(0,this.r, this.r * 1.67);
    circle(0,-this.r, this.r * 1.67);
    
    pop();
  }
}
