let voces = [];
let siguienteVoz = 0;
let ultimoSonido = 0;
let audioActivo = false;
// Elements del so ambiental
let aireAmbiente;
let filtroAmbiente;
let notaAmbiente;
let envolventeAmbiente;
let proximaNota = 0;
let ultimaRotura = -1000;

// Un sonido por tipo de suceso: forma de onda, nota inicial, nota final y volumen
let eventos = {
    romper: { forma: 'triangle', desde: 55, hasta: 55, volumen: 0.06 },
    formar: { forma: 'sine', desde: 64, hasta: 76, volumen: 0.05 },
    destruir: { forma: 'square', desde: 60, hasta: 44, volumen: 0.06 }
};

// Convierte una nota MIDI (60 = do central) en frecuencia (Hz)
function notaAFrecuencia(nota) {
    return 440 * pow(2, (nota - 69) / 12);
}


function crearAmbiente() {
    // Soroll greu filtrat per crear una textura organica
    filtroAmbiente = new p5.LowPass(200);

    aireAmbiente = new p5.Noise('brown');
    aireAmbiente.amp(0);
    aireAmbiente.disconnect();
    aireAmbiente.connect(filtroAmbiente);
    aireAmbiente.start();

    // Notes suaus que apareixen de manera ocasional
    notaAmbiente = new p5.Oscillator('sine');
    envolventeAmbiente = new p5.Envelope(0.8, 0.6, 0.9, 1.8);

    notaAmbiente.amp(0.035);
    notaAmbiente.disconnect();
    notaAmbiente.connect(envolventeAmbiente);
    notaAmbiente.start();

    proximaNota = millis() + 4000;
}

function actualizarAmbiente() {
    if (!audioActivo || !aireAmbiente || moleculas.length === 0) return;

    // Calculem l'activitat de l'ecosistema cada 12 fotogrames
    if (frameCount % 12 === 0) {
        let enlazadas = moleculas.filter(m => m.enlaces.length > 0).length;
        let actividad = constrain(enlazadas / moleculas.length, 0, 1);

        // Respiracio lenta del so ambiental
        let respiracion = noise(frameCount * 0.001);

        let volumen = 0.025 + actividad * 0.015 + respiracion * 0.005; let frecuencia = 140 + actividad * 150 + respiracion * 60;

        aireAmbiente.amp(volumen, 1);
        filtroAmbiente.freq(frecuencia);
    }

    // Notes esporadiques en una escala pentatonica
    if (millis() >= proximaNota) {
        let escala = [48, 50, 52, 55, 57];

        notaAmbiente.freq(notaAFrecuencia(random(escala)), 0.3);
        envolventeAmbiente.play();

        proximaNota = millis() + random(6500, 11000);
    }
}

function crearSonido() {
    for (let i = 0; i < 6; i++) {
        let osc = new p5.Oscillator('sine');
        let env = new p5.Envelope(0.005, 0.05, 0.12, 0.11);

        osc.amp(0.06);
        osc.disconnect();
        osc.connect(env);
        osc.start();

        voces.push({ osc: osc, env: env });
    }
}

function sonar(tipo) {
    if (!audioActivo || voces.length === 0) return;

    let e = eventos[tipo];
    if (!e) return;

    let ahora = millis();

    // Les rotures de l'usuari tenen el seu propi limit
    if (tipo === 'romper') {
        if (ahora - ultimaRotura < 110) return;
        ultimaRotura = ahora;
    } else {
        // Evitem acumular massa sons automatics
        if (ahora - ultimoSonido < 80) return;
        ultimoSonido = ahora;
    }

    let v = voces[siguienteVoz];
    siguienteVoz = (siguienteVoz + 1) % voces.length;

    v.osc.setType(e.forma);
    v.osc.freq(notaAFrecuencia(e.desde));

    // Nomes canviem el to si l'esdeveniment ho necessita
    if (e.desde !== e.hasta) {
        v.osc.freq(notaAFrecuencia(e.hasta), 0.12);
    }

    v.osc.amp(e.volumen, 0.01);
    v.env.play();
}

