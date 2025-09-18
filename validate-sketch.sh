#!/bin/bash
# Simple validation script to check if a sketch follows the expected structure
# Usage: ./validate-sketch.sh sketches/my-sketch

SKETCH_DIR="$1"

if [ -z "$SKETCH_DIR" ]; then
  echo "Usage: $0 <sketch-directory>"
  echo "Example: $0 sketches/my-new-sketch"
  exit 1
fi

if [ ! -d "$SKETCH_DIR" ]; then
  echo "❌ Directory $SKETCH_DIR does not exist"
  exit 1
fi

echo "🔍 Validating sketch structure for: $SKETCH_DIR"
echo ""

# Check required files
required_files=("index.html" "sketch.js" "style.css")
missing_files=()

for file in "${required_files[@]}"; do
  if [ -f "$SKETCH_DIR/$file" ]; then
    echo "✅ $file exists"
  else
    echo "❌ $file is missing"
    missing_files+=("$file")
  fi
done

# Check libraries directory
if [ -d "$SKETCH_DIR/libraries" ]; then
  echo "✅ libraries/ directory exists"
  
  # Check for p5.js files
  if [ -f "$SKETCH_DIR/libraries/p5.min.js" ]; then
    echo "✅ p5.min.js exists in libraries/"
  else
    echo "❌ p5.min.js missing from libraries/"
    missing_files+=("libraries/p5.min.js")
  fi
  
  if [ -f "$SKETCH_DIR/libraries/p5.sound.min.js" ]; then
    echo "✅ p5.sound.min.js exists in libraries/"
  else
    echo "❌ p5.sound.min.js missing from libraries/"
    missing_files+=("libraries/p5.sound.min.js")
  fi
else
  echo "❌ libraries/ directory is missing"
  missing_files+=("libraries/")
fi

echo ""

# Check if sketch.js has basic p5.js structure
if [ -f "$SKETCH_DIR/sketch.js" ]; then
  if grep -q "function setup()" "$SKETCH_DIR/sketch.js"; then
    echo "✅ setup() function found in sketch.js"
  else
    echo "⚠️  setup() function not found in sketch.js"
  fi
  
  if grep -q "function draw()" "$SKETCH_DIR/sketch.js"; then
    echo "✅ draw() function found in sketch.js"
  else
    echo "⚠️  draw() function not found in sketch.js"
  fi
fi

# Check if index.html loads p5.js correctly
if [ -f "$SKETCH_DIR/index.html" ]; then
  if grep -q 'src="libraries/p5.min.js"' "$SKETCH_DIR/index.html"; then
    echo "✅ index.html loads p5.min.js from libraries/"
  else
    echo "❌ index.html does not load p5.min.js from libraries/"
  fi
  
  if grep -q 'src="sketch.js"' "$SKETCH_DIR/index.html"; then
    echo "✅ index.html loads sketch.js"
  else
    echo "❌ index.html does not load sketch.js"
  fi
fi

echo ""

if [ ${#missing_files[@]} -eq 0 ]; then
  echo "🎉 Sketch structure validation passed!"
  exit 0
else
  echo "❌ Sketch structure validation failed. Missing files:"
  for file in "${missing_files[@]}"; do
    echo "   - $file"
  done
  exit 1
fi