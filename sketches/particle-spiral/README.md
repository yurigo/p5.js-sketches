# Particle Spiral

A mesmerizing particle system that creates colorful spiral patterns emanating from the center of the canvas.

## What it demonstrates

- **Particle Systems**: Dynamic creation and management of particle objects
- **Spiral Mathematics**: Using trigonometric functions to create spiral motion patterns
- **Mouse Wheel Interaction**: Adjusting the spiral constant in real-time
- **Alpha Transparency**: Particles that fade out over their lifetime
- **Vector Mathematics**: Using p5.Vector for position and velocity

## How it works

Particles are continuously spawned from the center of the canvas. Each particle's velocity is calculated using the current frame count as an angle, combined with a configurable spiral constant. This creates the spiral effect where particles radiate outward in a rotating pattern.

## Interaction

- **Mouse Wheel**: Scroll up or down to adjust the spiral constant, changing how tightly wound the spiral appears
- The current constant value is displayed in the top-left corner

## Visual Elements

- Particles with random colors
- Fading alpha transparency as particles age
- Real-time spiral constant adjustment
- Responsive canvas sizing
- Smooth continuous spiral generation

This sketch demonstrates how simple mathematical principles combined with particle systems can create complex and beautiful visual effects.
