# Noise Fluency

This sketch uses p5.js's `noise()` function to create smooth, flowing lines. Coherent noise generates continuous variations, ideal for simulating natural phenomena.

```js
let n = noise(xoff, yoff) * 100;
vertex(x, y + n);
```

- **Concept:** Visual fluidity and continuity.
- **Use case:** Showing the difference between noise and randomness.
