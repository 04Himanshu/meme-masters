/**
 * 60-Second Countdown Timer with SVG Visual Meter & Audio cues
 */

class QuizTimer {
  constructor(options = {}) {
    this.totalSeconds = options.duration || 60;
    this.remainingSeconds = this.totalSeconds;
    this.intervalId = null;
    this.isRunning = false;
    this.onTick = options.onTick || null;
    this.onExpire = options.onExpire || null;
    this.circleRadius = 45;
    this.circumference = 2 * Math.PI * this.circleRadius; // ~282.74
  }

  setDuration(seconds) {
    this.totalSeconds = seconds;
    this.reset();
  }

  start() {
    if (this.isRunning) return;
    this.isRunning = true;

    // Fire immediate tick callback
    if (this.onTick) this.onTick(this.remainingSeconds, this.getProgress());

    this.intervalId = setInterval(() => {
      this.remainingSeconds--;

      // Sound triggers
      if (this.remainingSeconds <= 5 && this.remainingSeconds > 0) {
        window.sound?.playUrgentTick();
      } else if (this.remainingSeconds <= 10 && this.remainingSeconds > 5) {
        window.sound?.playTick();
      }

      if (this.remainingSeconds <= 0) {
        this.remainingSeconds = 0;
        this.stop();
        window.sound?.playTimeUp();
        if (this.onTick) this.onTick(0, 0);
        if (this.onExpire) this.onExpire();
        return;
      }

      if (this.onTick) this.onTick(this.remainingSeconds, this.getProgress());
    }, 1000);
  }

  pause() {
    this.stop();
  }

  toggle() {
    if (this.isRunning) {
      this.pause();
    } else {
      this.start();
    }
    return this.isRunning;
  }

  stop() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
    this.isRunning = false;
  }

  reset(newDuration) {
    this.stop();
    if (newDuration) {
      this.totalSeconds = newDuration;
    }
    this.remainingSeconds = this.totalSeconds;
    if (this.onTick) this.onTick(this.remainingSeconds, 1);
  }

  addTime(seconds = 10) {
    this.remainingSeconds = Math.min(this.remainingSeconds + seconds, 120);
    if (this.onTick) this.onTick(this.remainingSeconds, this.getProgress());
  }

  subtractTime(seconds = 10) {
    this.remainingSeconds = Math.max(this.remainingSeconds - seconds, 0);
    if (this.onTick) this.onTick(this.remainingSeconds, this.getProgress());
    if (this.remainingSeconds === 0) {
      this.stop();
      window.sound?.playTimeUp();
      if (this.onExpire) this.onExpire();
    }
  }

  getProgress() {
    return this.remainingSeconds / this.totalSeconds;
  }

  formatTime(seconds = this.remainingSeconds) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  }
}

// Node.js testing compatibility
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { QuizTimer };
}


