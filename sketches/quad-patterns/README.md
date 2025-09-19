# Quad Patterns

This sketch demonstrates the `quad()` function in p5.js, showing how to create quadrilaterals (four-sided shapes) with precise control over each corner point.

## Description

The `quad()` function takes 8 parameters representing the x,y coordinates of four corner points. Unlike `rect()`, which creates only rectangles, `quad()` allows you to create any four-sided shape including parallelograms, trapezoids, and irregular quadrilaterals.

## What You'll Learn

- **quad() syntax**: `quad(x1, y1, x2, y2, x3, y3, x4, y4)`
- **Point ordering**: Starting from any corner and going clockwise or counter-clockwise
- **Shape variations**: From regular rectangles to complex irregular shapes
- **Creative applications**: Overlapping, patterns, and mathematical variations

## Examples Shown

1. **Basic Rectangle**: Standard rectangular quad for comparison with `rect()`
2. **Irregular Quad**: Parallelogram-like shape showing quad flexibility
3. **Overlapping Quads**: Multiple transparent quads creating layered effects
4. **Pattern Grid**: Mathematical variations creating interesting visual patterns

## Educational Value

This sketch is perfect for understanding:
- Coordinate geometry in creative coding
- The difference between `rect()` and `quad()`
- How to create complex shapes from simple primitives
- Pattern creation through mathematical variation

## Key Concepts

- **Vertices**: Each quad has 4 vertices (corner points)
- **Order matters**: Points should be specified in clockwise or counter-clockwise order
- **Flexibility**: Any four-sided shape is possible
- **Transparency**: Using alpha values for layering effects

Perfect for students learning p5.js geometry functions and wanting to create more complex shapes than basic rectangles and circles.