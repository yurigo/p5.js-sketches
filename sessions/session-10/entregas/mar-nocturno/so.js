// So: tot el so del sistema, fet amb p5.Oscillator (p5.sound)
//
// Cada família té la seva veu:
//   Llums       -> notes de cristall (escala pentatònica segons la posició X)
//   Meduses     -> dron greu continu (més fort com més llums tenen de refugi)
//   Depredadors -> cop greu quan cacen una llum
// Esdeveniments:
//   mutació     -> glissando ascendent (el color de la llum canvia)
//   ona (clic)  -> barrit descendent

class So {

    actiu;
    dron1;
    dron2;
    veus;
    veuSeguent;
    ultimaNotaLlum;
    ultimaMutacio;
    notes;

    constructor() {
        this.actiu = false; // no sona fins al primer clic o tecla
        this.veus = [];
        this.veuSeguent = 0;
        this.ultimaNotaLlum = -100;
        this.ultimaMutacio = -100;

        // escala pentatònica de La en dues octaves (sona bé sigui quina sigui la combinació)
        this.notes = [440, 494, 554, 659, 740, 880, 988, 1109, 1319, 1480];
    }

    // s'ha de cridar dins d'un clic o d'una tecla: el navegador no deixa sonar abans
    activa() {
        userStartAudio();

        if (this.actiu) return;
        this.actiu = true;

        // dron: dos oscil·ladors greus (La1 i la seva quinta)
        this.dron1 = new p5.Oscillator(55, "sine");
        this.dron2 = new p5.Oscillator(82.41, "sine");

        for (const dron of [this.dron1, this.dron2]) {
            dron.amp(0, 0);
            dron.start();
        }

        // 12 veus per a les notes curtes, que es reparteixen de manera rotatòria
        for (let i = 0; i < 12; i++) {
            const osc = new p5.Oscillator(440, "sine");
            osc.amp(0, 0);
            osc.start();
            this.veus.push({ osc: osc, ttl: 0, alliberament: 0.3 });
        }
    }

    // es crida a cada frame des de draw()
    update(total, connectades, espantades) {
        if (!this.actiu) return;

        // cada nota té un ttl en frames; quan s'acaba comença el fade out
        for (const veu of this.veus) {
            if (veu.ttl > 0) {
                veu.ttl--;

                if (veu.ttl === 0) {
                    veu.osc.amp(0, veu.alliberament);
                }
            }
        }

        // el dron es retoca cada 10 frames (no cal fer-ho a cada frame)
        if (frameCount % 10 === 0) {
            const refugiades = connectades / max(total, 1);
            const fraccioEspantades = espantades / max(total, 1);

            // més llums refugiades a les meduses -> dron més fort
            const volum = map(refugiades, 0, 1, 0.03, 0.14);
            this.dron1.amp(volum, 0.5);
            this.dron2.amp(volum * 0.7, 0.5);

            // més por -> la quinta baixa cap al trítono (so tens)
            const tensio = constrain(fraccioEspantades, 0, 0.25);
            this.dron2.freq(map(tensio, 0, 0.25, 82.41, 77.78), 0.5);
        }
    }

    // reserva la veu següent, la configura i la fa sonar
    toca(frequencia, tipus, volum, frames, alliberament) {
        const veu = this.veus[this.veuSeguent];
        this.veuSeguent = (this.veuSeguent + 1) % this.veus.length;

        // la freqüència inicial s'ha de posar de cop (rampa 0): si no, un glissando
        // posterior començaria des de la freqüència que tenia la veu abans
        veu.osc.setType(tipus);
        veu.osc.freq(frequencia, 0);
        veu.osc.amp(volum, 0.01);
        veu.ttl = frames;
        veu.alliberament = alliberament;

        return veu;
    }

    // llum espantada: nota de cristall. Posició X -> nota, color -> timbre
    notaLlum(x, hue) {
        if (!this.actiu) return;

        // com a molt una nota cada 5 frames, perquè no es converteixi en soroll
        if (frameCount - this.ultimaNotaLlum < 5) return;
        this.ultimaNotaLlum = frameCount;

        // la posició X tria una de les 10 notes de l'escala
        const grau = constrain(int(map(x, 0, width, 0, 10)), 0, 9);
        const frequencia = this.notes[grau];

        // el color de la llum canvia el timbre: cian dolç, verd suau, violeta aspre
        let tipus = "sine";
        let volum = 0.08;

        if (hue < 160) {
            tipus = "triangle";
            volum = 0.07;
        } else if (hue > 225) {
            tipus = "square";
            volum = 0.025;
        }

        this.toca(frequencia, tipus, volum, 6, 0.5);
    }

    // un depredador caça: cop greu que cau. Més gran -> més greu
    notaCaptura(mida) {
        if (!this.actiu) return;

        const frequencia = map(mida, 20, 32, 120, 90);
        const veu = this.toca(frequencia, "sawtooth", 0.22, 5, 0.5);
        veu.osc.freq(frequencia * 0.4, 0.4);
    }

    // una llum muta de color: glissando ascendent cap a la nota del seu color nou
    notaMutacio(hueObjectiu) {
        if (!this.actiu) return;

        if (frameCount - this.ultimaMutacio < 8) return;
        this.ultimaMutacio = frameCount;

        let frequencia = 440;
        if (hueObjectiu < 160) {
            frequencia = 330;
        } else if (hueObjectiu > 225) {
            frequencia = 587;
        }

        const veu = this.toca(frequencia / 2, "triangle", 0.1, 14, 0.6);
        veu.osc.freq(frequencia, 0.4);
    }

    // l'espectador fa clic: barrit descendent
    notaOna() {
        if (!this.actiu) return;

        const veu = this.toca(660, "sine", 0.12, 8, 0.6);
        veu.osc.freq(165, 0.6);
    }

}