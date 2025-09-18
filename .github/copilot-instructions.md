# Copilot Instructions

These instructions configure how GitHub Copilot should work in this repository.  
They follow the [Best practices for Copilot coding agent](https://gh.io/copilot-coding-agent-tips).

---

## Project context
- This repository contains **p5.js creative coding sketches** for teaching and experimentation.
- Each sketch lives in its own folder under `sketches/` with its own copy of p5.js libraries.

## Coding conventions
- Each sketch lives in its own folder under `sketches/` at the root of the repo.
- Folder structure for each sketch:
  ```
  sketches/MySketch/
  ├── index.html      # Loads p5.js from local libraries/ and the sketch file
  ├── sketch.js       # Main p5.js code (must define setup() and draw())
  ├── style.css       # Optional styling
  ├── libraries/      # Local copies of p5.js files
  │   ├── p5.min.js
  │   └── p5.sound.min.js
  └── README.md       # Short description of the sketch (optional)
  ```
- Keep external libraries inside each sketch's `libraries/` folder.
- Use **vanilla JavaScript** (ES6) with **2-space indentation**.
- Prioritize clarity and comments for beginners.

## Example structure
```
sketches/
├── helloworld/
│   ├── index.html
│   ├── sketch.js
│   ├── style.css
│   └── libraries/
│       ├── p5.min.js
│       └── p5.sound.min.js
└── particles/
    ├── index.html
    ├── sketch.js
    ├── style.css
    └── libraries/
        ├── p5.min.js
        └── p5.sound.min.js
```

## Documentation
- Add a `README.md` in each sketch folder explaining the example (optional).
- Update the top-level `README.md` with links to new sketches.
- Use Markdown code fences for snippets.

## Copilot guidance
- Always assume p5.js is loaded via `<script src="libraries/p5.min.js"></script>` in each sketch's `index.html`.
- Start new sketches with the standard p5.js structure:
  ```js
  function setup() {
    createCanvas(400, 400);
  }

  function draw() {
    background(220);
  }
  ```
- Prefer simple, readable, and educational code.
- Add inline comments for new or non-obvious concepts.
- Do not suggest extra frameworks; only use p5.js (and p5.sound if needed).
- When creating new sketches, copy the `libraries/` folder from an existing sketch.
- Use descriptive folder names that reflect the sketch's purpose (e.g., `particle-system`, `interactive-drawing`, `generative-art`).

## Common patterns in this repository
- Many sketches use `noLoop()` in `setup()` for static drawings.
- Interactive sketches often implement `mousePressed()`, `mouseDragged()`, or `keyPressed()` functions.
- Animation sketches typically use `frameCount` or custom timer variables.
- Class-based approaches are used for complex sketches (see `particles/sketch.js`).
- Color and styling often use HSB color mode or creative color palettes.

## HTML template for new sketches
```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <title>Your Sketch Title</title>

    <link rel="stylesheet" type="text/css" href="style.css">

    <script src="libraries/p5.min.js"></script>
    <script src="libraries/p5.sound.min.js"></script>
  </head>

  <body>
    <script src="sketch.js"></script>
  </body>
</html>
```

## CSS styling patterns
Most sketches use minimal CSS for centering and basic styling:
```css
html, body {
  margin: 0;
  padding: 0;
  display: grid;
  place-content: center center;
  height: 100vh;
  background: #0f0f23;
}

canvas {
  display: block;
  border: 3px solid #333;
  border-radius: 1em;
}
```