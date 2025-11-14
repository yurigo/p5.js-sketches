function setup() {
  const s = min(windowWidth, windowHeight) * 0.9;
  canvas = createCanvas(s, s);
  // Centrar el canvas manualmente
  const x = (windowWidth - s) / 2;
  const y = (windowHeight - s) / 2;
  canvas.position(x, y);
  textFont("monospace");
  createColorButtons();
  // Iniciar juego directamente
  startGame();
}
/**
 * Inicia o reinicia el juego
 */
function startGame() {
  gameState = "PLAYING";
  score = 0;
  balls = [];
  pathProgress = 0;

  // Crear bolas infinitas para llenar toda la pantalla y más allá
  const screenLength = height + 200; // Pantalla completa + extra por arriba
  const numBalls = ceil(screenLength / ballSpacing); // Calcular cuántas caben

  for (let i = 0; i < numBalls; i++) {
    balls.push({
      colorIndex: floor(random(COLOR_CONFIG.length)),
      distanceFromFront: i * ballSpacing,
    });
  }

  // Colocar el frente tras unas pocas bolas para que varias sean visibles
  pathProgress = ballSpacing * 6; // muestra ~6 bolas al inicio

  // Mostrar botones
  showButtons();
}

function windowResized() {
  const s = min(windowWidth, windowHeight) * 0.9;
  resizeCanvas(s, s);

  // Recentrar el canvas
  const x = (windowWidth - s) / 2;
  const y = (windowHeight - s) / 2;
  canvas.position(x, y);

  // Reposicionar los botones
  repositionButtons();

  redraw();
}

/**
 * Juego base: bolas de 3 colores que caen
 * y se "disparan" con 3 botones.
 *
 * La idea es que más adelante el input (botones)
 * se pueda cambiar por micrófono, cámara, etc.
 */

const COLOR_CONFIG = [
  { name: "ROJO", fill: "#e74c3c" },
  { name: "VERDE", fill: "#2ecc71" },
  { name: "AZUL", fill: "#3498db" },
];

let balls = []; // Array de bolas en orden (la primera es la que va adelante)

let score = 0;

let buttonHeight = 40;
let buttonMargin = 10;

let buttons = [];
let canvas; // Referencia al canvas para reposicionarlo

// Estados del juego
let gameState = "PLAYING"; // Zen mode: siempre jugando

// Parámetros del camino
let ballRadius = 20;
let ballSpacing = ballRadius * 2; // Espaciado deseado equivalente al diámetro
let pathProgress = 0; // Progreso del camino
// Velocidad variable continua (sin zonas discretas)
let pathSpeed = 0.5; // valor actual calculado cada frame
const SPEED_FAST = 1.4; // velocidad máxima (parte superior)
const SPEED_SLOW = 0.25; // velocidad mínima (parte inferior)
// Curvatura controla cuán rápido cae la velocidad (1 = lineal, >1 más acelerada, <1 más suave)
const SPEED_CURVE = 1.6;

function smoothstep(edge0, edge1, x) {
  const t = constrain((x - edge0) / (edge1 - edge0), 0, 1);
  return t * t * (3 - 2 * t);
}

function computePathSpeed(frontY) {
  // Normalizar 0 (arriba) .. 1 (abajo)
  let p = constrain(frontY / height, 0, 1);
  // Aplicar curva (potencia) para moldear la desaceleración
  p = pow(p, SPEED_CURVE);
  // Aplicar suavizado extra para evitar cambios bruscos cerca del top/bottom
  const eased = smoothstep(0, 1, p);
  // Interpolar inversamente (arriba rápido, abajo lento)
  return lerp(SPEED_FAST, SPEED_SLOW, eased);
}

/**
 * Calcula la posición (x, y) en el camino según la distancia recorrida
 */
function getPathPosition(distance) {
  const t = distance / 100; // Escala para el camino
  // Amplitud reducida para evitar grandes saltos laterales que deforman el espaciado
  const amplitude = width * 0.06; // antes 0.3
  const x = width / 2 + sin(t * 2) * amplitude;
  const y = distance;
  return { x, y };
}

/**
 * Distancia directa entre dos puntos del camino
 */
function getPathDistance(dist1, dist2) {
  const pos1 = getPathPosition(dist1);
  const pos2 = getPathPosition(dist2);
  return dist(pos1.x, pos1.y, pos2.x, pos2.y);
}

/**
 * Encuentra la siguiente distancia de centro manteniendo las bolas pegadas
 */
function findNextDistance(previousDistance) {
  return previousDistance + ballSpacing;
}

/**
 * Muestra la pantalla de inicio
 */
function drawStartScreen() {
  fill(255);
  textAlign(CENTER, CENTER);

  textSize(50);
  text("BALL ATTACK", width / 2, height / 2 - 100);

  textSize(20);
  text("Dispara a la primera bola", width / 2, height / 2 - 20);
  text("del color correcto", width / 2, height / 2 + 10);

  // Instrucciones para empezar
  textSize(30);
  fill(100, 200, 100);
  text("Presiona 1, 2 o 3 para JUGAR", width / 2, height / 2 + 90);

  // Instrucciones
  textSize(14);
  fill(200);
  text("Usa los botones o teclas para disparar", width / 2, height - 80);

  // Mostrar colores con teclas
  const colorY = height - 40;
  const colorSpacing = 80;
  const startX = width / 2 - colorSpacing;

  for (let i = 0; i < COLOR_CONFIG.length; i++) {
    fill(COLOR_CONFIG[i].fill);
    circle(startX + i * colorSpacing, colorY, 30);
    fill(255);
    textSize(12);
    text(
      `${i + 1} - ${COLOR_CONFIG[i].name}`,
      startX + i * colorSpacing,
      colorY + 25
    );
  }
}

/**
 * Crea los 3 botones (uno por color).
 * Más adelante se puede sustituir esto por otros inputs.
 */
function createColorButtons() {
  const totalWidth = width;
  const buttonWidth =
    (totalWidth - (COLOR_CONFIG.length + 1) * buttonMargin) /
    COLOR_CONFIG.length;
  const canvasX = (windowWidth - width) / 2;
  const canvasY = (windowHeight - height) / 2;
  const y = canvasY + height - buttonHeight - buttonMargin / 2;

  for (let i = 0; i < COLOR_CONFIG.length; i++) {
    const cfg = COLOR_CONFIG[i];
    const x = canvasX + buttonMargin + i * (buttonWidth + buttonMargin);

    const btn = createButton(cfg.name);
    btn.position(x, y);
    btn.size(buttonWidth, buttonHeight);
    btn.style("font-family", "monospace");
    btn.style("font-weight", "bold");
    btn.style("border", "none");
    btn.style("cursor", "pointer");
    btn.style("background", cfg.fill);
    btn.style("color", "white");
    btn.style("font-size", "16px");

    // IMPORTANTE: aquí conectamos el botón con la lógica del juego
    btn.mousePressed(() => {
      shootWithColor(i);
    });

    buttons.push(btn);
  }
}

/**
 * Reposiciona los botones cuando cambia el tamaño de la ventana
 */
function repositionButtons() {
  const totalWidth = width;
  const buttonWidth =
    (totalWidth - (COLOR_CONFIG.length + 1) * buttonMargin) /
    COLOR_CONFIG.length;
  const canvasX = (windowWidth - width) / 2;
  const canvasY = (windowHeight - height) / 2;
  const y = canvasY + height - buttonHeight - buttonMargin / 2;

  for (let i = 0; i < buttons.length; i++) {
    const x = canvasX + buttonMargin + i * (buttonWidth + buttonMargin);
    buttons[i].position(x, y);
    buttons[i].size(buttonWidth, buttonHeight);
  }
}

/**
 * Oculta los botones de color
 */
function hideButtons() {
  for (let btn of buttons) {
    btn.hide();
  }
}

/**
 * Muestra los botones de color
 */
function showButtons() {
  for (let btn of buttons) {
    btn.show();
  }
}

function mousePressed() {
  // Modo GAMEOVER reinicia vía teclado (R), no usamos click
}

function draw() {
  background(10);

  // Si ya estamos en GAMEOVER mostrar mensaje y salir
  if (gameState === "GAMEOVER") {
    drawGameOver();
    return;
  }

  drawHud();

  // Calcular velocidad y verificar condición de derrota
  if (balls.length > 0) {
    const frontY = pathProgress - balls[0].distanceFromFront; // y de la cabeza
    if (frontY >= height - ballRadius * 1.2) {
      gameState = "GAMEOVER";
      hideButtons();
      drawGameOver();
      return;
    }
    pathSpeed = computePathSpeed(frontY);
  }

  pathProgress += pathSpeed;
  updateAndDrawBalls();
  checkBallsAtEnd();
}

/**
 * Dibuja puntuación, vidas, etc.
 */
function drawHud() {
  noStroke();
  fill(255);
  textSize(20);
  textAlign(LEFT, TOP);
  text(`Puntuación: ${score}`, 20, 20);

  textAlign(RIGHT, TOP);
  textSize(12);
  if (balls.length > 0) {
    const frontColor = COLOR_CONFIG[balls[0].colorIndex].name;
    text(`¡Dispara al ${frontColor}!`, width - 20, 20);
  }
}

/**
 * Dibuja mensaje de GAME OVER.
 */
function drawGameOver() {
  fill(255, 60, 60);
  textAlign(CENTER, CENTER);
  textSize(50);
  text("GAME OVER", width / 2, height / 2 - 60);

  textSize(25);
  fill(255);
  text(`Puntuación final: ${score}`, width / 2, height / 2);

  // Botón de reinicio
  textSize(18);
  fill(200);
  text("Pulsa R para reiniciar", width / 2, height / 2 + 70);
}

/**
 * Añade una nueva bola al final de la serpiente
 * Ajusta el espaciado para mantener distancia constante considerando la curvatura
 */
function addNewBall() {
  const lastBall = balls[balls.length - 1];

  if (!lastBall) {
    // Primera bola
    balls.push({
      colorIndex: floor(random(COLOR_CONFIG.length)),
      distanceFromFront: 0,
    });
    return;
  }

  balls.push({
    colorIndex: floor(random(COLOR_CONFIG.length)),
    distanceFromFront: findNextDistance(lastBall.distanceFromFront),
  });
}

/**
 * Actualiza y dibuja todas las bolas siguiendo el camino
 * Las dibuja en orden inverso para que la primera quede encima
 */
function updateAndDrawBalls() {
  // Dibujar de atrás hacia adelante para que la primera quede encima
  for (let i = balls.length - 1; i >= 0; i--) {
    const ball = balls[i];

    // Calcular posición en el camino
    const distance = pathProgress - ball.distanceFromFront;
    const pos = getPathPosition(distance);

    // La primera bola es más grande
    const currentRadius = i === 0 ? ballRadius * 1.5 : ballRadius;

    // Dibujar la bola
    noStroke();
    fill(COLOR_CONFIG[ball.colorIndex].fill);
    circle(pos.x, pos.y, currentRadius * 2);

    // Dibujar un pequeño indicador en la primera bola
    if (i === 0) {
      stroke(255, 200);
      strokeWeight(3);
      noFill();
      circle(pos.x, pos.y, currentRadius * 2 + 5);
    }
  }
}

/**
 * Comprueba si la primera bola llegó al final y la recicla (juego infinito)
 */
function checkBallsAtEnd() {
  if (balls.length === 0) return;

  const frontBall = balls[0];
  const distance = pathProgress - frontBall.distanceFromFront;

  if (distance > height + ballRadius * 2) {
    // La primera bola llegó al final: reciclarla al final de la serpiente
    const removedBall = balls.shift();

    // Añadirla al final usando el algoritmo de espaciado
    const lastBall = balls[balls.length - 1];
    if (!lastBall) return;

    removedBall.distanceFromFront = findNextDistance(
      lastBall.distanceFromFront
    );
    removedBall.colorIndex = floor(random(COLOR_CONFIG.length));

    balls.push(removedBall);
  }
}

/**
 * Lógica de disparo con un color concreto.
 *  - colorIndex: 0 = rojo, 1 = verde, 2 = azul
 */
function shootWithColor(colorIndex) {
  if (balls.length === 0) return;

  const frontBall = balls[0];
  const lastBall = balls[balls.length - 1];

  if (frontBall.colorIndex === colorIndex) {
    // Acierto: eliminar frente y sumar
    balls.shift();
    score += 5;
  } else {
    // Fallo zen: leve penalización
    score = max(0, score - 1);
  }

  // Añadir una nueva bola al final para mantener longitud
  const newBall = {
    colorIndex: floor(random(COLOR_CONFIG.length)),
    distanceFromFront: lastBall
      ? findNextDistance(lastBall.distanceFromFront)
      : 0,
  };
  balls.push(newBall);
}

/**
 * EXTRA: también se puede jugar con el teclado.
 * 1 = ROJO, 2 = VERDE, 3 = AZUL
 */
function keyPressed() {
  if (gameState === "GAMEOVER" && (key === "r" || key === "R")) {
    showButtons();
    startGame();
    return;
  }
  if (gameState !== "PLAYING") return;
  if (key === "1") shootWithColor(0);
  if (key === "2") shootWithColor(1);
  if (key === "3") shootWithColor(2);
}
