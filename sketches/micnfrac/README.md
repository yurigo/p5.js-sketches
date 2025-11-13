# 🎤🌳 Mic'n'Frac - Microphone Reactive Fractal

## Descripción / Description

Un árbol fractal recursivo que reacciona en tiempo real al sonido capturado por el micrófono. El proyecto combina arte generativo y audio-reactividad, explorando cómo los parámetros fractales pueden transformarse mediante la amplitud, el volumen y la frecuencia del sonido ambiente.

A recursive fractal tree that reacts in real-time to sound captured by the microphone. This project combines generative art and audio-reactivity, exploring how fractal parameters can transform through amplitude, volume, and frequency of ambient sound.

## Tipo de Fractal / Fractal Type

**Árbol Binario Recursivo / Recursive Binary Tree**

Este fractal utiliza recursión para generar un árbol con ramas que se dividen en dos sub-ramas en cada nivel. La estructura es similar a un árbol natural, donde cada rama se bifurca siguiendo un patrón matemático determinado por ángulos y longitudes proporcionales.

This fractal uses recursion to generate a tree with branches that split into two sub-branches at each level. The structure resembles a natural tree, where each branch bifurcates following a mathematical pattern determined by angles and proportional lengths.

## Parámetros de Sonido → Fractal / Sound Parameters → Fractal

El sketch mapea diferentes características del audio a distintos parámetros visuales del fractal:

The sketch maps different audio characteristics to different visual parameters of the fractal:

### 1. **Amplitud → Longitud de Ramas / Amplitude → Branch Length**
- El volumen general del micrófono controla la longitud inicial de las ramas
- Rango: 80-160 píxeles
- Sonidos más fuertes = ramas más largas

- Overall microphone volume controls the initial branch length
- Range: 80-160 pixels
- Louder sounds = longer branches

### 2. **Frecuencias Bajas (Bass) → Ángulo de Bifurcación / Low Frequencies (Bass) → Branch Angle**
- Los graves controlan el ángulo entre las ramas
- Rango: 30° - 60° (π/6 a π/3 radianes)
- Más graves = ramas más abiertas/amplias

- Bass frequencies control the angle between branches
- Range: 30° - 60° (π/6 to π/3 radians)
- More bass = wider/more open branches

### 3. **Frecuencias Medias (Mid) → Color / Mid Frequencies → Color**
- Las frecuencias medias controlan el matiz (hue) del color
- Rango: 100° - 300° en el espectro HSB
- Afecta los colores desde verde-azul hasta magenta

- Mid frequencies control the color hue
- Range: 100° - 300° in HSB spectrum
- Affects colors from green-blue to magenta

### 4. **Energía Total → Profundidad de Recursión / Total Energy → Recursion Depth**
- La energía combinada de todas las frecuencias controla cuántos niveles tiene el árbol
- Rango: 5-10 niveles de recursión
- Mayor energía = árbol más complejo y detallado

- Combined energy from all frequencies controls how many levels the tree has
- Range: 5-10 recursion levels
- Higher energy = more complex and detailed tree

### 5. **Rama Central Adicional / Additional Center Branch**
- Cuando el volumen supera un umbral (>0.1), aparece una rama central que oscila
- Añade dinamismo y complejidad visual adicional

- When volume exceeds a threshold (>0.1), an oscillating center branch appears
- Adds additional dynamism and visual complexity

## Técnicas y Funciones de p5.sound / Techniques and p5.sound Functions

### Audio Input
- **`p5.AudioIn()`**: Captura el audio del micrófono en tiempo real
- **`mic.start()`**: Inicia la captura de audio (requiere interacción del usuario)
- **`userStartAudio()`**: Resume el contexto de audio (requerido por navegadores modernos)

- **`p5.AudioIn()`**: Captures microphone audio in real-time
- **`mic.start()`**: Starts audio capture (requires user interaction)
- **`userStartAudio()`**: Resumes audio context (required by modern browsers)

### Audio Analysis
- **`p5.FFT()`**: Análisis de Transformada Rápida de Fourier para obtener el espectro de frecuencias
  - Parámetros: `(0.8, 256)` - suavizado 0.8 y 256 bins de frecuencia
  - `fft.analyze()`: Obtiene el espectro completo de frecuencias
  - `fft.getEnergy('bass', 'mid', 'treble')`: Extrae energía de bandas específicas

- **`p5.FFT()`**: Fast Fourier Transform analysis to get frequency spectrum
  - Parameters: `(0.8, 256)` - smoothing 0.8 and 256 frequency bins
  - `fft.analyze()`: Gets complete frequency spectrum
  - `fft.getEnergy('bass', 'mid', 'treble')`: Extracts energy from specific bands

- **`p5.Amplitude()`**: Mide el nivel de volumen general
  - `amplitude.getLevel()`: Retorna el nivel de amplitud (0.0 - 1.0)

- **`p5.Amplitude()`**: Measures overall volume level
  - `amplitude.getLevel()`: Returns amplitude level (0.0 - 1.0)

## Decisiones Estéticas y Artísticas / Aesthetic and Artistic Decisions

### ¿Por qué reacciona de esta manera? / Why does it react this way?

1. **Naturaleza y Sonido**: Los árboles en la naturaleza crecen en respuesta a estímulos ambientales (luz, viento, agua). Este sketch crea una analogía digital donde el sonido se convierte en el "nutriente" que hace crecer y transformar el árbol.

   **Nature and Sound**: Trees in nature grow in response to environmental stimuli (light, wind, water). This sketch creates a digital analogy where sound becomes the "nutrient" that makes the tree grow and transform.

2. **Mapeo Intuitivo**: 
   - Graves → Ángulo: Los sonidos graves tienen una cualidad "expansiva" que se traduce en ramas más abiertas
   - Volumen → Tamaño: Intuitivo - más sonido = estructura más grande
   - Frecuencias medias → Color: Las frecuencias medias son las más ricas en música y voz humana, merecen controlar el aspecto más visible

   **Intuitive Mapping**:
   - Bass → Angle: Bass sounds have an "expansive" quality that translates to wider branches
   - Volume → Size: Intuitive - more sound = larger structure
   - Mid frequencies → Color: Mid frequencies are richest in music and human voice, deserve to control the most visible aspect

3. **Paleta de Color**: Se usa el modo HSB (Hue, Saturation, Brightness) para crear transiciones de color suaves y naturales. El color cambia gradualmente con la profundidad del árbol, creando un efecto de degradado orgánico.

   **Color Palette**: HSB (Hue, Saturation, Brightness) mode is used to create smooth and natural color transitions. Color changes gradually with tree depth, creating an organic gradient effect.

4. **Visualización en Tiempo Real**: Los indicadores de audio en la parte inferior permiten ver exactamente qué frecuencias están afectando el fractal, creando transparencia en la relación audio-visual.

   **Real-time Visualization**: Audio indicators at the bottom let you see exactly which frequencies are affecting the fractal, creating transparency in the audio-visual relationship.

## Reflexión / Reflection

Este proyecto explora la intersección entre matemáticas (recursión, fractales), física (sonido, frecuencias) y arte (color, forma). La recursión es un concepto fundamental en programación que encuentra su análogo perfecto en las estructuras naturales como los árboles.

This project explores the intersection between mathematics (recursion, fractals), physics (sound, frequencies), and art (color, form). Recursion is a fundamental programming concept that finds its perfect analog in natural structures like trees.

Al hacer que el fractal responda al sonido, se crea una experiencia interactiva donde el usuario no solo observa, sino que participa activamente en la creación del arte. Cada sonido produce un árbol único - hablar, cantar, tocar música, o simplemente los sonidos ambientales generan diferentes resultados visuales.

By making the fractal respond to sound, an interactive experience is created where the user not only observes but actively participates in creating the art. Each sound produces a unique tree - talking, singing, playing music, or simply ambient sounds generate different visual results.

## Uso de IA y Referencias / AI Use and References

### Desarrollo / Development
- Implementación original basada en conocimiento de p5.js y procesamiento de audio
- Estructura inspirada en los ejemplos del repositorio de sketches existentes

- Original implementation based on p5.js knowledge and audio processing
- Structure inspired by examples from the existing sketches repository

### Referencias Técnicas / Technical References
- [p5.js Sound Library Reference](https://p5js.org/reference/#/libraries/p5.sound)
- [p5.FFT Documentation](https://p5js.org/reference/#/p5.FFT)
- Algoritmo clásico de árbol fractal recursivo

- [p5.js Sound Library Reference](https://p5js.org/reference/#/libraries/p5.sound)
- [p5.FFT Documentation](https://p5js.org/reference/#/p5.FFT)
- Classic recursive fractal tree algorithm

## Cómo Usar / How to Use

1. Abre el sketch en un navegador web
2. Haz clic en la pantalla para habilitar el micrófono
3. Concede permisos de micrófono cuando el navegador lo solicite
4. Haz sonidos: canta, habla, reproduce música, o simplemente deja que el sonido ambiental genere el fractal
5. Observa cómo cambian los parámetros en tiempo real en la esquina superior izquierda
6. Los indicadores de frecuencia en la parte inferior muestran qué bandas están activas

1. Open the sketch in a web browser
2. Click on the screen to enable the microphone
3. Grant microphone permissions when the browser requests them
4. Make sounds: sing, talk, play music, or just let ambient sound generate the fractal
5. Watch how parameters change in real-time in the upper left corner
6. Frequency indicators at the bottom show which bands are active

## Requisitos Técnicos / Technical Requirements

- Navegador moderno con soporte para Web Audio API
- Permisos de micrófono
- Conexión HTTPS (requerida para acceso al micrófono en la mayoría de navegadores)

- Modern browser with Web Audio API support
- Microphone permissions
- HTTPS connection (required for microphone access in most browsers)
