'use client';

export default function Stage4Opening({ onTapLetter }) {
  return (
    <section className="stage-card active-stage" aria-label="Envelope Opening Stage">
      <div className="stage-content text-center">
        <div className="envelope-opening-wrapper">
          <div className="envelope-box is-open" onClick={onTapLetter} role="button" tabIndex={0}>
            {/* Open Flap Folded Upwards */}
            <div className="envelope-flap flap-opened"></div>
            
            {/* Letter Emerging Out */}
            <div className="letter-peek-slip" title="Tap the letter to unfold">
              <div className="letter-peek-inner">
                <p className="peek-title">Happy birthday to my favorite person, my love...</p>
                <div className="peek-lines">
                  <span></span><span></span><span></span>
                </div>
              </div>
              <div className="tap-finger-indicator">👆 Tap me</div>
            </div>

            <div className="envelope-pocket"></div>
            <div className="wax-seal seal-cracked">
              <div className="wax-seal-inner">
                <span className="wax-seal-heart">❤</span>
              </div>
            </div>
          </div>
        </div>

        <div className="button-row mt-3">
          <button onClick={onTapLetter} className="pill-btn btn-primary pulse-glow">Tap the letter ✉️</button>
        </div>
      </div>
    </section>
  );
}
