# 🎛️ p5.js Sound Tools (Synthesis & Audio)

| Tool            | Purpose                      | Polyphonic? | Beginner Friendly |
| --------------- | ---------------------------- | ----------- | ----------------- |
| `p5.Oscillator` | Basic wave generation        | ❌           | ✅                 |
| `p5.MonoSynth`  | Mono synth w/ envelope       | ❌           | ✅                 |
| `p5.PolySynth`  | Chords / multiple notes      | ✅           | ✅✅                |
| `p5.Envelope`   | Shape volume/pitch/params    | ✅           | ✅                 |
| `p5.Filter`     | Frequency filtering          | ✅           | ✅                 |
| `p5.Reverb`     | Echo-like effect             | ✅           | ✅                 |
| `Tone.js`       | Advanced synthesis & routing | ✅✅          | ⚠️ (harder)       |


## 🔉 1. p5.Oscillator

Basic waveform generator (sine, square, triangle, sawtooth).

Use for simple tones and low-level control.

let osc;

function setup() {
  createCanvas(400, 200);
  osc = new p5.Oscillator('sine');
  osc.freq(440);
  osc.amp(0.5);
  osc.start();
}

## 🎹 2. p5.PolySynth

Polyphonic version of multiple p5.MonoSynth voices.

Good for playing chords.

```
let poly;

function setup() {
  createCanvas(400, 200);
  poly = new p5.PolySynth();
}

function keyPressed() {
  poly.play(key, 0.5, 0, 0.5);
}
```

## 🎵 3. p5.MonoSynth

Single-voice synthesizer with ADSR envelope and basic oscillator.

Use when you want full control over a single voice.

```
let mono;

function setup() {
  createCanvas(400, 200);
  mono = new p5.MonoSynth();
}

function keyPressed() {
  mono.play(key, 0.5, 0, 0.5);
}
```

## 🎚️ 4. p5.Envelope

Envelope generator (ADSR) for shaping amplitude or other parameters over time.

Can be attached to p5.Oscillator, p5.SoundFile, etc.

```
let osc, env;

function setup() {
  createCanvas(400, 200);
  osc = new p5.Oscillator('triangle');
  env = new p5.Envelope();
  env.setADSR(0.05, 0.1, 0.5, 0.5);
  env.setRange(1, 0);

  osc.start();
  osc.amp(env);
}

function keyPressed() {
  env.play();
}
```

## 🎛️ 5. p5.Filter

Filters audio (low-pass, high-pass, band-pass).

Good for subtractive synthesis or adding effects.

```
let osc, filter;

function setup() {
  createCanvas(400, 200);
  osc = new p5.Oscillator('sawtooth');
  filter = new p5.Filter();

  osc.disconnect();
  osc.connect(filter);

  filter.freq(1000);
  osc.amp(0.5);
  osc.start();
}
```

## 🔁 6. p5.Delay, p5.Reverb, p5.Distortion

Audio effects you can apply to synths, oscillators, or sound files.

```
let osc, reverb;

function setup() {
  createCanvas(400, 200);
  osc = new p5.Oscillator('sine');
  reverb = new p5.Reverb();

  osc.amp(0.5);
  osc.start();

  reverb.process(osc, 3, 2); // reverb.process(source, seconds, decayRate)
}
```

## 🧩 Modular Building with p5.sound

You can combine:

p5.Oscillator + p5.Envelope + p5.Filter + p5.Effect
to build your own synth chains. It’s more flexible than p5.MonoSynth or p5.PolySynth, though it requires more setup.