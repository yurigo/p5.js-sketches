/**
 * Fullscreen Controls for p5.js Sketches
 *
 * This module provides a 3-state viewing system:
 * - Normal: Canvas at 90% of viewport (square)
 * - Full Window: Canvas fills entire browser window
 * - Fullscreen: True fullscreen mode using the Fullscreen API
 *
 * Usage:
 * 1. Include this script in your HTML after p5.js
 * 2. Add the HTML buttons (see fullscreen-controls-snippet.html)
 * 3. Add the CSS (see fullscreen-controls.css)
 * 4. Call initFullscreenControls() in your setup() function
 * 5. Optionally provide custom resize callback for non-square canvases
 */

// Fullscreen control state
const FullscreenControls = {
  viewMode: "normal",
  customResizeCallback: null,
  isMobile:
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    ),

  /**
   * Initialize fullscreen controls
   * @param {Function} customResizeCallback - Optional callback for custom canvas sizing
   *   Receives (mode, windowWidth, windowHeight) and should return {w, h}
   */
  init: function (customResizeCallback = null) {
    this.customResizeCallback = customResizeCallback;
    this.setupEventListeners();

    // Set up CSS variable for actual viewport height (fixes mobile browser UI)
    this.updateViewportHeight();
    window.addEventListener("resize", () => this.updateViewportHeight());
  },

  updateViewportHeight: function () {
    // Set CSS custom property for actual viewport height
    // This accounts for mobile browser UI (address bar, etc.)
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);
  },

  setupEventListeners: function () {
    const normalBtn = document.getElementById("normalBtn");
    const windowBtn = document.getElementById("windowBtn");
    const fullscreenBtn = document.getElementById("fullscreenBtn");

    if (!normalBtn || !windowBtn || !fullscreenBtn) {
      console.warn(
        "Fullscreen control buttons not found. Make sure to include the HTML buttons."
      );
      return;
    }

    normalBtn.addEventListener("click", () => this.setViewMode("normal"));
    windowBtn.addEventListener("click", () => this.setViewMode("window"));
    fullscreenBtn.addEventListener("click", () =>
      this.setViewMode("fullscreen")
    );

    // Listen for fullscreen changes (e.g., user pressing ESC)
    document.addEventListener("fullscreenchange", () =>
      this.handleFullscreenChange()
    );
    document.addEventListener("webkitfullscreenchange", () =>
      this.handleFullscreenChange()
    );
    document.addEventListener("mozfullscreenchange", () =>
      this.handleFullscreenChange()
    );
    document.addEventListener("MSFullscreenChange", () =>
      this.handleFullscreenChange()
    );
  },

  setViewMode: function (mode) {
    this.viewMode = mode;

    // Update button states
    document
      .querySelectorAll(".screen-btn")
      .forEach((btn) => btn.classList.remove("active"));

    // Update body classes for CSS styling
    document.body.classList.remove("full-window", "fullscreen-mode");

    if (mode === "normal") {
      this.exitFullscreen();
      document.getElementById("normalBtn").classList.add("active");
      this.resizeCanvas();
    } else if (mode === "window") {
      this.exitFullscreen();
      document.body.classList.add("full-window");
      document.getElementById("windowBtn").classList.add("active");
      this.resizeCanvas();
    } else if (mode === "fullscreen") {
      document.body.classList.add("fullscreen-mode");
      // On mobile, fullscreen API often doesn't work or is restricted
      // So we treat it the same as full-window mode
      if (!this.isMobile) {
        this.enterFullscreen();
      } else {
        // On mobile, just use full window mode for "fullscreen"
        this.resizeCanvas();
      }
      document.getElementById("fullscreenBtn").classList.add("active");
    }
  },

  enterFullscreen: function () {
    const elem = document.documentElement;

    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem.webkitRequestFullscreen) {
      elem.webkitRequestFullscreen();
    } else if (elem.mozRequestFullScreen) {
      elem.mozRequestFullScreen();
    } else if (elem.msRequestFullscreen) {
      elem.msRequestFullscreen();
    }
  },

  exitFullscreen: function () {
    if (
      document.fullscreenElement ||
      document.webkitFullscreenElement ||
      document.mozFullScreenElement ||
      document.msFullscreenElement
    ) {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      }
    }
  },

  handleFullscreenChange: function () {
    const isFullscreen =
      document.fullscreenElement ||
      document.webkitFullscreenElement ||
      document.mozFullScreenElement ||
      document.msFullscreenElement;

    if (!isFullscreen && this.viewMode === "fullscreen") {
      // User exited fullscreen (e.g., pressed ESC)
      this.setViewMode("normal");
    } else if (isFullscreen && this.viewMode === "fullscreen") {
      // Fullscreen activated, resize canvas
      this.resizeCanvas();
    }
  },

  resizeCanvas: function () {
    if (!window.resizeCanvas) {
      console.warn("p5.js resizeCanvas function not found");
      return;
    }

    let w, h;

    if (this.customResizeCallback) {
      // Use custom resize logic
      const dimensions = this.customResizeCallback(
        this.viewMode,
        windowWidth,
        windowHeight
      );
      w = dimensions.w;
      h = dimensions.h;
    } else {
      // Default behavior: square canvas
      if (this.viewMode === "normal") {
        // Normal: 90% of smallest dimension (square)
        const s = min(windowWidth, windowHeight) * 0.9;
        w = s;
        h = s;
      } else if (this.viewMode === "window" || this.viewMode === "fullscreen") {
        // Full window/fullscreen: use actual viewport dimensions
        // Use window.innerWidth/Height for better mobile support
        w = window.innerWidth;
        h = window.innerHeight;
      }
    }

    resizeCanvas(w, h);

    // Call redraw if it exists (for sketches using noLoop)
    if (window.redraw && typeof window.redraw === "function") {
      redraw();
    }
  },

  /**
   * Call this from your windowResized() function
   */
  handleWindowResize: function () {
    this.resizeCanvas();
  },
};

// Convenience functions for global scope
function initFullscreenControls(customResizeCallback = null) {
  FullscreenControls.init(customResizeCallback);
}

function handleFullscreenWindowResize() {
  FullscreenControls.handleWindowResize();
}
