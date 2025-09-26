# Random Seed Art

A generative art sketch that demonstrates the power of `randomSeed()` and `random()` functions in p5.js. This sketch creates deterministic art based on a seed value provided through URL query parameters.

## Features

- **Deterministic Generation**: Same seed always produces the same artwork
- **URL Parameter Control**: Use `?id=1234` to set the seed value
- **HSL Color Mode**: Vibrant colors using HSB color space
- **Multiple Art Elements**: Combines circles, curves, and polygons
- **Interactive**: Click to generate a new random seed

## Usage

1. Open the sketch normally for default seed (1234)
2. Add `?id=5678` to the URL to use seed 5678
3. Click anywhere to generate a new random seed
4. Share URLs with specific seeds to share exact artworks

## Examples

- `index.html` - Default seed (1234)
- `index.html?id=42` - Seed 42
- `index.html?id=9999` - Seed 9999

Each seed produces a completely different but reproducible artwork!