# Sesión 06 · Agentes y partículas

## Descripción

Esta sesión introduce dos ideas conectadas entre sí: un sistema de agentes
autónomos que recorren la escena y reaccionan a la posición del ratón, y un
sistema de partículas que reutiliza la clase `Ball` para convertir cada agente
en una partícula con tiempo de vida limitado (`ttl`).

El [tutorial interactivo](index.html) resume la secuencia de trabajo. Los
sketches asociados están en:

- [`sketches/sistema-de-agentes`](sketches/sistema-de-agentes/)
- [`sketches/sistema-particulas`](sketches/sistema-particulas/)

## Objetivos de aprendizaje

Al finalizar la sesión, el estudiante podrá:

- describir cómo una clase permite reutilizar comportamiento en varios sketches;
- programar agentes que se desplazan de forma autónoma y reaccionan al ratón;
- relacionar distancia, color y conexiones entre objetos en movimiento;
- ampliar una clase existente para convertirla en una partícula con `ttl`;
- construir un emisor en `draw()` que crea, actualiza y destruye partículas.

## Prerrequisitos

Se recomienda haber completado las sesiones 01 a 05 y manejar con soltura la
estructura de `setup()` y `draw()`, arrays, clases sencillas en JavaScript y el
uso de `dist()` y `map()` en p5.js.

## Desarrollo de la sesión

1. **Sistema de agentes.** Observa cómo se crea un array de bolas y cómo cada
   instancia de `Ball` mantiene posición, velocidad, diámetro y brillo.
2. **Respuesta al ratón.** Analiza `updateColor(mouseX, mouseY)` para ver cómo
   la distancia al puntero modifica la luminosidad de cada agente.
3. **Constelaciones dinámicas.** Revisa `updateLineasConstelacion()` para
   detectar cómo cada agente dibuja líneas con sus vecinos cercanos.
4. **Reutilización de clases.** Compara ambas versiones de `Ball` para entender
   qué propiedades cambian al pasar de agente a partícula.
5. **Emisión y ciclo de vida.** En `sistema-particulas`, observa cómo `draw()`
   actúa como emisor y cómo `filter()` elimina las partículas agotadas.

## Práctica guiada

Abre los sketches de la sesión y realiza estas acciones en orden:

1. en `sistema-de-agentes`, mueve el ratón por el lienzo y describe cómo cambia
   el brillo de los agentes según su cercanía al puntero;
2. identifica qué método controla el desplazamiento autónomo y qué ocurre cuando
   un agente sale por un borde del canvas;
3. en `sistema-particulas`, explica por qué las nuevas partículas nacen en el
   centro del lienzo y por qué suben hacia arriba;
4. cambia temporalmente el valor inicial de `ttl` o la velocidad vertical para
   comprobar cómo se altera la duración visual del sistema.

## Actividad de consolidación

Crea una variante en la que un agente emita partículas desde su posición actual
cuando el ratón se acerque a él. Decide qué propiedades hereda la partícula de
la clase base y cuáles necesitas redefinir para que el sistema siga siendo
legible y eficiente.

## Referencias

- [Referencia de p5.js](https://p5js.org/reference/)
- [Referencia de `dist()`](https://p5js.org/reference/p5/dist/)
- [Referencia de `map()`](https://p5js.org/reference/p5/map/)
- [Daniel Shiffman · The Coding Train](https://www.youtube.com/@TheCodingTrain)
- [Daniel Shiffman · The Nature of Code: Particles](https://natureofcode.com/particles/)
