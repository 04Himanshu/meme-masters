/**
 * Web Audio API Sound Synthesizer
 * Zero-dependency, offline-ready cinematic game audio effects.
 */

class SoundController {
  constructor() {
    this.ctx = null;
    this.muted = false;
  }

  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  toggleMute() {
    this.muted = !this.muted;
    return this.muted;
  }

  isMuted() {
    return this.muted;
  }

  playClick() {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(520, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(220, this.ctx.currentTime + 0.03);

    gain.gain.setValueAtTime(0.1, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.03);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start();
    osc.stop(this.ctx.currentTime + 0.04);
  }

  playCinematicStart() {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;

    // 1. Deep Sub-bass Cinematic Impact Boom (Inception / Hans Zimmer style hit)
    const subOsc = this.ctx.createOscillator();
    const subGain = this.ctx.createGain();
    subOsc.type = 'sine';
    subOsc.frequency.setValueAtTime(150, now);
    subOsc.frequency.exponentialRampToValueAtTime(36, now + 0.7);

    subGain.gain.setValueAtTime(0.65, now);
    subGain.gain.exponentialRampToValueAtTime(0.001, now + 1.4);

    subOsc.connect(subGain);
    subGain.connect(this.ctx.destination);
    subOsc.start(now);
    subOsc.stop(now + 1.5);

    // 2. Rising Theatrical Brass / Power Triad Fanfare (G3, C4, E4, G4, C5)
    const fanfareNotes = [196.00, 261.63, 329.63, 392.00, 523.25];
    fanfareNotes.forEach((freq, idx) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const noteStart = now + idx * 0.07;

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, noteStart);

      gain.gain.setValueAtTime(0.001, noteStart);
      gain.gain.linearRampToValueAtTime(0.22, noteStart + 0.04);
      gain.gain.exponentialRampToValueAtTime(0.001, noteStart + 0.85);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(noteStart);
      osc.stop(noteStart + 0.95);
    });

    // 3. Shimmering Golden Sparkle / Whoosh
    const shimmerOsc = this.ctx.createOscillator();
    const shimmerGain = this.ctx.createGain();
    shimmerOsc.type = 'sawtooth';
    shimmerOsc.frequency.setValueAtTime(700, now + 0.2);
    shimmerOsc.frequency.exponentialRampToValueAtTime(1600, now + 0.6);

    shimmerGain.gain.setValueAtTime(0.09, now + 0.2);
    shimmerGain.gain.exponentialRampToValueAtTime(0.001, now + 0.75);

    shimmerOsc.connect(shimmerGain);
    shimmerGain.connect(this.ctx.destination);
    shimmerOsc.start(now + 0.2);
    shimmerOsc.stop(now + 0.8);
  }
}

// Global instance
if (typeof window !== 'undefined') {
  window.sound = new SoundController();
}
