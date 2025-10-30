# Test de audición

Pequeño sketch con p5.js + p5.sound que emite un tono continuo y va aumentando su frecuencia progresivamente.

- Clic o cualquier tecla: inicia el audio (desbloquea el AudioContext del navegador).
- Cualquier tecla (después de iniciar): pausa/reanuda la subida de frecuencia.
- R: reinicia la frecuencia al valor mínimo.

La frecuencia actual se muestra en pantalla y el color de fondo cambia según la frecuencia (mapeo logarítmico en HSB).

Rango por defecto: 220 Hz → 4000 Hz. Velocidad de subida: ~120 Hz/s.
