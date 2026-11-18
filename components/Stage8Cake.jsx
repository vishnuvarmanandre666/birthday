'use client';
import { useState } from 'react';
import confetti from 'canvas-confetti';
import { playBlowSound, playCelebrationFanfare } from '@/lib/audio';

export default function Stage8Cake({ herName, onNext }) {
  const [candlesBlown, setCandlesBlown] = useState(false);

  const handleBlowCandles = () => {
    if (candlesBlown) return;
    setCandlesBlown(true);

    playBlowSound();

    setTimeout(() => {
      playCelebrationFanfare();

      // Grand celebration confetti
      if (typeof confetti === 'function') {
        const count = 220;
        const defaults = { origin: { y: 0.7 }, colors: ['#ffd700', '#ff4d6d', '#8d1326', '#ffffff', '#c9184a'] };
        confetti({ ...defaults, particleCount: Math.floor(count * 0.35), spread: 100, scalar: 0.8 });
        confetti({ ...defaults, particleCount: Math.floor(count * 0.25), spread: 60 });
        confetti({ ...defaults, particleCount: Math.floor(count * 0.2), spread: 120, startVelocity: 35 });
      }
    }, 400);
  };

  return (
    <section className="stage-card active-stage" aria-label="Birthday Cake and Wish">
      <div className="stage-content text-center">
        <h2 className="romantic-title">Make a Birthday Wish, My Love! 🎂</h2>
        <p className="subtext-soft">
          {candlesBlown
            ? "Your wish is now soaring to the stars! ✨"
            : "Close your eyes, make the deepest wish in your heart, and blow out the candles!"}
        </p>

        {/* Animated Cake */}
        <div className="cake-display-area">
          <div className="birthday-cake">
            {/* Candles */}
            <div className="candles-row">
              <div className="candle">
                <div className={`flame flame-1 ${candlesBlown ? 'flame-extinguished' : ''}`}></div>
                <div className="candle-stick"></div>
              </div>
              <div className="candle center-candle">
                <div className={`flame flame-2 ${candlesBlown ? 'flame-extinguished' : ''}`}></div>
                <div className="candle-stick"></div>
              </div>
              <div className="candle">
                <div className={`flame flame-3 ${candlesBlown ? 'flame-extinguished' : ''}`}></div>
                <div className="candle-stick"></div>
              </div>
            </div>

            {/* Cake Layers */}
            <div className="cake-top-layer">
              <div className="strawberry-decorations">
                🍓 🍓 🍓
              </div>
            </div>
            <div className="cake-middle-layer"></div>
            <div className="cake-bottom-layer"></div>
            <div className="cake-stand"></div>
          </div>
        </div>

        {/* Wish Reveal Box */}
        {candlesBlown && (
          <div className="wish-reveal-box">
            <h3 className="wish-congrats">🎉 HAPPY BIRTHDAY, {herName ? herName.toUpperCase() : 'SOUJI'}! 🎉</h3>
            <p className="wish-sub">
              May every single wish you made today blossom into reality. I promise to stand by your side to help make them come true! ❤️
            </p>
          </div>
        )}

        <div className="button-row mt-4">
          {!candlesBlown ? (
            <button onClick={handleBlowCandles} className="pill-btn btn-primary pulse-glow">
              💨 Blow Out the Candles!
            </button>
          ) : (
            <button onClick={onNext} className="pill-btn btn-primary pulse-glow">
              One Last Surprise... 🎁
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
