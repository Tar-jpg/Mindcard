// Tiny generative ambient pad using the Web Audio API.
// No audio assets needed — perfect for a self-contained Vercel demo.

type Nullable<T> = T | null;

export class Ambient {
  private ctx: Nullable<AudioContext> = null;
  private master: Nullable<GainNode> = null;
  private nodes: OscillatorNode[] = [];
  private lfo: Nullable<OscillatorNode> = null;
  public enabled = false;

  private ensure() {
    if (typeof window === "undefined") return;
    if (this.ctx) return;
    const AC =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext })
        .webkitAudioContext;
    if (!AC) return;
    this.ctx = new AC();
    this.master = this.ctx.createGain();
    this.master.gain.value = 0;
    this.master.connect(this.ctx.destination);
  }

  start() {
    this.ensure();
    if (!this.ctx || !this.master) return;
    if (this.ctx.state === "suspended") void this.ctx.resume();
    if (this.nodes.length) {
      this.fade(0.12, 1.6);
      this.enabled = true;
      return;
    }

    // Warm, slightly detuned chord (A2 / E3 / A3 / C#4) — soft and major-ish.
    const freqs = [110, 164.81, 220, 277.18];
    const filter = this.ctx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.value = 760;
    filter.Q.value = 0.4;
    filter.connect(this.master);

    freqs.forEach((f, i) => {
      const osc = this.ctx!.createOscillator();
      osc.type = i % 2 === 0 ? "sine" : "triangle";
      osc.frequency.value = f;
      osc.detune.value = (i - 1.5) * 4;
      const g = this.ctx!.createGain();
      g.gain.value = 0.16 / (i + 1);
      osc.connect(g);
      g.connect(filter);
      osc.start();
      this.nodes.push(osc);
    });

    // Slow breathing LFO on the master for a gentle swell.
    this.lfo = this.ctx.createOscillator();
    this.lfo.frequency.value = 0.08;
    const lfoGain = this.ctx.createGain();
    lfoGain.gain.value = 0.04;
    this.lfo.connect(lfoGain);
    lfoGain.connect(this.master.gain);
    this.lfo.start();

    this.fade(0.12, 1.8);
    this.enabled = true;
  }

  stop() {
    if (!this.ctx || !this.master) return;
    this.fade(0, 1.2);
    this.enabled = false;
  }

  private fade(to: number, seconds: number) {
    if (!this.ctx || !this.master) return;
    const now = this.ctx.currentTime;
    this.master.gain.cancelScheduledValues(now);
    this.master.gain.setValueAtTime(this.master.gain.value, now);
    this.master.gain.linearRampToValueAtTime(to, now + seconds);
  }
}

let singleton: Ambient | null = null;
export function getAmbient(): Ambient {
  if (!singleton) singleton = new Ambient();
  return singleton;
}
