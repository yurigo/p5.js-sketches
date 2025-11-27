// Conway's Game of Life with creative variations
// Creative variation: Cell aging with color gradients and interactive controls

let grid;
let cols, rows;
let resolution = 10; // Size of each cell in pixels
let paused = false;
let speed = 5; // Frames per generation (lower = faster)
let frameCounter = 0;
let generation = 0;
let colorPalette = 0; // Current color palette index
let showAge = true; // Whether to show cell age colors

// Color palettes for cell aging
const palettes = [
  { name: "Rainbow", colors: [[255, 0, 0], [255, 127, 0], [255, 255, 0], [0, 255, 0], [0, 0, 255], [75, 0, 130], [148, 0, 211]] },
  { name: "Ocean", colors: [[0, 20, 40], [0, 50, 100], [0, 100, 150], [0, 150, 200], [50, 200, 255]] },
  { name: "Fire", colors: [[20, 0, 0], [80, 0, 0], [150, 20, 0], [255, 100, 0], [255, 200, 0], [255, 255, 100]] },
  { name: "Forest", colors: [[10, 20, 10], [20, 50, 20], [40, 100, 40], [60, 150, 60], [100, 200, 100]] },
  { name: "Monochrome", colors: [[20, 20, 20], [60, 60, 60], [100, 100, 100], [150, 150, 150], [200, 200, 200], [255, 255, 255]] }
];

function setup() {
  const s = min(windowWidth, windowHeight) * 0.9;
  createCanvas(s, s);
  
  cols = floor(width / resolution);
  rows = floor(height / resolution);
  
  // Initialize grid with Cell objects
  grid = make2DArray(cols, rows);
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      grid[i][j] = new Cell();
    }
  }
  
  // Start with random pattern
  randomizeGrid();
}

function windowResized() {
  const s = min(windowWidth, windowHeight) * 0.9;
  resizeCanvas(s, s);
  
  // Recalculate grid dimensions
  cols = floor(width / resolution);
  rows = floor(height / resolution);
  
  // Reinitialize grid
  grid = make2DArray(cols, rows);
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      grid[i][j] = new Cell();
    }
  }
  randomizeGrid();
  redraw();
}

function draw() {
  background(10, 10, 25);
  
  // Draw the grid
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      let x = i * resolution;
      let y = j * resolution;
      
      if (grid[i][j].alive) {
        // Get color based on cell age
        let cellColor = getCellColor(grid[i][j].age);
        fill(cellColor[0], cellColor[1], cellColor[2]);
        stroke(0);
        strokeWeight(1);
        rect(x, y, resolution - 1, resolution - 1);
      }
    }
  }
  
  // Update generation if not paused
  if (!paused) {
    frameCounter++;
    if (frameCounter >= speed) {
      frameCounter = 0;
      nextGeneration();
    }
  }
  
  // Display info
  displayInfo();
}

// Calculate next generation using Conway's rules
function nextGeneration() {
  let next = make2DArray(cols, rows);
  
  // Create next generation
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      next[i][j] = new Cell();
      let neighbors = countNeighbors(grid, i, j);
      let state = grid[i][j].alive;
      
      // Conway's Rules:
      // 1. Any live cell with 2-3 neighbors survives
      // 2. Any dead cell with exactly 3 neighbors becomes alive
      // 3. All other cells die or stay dead
      
      if (state && (neighbors === 2 || neighbors === 3)) {
        next[i][j].alive = true;
        next[i][j].age = grid[i][j].age + 1; // Age increases
      } else if (!state && neighbors === 3) {
        next[i][j].alive = true;
        next[i][j].age = 0; // New cell
      } else {
        next[i][j].alive = false;
        next[i][j].age = 0;
      }
    }
  }
  
  grid = next;
  generation++;
}

// Count alive neighbors (8-neighbor Moore neighborhood)
function countNeighbors(grid, x, y) {
  let sum = 0;
  for (let i = -1; i <= 1; i++) {
    for (let j = -1; j <= 1; j++) {
      // Wrap around edges (toroidal topology)
      let col = (x + i + cols) % cols;
      let row = (y + j + rows) % rows;
      sum += grid[col][row].alive ? 1 : 0;
    }
  }
  // Subtract the cell itself
  sum -= grid[x][y].alive ? 1 : 0;
  return sum;
}

// Get color for a cell based on its age
function getCellColor(age) {
  if (!showAge) {
    return [255, 255, 255]; // White if not showing age
  }
  
  let palette = palettes[colorPalette].colors;
  let maxAge = palette.length - 1;
  let colorIndex = min(age, maxAge);
  return palette[colorIndex];
}

// Cell class to track state and age
class Cell {
  constructor() {
    this.alive = false;
    this.age = 0;
  }
}

// Helper function to create 2D array
function make2DArray(cols, rows) {
  let arr = new Array(cols);
  for (let i = 0; i < arr.length; i++) {
    arr[i] = new Array(rows);
  }
  return arr;
}

// Randomize the grid
function randomizeGrid() {
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      grid[i][j].alive = random(1) < 0.3; // 30% chance of being alive
      grid[i][j].age = 0;
    }
  }
  generation = 0;
}

// Clear the grid
function clearGrid() {
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      grid[i][j].alive = false;
      grid[i][j].age = 0;
    }
  }
  generation = 0;
}

// Display information
function displayInfo() {
  fill(255, 200);
  noStroke();
  textAlign(LEFT);
  textSize(12);
  
  let infoY = 20;
  text(`Generation: ${generation}`, 60, infoY);
  text(`Speed: ${11 - speed}`, 60, infoY + 15);
  text(`Palette: ${palettes[colorPalette].name}`, 60, infoY + 30);
  text(`State: ${paused ? 'PAUSED' : 'RUNNING'}`, 60, infoY + 45);
  
  // Controls info at bottom
  textAlign(CENTER);
  textSize(11);
  fill(255, 220, 0, 200);
  let bottomY = height - 10;
  text(
    `SPACE: Pause | R: Random | C: Clear | Click: Draw | +/-: Speed | P: Palette | A: Age Colors`,
    width / 2,
    bottomY
  );
}

// Mouse interaction - draw cells
function mousePressed() {
  toggleCell(mouseX, mouseY);
}

function mouseDragged() {
  toggleCell(mouseX, mouseY);
}

function toggleCell(x, y) {
  let i = floor(x / resolution);
  let j = floor(y / resolution);
  
  if (i >= 0 && i < cols && j >= 0 && j < rows) {
    grid[i][j].alive = true;
    grid[i][j].age = 0;
  }
}

// Keyboard controls
function keyPressed() {
  if (key === ' ') {
    // Spacebar: pause/unpause
    paused = !paused;
  } else if (key === 'r' || key === 'R') {
    // R: randomize
    randomizeGrid();
  } else if (key === 'c' || key === 'C') {
    // C: clear
    clearGrid();
  } else if (key === '+' || key === '=') {
    // +: increase speed
    speed = max(1, speed - 1);
  } else if (key === '-' || key === '_') {
    // -: decrease speed
    speed = min(10, speed + 1);
  } else if (key === 'p' || key === 'P') {
    // P: change palette
    colorPalette = (colorPalette + 1) % palettes.length;
  } else if (key === 'a' || key === 'A') {
    // A: toggle age colors
    showAge = !showAge;
  } else if (key === 'n' || key === 'N') {
    // N: next generation (manual step)
    if (paused) {
      nextGeneration();
    }
  }
}

// Common patterns (optional presets)
function glider() {
  clearGrid();
  let startX = floor(cols / 4);
  let startY = floor(rows / 4);
  
  grid[startX][startY + 1].alive = true;
  grid[startX + 1][startY + 2].alive = true;
  grid[startX + 2][startY].alive = true;
  grid[startX + 2][startY + 1].alive = true;
  grid[startX + 2][startY + 2].alive = true;
}
