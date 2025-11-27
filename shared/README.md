# Fullscreen Controls for p5.js Sketches

A reusable module that adds 3-state viewing controls to any p5.js sketch.

## Features

- **Normal Mode**: Canvas at 90% of viewport (default square sizing)
- **Full Window Mode**: Canvas fills the entire browser window
- **Fullscreen Mode**: True fullscreen using the Fullscreen API (like videos)
- **Mobile Optimized**: Properly handles mobile browser UI (address bars, toolbars)
- Cross-browser compatible (Chrome, Firefox, Safari, Edge)
- Handles ESC key to exit fullscreen
- Customizable canvas sizing logic
- Clean, modern UI with hover effects

## Mobile Support

The module includes special handling for mobile devices:

- **Viewport Height Fix**: Accounts for mobile browser UI that changes viewport height
- **Touch Optimization**: Improved button interaction for touch devices
- **Fullscreen Fallback**: On mobile, "fullscreen" mode uses full window (true fullscreen API is often restricted on mobile browsers)
- **Fixed Positioning**: Prevents scrolling and ensures canvas fills the entire visible area

### Mobile-Specific Viewport Meta Tag

For best results on mobile, update your `<head>` meta tag:

```html
<meta
  name="viewport"
  content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover"
/>
```

This prevents unwanted zooming and ensures the canvas fills the safe area on notched devices.

## Quick Start

### 1. Add to your HTML

In your sketch's `index.html`, add these lines in the `<head>`:

```html
<link
  rel="stylesheet"
  type="text/css"
  href="../../shared/fullscreen-controls.css"
/>
<script src="../../shared/fullscreen-controls.js"></script>
```

Add the control buttons before your `sketch.js` script:

```html
<body>
  <!-- Your existing content (e.g., back button) -->

  <!-- Copy from fullscreen-controls-snippet.html -->
  <div class="screen-controls">
    <button
      id="normalBtn"
      class="screen-btn active"
      aria-label="Normal size"
      title="Normal size"
    >
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect
          x="4"
          y="4"
          width="16"
          height="16"
          stroke-width="2"
          stroke-linecap="round"
        />
      </svg>
    </button>
    <button
      id="windowBtn"
      class="screen-btn"
      aria-label="Full window"
      title="Full window"
    >
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M3 3h18v18H3z" stroke-width="2" />
        <path
          d="M9 3v18M15 3v18M3 9h18M3 15h18"
          stroke-width="1"
          opacity="0.5"
        />
      </svg>
    </button>
    <button
      id="fullscreenBtn"
      class="screen-btn"
      aria-label="Fullscreen"
      title="Fullscreen"
    >
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"
          stroke-width="2"
          stroke-linecap="round"
        />
      </svg>
    </button>
  </div>

  <script src="sketch.js"></script>
</body>
```

### 2. Update your sketch.js

Add two simple function calls:

```javascript
function setup() {
  createCanvas(windowWidth, windowHeight);
  // Your setup code...

  // Initialize fullscreen controls (must be called in setup)
  initFullscreenControls();
}

function windowResized() {
  // Handle window resize with fullscreen controls
  handleFullscreenWindowResize();
}
```

That's it! Your sketch now has fullscreen controls.

## File Structure

```
p5.js-sketches/
├── shared/
│   ├── fullscreen-controls.js           # Main module
│   ├── fullscreen-controls.css          # Button styling
│   ├── fullscreen-controls-snippet.html # HTML template
│   └── README.md                        # This file
└── sketches/
    └── your-sketch/
        ├── index.html                   # Include shared files here
        ├── sketch.js                    # Call init functions
        └── style.css                    # Your custom styles
```

## Default Behavior

By default, the module uses this sizing logic:

- **Normal**: Square canvas at 90% of the smallest viewport dimension
- **Full Window**: Canvas fills full width × height
- **Fullscreen**: Canvas fills full screen width × height

## Custom Canvas Sizing

If you need custom sizing logic (e.g., different aspect ratios, non-square canvas), pass a callback function:

```javascript
function setup() {
  createCanvas(800, 600);

  // Custom resize function
  initFullscreenControls((mode, winWidth, winHeight) => {
    if (mode === "normal") {
      // Custom normal size (16:9 aspect ratio)
      const w = Math.min(winWidth * 0.9, 1280);
      const h = (w * 9) / 16;
      return { w, h };
    } else {
      // Full window/fullscreen: maintain 16:9 aspect ratio
      const aspectRatio = 16 / 9;
      let w = winWidth;
      let h = winWidth / aspectRatio;

      if (h > winHeight) {
        h = winHeight;
        w = h * aspectRatio;
      }

      return { w, h };
    }
  });
}
```

The callback receives:

- `mode`: Current view mode ('normal', 'window', or 'fullscreen')
- `winWidth`: Current window width
- `winHeight`: Current window height

And must return:

- An object with `w` and `h` properties for the new canvas dimensions

## CSS Customization

The module adds these body classes you can use in your CSS:

- `body.full-window` - Applied in full window mode
- `body.fullscreen-mode` - Applied in fullscreen mode

The shared CSS automatically removes canvas borders in these modes. Add your own rules:

```css
/* Custom styling for fullscreen modes */
body.full-window .my-ui-element {
  display: none;
}

body.fullscreen-mode {
  cursor: none; /* Hide cursor in fullscreen */
}
```

## Button Customization

To change button appearance, override the CSS variables or classes in your local `style.css`:

```css
/* Change button colors */
.screen-btn {
  border-color: rgba(100, 200, 255, 0.4);
}

.screen-btn svg {
  stroke: #64c8ff;
}

.screen-btn:hover svg {
  stroke: #3aa8ff;
}
```

## API Reference

### Functions

#### `initFullscreenControls(customResizeCallback)`

Initialize the fullscreen control system. Call once in `setup()`.

**Parameters:**

- `customResizeCallback` (optional): Function for custom canvas sizing
  - Signature: `(mode, windowWidth, windowHeight) => { w, h }`

#### `handleFullscreenWindowResize()`

Handle window resize events. Call in your `windowResized()` function.

### FullscreenControls Object

Advanced users can access the module directly:

```javascript
// Get current view mode
console.log(FullscreenControls.viewMode); // 'normal', 'window', or 'fullscreen'

// Programmatically change mode
FullscreenControls.setViewMode("fullscreen");

// Force resize
FullscreenControls.resizeCanvas();
```

## Examples

### Example 1: Default Square Canvas

```javascript
function setup() {
  const s = min(windowWidth, windowHeight) * 0.9;
  createCanvas(s, s);
  initFullscreenControls();
}

function windowResized() {
  handleFullscreenWindowResize();
}
```

### Example 2: Rectangular Canvas with Aspect Ratio

```javascript
function setup() {
  createCanvas(800, 600);

  initFullscreenControls((mode, w, h) => {
    const aspectRatio = 4 / 3;

    if (mode === "normal") {
      const maxW = w * 0.8;
      const maxH = h * 0.8;
      let canvasW = maxW;
      let canvasH = canvasW / aspectRatio;

      if (canvasH > maxH) {
        canvasH = maxH;
        canvasW = canvasH * aspectRatio;
      }

      return { w: canvasW, h: canvasH };
    } else {
      // Full screen: fit to window maintaining aspect ratio
      let canvasW = w;
      let canvasH = w / aspectRatio;

      if (canvasH > h) {
        canvasH = h;
        canvasW = h * aspectRatio;
      }

      return { w: canvasW, h: canvasH };
    }
  });
}

function windowResized() {
  handleFullscreenWindowResize();
}
```

### Example 3: Static Sketch (using noLoop)

```javascript
function setup() {
  createCanvas(600, 600);
  noLoop();
  initFullscreenControls();
}

function windowResized() {
  handleFullscreenWindowResize();
  // redraw() is called automatically by the module
}

function draw() {
  background(220);
  // Your drawing code...
}
```

## Browser Compatibility

- ✅ Chrome/Edge (Chromium)
- ✅ Firefox
- ✅ Safari
- ✅ Opera

The module includes vendor prefixes for older browser versions.

## Troubleshooting

### Buttons not appearing

- Make sure you've included the HTML snippet
- Check that `fullscreen-controls.css` is loaded
- Verify the CSS path is correct (adjust `../../` if needed)

### Fullscreen not working

- Fullscreen must be triggered by user interaction (button click)
- Some browsers block fullscreen on file:// protocol - use a local server
- Check browser console for errors

### Canvas not resizing

- Ensure `initFullscreenControls()` is called in `setup()`
- Verify `handleFullscreenWindowResize()` is in `windowResized()`
- Check that p5.js is loaded before the fullscreen module

### Custom resize not working

- Verify your callback returns an object with `w` and `h` properties
- Check for JavaScript errors in the console
- Make sure the callback is passed to `initFullscreenControls()`

## License

This module is part of the p5.js-sketches repository and follows the same license.

## Contributing

Feel free to customize and improve this module for your needs!
