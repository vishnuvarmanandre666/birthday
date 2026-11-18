'use client';
import { useState } from 'react';
import confetti from 'canvas-confetti';
import { playGiftOpenSound } from '@/lib/audio';

export default function Stage9Gift({ herName, yourName, onNext }) {
  const [giftOpened, setGiftOpened] = useState(false);

  const handleOpenGift = () => {
    if (giftOpened) return;
    setGiftOpened(true);
    playGiftOpenSound();

    if (typeof confetti === 'function') {
      confetti({
        particleCount: 150,
        spread: 90,
        origin: { y: 0.65 },
        colors: ['#ffd700', '#ff4d6d', '#8d1326', '#ffffff']
      });
    }
  };

  return (
    <section className="stage-card active-stage" aria-label="Final Surprise Gift Box">
      <div className="stage-content text-center">
        <h2 className="romantic-title">One Last Gift For You... 🎁</h2>
        <p className="subtext-soft">Because you deserve the whole universe and so much more!</p>

        {/* 3D Gift Box */}
        <div
          className="gift-box-wrapper"
          onClick={handleOpenGift}
          role="button"
          tabIndex={0}
          title="Click to unwrap your gift!"
        >
          <div className="gift-box">
            <div className={`gift-lid ${giftOpened ? 'lid-opened' : ''}`}>
              <div className="gift-bow"></div>
            </div>
            <div className="gift-body"></div>
          </div>
          {!giftOpened && <p className="gift-click-hint">✨ Tap the gift box to open ✨</p>}
        </div>

        {/* Revealed Coupons */}
        {giftOpened && (
          <div className="coupons-container">
            <h3 className="coupons-title">🎟️ {herName || 'Souji'}&apos;s Birthday Love Coupons 🎟️</h3>
            <p className="coupons-note">(Redeemable anytime, no expiration date!)</p>

            <div className="coupons-grid">
              <div className="coupon-ticket">
                <div className="coupon-badge">VIP</div>
                <h4>Unlimited Cuddles &amp; Head Scratches</h4>
                <p>Valid whenever you feel tired, sad, or just want to be held tight.</p>
              </div>
              <div className="coupon-ticket">
                <div className="coupon-badge">FREE</div>
                <h4>Midnight Ice Cream / Food Run</h4>
                <p>Whatever cravings hit, I&apos;ll go get it with zero complaints!</p>
              </div>
              <div className="coupon-ticket">
                <div className="coupon-badge">PASS</div>
                <h4>Win Any Argument Instantly</h4>
                <p>Use this pass and you are automatically 100% right on everything!</p>
              </div>
              <div className="coupon-ticket">
                <div className="coupon-badge">ROMANCE</div>
                <h4>Surprise Candlelight Date</h4>
                <p>All planned, arranged, and treated by me from start to finish.</p>
              </div>
            </div>

            <div className="final-love-signoff">
              <p className="big-romantic-phrase">Happy Birthday to the love of my life!</p>
              <p className="signoff-sub">I love you yesterday, today, tomorrow, and forever. ❤️</p>
              <button onClick={onNext} className="pill-btn btn-primary pulse-glow mt-3">
                Next: Our Song 🎵 →
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
