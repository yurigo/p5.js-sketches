# Sesión 07 · AC-02 Sistema Vivo

## Descripción

En esta sesión se presenta la actividad **AC-02 · Sistema Vivo** y se analiza un
sketch hecho en clase para experimentar con agentes autónomos. El ejemplo no es
la entrega final de la actividad: sirve para probar cómo nacen los agentes, cómo
persiguen un objetivo y cómo una interacción sencilla con ratón y teclado puede
perturbar el sistema.

El [tutorial interactivo](index.html) resume la secuencia de trabajo. El sketch
asociado está en:

- [`sketches/agentes-autonomos-moscas`](sketches/agentes-autonomos-moscas/)

## Objetivos de aprendizaje

Al finalizar la sesión, el estudiante podrá:

- identificar los requisitos principales de la actividad AC-02;
- explicar cómo una clase `Vehicle` encapsula posición, velocidad y fuerzas;
- probar comportamientos de `seek()` para dirigir agentes hacia un objetivo;
- introducir familias de agentes mediante variaciones de color y creación
  incremental con teclado o ratón;
- planificar qué elementos faltan para transformar un boceto de clase en una
  pieza final con partículas, sonido e intención artística.

## Prerrequisitos

Se recomienda haber completado las sesiones 01 a 06 y manejar con soltura:

- la estructura de `setup()` y `draw()`;
- vectores y movimiento básico con posición, velocidad y aceleración;
- clases sencillas en JavaScript;
- interacción con `mouseX`, `mouseY`, `mouseIsPressed` y `keyPressed()`.

## Desarrollo de la sesión

1. **Presentación del enunciado.** Se revisa AC-02 como una obra generativa
   basada en agentes autónomos, relaciones entre familias y una evolución en el
   tiempo.
2. **Boceto de clase.** Se parte de un ejemplo inspirado en *The Nature of Code*
   donde varios vehículos vuelan hacia un objetivo móvil.
3. **Objetivo visual.** En el sketch, el puntero se convierte en un emoji que
   actúa como destino común para las "moscas" y ayuda a visualizar el efecto de
   `seek()`.
4. **Creación de agentes.** Se añaden nuevos agentes con el ratón o con las
   teclas `1` a `7`, que generan familias cromáticas diferentes.
5. **Proyección hacia la entrega.** Se identifica qué falta todavía para cumplir
   completamente la actividad: relaciones más ricas entre familias, partículas o
   trazas, sonido con `p5.sound`, evolución temporal y una tecla de reinicio.

## Resumen del encargo AC-02

La actividad plantea diseñar una obra generativa audiovisual basada en un
pequeño ecosistema digital. No se busca crear un juego con ganadores y
perdedores, sino investigar cómo unas pocas reglas producen comportamiento
emergente y resultados visuales inesperados.

### Sistema

- construir entre 90 y 150 agentes;
- organizar el sistema en al menos tres familias o tipos distintos;
- dar a cada familia una identidad reconocible mediante forma, color,
  movimiento, sonido o comportamiento;
- desplazar los agentes de forma autónoma con velocidad, aceleración,
  `random()`, `noise()` o combinaciones de estos recursos.

### Relaciones

Los agentes deben detectar proximidad o presencia de otros agentes. A partir de
ahí, cada grupo debe diseñar sus propias reglas de relación y, como mínimo,
implementar tres comportamientos diferenciados. Algunos ejemplos posibles son:

- atracción o repulsión;
- cambios de dirección o velocidad;
- intercambio o transformación de color;
- generación o desaparición de agentes;
- aparición de conexiones, ondas, rastros o explosiones de partículas;
- mutaciones ligadas a encuentros, densidad, edad o proximidad.

### Eventos visuales y sonido

- los encuentros significativos deben producir una consecuencia visual;
- debe existir un sistema secundario de partículas o trazas con tiempo de vida
  limitado;
- el proyecto debe usar `p5.sound`, relacionando frecuencia, amplitud, filtro o
  timbre con variables reales del sistema, y no solo como decoración.

### Interacción, evolución y entrega

- el público debe poder perturbar el ecosistema sin controlarlo por completo;
- la composición debe cambiar con el tiempo mediante mutaciones, acumulación de
  rastros, cambios de población o variaciones progresivas;
- debe existir una tecla para reiniciar el sistema;
- la entrega debe incluir el código ejecutable, al menos una captura o un
  vídeo/GIF y un `README.md` que explique concepto, familias, reglas,
  implementación, decisiones estéticas, dificultades e ideas futuras.

## Práctica guiada

Abre el sketch de la sesión y realiza estas acciones en orden:

1. mueve el ratón y observa cómo todo el enjambre cambia su trayectoria para
   perseguir el mismo objetivo;
2. mantén pulsado el ratón para crear nuevas moscas en la posición del puntero y
   comprobar cómo aumenta la densidad del sistema;
3. pulsa varias teclas del `1` al `7` para comparar las familias de color que ya
   están preparadas como punto de partida;
4. revisa `vehicle.js` e identifica dónde se limitan la velocidad máxima y la
   fuerza máxima de cada agente;
5. anota qué eventos visuales, sonoros o de relación añadirías para convertir el
   boceto en una propuesta completa para AC-02.

## Relación con AC-02

La actividad final pide un sistema vivo con entre 90 y 150 agentes, al menos
`tres familias`, relaciones diseñadas por el alumnado, consecuencias visuales en
los encuentros, sonido conectado al comportamiento, interacción, evolución en el
tiempo y una tecla para reiniciar. El sketch de clase cubre sobre todo el bloque
inicial de **movimiento autónomo** y ofrece una base reutilizable para empezar a
prototipar el resto de requisitos.

## Referencias

- [Referencia de p5.js](https://p5js.org/reference/)
- [Referencia de `createVector()`](https://p5js.org/reference/#/p5/createVector)
- [Referencia de `p5.Vector`](https://p5js.org/reference/#/p5.Vector)
- [The Nature of Code · Autonomous Agents](https://natureofcode.com/autonomous-agents/#vehicles-and-steering)
- [Ejemplo 5.1 · Seeking a target](https://editor.p5js.org/natureofcode/sketches/Y74O77yxy)
- [Ejemplo 5.2 · Arriving at a target](https://editor.p5js.org/natureofcode/sketches/v-yJm8WUx)
