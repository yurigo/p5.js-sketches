# Conway's Game of Life

Una implementación interactiva y visualmente mejorada del clásico autómata celular de Conway, con variaciones creativas en color y control.

## 🎯 Descripción del Proyecto

Este proyecto implementa el **Juego de la Vida de Conway**, un autómata celular de cero jugadores inventado por el matemático John Conway en 1970. El sistema demuestra cómo reglas simples aplicadas a muchos elementos pueden producir comportamientos emergentes complejos y patrones fascinantes.

## ✨ Variaciones y Reinterpretación Creativa

### Sistema de Envejecimiento de Celdas con Color

La variación principal implementada es un **sistema de envejecimiento visual** donde las celdas cambian de color a medida que sobreviven más generaciones. En lugar de simplemente mostrar celdas vivas/muertas en blanco y negro, cada célula acumula "edad" y su color evoluciona a través de una paleta gradient:

- **Celdas nuevas**: Comienzan con colores oscuros/fríos
- **Celdas maduras**: Progresan hacia colores brillantes/cálidos
- **Historial visual**: Puedes ver qué patrones son estables (colores brillantes) vs. recién nacidos

Esta variación permite:
- Identificar visualmente patrones estables vs. osciladores
- Apreciar la "historia" de cada región del grid
- Crear efectos visuales más dinámicos y artísticos

### Paletas de Color Múltiples

Se incluyen 5 paletas temáticas:

1. **Rainbow**: Espectro completo del arcoíris (ROY G BIV)
2. **Ocean**: Tonos azules profundos a cielo claro
3. **Fire**: Desde brasas oscuras hasta llamas amarillas
4. **Forest**: Verdes naturales progresivos
5. **Monochrome**: Escala de grises elegante

Cada paleta crea una estética completamente diferente del mismo patrón emergente.

### Controles Interactivos Avanzados

- **Dibujo en tiempo real**: Click y arrastre para crear patrones personalizados
- **Control de velocidad**: Ajusta la velocidad de simulación (1-10)
- **Pausa/Avance manual**: Estudia generación por generación
- **Reinicio aleatorio**: Genera nuevos estados iniciales
- **Toggle de envejecimiento**: Activa/desactiva el sistema de color

## 🎮 Controles

| Tecla/Acción | Función |
|--------------|---------|
| **SPACE** | Pausar/Reanudar la simulación |
| **R** | Generar patrón aleatorio nuevo |
| **C** | Limpiar el grid completo |
| **+/=** | Aumentar velocidad de simulación |
| **-/_** | Disminuir velocidad de simulación |
| **P** | Cambiar paleta de colores |
| **A** | Activar/Desactivar colores de envejecimiento |
| **N** | Avanzar una generación (solo en pausa) |
| **Click/Arrastre** | Dibujar celdas vivas |

## 🧠 Conceptos Implementados

### Autómata Celular Bidimensional
- Grid toroidal (los bordes se conectan)
- Estados discretos: vivo/muerto
- Vecindad de Moore (8 vecinos)

### Reglas de Conway
1. **Supervivencia**: Celda viva con 2-3 vecinos sobrevive
2. **Nacimiento**: Celda muerta con exactamente 3 vecinos nace
3. **Muerte**: Todos los demás casos mueren o permanecen muertos

### Comportamiento Emergente
- **Patrones estables**: Bloques, colmenas, botes
- **Osciladores**: Parpadeadores, sapos, pulsares
- **Naves espaciales**: Planeadores, LWSS, MWSS
- **Cañones**: Generadores de planeadores (Gun de Gosper)

## 🎨 Decisiones de Diseño

### Visuales
- **Resolución de grid**: 10px balanceando detalle y rendimiento
- **Topología toroidal**: Los bordes se envuelven para crear un espacio infinito
- **Paletas cuidadas**: Cada una evoca una atmósfera diferente
- **Degradados suaves**: Hasta 7 niveles de edad para transiciones visuales agradables

### Conceptuales
- **Interactividad máxima**: El usuario puede intervenir en cualquier momento
- **Transparencia educativa**: La información mostrada ayuda a entender el sistema
- **Flexibilidad creativa**: Múltiples modos de visualización y control
- **Rendimiento optimizado**: Arrays nativos JavaScript para actualizaciones rápidas

## 🔬 Cómo Funciona

### Estructura de Datos
```javascript
class Cell {
  alive: boolean  // Estado vivo/muerto
  age: number    // Generaciones sobrevividas
}
```

### Algoritmo de Actualización
1. Para cada celda, contar vecinos vivos (8 direcciones)
2. Aplicar reglas de Conway basadas en estado actual y vecinos
3. Crear nueva generación sin modificar la actual
4. Reemplazar grid actual con nueva generación
5. Incrementar edad de celdas supervivientes

### Sistema de Color
- Mapeo de edad a índice de paleta
- Interpolación visual a través de colores predefinidos
- Edad máxima = longitud de paleta (después se mantiene color final)

## 🤖 Uso de IA y Fuentes de Inspiración

### Fuentes de Inspiración
- **John Conway's Game of Life** (1970): Concepto original
- **Stephen Wolfram's cellular automata**: Exploración de complejidad emergente
- **Processing/p5.js sketches**: Tradición de live coding educativo
- **Data visualization**: Uso de color para información temporal

### Herramientas de Desarrollo
- **p5.js**: Framework principal para gráficos y animación
- **GitHub Copilot**: Asistencia con estructuración de código y optimización
- Conocimiento previo de autómatas celulares y algoritmos de simulación

### Decisiones Autónomas
- Sistema de envejecimiento como diferenciador creativo
- Paletas temáticas inspiradas en naturaleza y elementos
- Controles de teclado intuitivos y mnemónicos
- Balance entre educación y estética

## 🚀 Características Técnicas

- **Responsive**: Se adapta al tamaño de ventana
- **Eficiente**: Optimizado para miles de células
- **Extensible**: Fácil agregar nuevas paletas o reglas
- **Educativo**: Código comentado y estructura clara

## 📚 Para Aprender Más

- [Conway's Game of Life - Wikipedia](https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life)
- [LifeWiki - Pattern Database](https://conwaylife.com/wiki/)
- [p5.js Reference](https://p5js.org/reference/)
- [Cellular Automata - Wolfram](https://www.wolframscience.com/nks/chap-2--the-crucial-experiment/)

## 🎓 Conceptos de Programación Demostrados

- Arrays bidimensionales
- Programación orientada a objetos (clase Cell)
- Algoritmos de vecindario
- Event handling (mouse y keyboard)
- Animación con frameRate control
- State management (paused, speed, palette)
- Modularización de código

---

**Nota**: Este sketch es parte de una colección educativa de p5.js explorando conceptos de programación creativa y sistemas complejos.
