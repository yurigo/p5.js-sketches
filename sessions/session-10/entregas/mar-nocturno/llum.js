class Llum {

    px;
    py;
    d;
    vx;
    vy;
    fase;
    espant;
    radiEspant;
    viva;
    medusaProxima;
    radiRefugi;
    hue;
    hueObjectiu;
    ensurts;
    ensurtComptat;
    empentaRatoli;

    constructor(px, py, d, hue) {
        this.px = px;
        this.py = py;
        this.d = d;
        this.vx = random(-0.5, 0.5);
        this.vy = random(-0.5, 0.5);
        this.fase = random(0, TWO_PI);
        this.espant = 0; // 0 = tranquil, 1 = molt espantada
        this.radiEspant = 150; // a quina distància nota un depredador
        this.viva = true; // passa a false quan un depredador la caça
        this.medusaProxima = null; // la medusa que li fa de refugi (si n'hi ha)
        this.radiRefugi = 80; // a quina distància nota una medusa
        this.hue = hue; // color actual (cian = 185)
        this.hueObjectiu = hue; // color cap al qual va canviant
        this.ensurts = 0; // quantes vegades s'ha espantat
        this.ensurtComptat = false; // per no comptar el mateix ensurt dues vegades
        this.empentaRatoli = 0; // 0 = fora del corrent del ratolí, 1 = dins
    }

    update(depredadors, meduses, ones) {
        this.updateEspant(depredadors);
        this.updateRefugi(meduses);
        this.updateOnes(ones);
        this.updateRatoli();
        this.updateMutacio();
        this.updateVelocitat();
        this.updatePosition();
    }

    // regla 1: la por. Si un depredador és a prop, la llum fuig i s'il·lumina
    updateEspant(depredadors) {
        let espantObjectiu = 0;

        for (const depredador of depredadors) {
            const distancia = dist(this.px, this.py, depredador.px, depredador.py);

            if (distancia < this.radiEspant && distancia > 0) {
                // direcció contrària al depredador (vector unitari)
                const dx = (this.px - depredador.px) / distancia;
                const dy = (this.py - depredador.py) / distancia;

                // com més a prop, més fort és l'empenta sobre la velocitat
                const forca = map(distancia, 0, this.radiEspant, 0.3, 0);
                this.vx += dx * forca;
                this.vy += dy * forca;

                // la por és la del depredador més proper
                const espantAquest = map(distancia, 0, this.radiEspant, 1, 0);
                espantObjectiu = max(espantObjectiu, espantAquest);
            }
        }

        // la por puja i baixa suaument
        this.espant = lerp(this.espant, espantObjectiu, 0.1);

        // comptem un ensurt cada cop que la por puja molt (i no el tornem a comptar
        // fins que s'hagi calmat)
        if (!this.ensurtComptat && this.espant > 0.4) {
            this.ensurtComptat = true;
            this.ensurts++;
            so.notaLlum(this.px, this.hue);
        }
        if (this.ensurtComptat && this.espant < 0.1) {
            this.ensurtComptat = false;
        }
    }

    // interacció: les ones que llança l'espectador empenyen i espanten les llums
    updateOnes(ones) {
        for (const ona of ones) {
            const distancia = dist(this.px, this.py, ona.px, ona.py);

            // només les toca el front de l'ona (una franja de 25 px a cada costat)
            if (distancia > ona.radi - 25 && distancia < ona.radi + 25 && distancia > 0) {
                const dx = (this.px - ona.px) / distancia;
                const dy = (this.py - ona.py) / distancia;

                this.vx += dx * 0.6;
                this.vy += dy * 0.6;
                this.espant = max(this.espant, 0.6);
            }
        }
    }

    // interacció: el ratolí és un corrent que atreu o repel·leix les llums
    // (modeRatoli, forcaRatoli i RADI_RATOLI són variables globals de sketch.js)
    updateRatoli() {
        let dinsDelCorrent = 0;

        if (ratoliDins()) {
            const distancia = dist(this.px, this.py, mouseX, mouseY);

            if (distancia < RADI_RATOLI && distancia > 0) {
                const dx = (mouseX - this.px) / distancia;
                const dy = (mouseY - this.py) / distancia;

                // la força és forta a prop del ratolí i no cau del tot a la vora
                const forca = map(distancia, 0, RADI_RATOLI, forcaRatoli, forcaRatoli * 0.4);

                if (modeRatoli === ATREU) {
                    this.vx += dx * forca;
                    this.vy += dy * forca;
                } else {
                    this.vx -= dx * forca;
                    this.vy -= dy * forca;
                }

                dinsDelCorrent = 1;
            }
        }

        // entra i surt del corrent suaument (serveix per deixar-les anar més de pressa)
        this.empentaRatoli = lerp(this.empentaRatoli, dinsDelCorrent, 0.1);
    }

    // regla 4: la mutació. Després de 5 ensurts, la llum passa a un altre color
    // (cian, verd o violeta), sempre diferent del que tenia
    updateMutacio() {
        if (this.ensurts >= 5) {
            this.ensurts = 0;
            const opcions = [135, 185, 270].filter(h => {
                return h !== this.hueObjectiu;
            });
            this.hueObjectiu = random(opcions);
            so.notaMutacio(this.hueObjectiu);
        }

        // el canvi de color és suau però es nota ràpid
        this.hue = lerp(this.hue, this.hueObjectiu, 0.03);
    }

    // regla 2: el refugi. Si hi ha una medusa a prop, la llum s'hi acosta suaument
    updateRefugi(meduses) {
        this.medusaProxima = null;
        let millorDistancia = this.radiRefugi;

        // busquem la medusa més propera dins del radi
        for (const medusa of meduses) {
            const distancia = dist(this.px, this.py, medusa.px, medusa.py);

            if (distancia < millorDistancia && distancia > 0) {
                millorDistancia = distancia;
                this.medusaProxima = medusa;
            }
        }

        if (this.medusaProxima !== null) {
            // direcció cap a la medusa (vector unitari)
            const dx = (this.medusaProxima.px - this.px) / millorDistancia;
            const dy = (this.medusaProxima.py - this.py) / millorDistancia;

            // la por guanya: com més espantada, menys atracció
            const forca = 0.03 * (1 - this.espant);
            this.vx += dx * forca;
            this.vy += dy * forca;
        }
    }

    // la llum deriva: la velocitat canvia una mica a cada frame
    updateVelocitat() {
        this.vx += random(-0.03, 0.03);
        this.vy += random(-0.03, 0.03);

        // si està espantada o dins del corrent del ratolí, pot anar més ràpid
        const velMax = max(lerp(0.8, 3, this.espant), lerp(0.8, 2, this.empentaRatoli));
        this.vx = constrain(this.vx, -velMax, velMax);
        this.vy = constrain(this.vy, -velMax, velMax);
    }

    updatePosition() {
        this.px = this.px + this.vx;
        this.py = this.py + this.vy;

        if (this.px < 0) this.px = width;
        if (this.px > width) this.px = 0;
        if (this.py < 0) this.py = height;
        if (this.py > height) this.py = 0;
    }

    draw() {
        // brillantor suau que puja i baixa (cada llum amb la seva fase)
        const brillantor = map(sin(frameCount * 0.03 + this.fase), -1, 1, 55, 100);

        // fil de llum cap a la medusa refugi (s'esvaeix amb la distància i amb la por)
        if (this.medusaProxima !== null) {
            // tornem a mesurar la distància aquí: si la llum acaba de creuar la vora
            // de la pantalla, la medusa ja és lluny i no dibuixem el fil
            const distanciaFil = dist(this.px, this.py, this.medusaProxima.px, this.medusaProxima.py);

            if (distanciaFil < this.radiRefugi) {
                const alfaFil = map(distanciaFil, 0, this.radiRefugi, 45, 0) * (1 - this.espant);
                stroke(260, 40, 100, alfaFil);
                strokeWeight(1);
                line(this.px, this.py, this.medusaProxima.px, this.medusaProxima.py);
            }
        }

        noStroke();

        // halo: més gran i més intens quan està espantada
        fill(this.hue, 70, brillantor, map(this.espant, 0, 1, 12, 30));
        circle(this.px, this.py, this.d * map(this.espant, 0, 1, 4, 8));

        fill(this.hue, 60, brillantor, map(this.espant, 0, 1, 25, 45));
        circle(this.px, this.py, this.d * map(this.espant, 0, 1, 2, 4));

        // nucli: es torna més blanc quan està espantada
        fill(this.hue, map(this.espant, 0, 1, 30, 5), 100, 90);
        circle(this.px, this.py, this.d);
    }

}