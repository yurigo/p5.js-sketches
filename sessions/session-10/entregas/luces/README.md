## Concepto

Hay tres familias de luces: magenta, turquesa y ámbar. Cuando dos luces de familias distintas se acercan, entre ellas aparece el color que está a medio camino en el círculo cromático:

- magenta + turquesa → violeta
- turquesa + ámbar → lima
- ámbar + magenta → coral

Si coinciden las tres, aparece el blanco. 

Visualmente buscaba algo parecido a mirar luces en una habitación a oscuras: un sistema que alterna calma y caos y que va dejando una memoria en el fondo.

## Familias

En total hay 120 agentes, 40 por familia. Cada familia se distingue por su color, por la forma del núcleo y por cómo se mueve:

- **Magenta:** triángulo que apunta hacia donde va. Es rápida y nerviosa (`noise()` más empujones con `random()`).
- **Turquesa:** anillo. Tiene un movimiento sinuoso porque sigue un campo de `noise()` muy cambiante.
- **Ámbar:** cuadrado que gira. Es lenta y grande, y planea siguiendo un campo de `noise()` amplio.

## Reglas

1. **Persecución en ciclo:** magenta persigue a turquesa, turquesa a ámbar y ámbar a magenta, y cada una huye de la que la persigue. 
2. **Conexiones:** dos luces de distinta familia a menos de 70 px se unen con un hilo del color de su mezcla.
3. **Encuentro:** si se tocan, destellan, la presa sale disparada y la que perseguía se frena.
4. **Mutación:** cada 4 encuentros una luz absorbe parte del color de la otra y crece un poco. Con el tiempo vuelve a su color original.
5. **Blanco:** si hay luces de las tres familias juntas, se produce una explosión que aparta a todas las que están cerca.

## Implementación

- **Movimiento:** parte de la clase `Vehicle`, a la que añadí `flee()` para huir y `wander()` para seguir un campo de `noise()`. La huida pesa más que la persecución para que las luces no se queden paradas.
- **Partículas:** siguen el esquema, `ttl`, `isAlive()` y `filter()`. Hay chispas de mezcla, explosiones blancas y partículas del prisma, además de ondas expansivas. Los rastros se dibujan en un `createGraphics()` que se va oscureciendo poco a poco.
- **Interacción:** con el ratón pulsado se atraen las luces cercanas, pero dentro del foco siguen con sus reglas. Así se provocan encuentros sin poder controlarlos.
- **Evolución:** la intensidad de la persecución cambia sola con `noise()`, el ciclo se invierte de vez en cuando, los colores mutan y los rastros se acumulan. Cada reinicio usa una semilla distinta.
- **Sonido:** todo se genera con p5.sound, como en la sesión 08.
  - Hay tres drones, uno por familia, que forman un acorde de La mayor. Su volumen depende de la velocidad de la familia y el paneo de su posición.
  - Un filtro sobre los drones se abre cuantos más hilos hay.
  - Cada encuentro toca una nota de una escala pentatónica.
  - Cada blanco suena con un golpe grave y el acorde completo.

## Decisiones estéticas

- Fondo casi negro y `blendMode(ADD)`, para que la luz se sume donde se solapa.
- Una paleta propia en vez de RGB puro, que resultaba demasiado esquemático. La mezcla se calcula por tono y no sumando, para que no se quemara todo a blanco.
- Cada familia tiene una forma de núcleo distinta, para reconocerlas aunque cambien de color.

## Dificultades e ideas futuras

Los problemas principales fueron:

- La pantalla se quemaba a blanco. Lo arreglé cambiando la paleta y bajando la opacidad.
- Había demasiados encuentros seguidos. Añadí tiempos de espera y un límite de notas.
- Las luces se quedaban paralizadas cuando perseguir y huir pesaban lo mismo.

Como ideas futuras: una familia que reste luz, una población que cambie con el tiempo y usar el micrófono si se expusiera como instalación.

## Uso de IA
He usado Claude (Anthropic) como guía a lo largo del proyecto. La idea y la dirección de la pieza la marqué yo (luces de colores, sin RGB, qué cambiar). También usé como referencia el repositorio del curso (p5js.yurigo.dev) para saber cómo hacer el sonido, los agentes y las partículas, entre otras cosas.

Material de la sesión: [Sesión 10 · Entrega y presentación de AC-02](../../README.md).