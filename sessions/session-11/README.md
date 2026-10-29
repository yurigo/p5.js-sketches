# Sesión 11 · Recursividad y fractales

## Descripción

En esta sesión se explora la recursividad como una forma de describir patrones
que se repiten a distintas escalas. A partir de funciones que se llaman a sí
mismas, se construyen estructuras ramificadas y geométricas: una composición
recursiva, un árbol, el triángulo de Sierpiński y una curva de Koch animada.

El [tutorial interactivo](index.html) organiza el recorrido y enlaza los cuatro
[ejemplos de la sesión](examples/).

## Objetivos de aprendizaje

Al finalizar la sesión, el estudiante podrá:

- identificar la llamada recursiva y el caso base de una función;
- explicar cómo el caso base limita la profundidad y termina el proceso;
- trazar las llamadas de una función recursiva y anticipar el crecimiento de
  sus ramas;
- utilizar `push()`, `pop()`, `translate()` y `rotate()` para dibujar instancias
  recursivas en distintos lugares y orientaciones;
- comparar cómo cambian un fractal al variar su profundidad, sus ángulos o la
  escala de cada llamada;
- reconocer patrones recursivos en árboles, triángulos y curvas geométricas.

## Prerrequisitos

Se recomienda conocer funciones con parámetros, condicionales, bucles y
coordenadas en p5.js. También conviene haber utilizado `push()` y `pop()` para
aislar transformaciones. No se requieren conocimientos previos sobre fractales.

## Desarrollo de la sesión

1. **Reconocer la recursividad.** Abre
   [Fractals](examples/fractals/index.html) y localiza `ramita(valor)`. Sigue
   cómo el segmento se dibuja, se desplaza y vuelve a llamar a la función con un
   valor mayor. Identifica el caso base `valor > 1000`.
2. **Ramificar una llamada.** En el
   [árbol fractal](examples/fractal-tree/index.html), observa que cada llamada
   puede producir tres nuevas ramas. El proceso termina cuando `valor < 50`;
   las transformaciones y los ángulos aleatorios orientan los segmentos.
3. **Subdividir una figura.** En el
   [triángulo de Sierpiński](examples/sierpinski-triangle/index.html), sigue las
   tres llamadas que reducen a la mitad el lado y disminuyen el nivel. Las
   teclas `1` y `2` cambian la profundidad, entre 0 y 8.
4. **Repetir un procedimiento geométrico.** Abre la
   [curva de Koch](examples/koch-snowfake/index.html) y localiza las cuatro
   llamadas que sustituyen cada segmento por cuatro tramos. Al llegar al caso
   base, la función dibuja cuatro líneas; la elevación del punto intermedio se
   anima durante los primeros 120 fotogramas.
5. **Comparar estructuras.** Describe cómo las condiciones de parada, el número
   de llamadas y el cambio de escala afectan a la forma y al coste de dibujar
   cada ejemplo.

## Práctica guiada

1. En `fractals/sketch.js`, cambia `petalos` y `incremento`. Observa cómo varían
   la simetría y la longitud de la secuencia recursiva. La rueda del ratón
   también modifica `incremento`.
2. En `fractal-tree/sketch.js`, cambia el umbral `valor < 50` y el divisor
   `valor / 1.5`. Recarga la página para comparar el número y tamaño de las
   ramas; explica qué evita el caso base.
3. En `sierpinski-triangle/sketch.js`, usa `1` y `2` para explorar distintos
   niveles. Cuenta cuántos triángulos aparecen y relaciona el resultado con las
   tres llamadas recursivas.
4. En `koch-snowfake/sketch.js`, modifica el argumento `steps` de `snowflake()`.
   Antes de ejecutarlo, predice cuántas líneas habrá por lado: cada nivel
   produce cuatro llamadas y el caso base dibuja cuatro líneas.
5. Dibuja el árbol de llamadas de una de las funciones con dos niveles de
   profundidad. Marca el caso base y el valor que cambia en cada llamada.

## Actividad de consolidación

Diseña un fractal propio a partir de uno de los ejemplos. Define qué datos recibe
la función, qué condición detiene la recursión y qué modificación se aplica en
cada nivel (por ejemplo, reducir el tamaño, cambiar el ángulo o desplazar la
figura). Incluye un boceto del árbol de llamadas y comprueba que la profundidad
está limitada.

## Referencias

- [Referencia de p5.js](https://p5js.org/reference/)
- [Referencia de `push()`](https://p5js.org/reference/p5/push/)
- [Referencia de `pop()`](https://p5js.org/reference/p5/pop/)
- [Referencia de `translate()`](https://p5js.org/reference/p5/translate/)
- [Referencia de `rotate()`](https://p5js.org/reference/p5/rotate/)
- [Fractal](https://es.wikipedia.org/wiki/Fractal), conceptos y ejemplos.
