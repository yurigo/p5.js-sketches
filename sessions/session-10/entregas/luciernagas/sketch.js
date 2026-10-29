// CONFIGURACIÓN, ASIGNAMOS LAS CONSTANTES Y VARIABLES

const NUM_FIREFLIES = 50;
const NUM_MOTHS = 42;
const NUM_FOG = 22;

const MAX_PARTICLES = 600;

let agents = [];
let particles = [];

let wind;
let soundStarted = false;
let muted = false;

let fireflyNotes = [
  146.83,
  174.61,
  196.00,
  220.00,
  261.63,
  293.66,
  329.63
];


// SETUP, SIRVE PARA INICIALIZAR EL SISTEMA, SI SE PULSA R SE REINICIA  

function setup() {

  createCanvas(windowWidth, windowHeight);

  colorMode(HSB, 360, 100, 100, 1);

  wind = createVector(0, 0);

  resetSystem();
}


// REINICIAR SISTEMA, CREA LOS AGENTES Y RESETEA VARIABLES, SE CREAN EL NUMERO DE CONSTANTES ASIGNADAS

function resetSystem() {

  agents = [];
  particles = [];

  wind.set(0, 0);

  // LUCIERNAGAS
  for (let i = 0; i < NUM_FIREFLIES; i++) {
    agents.push(
      new Firefly(
        random(width),
        random(height)
      )
    );
  }

  // POLILLAS
  for (let i = 0; i < NUM_MOTHS; i++) {
    agents.push(
      new Moth(
        random(width),
        random(height)
      )
    );
  }

  // NIEBLA
  for (let i = 0; i < NUM_FOG; i++) {
    agents.push(
      new Fog(
        random(width),
        random(height)
      )
    );
  }
}


// DRAW, SE EJECUTA CADA FRAME, ACTUALIZA Y DIBUJA LOS AGENTES, PARTICULAS Y EFECTOS

function draw() {

  // Fondo con transparencia para crear rastros
  noStroke();

  fill(235, 70, 5, 0.12);

  rect(0, 0, width, height);


  // Separar agentes por familia

  let fireflies = agents.filter(
    a => a.type === "firefly"
  );

  let moths = agents.filter(
    a => a.type === "moth"
  );

  let fogs = agents.filter(
    a => a.type === "fog"
  );


  // VIENTO DEL RATÓN, SE CALCULA LA DIFERENCIA DE POSICIÓN DEL RATÓN ENTRE FRAMES PARA APLICAR UNA FUERZA A LOS AGENTES
  let mouseMovementX = mouseX - pmouseX;
  let mouseMovementY = mouseY - pmouseY;

  if (
    abs(mouseMovementX) +
    abs(mouseMovementY) > 0.5
  ) {

    for (let agent of agents) {

      let d = dist(
        mouseX,
        mouseY,
        agent.pos.x,
        agent.pos.y
      );

      if (d < 180) {

        let strength =
          (1 - d / 180) * 0.01;

        agent.acc.x += mouseMovementX * strength;
        agent.acc.y += mouseMovementY * strength;
      }
    }
  }


  // ACTUALIZAR AGENTES, SE ACTUALIZA LA POSICIÓN DE CADA AGENTE, SE APLICA EL MOVIMIENTO AUTÓNOMO Y SE APLICA EL VIENTO
  for (let f of fireflies) {
    f.update();
  }

  for (let m of moths) {
    m.update(fireflies);
  }

  for (let g of fogs) {
    g.update();
  }


  // RELACIONES, SE APLICA LA SINCRONIZACIÓN ENTRE LUCIÉRNAGAS Y SE VERIFICA SI LA NIEBLA TOCA A LAS LUCIÉRNAGAS
  synchronizeFireflies(fireflies);

  fogTouchesFirefly(
    fogs,
    fireflies
  );


  // INTERACCIÓN DEL RATÓN, SI SE MANTIENE PRESIONADO EL RATÓN, LAS POLILLAS SE DIRIGEN HACIA EL MISMO
  if (mouseIsPressed) {

    for (let m of moths) {

      let d = dist(
        mouseX,
        mouseY,
        m.pos.x,
        m.pos.y
      );

      if (d < 300) {

        let force = createVector(
          mouseX - m.pos.x,
          mouseY - m.pos.y
        );

        force.setMag(0.04);

        m.acc.add(force);
      }
    }
  }


  // PARTÍCULAS, SE ACTUALIZA CADA PARTÍCULA Y SE ELIMINAN LAS QUE YA NO ESTÁN VIVAS, SE LIMITA LA CANTIDAD DE PARTÍCULAS PARA EVITAR QUE EL SISTEMA SE VUELVA LENTO
  for (
    let i = particles.length - 1;
    i >= 0;
    i--
  ) {

    if (!particles[i].update()) {
      particles.splice(i, 1);
    }
  }


  // LIMITAR CANTIDAD DE PARTÍCULAS, SI HAY MÁS DE MAX_PARTICLES, SE ELIMINAN LAS MÁS ANTIGUAS
  if (particles.length > MAX_PARTICLES) {

    particles.splice(
      0,
      particles.length - MAX_PARTICLES
    );
  }


  // DIBUJAR, SE DIBUJAN LOS AGENTES, PARTICULAS Y EFECTOS EN EL ORDEN CORRECTO PARA QUE SE VEAN BIEN

  // NIEBLA PRIMERO
  for (let g of fogs) {
    g.draw();
  }


  // PARTÍCULAS
  for (let p of particles) {
    p.draw();
  }


  // LUCIÉRNAGAS
  for (let f of fireflies) {
    f.draw();
  }


  // POLILLAS
  for (let m of moths) {
    m.draw();
  }


  // INFO ABAJO DE LA PANTALLA
  drawInfo(
    fireflies.length,
    moths.length,
    fogs.length
  );
}


// CLASE BASE, AGENTE, SE UTILIZA PARA CREAR LOS DIFERENTES TIPOS DE AGENTES (LUCIÉRNAGAS, POLILLAS Y NIEBLA), SE ENCARGA DE MOVERSE DE FORMA AUTÓNOMA Y DE APLICAR EL VIENTO

class Agent {

  constructor(x, y, type) {

    this.pos = createVector(x, y);

    this.vel = p5.Vector.random2D();

    this.acc = createVector(0, 0);

    this.type = type;

    this.noiseOffset = random(1000);
  }


  // MOVIMIENTO AUTÓNOMO, SE UTILIZA LA FUNCIÓN DE RUIDO PARA GENERAR UN MOVIMIENTO SUAVE Y NATURAL
  wander() {

    let angle = noise(
      this.pos.x * 0.003,
      this.pos.y * 0.003,
      frameCount * 0.002 +
      this.noiseOffset
    ) * TWO_PI * 2;

    let force =
      p5.Vector.fromAngle(angle);

    force.mult(0.03);

    this.acc.add(force);
  }


  // MOVIMIENTO, SE APLICA LA ACELERACIÓN A LA VELOCIDAD, SE APLICA LA FRICCIÓN Y SE LIMITA LA VELOCIDAD MÁXIMA, SE ACTUALIZA LA POSICIÓN Y SE RESETEA LA ACELERACIÓN, SI EL AGENTE SALE DE LA PANTALLA, APARECE POR EL OTRO LADO
  move(maxSpeed, friction) {

    this.vel.add(this.acc);

    this.vel.mult(friction);

    this.vel.limit(maxSpeed);

    this.pos.add(this.vel);

    this.acc.mult(0);


    // SI SALE DE LA PANTALLA, APARECE POR EL OTRO LADO
    if (this.pos.x < -20) {
      this.pos.x = width + 20;
    }

    if (this.pos.x > width + 20) {
      this.pos.x = -20;
    }

    if (this.pos.y < -20) {
      this.pos.y = height + 20;
    }

    if (this.pos.y > height + 20) {
      this.pos.y = -20;
    }
  }
}


// LUCIÉRNAGA, SE ENCARGA DE GENERAR EL PULSO DE LUZ, SE SINCRONIZA CON OTRAS LUCIÉRNAGAS CERCANAS Y SE APAGA CUANDO LA NIEBLA LA TOCA

class Firefly extends Agent {

  constructor(x, y) {

    super(x, y, "firefly");

    this.phase = random(TWO_PI);

    this.speed = random(
      0.015,
      0.035
    );

    this.brightness = 0;

    this.disabled = 0;

    this.hue = random(
      45,
      60
    );
  }


  update() {

    this.wander();

    this.move(
      0.8,
      0.98
    );


    // SI LA LUCIÉRNAGA ESTÁ APAGADA, SE REDUCE SU BRILLO Y SE DISMINUYE EL TIEMPO DE DESACTIVACIÓN
    if (this.disabled > 0) {

      this.disabled--;

      this.brightness *= 0.9;

      return;
    }


    // AVANZAR FASE, SI LA FASE LLEGA A 2PI, SE RESETEA Y SE GENERA UN DESTELLO
    this.phase += this.speed;


    if (this.phase > TWO_PI) {

      this.phase -= TWO_PI;

      this.flash();
    }


    this.brightness *= 0.94;
  }


  flash() {

    this.brightness = 1;


    // PARTÍCULA DE DESTELLO, SE CREA UNA PARTÍCULA DE LUZ EN LA POSICIÓN DE LA LUCIÉRNAGA CON EL COLOR DE SU HUE
    particles.push(
      new Particle(
        this.pos.x,
        this.pos.y,
        "light",
        this.hue
      )
    );


    // SONIDO DE DESTELLO, SE REPRODUCE UN SONIDO CUANDO LA LUCIÉRNAGA DESTELLA, LA FRECUENCIA DEL SONIDO DEPENDE DE LA POSICIÓN Y EL COLOR DE LA LUCIÉRNAGA
    playFireflySound(this.pos.y);
  }


  draw() {

    let b = this.brightness;


    if (this.disabled > 0) {

      glow(
        this.pos.x,
        this.pos.y,
        10,
        260,
        20,
        40,
        0.15
      );

      return;
    }


    // AURA, SE CREA UN EFECTO DE LUZ ALREDEDOR DE LA LUCIÉRNAGA CON EL COLOR DE SU HUE Y EL BRILLO DEPENDIENDO DE SU FASE
    glow(
      this.pos.x,
      this.pos.y,
      20 + b * 45,
      this.hue,
      100,
      70,
      0.1 + b * 0.4
    );


    // PUNTO CENTRAL, SE DIBUJA UN CÍRCULO EN EL CENTRO DE LA LUCIÉRNAGA CON EL COLOR DE SU HUE Y EL BRILLO DEPENDIENDO DE SU FASE
    noStroke();

    fill(
      this.hue,
      70,
      100,
      0.8
    );

    circle(
      this.pos.x,
      this.pos.y,
      3 + b * 5
    );
  }
}


// POLILLA, SE ENCARGA DE BUSCAR LUCIÉRNAGAS CERCANAS Y SE ALEJA DE ELLAS SI ESTÁN MUY CERCA, SE MUEVE DE FORMA AUTÓNOMA Y SE APLICA EL VIENTO

class Moth extends Agent {

  constructor(x, y) {

    super(x, y, "moth");

    this.wing = random(TWO_PI);

    this.dazzled = 0;
  }


  update(fireflies) {

    let closest = null;

    let closestDistance = Infinity;


    // BUSCAR LA LUCIÉRNAGA MÁS CERCANA, SE CALCULA LA DISTANCIA ENTRE LA POLILLA Y CADA LUCIÉRNAGA, SI ESTÁ DESACTIVADA SE IGNORA, SI ESTÁ DENTRO DE UN RANGO SE GUARDA COMO LA MÁS CERCANA
    for (let f of fireflies) {

      let d = dist(
        this.pos.x,
        this.pos.y,
        f.pos.x,
        f.pos.y
      );


      if (
        d < closestDistance &&
        f.disabled <= 0
      ) {

        closestDistance = d;

        closest = f;
      }
    }


    // ATRACCIÓN, SI HAY UNA LUCIÉRNAGA CERCANA, SE CALCULA LA DIRECCIÓN HACIA ELLA Y SE APLICA UNA FUERZA DE ATRACCIÓN, SI ESTÁ MUY CERCA SE APLICA UNA FUERZA DE ESCAPE Y SE GENERA UNA PARTÍCULA DE DESTELLO
    if (
      closest &&
      closestDistance < 300
    ) {

      let direction =
        p5.Vector.sub(
          closest.pos,
          this.pos
        );

      direction.setMag(0.04);

      this.acc.add(direction);
    }


    // SI LA LUCIÉRNAGA ESTÁ MUY CERCA, SE APLICA UNA FUERZA DE ESCAPE Y SE GENERA UNA PARTÍCULA DE DESTELLO
    if (
      closest &&
      closestDistance < 25
    ) {

      let escape =
        p5.Vector.sub(
          this.pos,
          closest.pos
        );

      escape.setMag(0.12);

      this.acc.add(escape);


      // PARTÍCULA DE DESTELLO, SE CREA UNA PARTÍCULA DE LUZ EN LA POSICIÓN DE LA POLILLA CON EL COLOR DE SU HUE Y UN BRILLO ALTO
      particles.push(
        new Particle(
          this.pos.x,
          this.pos.y,
          "spark",
          200
        )
      );


      // SONIDO DE POLILLA DESACTIVADO: SOLO SUENAN LAS LUCIÉRNAGAS AL BRILLAR
      // playMothSound();
    }


    this.wander();

    this.move(
      1.8,
      0.97
    );


    this.wing += 0.2;
  }


  draw() {

    push();

    translate(
      this.pos.x,
      this.pos.y
    );

    rotate(
      this.vel.heading()
    );


    let wingSize =
      3 + abs(sin(this.wing)) * 4;


    noStroke();

    fill(
      210,
      40,
      90,
      0.7
    );


    ellipse(
      -3,
      0,
      5,
      wingSize
    );

    ellipse(
      3,
      0,
      5,
      wingSize
    );


    fill(
      210,
      20,
      100
    );

    ellipse(
      0,
      0,
      3,
      3
    );


    pop();
  }
}


// NIEBLA, SE ENCARGA DE CREAR UN EFECTO DE NIEBLA QUE SE MUEVE LENTAMENTE Y ABSORBE LA LUZ DE LAS LUCIÉRNAGAS CUANDO ESTÁN DENTRO DE SU RADIO

class Fog extends Agent {

  constructor(x, y) {

    super(x, y, "fog");

    this.radius = random(
      50,
      90
    );

    this.absorbed = 0;
  }


  update() {

    // MOVIMIENTO LENTO, SE MUEVE DE FORMA AUTÓNOMA Y SE APLICA EL VIENTO, SE APLICA UNA FUERZA DE ATRACCIÓN HACIA EL CENTRO DE LA PANTALLA PARA QUE NO SE VAYA MUY LEJOS
    this.wander();

    this.move(
      0.3,
      0.99
    );


    // LA NIEBLA CRECE
    this.radius +=
      sin(frameCount * 0.01) * 0.01;
  }


  draw() {

    glow(
      this.pos.x,
      this.pos.y,
      this.radius,
      270,
      20,
      60,
      0.035
    );
  }
}


// RELACIÓN 1
// LUCIÉRNAGAS SE SINCRONIZAN, SE RECORRE EL STRING DE LUCIÉRNAGAS Y SE COMPARA CADA UNA CON LAS DEMÁS, SI ESTÁN CERCA SE ACERCAN LIGERAMENTE Y SE SINCRONIZAN SU FASE, SI ESTÁN CASI SINCRONIZADAS SE GENERA UNA PARTÍCULA DE ONDA

function synchronizeFireflies(
  fireflies
) {

  for (
    let i = 0;
    i < fireflies.length;
    i++
  ) {

    let a = fireflies[i];

    if (a.disabled > 0) {
      continue;
    }


    for (
      let j = i + 1;
      j < fireflies.length;
      j++
    ) {

      let b = fireflies[j];

      if (b.disabled > 0) {
        continue;
      }


      let d = dist(
        a.pos.x,
        a.pos.y,
        b.pos.x,
        b.pos.y
      );


      // SI ESTÁN CERCA, SE ACERCAN LIGERAMENTE Y SE SINCRONIZAN SU FASE, SI ESTÁN CASI SINCRONIZADAS SE GENERA UNA PARTÍCULA DE ONDA
      if (d < 120) {

        // SE ACERCAN LIGERAMENTE, SE CALCULA LA DIRECCIÓN HACIA LA OTRA LUCIÉRNAGA Y SE APLICA UNA FUERZA DE ATRACCIÓN MUY PEQUEÑA
        let attraction =
          p5.Vector.sub(
            b.pos,
            a.pos
          );

        attraction.setMag(0.005);

        a.acc.add(attraction);


        // SE SINCRONIZAN SU FASE, SE CALCULA LA DIFERENCIA DE FASE ENTRE LAS DOS LUCIÉRNAGAS Y SE ACERCA LIGERAMENTE LA FASE DE CADA UNA HACIA LA OTRA
        let difference =
          b.phase - a.phase;

        a.phase +=
          difference * 0.002;

        b.phase -=
          difference * 0.002;


        // SI ESTÁN CASI SINCRONIZADAS, SE GENERA UNA PARTÍCULA DE ONDA, SI LA DIFERENCIA DE FASE ES MENOR A 0.04, SE CREA UNA PARTÍCULA DE TIPO "wave" EN LA POSICIÓN DE LA LUCIÉRNAGA A CON UN COLOR AZUL Y UNA VIDA DE 50 FRAMES
        if (
          abs(difference) < 0.04
        ) {

          // ONDA DE LUZ, SE CREA UNA PARTÍCULA DE TIPO "wave" EN LA POSICIÓN DE LA LUCIÉRNAGA A CON UN COLOR AZUL Y UNA VIDA DE 50 FRAMES
          if (
            random() < 0.002
          ) {

            particles.push(
              new Particle(
                a.pos.x,
                a.pos.y,
                "wave",
                50
              )
            );
          }
        }
      }
    }
  }
}


// RELACIÓN 2
// NIEBLA APAGA LUCIÉRNAGAS, SE RECORRE EL STRING DE NIEBLA Y SE COMPARA CADA UNA CON LAS LUCIÉRNAGAS, SI ESTÁN DENTRO DE SU RADIO SE DESACTIVA LA LUCIÉRNAGA, SE GENERAN PARTÍCULAS DE CENIZA

function fogTouchesFirefly(
  fogs,
  fireflies
) {

  for (let fog of fogs) {

    for (let f of fireflies) {

      if (f.disabled > 0) {
        continue;
      }


      let d = dist(
        fog.pos.x,
        fog.pos.y,
        f.pos.x,
        f.pos.y
      );


      if (
        d < fog.radius * 0.55
      ) {

        // APAGAR LUCIÉRNAGA, SE DESACTIVA LA LUCIÉRNAGA DURANTE 180 FRAMES Y SE REDUCE SU BRILLO A 0
        f.disabled = 180;

        f.brightness = 0;


        // LA NIEBLA ABSORBE LA LUCIÉRNAGA, SE AUMENTA EL CONTADOR DE LUCIÉRNAGAS ABSORBIDAS POR LA NIEBLA
        fog.absorbed++;


        // PARTÍCULAS DE CENIZA, SE GENERAN 3 PARTÍCULAS DE TIPO "ash" EN LA POSICIÓN DE LA LUCIÉRNAGA CON UN COLOR GRIS Y UNA VIDA DE 80 FRAMES
        for (
          let i = 0;
          i < 3;
          i++
        ) {

          particles.push(
            new Particle(
              f.pos.x,
              f.pos.y,
              "ash",
              270
            )
          );
        }


        // SONIDO DE NIEBLA DESACTIVADO: SOLO SUENAN LAS LUCIÉRNAGAS AL BRILLAR
        // playFogSound();
      }
    }
  }
}


// PARTÍCULAS, SE UTILIZA PARA CREAR EFECTOS DE LUZ Y CENIZA, SE ACTUALIZA SU POSICIÓN Y SE DIBUJA EN LA PANTALLA, SE ELIMINA CUANDO SU VIDA LLEGA A 0

class Particle {

  constructor(
    x,
    y,
    type,
    hue
  ) {

    this.x = x;
    this.y = y;

    this.type = type;

    this.hue = hue;

    this.life = 0;


    // VELOCIDAD ALEATORIA, SE CALCULA UN ÁNGULO ALEATORIO Y UNA VELOCIDAD ALEATORIA PARA QUE LA PARTÍCULA SE MUEVA EN UNA DIRECCIÓN DIFERENTE CADA VEZ
    let angle =
      random(TWO_PI);

    let speed =
      random(
        0.3,
        1.5
      );

    this.vx =
      cos(angle) * speed;

    this.vy =
      sin(angle) * speed;


    if (type === "wave") {

      this.maxLife = 60;

      this.radius = 5;
    }

    else if (type === "ash") {

      this.maxLife = 80;

      this.vx *= 0.3;
      this.vy *= 0.3;
    }

    else {

      this.maxLife = 40;
    }
  }


  update() {

    this.life++;


    if (
      this.type === "wave"
    ) {

      this.radius += 2;
    }

    else {

      this.x += this.vx;
      this.y += this.vy;

      this.vx *= 0.97;
      this.vy *= 0.97;
    }


    return (
      this.life <
      this.maxLife
    );
  }


  draw() {

    let alpha =
      1 -
      this.life /
      this.maxLife;


    noFill();


    if (
      this.type === "wave"
    ) {

      stroke(
        this.hue,
        80,
        100,
        alpha
      );

      strokeWeight(1);

      circle(
        this.x,
        this.y,
        this.radius * 2
      );
    }

    else {

      noStroke();

      fill(
        this.hue,
        70,
        100,
        alpha
      );

      circle(
        this.x,
        this.y,
        2.5
      );
    }
  }
}


// EFECTO DE LUZ, SE CREA UN GRADIENTE RADIAL EN LA POSICIÓN DE LA LUCIÉRNAGA O POLILLA, SE UTILIZA PARA CREAR EL EFECTO DE AURA Y DESTELLO

function glow(
  x,
  y,
  radius,
  hue,
  saturation,
  brightness,
  alpha
) {

  let gradient =
    drawingContext.createRadialGradient(
      x,
      y,
      0,
      x,
      y,
      radius
    );


  gradient.addColorStop(
    0,
    `hsla(
      ${hue},
      ${saturation}%,
      ${brightness}%,
      ${alpha}
    )`
  );


  gradient.addColorStop(
    1,
    `hsla(
      ${hue},
      ${saturation}%,
      ${brightness}%,
      0
    )`
  );


  drawingContext.fillStyle =
    gradient;


  drawingContext.fillRect(
    x - radius,
    y - radius,
    radius * 2,
    radius * 2
  );
}


// SONIDO, SE UTILIZA LA LIBRERÍA P5.SOUND PARA REPRODUCIR SONIDOS CUANDO LAS LUCIÉRNAGAS DESTELLAN, SE CREA UN OSCILADOR Y UN ENVOLVENTE PARA CONTROLAR EL VOLUMEN Y LA FRECUENCIA DEL SONIDO

let oscillator;
let envelope;


function startSound() {

  if (soundStarted) {
    return;
  }


  userStartAudio();


  oscillator =
    new p5.Oscillator(
      "sine"
    );


  envelope =
    new p5.Envelope();


  envelope.setADSR(
    0.01,
    0.1,
    0,
    0.2
  );


  envelope.setRange(
    0.15,
    0
  );


  oscillator.start();

  oscillator.amp(0);


  soundStarted = true;
}


// SONIDO DE LUCIÉRNAGA, SE REPRODUCE UN SONIDO CUANDO LA LUCIÉRNAGA DESTELLA, LA FRECUENCIA DEL SONIDO DEPENDE DE LA POSICIÓN Y EL COLOR DE LA LUCIÉRNAGA

function playFireflySound(y) {

  if (
    !soundStarted ||
    muted
  ) {
    return;
  }


  let index = floor(
    map(
      y,
      height,
      0,
      0,
      fireflyNotes.length - 1
    )
  );


  index = constrain(
    index,
    0,
    fireflyNotes.length - 1
  );


  oscillator.freq(
    fireflyNotes[index]
  );


  envelope.play(
    oscillator
  );
}


// INTERACCIÓN, 

function mousePressed() {

  startSound();


  //DESTELLO DE LUCIÉRNAGAS, SE RECORRE EL STRING DE AGENTES Y SE BUSCAN LAS LUCIÉRNAGAS CERCANAS AL RATÓN, SI ESTÁN DENTRO DE UN RADIO DE 150 PIXELES SE RESETEA SU FASE Y SE GENERA UN DESTELLO
  for (let agent of agents) {

    if (
      agent.type !==
      "firefly"
    ) {
      continue;
    }


    let d = dist(
      mouseX,
      mouseY,
      agent.pos.x,
      agent.pos.y
    );


    if (d < 150) {

      agent.phase = 0;

      agent.flash();
    }
  }


  // ONDA DE LUZ, SE CREA UNA PARTÍCULA DE TIPO "wave" EN LA POSICIÓN DEL RATÓN CON UN COLOR AZUL Y UNA VIDA DE 200 FRAMES
  particles.push(
    new Particle(
      mouseX,
      mouseY,
      "wave",
      200
    )
  );
}


// TECLADO, SE PUEDE REINICIAR EL SISTEMA CON R, GENERAR UNA RAFAGA DE VIENTO CON ESPACIO Y SILENCIAR EL SONIDO CON M

function keyPressed() {

  startSound();


  // R PARA REINICIAR, Y VOLVER A EMPEZAR CON TODOS LOS AGENTES
  if (
    key === "r" ||
    key === "R"
  ) {

    resetSystem();
  }


  // ESPACIO = VIENTO DE FORMA ALETAROIRA, NO ME ACLARO 
  else if (
    key === " "
  ) {

    wind =
      p5.Vector.random2D();

    wind.mult(
      random(2, 4)
    );
  }


  // M PARA MUETAR 
  else if (
    key === "m" ||
    key === "M"
  ) {

    muted = !muted;
  }


  return false;
}


// INFORMACIÓN, SALE LA INFO EN LA PARTE DE ABAJO DE LA VENTANA 

function drawInfo(
  fireflies,
  moths,
  fogs
) {

  fill(
    0,
    0,
    100,
    0.4
  );

  noStroke();

  textSize(12);

  textAlign(
    LEFT,
    BOTTOM
  );


  text(
    "Ratón: viento y luz | " +
    "ESPACIO: ráfaga | " +
    "R: reiniciar | " +
    "M: sonido",
    15,
    height - 12
  );
}


// CAMBIO DE TAMAÑO, SE AJUSTA EL TAMAÑO DEL CANVAS A LA VENTANA DEL NAVEGADOR, SE REINICIA EL SISTEMA PARA QUE LOS AGENTES SE COLOQUEN EN LA NUEVA POSICIÓN
function windowResized() {

  resizeCanvas(
    windowWidth,
    windowHeight
  );
}