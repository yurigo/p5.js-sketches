# Waaac-Woooc: Groan Tube Simulator

A mobile-interactive sound sketch that simulates a groan tube (vara de lamento) using device accelerometer input and p5.sound synthesis.

## 🎯 Overview

This sketch transforms your mobile device into a digital groan tube instrument. Move or shake your device to create dynamic "waaac-woooc" sounds! The accelerometer data controls pitch, volume, and timbre in real-time, creating an expressive and fun musical instrument.

## 🎵 How It Works

### Sound Synthesis
- **Oscillator**: Sine wave for smooth, tube-like tones
- **Filter**: Low-pass filter for timbre control
- **Base Frequency**: 220 Hz (A3)
- **Pitch Range**: Adjustable ±50 to ±500 Hz

### Motion Mapping
1. **Acceleration → Pitch**: More movement = higher/lower pitch
2. **Velocity → Volume**: Faster movement = louder sound
3. **Smooth Transitions**: Exponential smoothing prevents audio artifacts

### Visual Feedback
- Ball color intensity reflects sound amplitude
- Glow effect scales with volume
- Waveform visualization shows current frequency
- Real-time debug info displays motion and sound parameters

## 🎮 Controls

### Initialization
- **Enable Motion & Sound** button: Required to activate accelerometer and audio (browser security requirement)

### Settings
- **Invert X/Y**: Flip accelerometer axes if device orientation feels wrong
- **Pitch Range**: Control the frequency variation (50-500 Hz)
- **Sensitivity**: Adjust motion response (0.1-3.0x)
- **Brightness**: Control filter cutoff frequency (darker/brighter tone)

### Keyboard Shortcuts
- `X`: Toggle X-axis inversion
- `Y`: Toggle Y-axis inversion
- `F`: Flip both axes

## 📱 Mobile Compatibility

### iOS (13+)
- Requires explicit permission for motion sensors
- Click "Enable Motion & Sound" and grant permission when prompted
- Works best in Safari

### Android
- Motion sensors activate automatically after button click
- Works in Chrome, Firefox, and other modern browsers

## 🎨 Technical Details

### Sound Parameters
- **Frequency Range**: 50-1000 Hz
- **Amplitude Range**: 0-0.5 (safety limit)
- **Filter Range**: 200-5000 Hz
- **Smoothing Factor**: 0.1 (exponential lerp)

### Physics Simulation
- Ball physics with realistic bouncing
- Friction: 0.98
- Collision damping: 0.8
- Velocity integration from acceleration

## 🎓 Educational Value

This sketch demonstrates:
- Mobile sensor integration (DeviceMotion API)
- Real-time audio synthesis with p5.sound
- Parameter mapping and smoothing techniques
- Visual-audio synchronization
- Responsive mobile UI design

## 🔧 Code Structure

```
sketch.js
├── Sound synthesis (lines 20-30)
├── UI initialization (DOMContentLoaded)
├── Setup & window resize
├── Draw loop with visual feedback
├── Sound parameter mapping
├── Motion sensor handling
└── Helper functions
```

## 💡 Try These

1. **Gentle Tilts**: Slow, controlled pitch changes
2. **Quick Shakes**: Rapid pitch variations like a real groan tube
3. **Circular Motion**: Create swooping sound effects
4. **Rhythmic Movement**: Make beats by controlling amplitude

## 🐛 Troubleshooting

**No sound?**
- Ensure you clicked "Enable Motion & Sound"
- Check device volume
- Try refreshing the page

**Motion not working?**
- Grant permission when prompted (iOS)
- Check that device has accelerometer
- Try inverting axes if movement feels wrong

**Sound glitches?**
- Reduce sensitivity setting
- Ensure stable browser (close other tabs)
- Lower pitch range if needed

## 🎉 Have Fun!

Transform your device into a musical instrument and explore the creative possibilities of motion-controlled sound synthesis!
