const pixelSize = 19;

// . = vacío
// B = negro
// Y = amarillo
// O = naranja
// P = piel

const pixelArt = [
  ".......................",
  ".......................",
  ".........B..B..........",
  "......BB.BB.B..........",
  ".......BBB.............",
  ".........B..B..........",
  "........YYYYY..YYY.....",
  ".......YYYYYYYYYYYB....",
  "......YYYYYYYYYY.YOB...",
  ".....YYYYOYYYYYY.YO....",
  "....YYYYOOYYYY..PPO....",
  "...YYYYOO.YY..PPPPPO...",
  "....YYY..Y...PPPPPPP....",
  "...YYYY..Y..PPPPPPPP....",
  "..YYYYYOO...PPPPPPPP...",
  "..YYYYYYO...PPPPPPPP...",
  "...YYYYYYOOO.PPPPPPP...",
  "....YYYYOOOOOPPPPPP.....",
  "...OOOYYYYYYOPPPPP......",
  "..OO.OYYYYYYO.PPP.......",
  "..OO..YYYYYYY..PP.......",
  "...O...YYYYYY..P.........",
  "........YYYY....P.......",
  ".........OO....PP.......",
  ".........PPPPPP..........",
  ".......................",
  "......................."
];

function setup() {
  createCanvas(23 * pixelSize, 27 * pixelSize);
  noStroke();
}

function draw() {
  background(255);

  for (let fila = 0; fila < pixelArt.length; fila++) {

    for (let columna = 0; columna < pixelArt[fila].length; columna++) {

      let pixel = pixelArt[fila][columna];

      // Elegimos el color
      if (pixel === "B") {
        fill(0);
      } 
      else if (pixel === "Y") {
        fill(255, 255, 0);
      } 
      else if (pixel === "O") {
        fill(255, 190, 0);
      } 
      else if (pixel === "P") {
        fill(255, 230, 215);
      } 
      else {
        continue;
      }

      // Dibujamos cada píxel como un cuadrado
      square(
        columna * pixelSize,
        fila * pixelSize,
        pixelSize
      );
    }
  }
}
