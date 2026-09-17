# Sesión 05 · `dist()` y `map()`

## Descripción

Esta sesión se centra en dos funciones muy útiles para construir relaciones
visuales en p5.js: `dist()` para medir la separación entre dos puntos y
`map()` para transformar un valor de un rango en otro. A partir de esas ideas
se trabajaron dos sketches donde el ratón modifica color, tamaño y luminosidad
según su posición o su cercanía a otros elementos.

El [tutorial interactivo](index.html) resume la secuencia de trabajo. Los
sketches asociados están en:

- [`sketches/raton-colorao`](sketches/raton-colorao/)
- [`sketches/no-me-mires`](sketches/no-me-mires/)

## Objetivos de aprendizaje

Al finalizar la sesión, el estudiante podrá:

- calcular la distancia entre el puntero y un objeto con `dist()`;
- transformar distancias y coordenadas en color, brillo o tamaño con `map()`;
- explicar cómo una misma entrada (`mouseX`, `mouseY`) puede controlar varios
  parámetros visuales a la vez;
- diseñar composiciones reactivas donde la proximidad del ratón altere el
  comportamiento del dibujo.

## Prerrequisitos

Se recomienda haber completado las sesiones 01 a 04 y manejar con soltura la
estructura de `setup()` y `draw()`, las variables globales del ratón y el uso
básico de color en p5.js.

## Desarrollo de la sesión

1. **Medir proximidad.** Introduce `dist(x1, y1, x2, y2)` para comparar la
   posición del ratón con un punto del lienzo.
2. **Traducir valores.** Usa `map(valor, inicio1, fin1, inicio2, fin2)` para
   convertir una distancia o coordenada en un nuevo parámetro visual.
3. **Control por posición.** En `raton-colorao`, observa cómo `mouseY` controla
   el matiz y `mouseX` el diámetro del círculo que sigue al ratón.
4. **Control por cercanía.** En `no-me-mires`, analiza cómo varias bolas cambian
   su luminosidad en función de la distancia al puntero.
5. **Composición reactiva.** Compara ambos sketches para identificar cuándo
   interesa mapear una coordenada absoluta y cuándo conviene mapear una
   distancia relativa.

## Práctica guiada

Abre los sketches de la sesión y realiza estas acciones en orden:

1. en `raton-colorao`, mueve el ratón de arriba abajo y describe cómo cambia el
   valor de `hue`;
2. en ese mismo sketch, recorre el lienzo de izquierda a derecha para comprobar
   cómo `map()` modifica el diámetro del círculo;
3. en `no-me-mires`, acerca el puntero a distintas bolas y compara el valor de
   `vergonzosidad` con la distancia calculada por `dist()`;
4. modifica los rangos de `map()` en ambos sketches y justifica cómo cambia la
   respuesta visual.

## Actividad de consolidación

Diseña una variante propia en la que el ratón controle al menos dos propiedades
visuales diferentes: una a partir de la posición (`mouseX` o `mouseY`) y otra a
partir de la proximidad a un objeto usando `dist()`. Explica qué rango de
entrada recibe cada variable y a qué rango de salida se transforma con `map()`.

## Referencias

- [Referencia de p5.js](https://p5js.org/reference/)
- [Referencia de `dist()`](https://p5js.org/reference/p5/dist/)
- [Referencia de `map()`](https://p5js.org/reference/p5/map/)
- [Referencia de `mouseX`](https://p5js.org/reference/p5/mouseX/)
- [Referencia de `mouseY`](https://p5js.org/reference/p5/mouseY/)
- [Referencia de `colorMode()`](https://p5js.org/reference/p5/colorMode/)
