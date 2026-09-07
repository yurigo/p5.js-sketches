
function setup() {
    createCanvas(900, 600);
    background(3);
    
    x = width / 2;
    y = height / 2;

    noStroke();
    fill('red')
}

let x;
let y;
let d = 200;

let vx = 10;
let vy = 10;

function draw() {
    background('rgba(200,200,200,0.1)')
    //circle(x,y * height /  width ,100);

    //fill('red')
    circle(x,y,d);

    x+=vx;
    y+=vy;

    if (y + d / 2 > height){
        vy *=-1;
        fill('green');
        // d+=10;
    }
    
    if (x + d / 2 > width){
        vx *= -1
        fill('purple');
        // d+=10;
    }
    
    if (y - d / 2 < 0){
        vy *=-1;
        fill('black');
        // d+=10;
        
    }
    
    
    if (x - d / 2 < 0){
        vx *= -1
        fill('yellow');
        // d+=10;
    }
    

}
