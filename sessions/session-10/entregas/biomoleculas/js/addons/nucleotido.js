// Cada tipo tiene su color
function colorNucleotido(tipo) {
    if (tipo === 'A') return color(255, 90, 150);
    if (tipo === 'T') return color(190, 90, 255);
    if (tipo === 'G') return color(255, 150, 220);
    return color(130, 120, 255); // C
}

// El complementario de cada tipo
let complementos = { A: 'T', T: 'A', G: 'C', C: 'G' };

class Nucleotido extends Molecula {

    constructor(x, y) {
        let tipo = random(['A', 'T', 'G', 'C']);
        super(x, y, colorNucleotido(tipo), 14, 1.5);
        this.tipo = tipo;
        this.maxEnlaces = 1;
        this.velocidadBase = this.velocidad;
        this.largoEnlace = 24;
        this.parejas = 0;
        this.maxParejas = 3;
        this.energia = 0; // frames que le quedan de ATP
    }

    interactuar(otra) {
        if (!(otra instanceof Nucleotido)) return;

        this.separar(otra, 16);
        if (this.pausa > 0 || otra.pausa > 0) return;

        let estoyLibre = this.enlaces.length === 0;
        let ellaEstaLibre = otra.enlaces.length === 0;
        if (!estoyLibre || !ellaEstaLibre) return;

        if (complementos[this.tipo] !== otra.tipo) return;

        let d = dist(this.x, this.y, otra.x, otra.y);

        // Atracción suave a distancia
        if (d < 120 && d > 0) {
            let fx = ((otra.x - this.x) / d) * 0.25;
            let fy = ((otra.y - this.y) / d) * 0.25;
            this.x += fx;
            this.y += fy;
            otra.x -= fx;
            otra.y -= fy;
        }

        // Si están muy cerca, se emparejan
        if (d < 26) {
            this.enlaces.push(otra);
            otra.enlaces.push(this);
            this.parejas++;
            otra.parejas++;
            crearParticulas((this.x + otra.x) / 2, (this.y + otra.y) / 2, this.color, 6);
            sonar('formar');

            if (this.parejas >= this.maxParejas) this.mutar();
            else if (otra.parejas >= otra.maxParejas) otra.mutar();
        }
    }

    // Cambia de tipo y rompe su pareja
    mutar() {
        this.pausa = 90;
        this.pulso = 1;

        for (let o of this.enlaces) {
            o.enlaces = o.enlaces.filter((e) => e !== this);
        }
        this.enlaces = [];

        let otrosTipos = ['A', 'T', 'G', 'C'].filter((t) => t !== this.tipo);
        this.tipo = random(otrosTipos);
        this.color = colorNucleotido(this.tipo);
        this.parejas = 0;

        crearParticulas(this.x, this.y, color(255, 255, 255), 12);
    }

    mover() {
        this.velocidad = this.velocidadBase / (1 + this.enlaces.length);
        if (this.energia > 0) {
            this.velocidad *= 2;
            this.energia--;
        }

        for (let otra of this.enlaces) {
            let sumaX = cos(this.angulo) + cos(otra.angulo);
            let sumaY = sin(this.angulo) + sin(otra.angulo);
            this.angulo = atan2(sumaY, sumaX);
        }

        super.mover();

        for (let otra of this.enlaces) {
            let d = dist(this.x, this.y, otra.x, otra.y);
            if (d > 0) {
                let error = d - this.largoEnlace;
                this.x += ((otra.x - this.x) / d) * error * 0.1;
                this.y += ((otra.y - this.y) / d) * error * 0.1;
            }
        }
    }

    // Puentes de hidrógeno: 2 líneas para A-T, 3 para G-C
    dibujarEnlaces() {
        if (this.tipo !== 'A' && this.tipo !== 'G') return;

        for (let otra of this.enlaces) {
            let cantidad = (this.tipo === 'G') ? 3 : 2;
            let a = atan2(otra.y - this.y, otra.x - this.x);

            stroke(255, 255, 255, 200);
            strokeWeight(1.5);
            for (let i = 0; i < cantidad; i++) {
                let desplazamiento = (i - (cantidad - 1) / 2) * 4;
                let px = -sin(a) * desplazamiento;
                let py = cos(a) * desplazamiento;
                line(this.x + px, this.y + py, otra.x + px, otra.y + py);
            }
        }
    }

    dibujar() {
        let t = this.tamano * (1 + this.pulso * 0.6);
        if (this.energia > 0) t *= 1.4; // con ATP es más grande

        rectMode(CENTER);
        noStroke();
        fill(this.color);
        square(this.x, this.y, t);

        fill(10, 10, 20);
        textAlign(CENTER, CENTER);
        textSize(10);
        text(this.tipo, this.x, this.y);

        // Todo lo del ATP va DENTRO de este if
        if (this.energia > 0) {
            fill(255, 150, 40);
            for (let i = -1; i <= 1; i++) {
                circle(this.x + i * 6, this.y + t / 2 + 5, 4);
            }
            textSize(9);
            text('ATP', this.x, this.y - t / 2 - 8);
        }
    }
}