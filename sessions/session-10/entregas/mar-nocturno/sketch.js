let llums = [];
let meduses = [];
let depredadors = [];
let particules = [];
let ones = [];

// total 140 agents (l'enunciat demana entre 90 i 150)
const NUM_LLUMS = 120;
const NUM_MEDUSES = 14;
const NUM_DEPREDADORS = 6;

// llums caçades que encara han de tornar a néixer
let llumsPendents = 0;

// el so (es crea a setup() i no sona fins al primer clic o tecla)
let so;

// el llenç ocupa aquesta part de la finestra (1 = pantalla completa)
const ESCALA_LLENC = 0.9;

// interacció amb el ratolí (com interactive-art: constants per als modes)
const ATREU = 0;
const REPEL = 1;
let modeRatoli = ATREU;
let forcaRatoli = 0.2;
const RADI_RATOLI = 130;

function setup() {
    // windowWidth i windowHeight són la mida de la finestra del navegador
    createCanvas(windowWidth * ESCALA_LLENC, windowHeight * ESCALA_LLENC);
    colorMode(HSB, 360, 100, 100, 100);
    background(225, 80, 8);

    crearEcosistema();

    so = new So();
}

function windowResized() {
    resizeCanvas(windowWidth * ESCALA_LLENC, windowHeight * ESCALA_LLENC);
    background(225, 80, 8);
}

function crearEcosistema() {
    for (let i = 0; i < NUM_LLUMS; i++) {
        llums.push(new Llum(
            random(0, width),
            random(0, height),
            random(4, 9),
            185
        ));
    }

    for (let i = 0; i < NUM_MEDUSES; i++) {
        meduses.push(new Medusa(
            random(0, width),
            random(0, height),
            random(50, 90)
        ));
    }

    for (let i = 0; i < NUM_DEPREDADORS; i++) {
        depredadors.push(new Depredador(
            random(0, width),
            random(0, height),
            random(22, 30)
        ));
    }
}

// tecla R: buida-ho tot i torna a començar
function reiniciar() {
    llums = [];
    meduses = [];
    depredadors = [];
    particules = [];
    ones = [];
    llumsPendents = 0;

    background(225, 80, 8);
    crearEcosistema();
}

function draw() {
    // fons marí amb estela: rectangle amb alfa baixa (com a wheel-trails)
    noStroke();
    fill(225, 80, 8, 18);
    rect(0, 0, width, height);

    // ordre de capes: meduses al fons, després llums, depredadors i partícules
    for (const medusa of meduses) {
        medusa.update();
        medusa.draw();
    }

    for (const llum of llums) {
        llum.update(depredadors, meduses, ones);
        llum.draw();
    }

    for (const depredador of depredadors) {
        depredador.update();
        depredador.draw();
    }

    capturaLlums();
    naixementLlums();

    for (const particula of particules) {
        particula.update();
        particula.draw();
    }

    for (const ona of ones) {
        ona.update();
        ona.draw();
    }

    // esborra les partícules mortes, les ones acabades i les llums caçades
    particules = particules.filter(p => {
        return p.isAlive();
    });

    ones = ones.filter(o => {
        return o.isAlive();
    });

    llums = llums.filter(l => {
        return l.viva;
    });

    // el dron de les meduses depèn de quantes llums tenen refugi i quantes tenen por
    let connectades = 0;
    let espantades = 0;

    for (const llum of llums) {
        if (llum.medusaProxima !== null) connectades++;
        if (llum.espant > 0.3) espantades++;
    }

    so.update(llums.length, connectades, espantades);

    dibuixaRatoli();
    dibuixaAjuda();
}

// regla 3: si un depredador toca una llum, la llum mor i esclata en partícules
function capturaLlums() {
    for (const depredador of depredadors) {
        for (const llum of llums) {
            if (!llum.viva) continue;

            const distancia = dist(depredador.px, depredador.py, llum.px, llum.py);

            if (distancia < depredador.d / 2 + llum.d / 2) {
                llum.viva = false;
                llumsPendents++;
                explosio(llum.px, llum.py, llum.hue);
                so.notaCaptura(depredador.d);
            }
        }
    }
}

function explosio(x, y, hue) {
    for (let i = 0; i < 14; i++) {
        particules.push(new Particula(x, y, hue));
    }
}

// les llums caçades tornen a néixer a poc a poc al costat d'una medusa
function naixementLlums() {
    if (llumsPendents > 0 && random(0, 1) < 0.03) {
        const medusa = random(meduses);

        // la llum nova hereta el color (objectiu) d'una llum que ja existeix
        // (si agafés el color actual, podria ser un color a mig camí del canvi)
        let hue = 185;
        if (llums.length > 0) {
            hue = random(llums).hueObjectiu;
        }

        llums.push(new Llum(
            medusa.px + random(-30, 30),
            medusa.py + random(-30, 30),
            random(4, 9),
            hue
        ));
        llumsPendents--;
    }
}

// ---------- interacció ----------

function ratoliDins() {
    return mouseX > 0 && mouseX < width && mouseY > 0 && mouseY < height;
}

// clic: llança una ona des del ratolí que empeny i espanta les llums
function mouseClicked() {
    // el primer clic activa el so (el navegador ho exigeix)
    so.activa();

    if (!ratoliDins()) {
        return false;
    }

    ones.push(new Ona(mouseX, mouseY));
    so.notaOna();
    return false;
}

// roda: canvia la força del corrent
function mouseWheel(event) {
    if (event.delta > 0) {
        forcaRatoli = constrain(forcaRatoli - 0.02, 0.02, 0.3);
    } else {
        forcaRatoli = constrain(forcaRatoli + 0.02, 0.02, 0.3);
    }
    return false;
}

function keyPressed() {
    // una tecla també activa el so
    so.activa();

    // E: alterna entre atreure i repel·lir
    if (key === "e" || key === "E") {
        modeRatoli = (modeRatoli + 1) % 2;
    }

    // R: reinicia el sistema
    if (key === "r" || key === "R") {
        reiniciar();
    }
}

// cercle suau que mostra on arriba el corrent (cian = atreu, vermell = repel·leix)
function dibuixaRatoli() {
    if (!ratoliDins()) return;

    let hue;
    if (modeRatoli === ATREU) {
        hue = 185;
    } else {
        hue = 355;
    }

    noFill();
    stroke(hue, 40, 100, 25);
    strokeWeight(1);
    circle(mouseX, mouseY, RADI_RATOLI * 2);

    noStroke();
    fill(hue, 40, 100, 60);
    circle(mouseX, mouseY, 6);
}

function dibuixaAjuda() {
    let textMode;
    if (modeRatoli === ATREU) {
        textMode = "atreu";
    } else {
        textMode = "repel·leix";
    }

    noStroke();
    fill(0, 0, 100, 35);
    textSize(12);
    textAlign(LEFT, BOTTOM);
    text(
        "clic: ona · E: " + textMode + " · roda: força " + nf(forcaRatoli, 1, 2) + " · R: reiniciar",
        12,
        height - 10
    );

    // mentre el so no estigui actiu, ho diem
    if (!so.actiu) {
        fill(0, 0, 100, 70);
        textSize(16);
        textAlign(CENTER, CENTER);
        text("clic o tecla per activar el so", width / 2, 40);
    }
}