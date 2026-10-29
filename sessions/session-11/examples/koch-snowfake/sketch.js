function snowflake(x, y, radius, angle, steps = 1){
  let t = 120;
  let snowflakeSide = function(x1, y1, x2, y2, iteration = 0){
    let x3 = lerp(x1, x2, 1/3);
    let x4 = lerp(x1, x2, 2/3);
    let y3 = lerp(y1, y2, 1/3);
    let y4 = lerp(y1, y2, 2/3);
    let len = dist(x1, y1, x2, y2);
    let theta = atan2(y4 - y3, x4 - x3);
    
    let xm = lerp(x1, x2, 1/2);
    let ym = lerp(y1, y2, 1/2);
    
    let r = sqrt(3) / 6;
    
    let x5 = xm + cos(theta - PI/2) * lerp(0, r * len, constrain(frameCount/t, 0, 1));
    let y5 = ym + sin(theta - PI/2) * lerp(0, r * len, constrain(frameCount/t, 0, 1));
    
    if(iteration > 0){
      snowflakeSide(x1, y1, x3, y3, iteration-1);
      snowflakeSide(x3, y3, x5, y5, iteration-1);
      snowflakeSide(x5, y5, x4, y4, iteration-1);
      snowflakeSide(x4, y4, x2, y2, iteration-1);
    }
    else if (iteration === 0) {
      line(x1, y1, x3, y3);
      line(x3, y3, x5, y5);
      line(x5, y5, x4, y4);
      line(x4, y4, x2, y2);
    }
    else {
      return;
    }
  };
  
  let tx1 = x + cos(angle) * radius;
  let ty1 = y + sin(angle) * radius;
  
  let tx2 = x + cos(TAU/3 + angle) * radius;
  let ty2 = y + sin(TAU/3 + angle) * radius;
  
  let tx3 = x + cos(TAU/3*2 + angle) * radius;
  let ty3 = y + sin(TAU/3*2 + angle) * radius;
  
  snowflakeSide(tx1, ty1, tx2, ty2, steps);
  snowflakeSide(tx2, ty2, tx3, ty3, steps);
  snowflakeSide(tx3, ty3, tx1, ty1, steps);
}

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
  snowflake(width/2, height/2, 200, TAU/12, 6);
}