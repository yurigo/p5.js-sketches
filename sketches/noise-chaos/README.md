# Random Chaos

This sketch demonstrates pure randomness using p5.js's `random()` function. Each run generates a cloud of white dots in completely chaotic positions.

```js
for (let i = 0; i < 500; i++) {
  ellipse(random(width), random(height), 5);
}
```

- **Concept:** Visual chaos, no patterns.
- **Use case:** Explaining the difference between randomness and coherent noise.
