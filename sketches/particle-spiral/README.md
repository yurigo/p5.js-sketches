# Particle Spiral

A mesmerizing particle system that creates colorful spiral patterns emanating from the center of the canvas.

## What it demonstrates

- **Particle Systems**: Dynamic creation and management of particle objects
- **Angular Motion**: Using trigonometric functions to create radiating motion patterns
- **Mouse Wheel Interaction**: Adjusting the spiral constant in real-time
- **Alpha Transparency**: Particles that fade out over their lifetime
- **Vector Mathematics**: Using p5.Vector for position and velocity

## How it works

Particles are continuously spawned from the center of the canvas. Each particle's velocity direction is calculated using the current frame count as an angle, combined with a configurable spiral constant that affects the cos/sin calculation. Once created, each particle moves in a straight line at constant velocity. The spiral pattern emerges from the fact that particles are created at incrementing angles over time, with the spiral constant controlling how tightly wound the pattern appears by affecting the velocity direction calculation.

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
