En la sesión de hoy se ha presentado la actividad AC-02:

AC.02 — Sistema Vivo


🎯 Objetivo
Diseñar y programar una obra generativa audiovisual basada en un sistema de agentes autónomos.

La pieza debe comportarse como un pequeño ecosistema digital: múltiples entidades se desplazan por el espacio, reaccionan unas ante otras y producen transformaciones visuales y/o sonoras a partir de reglas sencillas.

No se busca crear un juego ni establecer ganadores y perdedores. El objetivo es investigar cómo unas pocas reglas pueden producir comportamientos emergentes y resultados visuales inesperados.



🧩 Sistema
La obra debe contener entre 90 y 150 agentes, organizados en al menos 3 familias o tipos diferentes.

Cada familia debe tener una identidad propia que pueda manifestarse mediante forma, color, movimiento, sonido o comportamiento.

Los agentes deben desplazarse de manera autónoma utilizando velocidad, aceleración, random(), noise() o una combinación de estos mecanismos.



🔗 Relaciones
Los agentes deben detectar la presencia o proximidad de otros agentes.

Debéis diseñar vuestro propio sistema de relaciones entre las diferentes familias.

Como mínimo deben existir tres comportamientos diferentes. Por ejemplo:

atracción o repulsión;
cambio de dirección o velocidad;
intercambio o transformación de color;
generación o desaparición de agentes;
aparición de conexiones;
creación de ondas, rastros o explosiones de partículas;
mutación después de cierto número de encuentros;
cambios producidos por densidad, edad o proximidad.
Las reglas deben ser diseñadas por vosotros y formar parte del concepto artístico de la pieza.



✨ Eventos visuales
Los encuentros significativos entre agentes deben generar algún tipo de consecuencia visual.

Como mínimo, el sistema deberá incluir un sistema secundario de partículas o trazas con tiempo de vida limitado.

Estas partículas podrán expandirse, desvanecerse, dejar rastros o comportarse de manera diferente según el evento que las haya generado.



🔊 Comportamiento sonoro
La obra deberá utilizar p5.sound.

El sonido debe estar relacionado con el comportamiento del sistema y no funcionar únicamente como decoración.

Podéis mapear propiedades como la velocidad, posición, densidad, cantidad de encuentros o tipo de agente a parámetros como frecuencia, amplitud, filtro o timbre.



🖱️ Interacción
El espectador debe poder perturbar el ecosistema sin controlarlo completamente.

Por ejemplo, mediante el ratón o teclado podrá introducir fuerzas, atraer o repeler agentes, modificar el entorno, cambiar parámetros o provocar temporalmente un comportamiento diferente.



🌱 Evolución
El sistema debe cambiar a lo largo del tiempo.

No debería producir exactamente la misma composición durante toda su ejecución.

Puede evolucionar mediante mutaciones, acumulación de rastros, cambios de población, variaciones de comportamiento o modificación progresiva de parámetros.

Debe existir una tecla para reiniciar el sistema.



🎨 Intención artística
Además de funcionar técnicamente, la pieza debe presentar una decisión estética reconocible.

Pensad el sistema como una obra y no como una demostración técnica:

¿Qué tipo de mundo habéis creado?
¿Qué relaciones existen entre sus habitantes?
¿Qué sensación debería producir observarlo durante varios minutos?



📂 Entrega
Entregar el código necesario para ejecutar el sketch y al menos una captura o pequeño vídeo/GIF del sistema funcionando.

Incluir un README.md explicando:

el concepto de la pieza y su intención visual; 
las familias de agentes creadas; 
las reglas que gobiernan sus relaciones; 
cómo se han implementado movimiento, partículas, interacción y sonido; 
decisiones estéticas relevantes; 
dificultades encontradas e ideas futuras.
Si se han utilizado herramientas de IA, indicar también para qué se han utilizado y qué tipo de indicaciones se han empleado.

---

Yo por mi parte he creado un sketch para "jugar" con los agentes y cómo crearlos.  Me he apoyado en código que se encuentra en:

- https://natureofcode.com/autonomous-agents/#vehicles-and-steering
  - https://natureofcode.com/autonomous-agents/#example-51-seeking-a-target
    - https://editor.p5js.org/natureofcode/sketches/Y74O77yxy
  - https://natureofcode.com/autonomous-agents/#example-52-arriving-at-a-target
    - https://editor.p5js.org/natureofcode/sketches/v-yJm8WUx

He creado un sketch donde pinto un emoji de la caca y sobrevuelan las moscas