# Sesión 08 · Sonido y DOM con p5.js

## Descripción

La sesión introduce las posibilidades de `p5.sound`, con especial atención a
`p5.Oscillator`, y compara la manipulación directa de elementos HTML con las
funciones DOM de p5.js. Los ejemplos disponibles permiten seguir un elemento
que responde al ratón en JavaScript nativo y un pequeño juego de recoger frutas
con p5.js, sin crear un canvas. El tercer ejemplo genera un tono con un
oscilador y relaciona su frecuencia y amplitud con la posición del ratón.

El [tutorial interactivo](index.html) presenta la secuencia completa. Los
ejemplos asociados están en:

- [`dom`](dom/): movimiento de un elemento con eventos y estilos nativos.
- [`dom-with-p5js`](dom-with-p5js/): elementos HTML seleccionados y creados con
  las funciones DOM de p5.js.
- [`sketches/oscillator-interactivo`](sketches/oscillator-interactivo/):
  síntesis de un tono controlado con el ratón mediante `p5.Oscillator`.

## Objetivos de aprendizaje

Al finalizar la sesión, el estudiante podrá:

- explicar cómo un oscilador produce un tono y cómo la frecuencia y la amplitud
  afectan a sus propiedades perceptivas;
- iniciar un `p5.Oscillator` tras una interacción del usuario y controlar sus
  parámetros con datos del ratón;
- proponer una relación entre una entrada o un estado visual y un sonido;
- distinguir la selección y modificación de elementos HTML nativos de las
  funciones equivalentes de p5.js;
- explicar cómo un evento de ratón puede actualizar la posición de un elemento
  HTML;
- utilizar `noCanvas()`, `select()`, `createDiv()`, `position()`, `html()` y
  `remove()` para construir una interacción DOM con p5.js.

## Prerrequisitos

Se recomienda haber completado las sesiones anteriores y conocer variables,
funciones, eventos básicos del ratón, selectores CSS y las funciones
`setup()`/`draw()` de p5.js. No se necesita experiencia previa con síntesis de
sonido.

## Desarrollo de la sesión

1. **Síntesis con `p5.Oscillator`.** Abre
   `sketches/oscillator-interactivo/` y activa el sonido con el botón. Observa
   que `mouseX` controla la frecuencia entre 110 y 880 Hz, mientras que `mouseY`
   controla la amplitud; compara el cambio de altura tonal y nivel percibido.
2. **DOM con JavaScript nativo.** Abre `dom/` e identifica cómo se selecciona
   `.bola` con `querySelector()` y cómo un evento `mousemove` actualiza sus
   propiedades CSS `top` y `left`.
3. **DOM desde p5.js.** Abre `dom-with-p5js/` y localiza `noCanvas()`,
   `select()` y `createDiv()`. Compara esas operaciones con sus equivalentes
   nativos.
4. **Interacción y estado.** Sigue el movimiento de la bola, la posición
   aleatoria de la fruta, la comprobación de proximidad y la actualización del
   marcador.
5. **Comparación.** Decide qué aporta la abstracción DOM de p5.js al ejemplo y
   qué operaciones siguen dependiendo de CSS y del navegador.

## Práctica guiada

1. En `dom/`, mueve el ratón y localiza en `index.js` el evento que actualiza
   la posición del elemento.
2. En `dom-with-p5js/`, identifica por qué `noCanvas()` permite trabajar sin
   crear un lienzo y cómo `select()` encuentra la bola existente en el HTML.
3. Sigue en `sketch.js` el ciclo de una fruta: creación, posición aleatoria,
   detección de contacto, incremento del contador y eliminación.
4. En `sketches/oscillator-interactivo/`, activa el tono y recorre el lienzo
   horizontalmente. Describe la relación entre posición y frecuencia; después,
   muévete verticalmente para comparar la amplitud.
5. Localiza en el código la inicialización de `p5.Oscillator`, el gesto que
   habilita el audio y las llamadas a `freq()` y `amp()`. Explica por qué el
   sonido no comienza automáticamente al cargar la página.
6. Cambia la lista de emojis o el color asignado a la bola y describe qué
   función de p5.js modifica cada elemento.
7. Propón una interacción sonora para el juego y anota qué evento la activaría
   y qué parámetro del oscilador podría variar. Consulta la referencia antes de
   implementarla.

## Actividad de consolidación

Amplía uno de los ejemplos con una respuesta adicional al ratón. Puede ser un
segundo elemento HTML que cambie de estilo o una propuesta sonora basada en
`p5.Oscillator`, por ejemplo cambiar el tipo de onda o controlar el tono desde
el estado del juego. Explica qué partes resuelves con JavaScript del navegador
y cuáles con las funciones de p5.js.

## Fundamento sonoro

Un oscilador genera una señal periódica. En este ejemplo se usa una onda
sinusoidal, adecuada para estudiar la relación entre los parámetros del
generador y el sonido resultante: `freq()` recibe una frecuencia en hercios que
se percibe principalmente como altura tonal, y `amp()` controla la amplitud de
la señal, relacionada con el nivel percibido. El puntero convierte una entrada
espacial continua en esos dos parámetros: la coordenada horizontal recorre de
110 a 880 Hz y la vertical modifica la amplitud. La práctica permite formular
una relación observable entre gesto, parámetro y resultado acústico.

El audio se inicia con el botón porque los navegadores normalmente requieren
una acción explícita del usuario antes de reproducir sonido. Al desactivar el
botón, se lleva la amplitud a cero; el oscilador deja de ser audible sin
reiniciar la fuente.

## Referencias

- [Referencia de p5.js](https://p5js.org/reference/)
- [Referencia de p5.sound](https://p5js.org/reference/#/libraries/p5.sound)
- [Referencia de `p5.Oscillator`](https://p5js.org/reference/p5.sound/p5.Oscillator/)
- [Referencia de `userStartAudio()`](https://p5js.org/reference/p5/userStartAudio/)
- [Referencia de DOM de p5.js](https://p5js.org/reference/#DOM)
- [Referencia de `select()`](https://p5js.org/reference/p5/select/)
- [Referencia de `createDiv()`](https://p5js.org/reference/p5/createDiv/)
- [dj_dave__](https://www.tiktok.com/@dj_dave__), divulgadora recomendada en clase.
