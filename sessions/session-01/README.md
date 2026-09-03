# Sesión 01 · Introducción a p5.js

## Descripción

Esta sesión introduce el modelo de programación de p5.js mediante la creación
progresiva de una composición gráfica. El trabajo comienza con la estructura
de un sketch y termina con la animación y la detección de colisiones de un
círculo.

El [tutorial interactivo](index.html) presenta el recorrido completo. El
resultado de la sesión se encuentra en
[`sketches/hellop5js`](sketches/hellop5js/).

## Objetivos de aprendizaje

Al finalizar la sesión, el estudiante podrá:

- crear un proyecto p5.js y reconocer la responsabilidad de `setup()` y
  `draw()`;
- representar figuras geométricas mediante `circle()`, `square()` y
  `triangle()`;
- aplicar color con `fill()` y colocar elementos usando `width` y `height`;
- describir `draw()` como un bucle de actualización y utilizar variables para
  representar el estado de una animación;
- implementar el movimiento vertical y la reflexión de un objeto en los
  límites del lienzo.

## Preparación del entorno

Se recomienda utilizar Visual Studio Code con la extensión **p5.js 2.x Project
Generator**:

| Campo | Valor |
| --- | --- |
| Identificador | `Irti.p5js-project-generator` |
| Versión | `1.1.2` |
| Editor | IrtizaNasar |
| [Marketplace](https://marketplace.visualstudio.com/items?itemName=Irti.p5js-project-generator) | Ficha de la extensión |

En Visual Studio Code, abre la paleta de comandos con `Cmd` + `Shift` + `P` y
ejecuta **Create a p5.js project**. También puedes abrir directamente el
sketch de esta sesión desde el enlace del apartado anterior.

## Desarrollo de la sesión

1. **Estructura del programa.** Identifica el lienzo y el papel de
   `setup()` (inicialización) y `draw()` (actualización y renderizado).
2. **Geometría.** Dibuja círculos y compara sus parámetros con los de
   cuadrados y triángulos.
3. **Color y coordenadas.** Utiliza `fill()` y sitúa las figuras con
   coordenadas relativas al lienzo mediante `width` y `height`.
4. **Animación.** Observa que `draw()` se repite continuamente y modifica la
   posición vertical de uno de los círculos en cada fotograma.
5. **Colisiones.** Invierte la velocidad cuando el centro del círculo alcanza
   un borde; después, corrige la condición para tener en cuenta su radio y
   evitar que el perímetro atraviese el límite.

## Práctica guiada

Abre [el sketch de la sesión](sketches/hellop5js/index.html) y realiza estos
cambios en orden:

1. cambia el tamaño del lienzo y comprueba cómo afectan `width` y `height`;
2. modifica los colores y el diámetro de las tres figuras;
3. altera la velocidad vertical y explica el efecto de su signo;
4. añade movimiento y colisiones a los dos círculos restantes.

## Actividad de consolidación

Completa el último paso sin copiar la solución del sketch. Documenta qué
variable representa la posición, cuál representa la velocidad y por qué la
colisión debe considerar el radio del círculo. Como ampliación, prueba una
velocidad horizontal independiente.

## Referencias

- [Referencia de p5.js](https://p5js.org/reference/)
- [Referencia de `circle()`](https://p5js.org/reference/p5/circle/)
- [Referencia de `fill()`](https://p5js.org/reference/p5/fill/)
