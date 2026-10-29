// ========================================
// SISTEMA VIVO
// 4 familias de moléculas
// ========================================

let moleculas = [];
let particulas = [];
let nacimientos = [];
let obraIniciada = false;

function setup() {
    createCanvas(windowWidth, windowHeight);
    crearMundo();
    crearSonido();
    crearAmbiente();


    // Connectem el boto amb el reinici del sistema
    const botoReinici = document.getElementById('btn-reiniciar');

    botoReinici.addEventListener('click', reiniciarSistema);

    // Evitem que clicar el boto afecti les molecules
    botoReinici.addEventListener('pointerdown', (event) => {
        event.stopPropagation();
    });
}

function crearMundo() {
    moleculas = [];
    particulas = [];
    nacimientos = [];
    noiseSeed(random(1000));

    for (let i = 0; i < 30; i++) {
        moleculas.push(new Carbohidrato(random(width), random(height)));
        moleculas.push(new Nucleotido(random(width), random(height)));
    }
    for (let i = 0; i < 40; i++) {
        moleculas.push(new Lipido(random(width), random(height)));
    }
    for (let i = 0; i < 45; i++) {
        moleculas.push(new Aminoacido(random(width), random(height)));
    }
}

function keyPressed() {
    if (key === 'r' || key === 'R') {
        reiniciarSistema();
    }
}

function reiniciarSistema() {
    crearMundo();
}

function draw() {

    if (!obraIniciada) {
        background(20, 20, 30);
        return;
    }

    background(20, 20, 30);

    hidrolisis();
    procesarNacimientos();

    for (let m of moleculas) m.revisarEnlaces();

    for (let i = 0; i < moleculas.length; i++) {
        for (let j = i + 1; j < moleculas.length; j++) {
            moleculas[i].interactuar(moleculas[j]);
            relaciones(moleculas[i], moleculas[j]);
        }
    }

    for (let m of moleculas) m.mover();

    for (let m of moleculas) {
        if (m.consumida) {
            for (let o of m.enlaces) o.enlaces = o.enlaces.filter((e) => e !== m);
        }
    }
    moleculas = moleculas.filter((m) => !m.consumida);

    for (let m of moleculas) m.dibujarEnlaces();
    for (let m of moleculas) m.dibujar();

    for (let p of particulas) {
        p.actualizar();
        p.dibujar();
    }
    particulas = particulas.filter((p) => !p.estaMuerta());

    if (mouseIsPressed) {
        noFill();
        stroke(120, 200, 255, 120);
        strokeWeight(1);
        circle(mouseX, mouseY, 80);
    }
    actualizarAmbiente();
    mostrarCenso(); // siempre lo último, para que quede encima de todo
}

function crearParticulas(x, y, col, cantidad) {
    for (let i = 0; i < cantidad; i++) {
        particulas.push(new Particula(x, y, col));
    }
}

// ========================================
// NACIMIENTOS Y DESTRUCCIÓN
// ========================================

function destruir(m) {
    if (m.consumida) return;
    m.consumida = true;
    crearParticulas(m.x, m.y, m.color, 10);
    sonar('destruir');
    nacimientos.push({ clase: m.constructor, cuando: frameCount + 300 });
}

function procesarNacimientos() {
    for (let n of nacimientos) {
        if (frameCount >= n.cuando) {
            let nueva = new n.clase(random(width), random(height));
            moleculas.push(nueva);
            particulas.push(new Onda(nueva.x, nueva.y, nueva.color, 1));
        }
    }
    nacimientos = nacimientos.filter((n) => frameCount < n.cuando);
}

// ========================================
// INTERACCIÓN DEL ESPECTADOR
// ========================================

function hidrolisis() {
    if (!mouseIsPressed) return;

    for (let m of moleculas) {
        for (let otra of m.enlaces) {
            let medioX = (m.x + otra.x) / 2;
            let medioY = (m.y + otra.y) / 2;

            if (dist(mouseX, mouseY, medioX, medioY) < 40) {
                romperEnlace(m, otra);
                sonar('romper');
                crearParticulas(medioX, medioY, color(120, 200, 255), 8);
                break;
            }
        }
    }

    for (let m of moleculas) {
        if (m instanceof Nucleotido && dist(mouseX, mouseY, m.x, m.y) < 40 && random() < 0.03) {
            m.mutar();
        }
    }
}

// ========================================
// RELACIONES ENTRE FAMILIAS
// ========================================

function relaciones(a, b) {
    enzima(a, b);
    enzima(b, a);
    barrera(a, b);
    barrera(b, a);
    traduccion(a, b);
    traduccion(b, a);
    energia(a, b);
    energia(b, a);
    absorcion(a, b);
    absorcion(b, a);
    sintesis(a, b);
    sintesis(b, a);
}

// 1. Enzima: una proteína plegada rompe enlaces de carbohidratos
function enzima(prot, carb) {
    if (!(prot instanceof Aminoacido) || !prot.plegada) return;
    if (!(carb instanceof Carbohidrato) || carb.enlaces.length === 0) return;

    let d = dist(prot.x, prot.y, carb.x, carb.y);
    if (d > 40) return;

    stroke(120, 200, 255, map(d, 0, 40, 200, 40));
    strokeWeight(1);
    line(prot.x, prot.y, carb.x, carb.y);

    if (random() < 0.03) {
        let otra = random(carb.enlaces);
        let mx = (carb.x + otra.x) / 2;
        let my = (carb.y + otra.y) / 2;
        romperEnlace(carb, otra);
        sonar('romper');
        crearParticulas(mx, my, color(120, 200, 255), 8);
        particulas.push(new Onda(mx, my, color(120, 200, 255)));
    }
}

// 2. Barrera: un liposoma formado empuja lo que no absorbe,
//    salvo los carbohidratos libres, que a veces se pegan (glucolípidos)
function barrera(lip, otra) {
    if (!(lip instanceof Lipido) || !lip.formado) return;
    if (otra instanceof Lipido) return;
    if (otra instanceof Nucleotido) return;                    // los absorbe
    if (otra instanceof Carbohidrato && otra.pegadoA) return;  // ya está pegado

    let d = dist(lip.x, lip.y, otra.x, otra.y);
    if (d >= 35 || d === 0) return;

    // Un carbohidrato libre a veces se pega en vez de rebotar
    if (otra instanceof Carbohidrato && otra.enlaces.length === 0 && otra.pausa <= 0) {
        if (random() < 0.1 && pegarCarbohidrato(lip, otra)) return;
    }

    let empuje = (35 - d) * 0.05;
    otra.x += ((otra.x - lip.x) / d) * empuje;
    otra.y += ((otra.y - lip.y) / d) * empuje;

    if (random() < 0.03) {
        particulas.push(new Onda((lip.x + otra.x) / 2, (lip.y + otra.y) / 2, lip.color, 0.6));
    }
}

// Carbohidratos pegados a un liposoma (los de cualquier lípido del grupo)
function antenitasDe(lip) {
    let grupo = lip.cadena();
    return moleculas.filter(
        (m) => m instanceof Carbohidrato && m.pegadoA && !m.consumida && grupo.includes(m.pegadoA)
    );
}

// Pega un carbohidrato al liposoma. Devuelve true si lo ha conseguido
function pegarCarbohidrato(lip, carb) {
    let pegados = antenitasDe(lip);
    if (pegados.length >= 3) return false;

    carb.pegadoA = lip;
    pegados.push(carb);
    particulas.push(new Onda(carb.x, carb.y, carb.color, 0.8));

    // Con 3 antenitas, la presión osmótica rompe el liposoma
    if (pegados.length === 3) estallarLiposoma(lip, pegados);
    return true;
}

// Rompe todos los enlaces del liposoma y suelta los carbohidratos
function estallarLiposoma(lip, carbohidratos) {
    let c = lip.centro();
    let grupo = lip.cadena();

    for (let m of grupo) {
        for (let o of m.enlaces.slice()) { // slice() copia la lista antes de modificarla
            romperEnlace(m, o);
        }
        m.formado = false;
        m.ix += (m.x - c.x) * 0.15; // salen disparados desde el centro
        m.iy += (m.y - c.y) * 0.15;
    }

    for (let carb of carbohidratos) {
        carb.pegadoA = null;
        carb.pausa = 90;
    }

    crearParticulas(c.x, c.y, lip.color, 20);
    sonar('destruir');
    particulas.push(new Onda(c.x, c.y, lip.color, 2.5));
}

// 3. Traducción: una pareja de nucleótidos atrae aminoácidos libres
function traduccion(nuc, amino) {
    if (!(nuc instanceof Nucleotido) || nuc.enlaces.length === 0) return;
    if (!(amino instanceof Aminoacido) || amino.plegada) return;

    let d = dist(nuc.x, nuc.y, amino.x, amino.y);
    if (d < 250 && d > 25) {
        amino.x += ((nuc.x - amino.x) / d) * 0.3;
        amino.y += ((nuc.y - amino.y) / d) * 0.3;
    }
}

// 4. Energía: un nucleótido "se come" un carbohidrato recién liberado
function energia(carb, nuc) {
    if (!(carb instanceof Carbohidrato) || carb.pausa <= 0 || carb.consumida) return;
    if (carb.pegadoA) return;
    if (!(nuc instanceof Nucleotido) || nuc.energia > 0) return;
    if (dist(carb.x, carb.y, nuc.x, nuc.y) > 60) return;

    carb.consumida = true;
    nuc.energia = 300;
    nuc.pulso = 1;
    crearParticulas(carb.x, carb.y, color(255, 150, 40), 6);

    moleculas.push(new Carbohidrato(random(width), random(height)));
}

// 5. Absorción: un liposoma formado absorbe nucleótidos libres.
//    Cada antenita (glucocáliz) la facilita
function absorcion(lip, nuc) {
    if (!(lip instanceof Lipido) || !lip.formado) return;
    if (!(nuc instanceof Nucleotido) || nuc.consumida) return;
    if (dist(lip.x, lip.y, nuc.x, nuc.y) > 32) return;

    let multiplicador = 1 + antenitasDe(lip).length;

    if (random() < 0.05 * multiplicador) {
        destruir(nuc);
        lip.pulso = 1;
        particulas.push(new Onda(nuc.x, nuc.y, lip.color, 1.2));
    }
    if (nuc.enlaces.length > 0) return;
}

// ========================================
// UTILIDADES
// ========================================

function romperEnlace(a, b) {
    a.enlaces = a.enlaces.filter((e) => e !== a && e !== b);
    b.enlaces = b.enlaces.filter((e) => e !== a && e !== b);

    let d = dist(a.x, a.y, b.x, b.y);
    let dx = d > 0 ? (a.x - b.x) / d : cos(random(TWO_PI));
    let dy = d > 0 ? (a.y - b.y) / d : sin(random(TWO_PI));

    let fuerza = 3;
    a.ix += dx * fuerza;
    a.iy += dy * fuerza;
    b.ix -= dx * fuerza;
    b.iy -= dy * fuerza;

    a.pausa = 90;
    b.pausa = 90;
    a.pulso = 1;
    b.pulso = 1;
}

// Barras con el número de moléculas de cada familia
function mostrarCenso() {
    let familias = [Carbohidrato, Aminoacido, Lipido, Nucleotido];
    let nombres = ['Carbohidratos', 'Aminoácidos', 'Lípidos', 'Nucleótidos'];
    let colores = [color(255, 150, 40), color(80, 160, 255), color(255, 220, 80), color(255, 90, 150)];

    rectMode(CORNER); // Nucleotido deja el modo en CENTER, así que lo restablecemos
    textAlign(LEFT, CENTER);
    textSize(11);
    noStroke();

    for (let i = 0; i < 4; i++) {
        let n = moleculas.filter((m) => m instanceof familias[i]).length;
        fill(colores[i]);
        rect(15, 20 + i * 20, n * 2, 8);
        fill(255, 200);
        text(nombres[i] + ' ' + n, 20 + n * 2, 24 + i * 20);
    }
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}


// ========================================
// ENTRADA A L'OBRA
// ========================================

// Connectem la portada independentment del setup de p5
document.addEventListener('DOMContentLoaded', () => {
    const botoEntrar = document.getElementById('btn-entrar');

    if (botoEntrar) {
        botoEntrar.addEventListener('click', entrarEnObra);
    } else {
        console.error('No s’ha trobat el botó d’entrada');
    }
});

function entrarEnObra() {
    if (obraIniciada) return;

    // Activem la simulacio abans d'iniciar l'audio
    obraIniciada = true;

    // Amaguem la portada
    const portada = document.getElementById('portada');

    if (portada) {
        portada.classList.add('is-hidden');
    }

    // El so no ha de bloquejar l'entrada a l'obra
    try {
        Promise.resolve(userStartAudio())
            .then(() => {
                audioActivo = true;
            })
            .catch((error) => {
                console.warn('Error activant el so:', error);
            });
    } catch (error) {
        console.warn('No s’ha pogut iniciar el so:', error);
    }
}

// 6. Síntesis: una pareja de nucleótidos consume aminoácidos libres
function sintesis(nuc, amino) {
    if (!(nuc instanceof Nucleotido) || nuc.enlaces.length === 0) return;
    if (!(amino instanceof Aminoacido) || amino.enlaces.length > 0 || amino.consumida) return;
    if (dist(nuc.x, nuc.y, amino.x, amino.y) > 30) return;

    if (random() < 0.05) {
        destruir(amino);
        nuc.pulso = 1;
        particulas.push(new Onda(amino.x, amino.y, nuc.color, 1.2));
    }
}