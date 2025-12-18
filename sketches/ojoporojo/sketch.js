// Matriz de ojos en p5.js
let eyes = [];
// Separar tamaño del ojo y padding entre ojos
// `PADDING` es el espacio EXTRA entre ojos (puedes poner 0 para que no haya separación)
const PADDING = 10; // espacio adicional entre ojos (0 = ojos pegados)
// tamaño (diámetro) del ojo
const EYE_SIZE = 80; // diámetro del ojo (ajusta este valor sin tocar PADDING si quieres)
let bgColor = 220; // color de fondo usado para los párpados

// --- Configurables para el brillo (ajústalas aquí sin tocar la lógica) ---
// Proporción del tamaño del brillo respecto a la pupila
const SHINE_SIZE = 3.6;
// Alfa (opacidad) del brillo en rango 0-255
const SHINE_ALPHA = 100;
// factor base de offset desde el centro del iris (multiplicado por this.pupilRadius)
const SHINE_BASE = 0.35;
// Rotación del brillo en grados (puedes ajustar negativo/positivo para rotarlo)
const SHINE_ROTATION_DEG = -150;

function setup() {
  // usar todo el viewport
  createCanvas(windowWidth, windowHeight);
  ellipseMode(CENTER);
  noStroke();
  // crear la malla para el tamaño actual
  rebuildEyes();
}

// reconstruir la grilla de ojos (se usa en setup y windowResized)
function rebuildEyes() {
  eyes = [];
  // usar ceil para asegurarnos de cubrir todo el viewport
  // el tamaño de la celda es el ojo más el padding entre ojos
  let cell = EYE_SIZE + PADDING;
  let cols = ceil(width / cell);
  let rows = ceil(height / cell);
  let startX = cell / 2;
  let startY = cell / 2;

  for (let j = 0; j < rows; j++) {
    for (let i = 0; i < cols; i++) {
      let x = startX + i * cell;
      let y = startY + j * cell;
      let size = EYE_SIZE;
      eyes.push(new Eye(x, y, size));
    }
  }
}

function windowResized() {
  // ajustar canvas y regenerar la grilla para llenar el viewport
  resizeCanvas(windowWidth, windowHeight);
  rebuildEyes();
}

function draw() {
  background(bgColor);

  // actualizar y dibujar todos los ojos
  for (let e of eyes) {
    e.update();
    e.draw();
  }
}

// Clase Eye: dibuja un ojo que sigue al mouse y parpadea
class Eye {
  constructor(x, y, size) {
    this.x = x;
    this.y = y;
    this.size = size;

    // tamaños relativos
    this.eyeRadius = this.size / 2;
    // ajustar iris/pupila: tamaño moderado para que no se vea sobredimensionado
    this.irisRadius = this.eyeRadius * 0.55; // ocupa buena parte del ojo pero deja margen
    this.pupilRadius = this.irisRadius * 0.45; // pupila proporcional

    // cuanto puede desplazarse el iris desde el centro (casi hasta el borde)
    // definir el squash mínimo que usamos al dibujar (para calcular reach visual)
    this.squashMin = 0.55;
    // usar el offset máximo calculado para que, incluso con squash, el iris alcance la esclerótica
    this.maxIrisOffset = max(
      0,
      this.eyeRadius - this.irisRadius * this.squashMin - 1
    );

    // color de iris — guardamos un hue (HSB) para variación
    this.hue = map(this.x, 0, width, 180, 320) + random(-10, 10);

    // parpadeo
    this.isBlinking = false;
    this.blinkStart = 0;
    this.blinkDuration = 200; // ms
    this.nextBlinkAt = millis() + random(1000, 5000);
    this.closed = 0; // 0 = abierto, 1 = cerrado
  }

  update() {
    // gestionar parpadeo
    let now = millis();
    if (!this.isBlinking && now > this.nextBlinkAt) {
      this.isBlinking = true;
      this.blinkStart = now;
      this.blinkDuration = random(150, 350);
    }
    if (this.isBlinking) {
      let t = (now - this.blinkStart) / this.blinkDuration;
      if (t >= 1) {
        // fin del parpadeo
        this.isBlinking = false;
        this.closed = 0;
        this.nextBlinkAt = now + random(2000, 7000);
      } else {
        // forma triangular: sube y baja para simular cerrar y abrir
        if (t <= 0.5) this.closed = map(t, 0, 0.5, 0, 1);
        else this.closed = map(t, 0.5, 1, 1, 0);
      }
    }
  }

  draw() {
    push();
    translate(this.x, this.y);

    // borde del ojo
    stroke(30);
    strokeWeight(2);
    fill(255);
    ellipse(0, 0, this.size, this.size);
    noStroke();

    // calcular posición del iris mirando hacia el mouse
    let dx = mouseX - this.x;
    let dy = mouseY - this.y;
    let ang = atan2(dy, dx);
    let distToMouse = sqrt(dx * dx + dy * dy);
    // limitar desplazamiento del iris
    let offset = min(this.maxIrisOffset, distToMouse);
    // usar todo el offset para que el iris llegue realmente al borde
    let irisX = cos(ang) * offset;
    let irisY = sin(ang) * offset;

    // iris + pupila: aplicar aplanamiento (squash) cuando el iris está en el borde
    colorMode(HSB, 360, 100, 100);
    // squash: 1 = círculo, <1 = aplanado en la dirección del movimiento
    let squash = 1;
    if (this.maxIrisOffset > 0) {
      // mapear el squash de 1 (centro) a squashMin (casi borde) para un aplanado más sutil
      squash = map(offset, 0, this.maxIrisOffset, 1, this.squashMin);
      squash = constrain(squash, this.squashMin, 1);
    }

    // dibujar iris y pupila como círculos transformados: translate a la posición del iris,
    // rotar hacia el mouse y escalar en el eje x para aplanar en la dirección del movimiento.
    push();
    translate(irisX, irisY);
    rotate(ang);
    scale(squash, 1);

    // iris
    fill(this.hue % 360, 70, 60);
    ellipse(0, 0, this.irisRadius * 2, this.irisRadius * 2);

    // pupila (centrada)
    fill(0);
    ellipse(0, 0, this.pupilRadius * 2, this.pupilRadius * 2);

    pop();

    // restaurar colorMode
    colorMode(RGB);
    noStroke();

    // brillo estático (no sigue al iris) — posición fija relativa al centro del ojo
    // mantenemos tamaño y alpha actuales (SHINE_SIZE, SHINE_ALPHA)
    if (this.closed < 0.5) {
      // tamaño relativo a la pupila (como antes)
      let shineSize = this.pupilRadius * SHINE_SIZE;
      // posición: más a la izquierda del iris y un poco hacia arriba
      // usamos valores negativos en X para colocarlo a la izquierda
      let sx = -this.irisRadius * 0.9; // mover bastante a la izquierda
      let sy = -this.irisRadius * 0.5; // subir un poco
      // squashear: reducir el ancho relativo al alto para que parezca aplastado lateralmente
      let shineWidth = shineSize * 0.5; // ancho reducido (50%)
      let shineHeight = shineSize; // altura completa
      fill(255, 255, 255, SHINE_ALPHA);
      // rotar el brillo squasheado para alinearlo en diagonal
      push();
      translate(sx, sy);
      rotate(radians(SHINE_ROTATION_DEG));
      ellipse(0, 0, shineWidth, shineHeight);
      pop();
    }

    // dibujar párpados como elipses suaves que cubren el interior del ojo según this.closed
    if (this.closed > 0) {
      let cover = this.closed * this.size; // altura aproximada a cubrir
      fill(bgColor); // usar el mismo color que el background
      noStroke();
      // parte superior: una elipse situada hacia arriba que cubre suavemente
      ellipse(0, -this.eyeRadius + cover / 2, this.size * 1.02, cover * 1.3);
      // parte inferior
      ellipse(0, this.eyeRadius - cover / 2, this.size * 1.02, cover * 1.3);
    }

    pop();
  }
}
