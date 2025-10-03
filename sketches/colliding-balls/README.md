# Colliding Balls

A physics simulation featuring three colored balls that bounce off walls and collide with each other.

## Features

- **Three Balls**: Blue, red, and green balls with different initial positions and velocities
- **Wall Collisions**: Balls bounce off the canvas boundaries
- **Ball-to-Ball Collisions**: Realistic collision physics with velocity exchange
- **Collision Resolution**: Balls are separated to prevent sticking together

## Physics

The sketch implements:
- Simple elastic collisions between balls (velocity swap)
- Boundary collision detection and response
- Overlap resolution to prevent balls from getting stuck together

## How It Works

Each ball has:
- Position (x, y)
- Velocity (vx, vy)
- Radius (shared radio variable = 50)
- Color

On each frame:
1. Balls update their positions based on velocity
2. Wall collisions are detected and velocities reversed
3. Ball-to-ball collisions are detected using distance calculation
4. When balls collide, they exchange velocities
5. Overlapping balls are pushed apart to prevent sticking
