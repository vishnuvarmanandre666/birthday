// Web Audio API Sound Effects Engine for Romantic Birthday Experience

let audioContext = null;

export function getAudioContext() {
  if (typeof window === 'undefined') return null;
  if (!audioContext) {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (AudioCtx) audioContext = new AudioCtx();
  }
  if (audioContext && audioContext.state === 'suspended') {
    audioContext.resume();
  }
  return audioContext;
}

export function playTone(freq, type = 'sine', duration = 0.5, volume = 0.1) {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, now);

    gain.gain.setValueAtTime(volume, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + duration);
  } catch (e) {}
}

export function playEnvelopeOpenSound() {
  playTone(330, 'triangle', 0.2, 0.15);
  setTimeout(() => playTone(440, 'triangle', 0.2, 0.15), 80);
  setTimeout(() => playTone(554, 'sine', 0.3, 0.2), 160);
}

export function playPaperRustle() {
  playTone(600, 'sine', 0.15, 0.08);
  setTimeout(() => playTone(720, 'sine', 0.2, 0.1), 70);
}

export function playBlowSound() {
  playTone(180, 'sine', 0.4, 0.12);
}

export function playCelebrationChime() {
  const notes = [523, 659, 784, 1046];
  notes.forEach((f, i) => {
    setTimeout(() => playTone(f, 'sine', 0.4, 0.1), i * 90);
  });
}

export function playCelebrationFanfare() {
  const notes = [523, 659, 784, 1046, 1318];
  notes.forEach((f, i) => {
    setTimeout(() => playTone(f, 'sine', 0.6, 0.12), i * 110);
  });
}

export function playGiftOpenSound() {
  playTone(400, 'triangle', 0.2, 0.15);
  setTimeout(() => playTone(600, 'triangle', 0.25, 0.18), 100);
  setTimeout(() => playTone(800, 'sine', 0.4, 0.2), 200);
}
