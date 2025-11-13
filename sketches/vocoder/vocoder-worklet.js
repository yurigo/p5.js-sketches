// vocoder-worklet.js
class VocoderProcessor extends AudioWorkletProcessor {
  static get parameterDescriptors() {
    return [
      // Envelope follower tuning
      { name: "attackMs", defaultValue: 5, minValue: 0.1, maxValue: 100 },
      { name: "releaseMs", defaultValue: 60, minValue: 5, maxValue: 500 },
      // Depth/drive
      { name: "depth", defaultValue: 0.7, minValue: 0.0, maxValue: 1.0 },
      { name: "drive", defaultValue: 1.0, minValue: 0.5, maxValue: 4.0 },
    ];
  }

  constructor() {
    super();
    this._env2 = 0.0; // leaky RMS (energy)
  }

  // util: time (ms) → 1-pole coefficient
  _coef(ms) {
    const t = Math.max(0.0001, ms / 1000);
    return Math.exp(-1 / (t * sampleRate));
  }

  process(inputs, outputs, parameters) {
    const modIn = inputs[0]; // microphone
    const carIn = inputs[1]; // carrier oscillator
    const out = outputs[0];

    if (!out.length) return true;

    const attackMs = parameters.attackMs[0];
    const releaseMs = parameters.releaseMs[0];
    const depth = parameters.depth[0];
    const drive = parameters.drive[0];

    // Use first channel of each input if present
    const modCh = modIn[0] && modIn[0][0] ? modIn[0][0] : null;
    const carCh = carIn[0] && carIn[0][0] ? carIn[0][0] : null;
    const outCh = out[0];
    const N = outCh.length;

    if (!carCh || !modCh) {
      for (let i = 0; i < N; i++) outCh[i] = 0;
      return true;
    }

    // coefficients per block (approx)
    const aCoef = this._coef(attackMs);
    const rCoef = this._coef(releaseMs);

    for (let i = 0; i < N; i++) {
      // leaky RMS (square + one-pole)
      const x2 = modCh[i] * modCh[i];

      // choose attack vs release smoothing on energy
      const target = x2;
      const rising = target > this._env2;
      const coef = rising ? aCoef : rCoef;
      this._env2 = coef * this._env2 + (1 - coef) * target;

      // envelope amplitude
      const env = Math.sqrt(this._env2 + 1e-10);

      // gentle curve for intelligibility; map [0..~1] with depth
      const shaped = 1.0 - depth + depth * env; // mixes carrier presence w/ envelope
      let y = carCh[i] * shaped;

      // soft clipper to prevent speaker murder
      const k = Math.max(0.5, drive); // 0.5..4
      const sat = Math.tanh(k * y) / Math.tanh(k); // -1..1 normalized
      outCh[i] = sat * 0.9; // small headroom
    }

    return true;
  }
}

registerProcessor("vocoder-processor", VocoderProcessor);
