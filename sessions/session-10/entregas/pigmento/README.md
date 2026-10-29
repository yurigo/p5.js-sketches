# AC.02 — Sistema Vivo · *Pigmento*

![Captura del sistema funcionando](captura.png)

## Concepto
*Pigmento* es un pequeño ecosistema en el que el color es la materia de la vida. El mundo empieza con tres sustancias puras —rojo, amarillo y azul— repartidas entre 120 habitantes. Mientras se desplazan, se persiguen y se cruzan, intercambian pigmento: al mezclarse aparecen colores nuevos, y cada relación les desgasta el color.

Tras **6 relaciones** un agente ha perdido toda su saturación y **muere**. Su muerte libera de nuevo los tres primarios en forma de partículas, con un sonido grave distinto al resto, y renace como color puro en otro lugar del mundo. La pieza es un ciclo continuo entre la pureza y la mezcla: sin ganadores ni perdedores, el sistema se apaga y se vuelve a encender.


## Familias de agentes
El sistema tiene 120 agentes, 40 de cada familia. Cada familia es una clase propia, con su forma y su movimiento. El color de cada agente es su estado y cambia con los encuentros.

| Familia | Clase | Forma | Movimiento 
| **Rojo** | `Rojo` (`Rojo.js`) | triángulo | rápido e inquieto 
| **Amarillo** | `Amarillo` (`Amarillo.js`) | círculo | velocidad media 
| **Azul** | `Azul` (`Azul.js`) | cuadrado | lento y pesado 

## Reglas que gobiernan las relaciones
1. **Cadena cíclica de atracción.** El rojo busca al amarillo, el amarillo busca al azul y el azul busca al rojo. Cada familia persigue a una y huye suavemente de otra, así que nadie domina y el movimiento nunca se estabiliza.
2. **Espacio personal.** Los agentes de la misma familia se repelen si están demasiado cerca.
3. **Intercambio de pigmento.** Cuando dos agentes con colores distintos se tocan, cada uno cede parte de su pigmento al otro y sus colores se acercan. Cada encuentro cuenta como una relación y baja la saturación de ambos. Después quedan en pausa unos instantes para no mezclarse en bucle.
4. **Cambio de dirección.** Cada encuentro desvía la trayectoria de los dos agentes.
5. **Muerte y renacimiento.** Al llegar a 6 relaciones el agente muere: libera partículas de los tres primarios y es sustituido por un primario puro de la familia que tenga menos población en ese momento. Así el ecosistema se autoequilibra.
6. **Ratón repelente.** El espectador no controla el sistema, solo lo perturba: los agentes cercanos al cursor son empujados lejos de él.

## Implementación

**Movimiento.** Cada agente tiene `position`, `velocity` y `acceleration` (vectores creados con `createVector()`), como en la clase `Vehicle` de la sesión 07. Las fuerzas se acumulan con `applyForce()` y en `move()` se suman a la velocidad, que se limita a la `maxSpeed` de su color. La fuerza propia de cada agente es un `noise()` que cambia con la posición y el tiempo (`wander()`). En las paredes los agentes rebotan hacia dentro con un ángulo aleatorio y hay un empuje suave en los bordes para que no se acumulen.

**Proximidad.** Con `dist()` se mide la distancia entre cada par de agentes. Si están a menos de `PERCEPTION` se perciben (atracción, huida o espacio personal) y con `map()` la fuerza crece cuanto más cerca están. Si están a menos de `TOUCH` se produce un encuentro.

**Color.** Cada agente guarda tres pesos [rojo, amarillo, azul] que suman 1. Su color es la media de los tres primarios ponderada por esos pesos. En un encuentro los pesos de los dos agentes se acercan con `lerp()`. Aparte, cada encuentro acerca el color del agente a un gris pálido (un sexto por relación); a las 6 ya no le queda color y muere.

**Partículas.** La clase `Burst` es la partícula de la muerte. Como en la sesión 06, cada una tiene un tiempo de vida `ttl` que baja en cada fotograma, y el ecosistema elimina las agotadas con `filter()`. Su opacidad se calcula con `map()` a partir de lo que le queda de `ttl`. Cada muerte emite 42 partículas (14 de cada primario).

**Consecuencias visuales de los encuentros.** Cada encuentro cambia visiblemente a los dos agentes: sus colores se acercan y se apagan un poco, y se desvían de su trayectoria. El encuentro más significativo, el último de un agente, termina en su muerte con el estallido de partículas.

**Interacción.** El cursor repele a los agentes en un radio de 200 píxeles, con más fuerza cuanto más cerca. Teclas: `R` reinicia el sistema, `M` silencia, `S` guarda una captura.

**Sonido (`p5.sound`).** Solo se usan osciladores senoidales (`p5.Oscillator`) controlando frecuencia y amplitud, como en la sesión 08:
- **Encuentro:** una nota corta, siempre la misma, que suena solo en el momento del choque y se apaga enseguida hasta el silencio. Su amplitud se calcula con `map()` a partir de la cantidad de los dos colores que chocan en el mundo: si son colores abundantes suena más fuerte y si son escasos casi no se oye. Así el sonido refleja cómo cambia la composición del mundo.
- **Muerte:** una nota muy grave (55 Hz) que se apaga algo más despacio, claramente distinta a la del choque.

El sonido se activa con el primer clic o pulsación de tecla, porque el navegador exige un gesto del usuario.

**Texto en pantalla.** Arriba a la izquierda se muestra el porcentaje de cada color en el mundo, cada uno escrito con su propio color. Es el mismo dato que controla el volumen de la nota de los choques. Abajo se muestran la ayuda y el contador de muertes.

**Evolución.** Dos parámetros derivan lentamente con `noise()` y `map()`: la tasa de mezcla (cuánto pigmento se intercambia en cada encuentro) y la intensidad de las atracciones entre familias. Con ello el sistema pasa por épocas más mezcladas o más puras, y la composición de colores cambia con las muertes y los renacimientos. La composición nunca es la misma.

## Estructura del código
El código se reparte en cuatro archivos JavaScript: `sketch.js` y una clase por color.

**`sketch.js`** contiene las clases comunes y las funciones de p5.js (`setup`, `draw` y los eventos de teclado y ratón):

| Clase | Responsabilidad |
| `Pigment` | Utilidades de color: mezcla de los tres primarios, distancia entre composiciones y desgaste. 
| `Agent` | Clase base de un habitante. Se mueve (`wander`, `fleeMouse`, `edges`, `move`, `bounce`), percibe a otros (`perceive`), se encuentra (`meet`) y muere (`isDead`). 
| `Burst` | Partícula efímera con `ttl` que sale de una muerte. 
| `Ecosystem` | Contiene los agentes y las partículas. Recorre los pares de agentes, aplica las reglas, gestiona las muertes, calcula la cantidad de cada color y hace evolucionar los parámetros. 
| `SoundSystem` | Los osciladores. El ecosistema le avisa de los encuentros y las muertes, y le pasa la cantidad de cada color. 
| `Hud` | Texto en pantalla. 

**Una clase por color**, cada una en su archivo y heredando de `Agent`: `Rojo.js`, `Amarillo.js` y `Azul.js`. Definen su forma (`shape`) y sus rasgos de movimiento. En `index.html` se cargan después de `sketch.js`, porque dependen de `Agent`.

## Decisiones estéticas
- Fondo casi negro, sin rastros y sin efectos: formas planas para que el color y el movimiento sean lo único protagonista.
- Triángulo, círculo y cuadrado como formas mínimas que identifican la familia incluso cuando el color se ha mezclado.
- Mezcla directa de los tres primarios, sin teoría del color añadida, para que el sistema sea fácil de leer.
- Las partículas y una nota grave solo en la muerte, para que ese sea el único momento dramático de la pieza.

## Dificultades encontradas
- Equilibrar la tasa de mezcla y el número de relaciones que provocan la muerte para que el sistema no se apague ni se quede inmóvil.
- Evitar que los agentes se acumularan en las paredes al ser empujados por el ratón; se resolvió con rebotes de ángulo aleatorio y un empuje suave en los bordes.
- Conseguir que el audio arrancara en el navegador: tuvo que crearse tras el primer gesto del usuario.

## Ideas futuras
- Que los encuentros entre colores complementarios generen nuevos agentes.
- Que el fondo se tiña muy lentamente con el color medio del mundo.
- Usar el micrófono como fuerza externa además del ratón.

## Qué se ha visto en clase y qué se ha hecho con IA

### Basado en lo visto en clase
- **Sesión 01–02:** estructura `setup()` / `draw()`, figuras básicas (`triangle`, `circle`, `rect`), color, rebote en los límites del lienzo (`collision-ball`) y clases para reutilizar un dibujo (`Persona`).
- **Sesión 03:** `random()`, `noise()` y `lerp()` (usados para el movimiento, el intercambio de pigmento y el desgaste del color).
- **Sesión 04:** eventos de ratón y teclado y variables globales (`mouseX`, `mouseY`, `keyPressed()`, `mousePressed()`).
- **Sesión 05:** `dist()` y `map()` para relacionar distancia con fuerza, opacidad y volumen.
- **Sesión 06:** array de objetos con una clase, agentes que reaccionan al ratón y a sus vecinos cercanos, partículas con `ttl` creadas y eliminadas con `filter()`.
- **Sesión 07:** clase tipo `Vehicle` con `createVector()`, posición, velocidad, aceleración y velocidad máxima; familias de agentes por color y creación de agentes con ratón y teclado.
- **Sesión 08:** `p5.Oscillator` controlado con frecuencia y amplitud, iniciado tras un gesto del usuario.

### Hecho con IA 
- **El modelo de pigmento:** pesos [rojo, amarillo, azul] que suman 1, color como media ponderada y desgaste hacia un gris con cada encuentro (la implementación es de la IA).
- **La cadena cíclica de relaciones** entre familias (rojo → amarillo → azul → rojo), el espacio personal y la pausa (`cooldown`) tras un encuentro.
- **La muerte a las 6 relaciones y el renacimiento** en la familia menos poblada, y el contador de muertes.
- **Rebote con ángulo aleatorio** hacia dentro y empuje suave en los bordes para evitar acumulaciones.
- **`noise()` con tres dimensiones** (posición y tiempo) y una semilla distinta por agente, y evolución de las reglas del sistema con `noise()` muy lento.
- **Métodos de `p5.Vector`** como `fromAngle()`, `rotate()`, `normalize()`, `heading()` y `random2D()`.
- **Recursos de JavaScript** como funciones flecha, `array.map()`, `slice()`, `indexOf()`, `for…of`, el operador `...` y las funciones `static`. (`filter()` sí se vio con las partículas.)
- **Sonido:** apagar los sonidos puntuales multiplicando su volumen por un factor cada fotograma, mapear la cantidad de color a la amplitud de la nota del choque, `midiToFreq()`, y el aviso en pantalla cuando falta `p5.sound`.
- **Extras:** captura con `saveCanvas()` y `windowResized()`.

### Para qué se ha usado la IA y qué indicaciones se han dado
- que fuera un sketch en p5.js con interacción y reinicio;
- que los agentes rebotaran en las paredes sin acumularse en ellas;
- que cada agente muera tras unas pocas relaciones bajando su saturación con cada una (finalmente 6), y que el ritmo fuera más rápido;
- que el sonido dependiera de la cantidad de cada color, que esa cantidad se muestre en texto y que el sonido pare entre choques, sin ruido constante;


## Cómo ejecutar el sonido
Haz clic una vez sobre el canvas para activar el sonido.

