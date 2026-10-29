# 02AC_ARIJOVE

## Getting Started

Open `index.html` in your web browser and start editing `sketch.js`.

## Running Locally

For projects with media files, use a local server:

```bash
# Using Python
python -m http.server 8000

# Using Node.js
npx http-server

# Using VS Code Live Server extension
# Right-click index.html -> "Open with Live Server"
```

## Resources

- [p5.js 2.0](https://beta.p5js.org/)
- [p5.js Reference](https://p5js.org/reference/)


# Sistema Vivo

Obra audiovisual interactiva hecha con p5.js y p5.sound (HTML, CSS y JavaScript) para la AC.02 de Programación creativa.

## Concepto

*Sistema Vivo* es un pequeño ecosistema digital inspirado en las cuatro biomoléculas esenciales del cuerpo humano: carbohidratos, aminoácidos, lípidos y nucleótidos. Tiene un interés didáctico: la idea es que el espectador vea cómo se agrupan y cómo se afectan unas a otras, sin que haya ganadores ni perdedores.

Las moléculas se mueven solas y reaccionan cuando se encuentran. De esas reglas sencillas salen cadenas, membranas, parejas y rupturas que no están dibujadas de antemano. Es una versión simplificada de la bioquímica real, no una simulación exacta.

## Familias de agentes

La pieza empieza con 145 agentes repartidos en cuatro familias:

- **Carbohidratos (30, naranja):** se enlazan formando cadenas. Son la fuente de energía del sistema.
- **Aminoácidos (45, azul):** también forman cadenas, y al llegar a 5 se pliegan en un anillo. Una proteína plegada actúa como enzima.
- **Lípidos (40, amarillo):** se acercan entre sí y, al juntarse 8, forman una membrana en círculo.
- **Nucleótidos (30, tonos rosas y violetas):** tienen un tipo (A, T, G o C) y se emparejan con su complementario. Si se emparejan demasiadas veces, mutan.

## Reglas y relaciones

Cada molécula comprueba qué tiene cerca y reacciona según su familia. Las relaciones entre familias son estas:

- Una **proteína plegada** rompe las cadenas de **carbohidratos**.
- Un **carbohidrato** recién liberado, si pasa cerca de un **nucleótido**, se gasta y lo convierte en ATP durante unos segundos (más grande, más rápido y con etiqueta).
- La **membrana de lípidos** absorbe los **nucleótidos** libres y empuja a las demás moléculas.
- Si se pegan **3 carbohidratos** a una membrana, esta estalla y los lípidos se dispersan.
- Una **pareja de nucleótidos** atrae a los **aminoácidos** libres y los consume para fabricar proteínas.

Así queda un ciclo: aminoácidos → carbohidratos → lípidos → nucleótidos → aminoácidos. Las moléculas que desaparecen vuelven a aparecer a los 5 segundos en otro punto, y por eso las poblaciones suben y bajan con el tiempo.

## Cómo está hecho

**Movimiento.** Todas las familias heredan de una clase base, Molecula, que tiene el método mover(). Cada molécula guarda su posición (x, y), una velocidad y un angulo. En cada fotograma avanza con cos(angulo) y sin(angulo) multiplicados por la velocidad, y el ángulo cambia un poco con random(-0.1, 0.1), así que el recorrido es orgánico y no una línea recta. Al llegar a un borde, el ángulo se refleja (PI - angulo en horizontal y -angulo en vertical) y constrain() mantiene la molécula dentro del lienzo.
Las moléculas enlazadas se guardan en la lista enlaces, y cada familia tiene un límite (maxEnlaces). La función dist() detecta cuándo dos están lo bastante cerca para enlazarse, y separar() evita que se solapen.
Cuando se rompe un enlace, la función romperEnlace() da a las dos moléculas un impulso (ix, iy) en direcciones opuestas, que se apaga multiplicándolo por 0.92 en cada fotograma. También les pone una pausa de 90 fotogramas (unos 1,5 segundos), durante la cual interactuar() no les deja volver a enlazarse.


**Partículas.** Hay dos clases secundarias, `Particula` y `Onda`. Nacen en los eventos importantes (enlaces, plegados, absorciones, roturas), se desvanecen y se eliminan al acabar su vida.

**Interacción.** Al hacer clic o arrastrar sobre los enlaces se rompen. El ratón hace de agua (hidrólisis) y además puede hacer mutar a los nucleótidos cercanos. La tecla **R** y el botón de reiniciar crean un mundo nuevo.

**Sonido.** Con p5.sound. Hay tres sonidos puntuales, siempre los mismos para el mismo tipo de suceso: uno seco para cuando algo se rompe, uno que sube cuando algo se forma y uno que baja cuando algo desaparece. Además hay un ambiente de fondo suave que cambia según cuántas moléculas están enlazadas. El audio empieza al pulsar "Entrar en la obra", porque el navegador necesita un clic para permitirlo.

## Decisiones estéticas

Fondo oscuro para que destaquen las moléculas. Cada familia tiene su color (naranja, azul, amarillo y rosa), y cada acción importante tiene su sonido, para que la pieza siga un orden y se pueda entender sin leer. Los nucleótidos son cuadrados con su letra para distinguirlos de las demás. La portada es sencilla y explica solo lo esencial: las cuatro moléculas, quién altera a quién y cómo intervenir.

## Dificultades e ideas futuras

Lo más difícil fue ajustar las relaciones: al principio las moléculas se amontonaban, se volvían a enlazar al instante o una familia tenía demasiado poder sobre las demás. También me costó el sonido, que al principio era demasiado fuerte, largo y desordenado, y algunas funciones de p5.sound no existían en mi versión.

Como ideas futuras: refinar las reglas biológicas, hacer más visible la transferencia de energía, que la membrana pueda fusionarse con otras y que el espectador tenga más formas de intervenir.

## Uso de inteligencia artificial

He usado IA (Claude) como apoyo durante todo el proceso: para investigar la base biológica, revisar el código y corregir errores. Me ayudó sobre todo con el sonido, con la lógica de destruir y crear moléculas, y con la interacción del usuario.

Le pedía lo que quería que pasara en la pieza, le explicaba qué fallaba y le pasaba mi código y los errores de la consola. También le pedí que me explicara las funciones de p5.js para entender lo que programaba. Después probaba cada propuesta y la adaptaba a mi idea.

## Ejecución

Abrir `index.html` con un servidor local (por ejemplo Live Server en VS Code), pulsar **Entrar en la obra**, hacer clic sobre los enlaces para romperlos y pulsar **R** para reiniciar.
