# Sesión 04 · Interacción con el usuario

## Descripción

Esta sesión introduce la interacción directa con el usuario en p5.js. El foco
está en responder a clics, rueda del ratón y teclado, además de observar cómo
las variables globales del entorno (`mouseX`, `mouseY`, `pmouseX`, `pmouseY`,
`key` y `keyIsPressed`) permiten convertir la entrada del usuario en dibujo,
cambio visual y control del sketch.

El [tutorial interactivo](index.html) presenta la secuencia completa. Los
sketches asociados están en:

- [`sketches/clicked-constellations`](sketches/clicked-constellations/)
- [`sketches/wheel-trails`](sketches/wheel-trails/)
- [`sketches/key-playground`](sketches/key-playground/)
- [`sketches/interactive-art`](sketches/interactive-art/)
- [`sketches/draw-io`](sketches/draw-io/)

## Objetivos de aprendizaje

Al finalizar la sesión, el estudiante podrá:

- usar `mouseClicked()` para capturar posiciones del lienzo;
- interpretar `mouseX`, `mouseY`, `pmouseX` y `pmouseY` para dibujar con el
  movimiento del ratón;
- modificar parámetros visuales con `mouseWheel()`;
- reaccionar a `keyPressed()` y leer `key` y `keyIsPressed` para controlar un
  sketch.

## Prerrequisitos

Se recomienda haber completado las sesiones 01, 02 y 03, y dominar la
estructura básica de `setup()` y `draw()`, además de variables, condicionales y
bucles sencillos.

## Desarrollo de la sesión

1. **Clic como evento discreto.** En `clicked-constellations`, cada clic añade
   un punto visual en la posición actual del ratón usando `mouseClicked()`.
2. **Movimiento y rastro.** En `wheel-trails`, el dibujo conecta `pmouseX` /
   `pmouseY` con `mouseX` / `mouseY` para hacer visible el recorrido del puntero.
3. **Parámetros continuos.** En ese mismo sketch, `mouseWheel()` cambia el
   grosor del trazo para comprobar que la rueda modifica el estado del programa.
4. **Teclado como control.** En `key-playground`, `keyPressed()` actualiza el
   modo de trabajo, mientras `key` y `keyIsPressed` muestran qué tecla está
   activa y si hay una pulsación sostenida.
5. **Combinación de entradas.** En `interactive-art`, el clic cambia el color,
   la rueda modifica el tamaño y el teclado alterna la figura para practicar la
   coordinación de varios eventos.
6. **Dibujo libre reactivo.** En `draw-io`, el ratón deja un rastro continuo y
   una pulsación de teclado desencadena un cambio puntual sobre la composición.

## Práctica guiada

Abre los sketches de la sesión y realiza estas acciones en orden:

1. en `clicked-constellations`, haz varios clics y observa cómo cambian las
   coordenadas mostradas en pantalla;
2. en `wheel-trails`, mueve el ratón lentamente y luego rápido para comparar la
   distancia entre `pmouseX` / `pmouseY` y `mouseX` / `mouseY`;
3. usa la rueda del ratón en `wheel-trails` para aumentar y reducir el grosor
   del pincel;
4. en `key-playground`, pulsa letras distintas para cambiar el símbolo dibujado
   y mantén una tecla pulsada para activar el modo continuo;
5. en `interactive-art`, pulsa el ratón, gira la rueda y usa la tecla `E` para
   observar cómo cada entrada altera un atributo distinto de la composición;
6. en `draw-io`, traza líneas con el puntero y prueba la tecla `R` para observar
   cómo una pulsación puede introducir un cambio puntual en pantalla.

## Actividad de consolidación

Diseña un sketch interactivo que combine al menos dos entradas de usuario: una
acción puntual (`mouseClicked()` o `keyPressed()`) y una variable continua
(`mouseX`, `mouseY` o `keyIsPressed`). Explica qué estado guarda el programa y
cómo se transforma ese estado en una respuesta visual. Como referencia, puedes
tomar `interactive-art`, donde varias entradas modifican distintos aspectos del
mismo dibujo.

## Referencias

- [Referencia de p5.js](https://p5js.org/reference/)
- [Referencia de `mouseClicked()`](https://p5js.org/reference/p5/mouseClicked/)
- [Referencia de `mouseWheel()`](https://p5js.org/reference/p5/mouseWheel/)
- [Referencia de `keyPressed()`](https://p5js.org/reference/p5/keyPressed/)
- [Referencia de `mouseX`](https://p5js.org/reference/p5/mouseX/)
- [Referencia de `pmouseX`](https://p5js.org/reference/p5/pmouseX/)
- [Referencia de `key`](https://p5js.org/reference/p5/key/)
- [Referencia de `keyIsPressed`](https://p5js.org/reference/p5/keyIsPressed/)
