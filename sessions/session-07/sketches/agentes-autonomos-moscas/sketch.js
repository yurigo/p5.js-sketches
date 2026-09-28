// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

// Seeking "vehicle" follows the mouse position

// Implements Craig Reynold's autonomous steering behaviors
// One vehicle "seeks"
// See: http://www.red3d.com/cwr/

let vehicles = [];

let RED;
let ORANGE;
let YELLOW;
let GREEN;
let BLUE;
let PURPLE;
let VIOLET;

const MAX_VEHICLES = 5_000;


function setup() {
    
    const viewportHeight = windowHeight;
    const viewportWidth = windowWidth;
    
    RED = color(255,0,0);
    ORANGE = color(255,127,0);
    YELLOW = color(255,255,0);
    GREEN = color(0,255,0);
    BLUE = color(0,0,255);
    PURPLE = color(75,0,130);
    VIOLET = color(148,0,211);

  createCanvas(viewportWidth, viewportHeight);

  for (let i = 0; i < 1 ; i++){
    vehicles.push(new Vehicle(random(0,width), random(0,height)));
  }
  

  
}

function draw() {
  background(255,255,255,4);

  let mouse = createVector(mouseX, mouseY);

  // Draw an ellipse at the mouse position
  fill(127);
  stroke(0);
  strokeWeight(2);
  // circle(mouse.x, mouse.y, 48);
  textSize(100);
  rectMode(CENTER);
  text('💩', mouse.x, mouse.y,  140, 140)

  
  
  vehicles.forEach(vehicle => {
    
    // Call the appropriate steering behaviors for our agents
    vehicle.seek(mouse);
    // vehicle.arrive(mouse);
    vehicle.update();
    vehicle.show();    
  })

  if (mouseIsPressed){
    createANewVehicleAt(mouseX,mouseY);
  }

}


function keyPressed() {

    let c = color(170);

    switch(key){
        case '1': c = RED; break;
        case '2': c = ORANGE; break;
        case '3': c = YELLOW; break;
        case '4': c = GREEN; break;
        case '5': c = BLUE; break;
        case '6': c = PURPLE; break;
        case '7': c = VIOLET; break;
    }

    if (vehicles.length >= MAX_VEHICLES) vehicles.shift();

    vehicles.push(new Vehicle(random(0,width), random(0,height), c));
}

// function mousePressed(){
//     createANewVehicleAt(mouseX, mouseY);
// }

function createANewVehicleAt(x,y){
    let c = color(170);
    let rand = random(1,8);

    switch(Math.floor(rand)){
        case 1: c = RED; break;
        case 2: c = ORANGE; break;
        case 3: c = YELLOW; break;
        case 4: c = GREEN; break;
        case 5: c = BLUE; break;
        case 6: c = PURPLE; break;
        case 7: c = VIOLET; break;
    }

    if (vehicles.length >= MAX_VEHICLES) vehicles.shift();

    vehicles.push(new Vehicle(x, y, c));
}