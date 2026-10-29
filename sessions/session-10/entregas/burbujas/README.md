# AC.02 — Sistema Vivo: Burbujas

## Concepto y intención visual

La pieza es un pequeño ecosistema de burbujas de jabón que flotan, crecen, se fusionan y revientan. El lienzo nace completamente vacío: no hay ninguna burbuja hasta que el espectador decide generarlas. Esta decisión busca que quien observa la obra no sea un simple testigo, sino quien "da vida" al ecosistema — y quien, con el viento (WASD) o el ratón, también puede alterarlo sin llegar a controlarlo del todo.

Observada durante varios minutos, la pieza debería transmitir una sensación tranquila y algo efímera: burbujas que suben despacio, se agrupan por tipo, a veces se funden en otras más grandes, y en cualquier momento pueden reventar y desaparecer en una pequeña nube de partículas.

## Familias de agentes

El sistema tiene 3 familias, cada una en su propia clase (`BurbujaPequena`, `BurbujaMediana`, `BurbujaGrande`), con identidad propia en tamaño, color y movimiento:

| Familia | Radio | Color | Velocidad de subida | Vaivén |
|---|---|---|---|---|
| Pequeña | 15 | Azul claro | 1.4 (rápida) | 1.5 |
| Mediana | 25 | Turquesa | 1.0 | 1.0 |
| Grande | 40 | Violeta suave | 0.6 (lenta) | 0.5 |

Cuanto más grande es la burbuja, más lenta y estable es su subida — transmite la sensación de que pesa más.

## Reglas de relación

Existen tres comportamientos relacionales distintos entre agentes:

1. **Atracción / repulsión por familia**: cuando dos burbujas están cerca (dentro de 100px) pero no se tocan, las de la misma familia se atraen ligeramente entre sí (tienden a agruparse) y las de familias distintas se repelen (tienden a separarse).
2. **Fusión**: al tocarse, dos burbujas pequeñas se fusionan en una mediana, y una pequeña con una mediana (o dos medianas) se fusionan en una grande. Las burbujas originales desaparecen y nace una nueva en su punto de encuentro — representa crecimiento y acumulación.
3. **Rebote**: las burbujas grandes nunca se funden; al tocar cualquier otra burbuja, simplemente rebotan y se separan. Son los "gigantes estables" del ecosistema.

A esto se suma la repulsión del ratón, que empuja cualquier burbuja que se le acerque.

## Implementación

**Movimiento**: cada burbuja sube constantemente a su propia velocidad, con un vaivén horizontal generado con `noise()` (cada una tiene un desfase propio, para que no se muevan todas igual). Al llegar arriba del todo, reaparece abajo, dando continuidad al ciclo. Al generarse con la tecla `B`, recibe además un impulso inicial hacia arriba (dirección y fuerza aleatorias) que se va apagando con el tiempo, simulando que "sale propulsada".

**Partículas**: al hacer clic sobre una burbuja, esta revienta y genera 8 partículas (`ParticulaBurbuja`) con dirección y velocidad aleatorias, que se desvanecen progresivamente (su vida baja cada frame y su transparencia se ajusta a esa vida) y heredan el color de la burbuja que las generó.

**Interacción**:
- `W A S D` — viento: empuja todas las burbujas en esa dirección mientras se mantiene pulsada la tecla.
- Acercar el ratón a una burbuja — la repele.
- Clic sobre una burbuja — la revienta.
- `B` — genera un lote de 10 burbujas nuevas (hasta un máximo de 150 en pantalla).
- `R` — reinicia el sistema, vaciándolo por completo.
- Botón **Start** — el sketch arranca en pausa (`noLoop()`) hasta que el espectador decide empezar.

**Evolución**: el sistema nunca repite exactamente la misma composición: las posiciones son aleatorias, cada burbuja tiene su propio desfase de ruido, y las fusiones/explosiones van cambiando la población con el tiempo. El sistema arranca con 0 burbujas de forma deliberada (ver "Decisiones estéticas").

**Sonido**: no implementado en esta entrega (ver apartado de dificultades).

## Decisiones estéticas

- Las burbujas se dibujan solo con un borde blanco e interior transparente, para que varias se puedan superponer sin taparse entre sí.
- El fondo del lienzo es un degradado de azul oscuro arriba a azul claro abajo, evocando un cielo.
- El fondo de la página (fuera del lienzo) usa un degradado turquesa sobre azul marino, inspirado en los reflejos de una burbuja de jabón real.
- Tipografía "Fredoka" para el título "BUBBLES": redondeada y amigable, en línea con el tono de la pieza.
- El sistema empieza vacío: el espectador tiene que pulsar `B` para poblarlo, convirtiéndolo en parte activa de la obra en vez de un simple espectador. Por eso no se garantiza tener entre 90 y 150 agentes desde el primer instante — es una elección de diseño, no un olvido.

## Dificultades encontradas

- `keyIsDown()` cambió su comportamiento en p5.js 2.x (ya no acepta códigos numéricos de tecla, solo strings como `'w'`), lo que hizo que el viento no funcionara al principio hasta identificar el cambio en la documentación oficial.
- Con fuerzas de viento muy altas (p. ej. 100), el movimiento "teletransportaba" en vez de deslizarse de forma visible, lo que parecía un fallo pero era solo un valor demasiado agresivo.
- Se intentó añadir un sonido de "pop" al reventar burbujas con `p5.sound` (`preload()` + `loadSound()`). Tras mover la carpeta del proyecto a otra ubicación, el servidor local (Live Server) se quedó sirviendo una versión en caché desactualizada de los archivos sin que fuera evidente, lo que provocó errores confusos (la variable del sonido aparecía siempre como `undefined`) que parecían apuntar al código cuando en realidad el problema era del entorno de desarrollo local. No se consiguió resolver a tiempo y se decidió retirar el sonido antes que dejar el sistema roto.

## Ideas futuras

- Retomar el sonido: un "pop" cuya altura tonal dependa del tamaño de la burbuja (pequeña/mediana/grande), y quizá un sonido ambiental de viento que varíe con la fuerza del WASD.
- Añadir también partículas en la fusión y el rebote, no solo al hacer clic, para reforzar visualmente los encuentros entre agentes.
- Valorar si `R` debería regenerar una población inicial en vez de dejar el sistema vacío, si en el futuro se prioriza garantizar el rango de 90-150 agentes desde el arranque.

Material de la sesión: [Sesión 10 · Entrega y presentación de AC-02](../../README.md).