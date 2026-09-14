# Sesión 03 · Arte generativo con `random()`, `noise()` y semillas

## Descripción

Esta sesión introduce el arte generativo como diseño basado en reglas.
El objetivo es crear un lienzo estático artístico que cambie entre
variaciones pero siga siendo reproducible cuando se fija una semilla.

El [tutorial interactivo](index.html) presenta la secuencia completa. Los
sketches asociados están en:

- [`sketches/ac01-variation-a`](sketches/ac01-variation-a/)
- [`sketches/ac01-variation-b`](sketches/ac01-variation-b/)
- [`sketches/ac01-variation-c`](sketches/ac01-variation-c/)

## Objetivos de aprendizaje

Al finalizar la sesión, el estudiante podrá:

- explicar la diferencia entre `random()` y `noise()`;
- usar `randomSeed()` y `noiseSeed()` para repetir resultados;
- definir reglas geométricas para generar una composición;
- aplicar `lerp()` para transiciones suaves en color, tamaño o posición.

## Prerrequisitos

Se recomienda haber completado las sesiones 01 y 02, y dominar la estructura
básica de `setup()` y `draw()`, uso de variables y bucles simples.

## Desarrollo de la sesión

1. **Aleatoriedad reproducible.** Introduce `random()` y muestra que, con la
   misma semilla (`randomSeed`), la secuencia se repite.
2. **Ruido coherente.** Compara `noise()` frente a `random()` para observar
   continuidad y fluidez visual.
3. **Interpolación.** Presenta `lerp(a, b, t)` como herramienta para suavizar
   transiciones.
4. **Sistema de reglas.** Define paleta, retícula, densidad y jerarquías para
   convertir la idea en un cartel generativo.

## Práctica guiada

Abre los sketches de la sesión y sigue estos pasos:

1. en `ac01-variation-a`, cambia la semilla y anota qué elementos se repiten;
2. en `ac01-variation-b`, modifica escalas de `noise` para obtener texturas
   más calmadas o más turbulentas;
3. en `ac01-variation-c`, ajusta los extremos de `lerp()` y compara el efecto
   visual en la transición de color y tamaño;
4. exporta tres resultados y escribe las reglas visuales usadas.

## Actividad de consolidación

**AC.01 — Cuadro generativo**

Crea una pieza/cartel generativo en p5.js a partir de un concepto visual,
usando `random()` y/o `noise()`, patrones geométricos y semillas.
Entrega tres variaciones del mismo sistema y explica las reglas visuales que
producen coherencia entre las variantes.

## Referencias

- [Referencia de p5.js](https://p5js.org/reference/)
- [Referencia de `random()`](https://p5js.org/reference/p5/random/)
- [Referencia de `noise()`](https://p5js.org/reference/p5/noise/)
- [Referencia de `randomSeed()`](https://p5js.org/reference/p5/randomSeed/)
- [Referencia de `noiseSeed()`](https://p5js.org/reference/p5/noiseSeed/)
- [Referencia de `lerp()`](https://p5js.org/reference/p5/lerp/)
