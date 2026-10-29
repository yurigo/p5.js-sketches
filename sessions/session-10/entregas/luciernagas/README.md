LUCIERNAGAS 

1. Concepto de la pieza e intención visual

Jardín de luciérnagas y niebla es una pieza audiovisual generativa que representa un pequeño ecosistema digital formado por diferentes agentes autónomos. Cada agente tiene un comportamiento propio, pero también puede influir en los demás, creando un sistema en constante transformación.

La obra no sigue una animación predeterminada. Cada ejecución produce una composición diferente gracias a la aleatoriedad de las posiciones iniciales, las velocidades y las interacciones entre los agentes. El espectador también puede intervenir en el ecosistema mediante el ratón y el teclado.




2. Familias de agentes

El sistema está compuesto por 114 agentes, divididos en tres familias.

- Luciérnagas (50 agentes):

    Las luciérnagas son las principales fuentes de luz del ecosistema. Se desplazan de manera autónoma y emiten destellos periódicos cuya frecuencia varía ligeramente entre individuos.

    Cada luciérnaga tiene una fase de pulsación, una velocidad, un nivel de brillo y un tono amarillo. Cuando completa su ciclo de luz, genera un destello, crea una partícula luminosa y puede producir un sonido.

    Además, las luciérnagas cercanas pueden sincronizar sus ciclos de pulsación. Sin embargo, su luz también puede ser apagada temporalmente cuando entran en contacto con la niebla.


- Polillas (42 agentes):

    Las polillas representan agentes atraídos por la luz. Su comportamiento combina el movimiento autónomo con la búsqueda de la luciérnaga encendida más cercana.

    Cuando detectan una luciérnaga a menos de 300 píxeles, se desplazan hacia ella. Si se acercan demasiado, a menos de 25 píxeles, reciben una fuerza de repulsión que las hace alejarse.

    Este comportamiento genera un movimiento dinámico de aproximación y huida. Las polillas también reaccionan a la interacción del espectador, mientras se mantiene pulsado el ratón, las que se encuentran cerca del cursor reciben una fuerza de atracción hacia él.


- Niebla (22 agentes):

    La niebla representa una presencia difusa que transforma el ecosistema. Sus agentes se desplazan lentamente y tienen un radio variable, creando grandes áreas de resplandor violeta.

    Cuando una niebla se aproxima suficientemente a una luciérnaga, esta se apaga temporalmente. El acontecimiento genera partículas de ceniza.

    De esta manera, la niebla no solo tiene una función estética, sino que también modifica las relaciones entre los demás agentes.




3. Reglas y relaciones entre agentes

El comportamiento del sistema se basa en tres relaciones principales.

- Sincronización entre luciérnagas:

    Cuando dos luciérnagas están a menos de 120 píxeles de distancia, se atraen ligeramente y ajustan sus fases de pulsación para reducir la diferencia entre sus ciclos.

    Si sus fases están suficientemente cerca, existe una pequeña probabilidad de generar una partícula circular que representa una onda.


- Atracción y repulsión entre polillas y luciérnagas:

    Las polillas buscan la luciérnaga encendida más cercana. Si se encuentra dentro de su radio de detección, reciben una fuerza de atracción.

    Cuando la distancia es inferior a 25 píxeles, se aplica una fuerza en sentido contrario. Esta combinación evita que el movimiento sea una persecución lineal constante y genera cambios de dirección.

    Las luciérnagas apagadas no se consideran objetivos válidos para las polillas.


- Interacción entre niebla y luciérnagas:

    Cuando la distancia entre una niebla y una luciérnaga es inferior al 55 % del radio de la niebla, la luciérnaga queda apagada durante 180 fotogramas.

    Su brillo pasa a cero, la niebla incrementa su contador de luz absorbida y se generan tres partículas de ceniza.

    Esta relación introduce una transformación temporal en el ecosistema y afecta indirectamente a las polillas, que dejan de perseguir a las luciérnagas apagadas.




4. Implementación técnica

- Movimiento autónomo:

    Todos los agentes heredan de una clase base llamada `Agent`, que contiene su posición, velocidad, aceleración, tipo y un valor individual para diferenciar su movimiento.

    El desplazamiento se organiza mediante dos funciones:

        `wander()`: utiliza la función `noise()` de p5.js para generar cambios graduales de dirección y producir un movimiento orgánico.
        `move()`: actualiza la velocidad a partir de la aceleración, aplica fricción, limita la velocidad máxima y modifica la posición.

    Cada familia utiliza diferentes parámetros de velocidad y fricción, lo que permite distinguir el comportamiento de las luciérnagas, las polillas y la niebla.

    Cuando un agente alcanza un borde de la pantalla, reaparece por el lado contrario. Así se mantiene la continuidad del movimiento dentro del espacio.


- Sistema de partículas:

    La clase `Particle` permite crear diferentes efectos mediante un parámetro que identifica su tipo:

        `light`: partículas asociadas a los destellos de las luciérnagas.
        `spark`: pequeñas chispas relacionadas con la proximidad entre polillas y luciérnagas.
        `ash`: partículas generadas cuando la niebla apaga una luciérnaga.
        `wave`: ondas circulares que se expanden desde un punto.

    Cada partícula tiene una velocidad, una vida máxima y un nivel de transparencia que disminuye con el tiempo. Cuando termina su ciclo, se elimina del sistema.


- Interacción con el espectador

    El ratón actúa como una fuerza externa que modifica el comportamiento del ecosistema.

        Movimiento del ratón: genera una fuerza similar al viento sobre los agentes que se encuentran a menos de 180 píxeles.
        Clic: provoca el destello de las luciérnagas situadas a menos de 150 píxeles y genera una onda circular en la posición del cursor.
        Clic mantenido: atrae a las polillas que se encuentran a menos de 300 píxeles.
        Tecla R: reinicia el sistema y genera nuevos agentes en posiciones aleatorias.
        Tecla M: activa o desactiva el sonido.
        Barra espaciadora: genera un vector de viento aleatorio, aunque su aplicación efectiva sobre el movimiento de los agentes queda pendiente de implementar.

    Estas interacciones permiten que el espectador influya en el sistema sin controlar directamente cada agente.


- Sistema de sonido

    El sonido se genera mediante `p5.sound`, utilizando un oscilador de onda sinusoidal y una envolvente para controlar la duración y el volumen de los sonidos.

    Luciérnagas: reproducen notas de una escala de frecuencias definida en el código. La posición vertical de cada luciérnaga determina la nota seleccionada.




5. Decisiones estéticas

La estética se basa en una atmósfera nocturna, con un fondo oscuro y una combinación de tonos amarillos, azules y violetas.

- Las principales decisiones visuales son:

        Fondo oscuro con transparencia: evita que los rastros desaparezcan de forma inmediata y genera estelas que refuerzan la sensación de movimiento.
        Resplandor radial: la función `glow()` crea degradados que simulan la difusión de la luz en el espacio.
        Luz amarilla: identifica a las luciérnagas como fuentes luminosas y protagonistas visuales.
        Tonos azulados: diferencian a las polillas de las luciérnagas.
        Violeta: caracteriza la niebla y contrasta con la luz cálida.
        Partículas temporales: hacen visibles los acontecimientos del sistema sin convertirlos en elementos permanentes.
        Diferencias de velocidad: la niebla se mueve más lentamente que las polillas, lo que contribuye a distinguir las distintas escalas de movimiento.

    El orden de dibujo también es importante: primero se representa la niebla, después las partículas, las luciérnagas y las polillas. Esto permite mantener la jerarquía visual de los elementos.




6. Dificultades encontradas

Uno de los principales retos del proyecto es coordinar diferentes comportamientos autónomos dentro de un mismo espacio. Cada familia necesita reglas propias, pero las fuerzas de atracción, repulsión y movimiento aleatorio deben coexistir sin producir desplazamientos excesivamente bruscos.

Otro reto es gestionar las interacciones entre agentes. Para que las luciérnagas se sincronicen, es necesario comparar sus fases, para que las polillas persigan la luz, deben calcular qué luciérnaga encendida está más cerca y para que la niebla las apague, es necesario comprobar las distancias entre ambas familias.




7. Posibles mejoras futuras

Como evolución del proyecto, se plantean las siguientes mejoras:

    - Implementar correctamente la ráfaga de viento de la barra espaciadora para que afecte realmente a los agentes.
    - Añadir una duración determinada al viento para que desaparezca progresivamente.
    - Mejorar la sincronización colectiva de las luciérnagas y explorar la propagación de ondas de luz entre grupos.
    - Hacer que la niebla responda a la cantidad de luz que absorbe, modificando su densidad, color o tamaño.
    - Incorporar variaciones de volumen y timbre según la proximidad entre agentes.
    - Mejorar la relación entre el movimiento visual y la composición sonora para crear una experiencia audiovisual más inmersiva.
    - Optimizar los cálculos de distancia cuando aumenta el número de agentes.
    - Añadir controles para modificar en tiempo real la cantidad de criaturas, su velocidad y la intensidad de las interacciones.

Estas mejoras permitirían ampliar la complejidad del ecosistema y explorar nuevas relaciones entre el comportamiento autónomo, la intervención humana y la composición audiovisual.




8. Uso de herramientas de inteligencia artificial

Se ha utilizado ChatGPT como herramienta de apoyo durante el desarrollo y la documentación del proyecto.




9. Tecnologías utilizadas

JavaScript: lenguaje de programación de la pieza.
p5.js: creación del lienzo, animación, vectores, movimiento y representación gráfica.
p5.sound: generación y control del sonido.
Canvas API: creación de degradados radiales para los efectos de luz.

Material de la sesión: [Sesión 10 · Entrega y presentación de AC-02](../../README.md).
