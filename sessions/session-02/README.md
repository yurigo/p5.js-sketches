# Sesión 02 · Formas, escenas y clase Persona

## Descripción

Esta sesión continúa la introducción a p5.js con cuatro sketches que avanzan
desde el rebote de una pelota hasta la construcción de escenas y personajes.
El foco está en combinar figuras primitivas, organizar el orden de dibujo,
interpretar matrices de texto como píxeles y reutilizar código mediante una
clase.

El [tutorial interactivo](index.html) presenta el recorrido completo. Los
resultados de la sesión se encuentran en:

- [`sketches/collision-ball`](sketches/collision-ball/)
- [`sketches/landscape`](sketches/landscape/)
- [`sketches/pixel-art`](sketches/pixel-art/)
- [`sketches/poo-persona`](sketches/poo-persona/)

## Objetivos de aprendizaje

Al finalizar la sesión, el estudiante podrá:

- explicar cómo se actualizan posición y velocidad en un sketch animado;
- combinar `circle()`, `rect()`, `triangle()`, `quad()`, `line()` y `arc()`
  para construir una escena completa;
- recorrer una matriz con bucles anidados para traducir símbolos a color;
- definir una clase `Persona` y crear varias instancias para reutilizar un
  mismo dibujo.

## Prerrequisitos

Se recomienda haber completado la Sesión 01 y reconocer la estructura básica
de `setup()` y `draw()`, además del uso elemental de variables para guardar
estado.

## Desarrollo de la sesión

1. **Movimiento y colisiones.** En `collision-ball`, identifica las variables
   `x`, `y`, `vx` y `vy`, y observa cómo cambian en cada fotograma.
2. **Composición por capas.** En `landscape`, revisa el orden en que se dibujan
   cielo, sol, montañas, lago, casa y detalles para comprender cómo se forma
   la escena final.
3. **Pixel art.** En `pixel-art`, estudia la matriz `pixelArt` y relaciona cada
   letra con un color para producir una imagen a partir de cuadrados.
4. **Programación orientada a objetos.** En `poo-persona`, analiza la clase
   `Persona`, su constructor y el método `draw()` para generar múltiples
   personajes.

## Práctica guiada

Abre los sketches de la sesión y realiza estas acciones en orden:

1. cambia la velocidad en `collision-ball` y describe cómo afectan el signo y
   la magnitud del movimiento;
2. modifica colores o posiciones en `landscape` para reorganizar la escena sin
   romper la profundidad visual;
3. sustituye algunos símbolos de `pixel-art` o añade uno nuevo para ampliar la
   paleta;
4. ajusta el tamaño, color o cantidad de instancias en `poo-persona`.

## Actividad de consolidación

Diseña una escena breve en la que aparezca al menos una forma animada, un fondo
por capas y un elemento repetido mediante una clase. Justifica qué partes del
código resuelven cada uno de esos objetivos y qué estructura reutilizarías en
un sketch nuevo.

## Referencias

- [Referencia de p5.js](https://p5js.org/reference/)
- [Referencia de `quad()`](https://p5js.org/reference/p5/quad/)
- [Referencia de `square()`](https://p5js.org/reference/p5/square/)
- [Referencia de clases en JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes)
