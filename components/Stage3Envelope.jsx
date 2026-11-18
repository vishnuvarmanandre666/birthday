'use client';

export default function Stage3Envelope({ onOpen }) {
  return (
    <section className="stage-card active-stage" aria-label="Sealed Envelope">
      <div className="stage-content text-center">
        {/* Sealed Luxury Red Envelope */}
        <div className="envelope-outer-container">
          <div className="envelope-box" onClick={onOpen} role="button" tabIndex={0} title="Click to open the envelope">
            <div className="envelope-flap"></div>
            <div className="envelope-pocket"></div>
            
            {/* Wax Seal Stamp */}
            <div className="wax-seal" title="Click to break the wax seal">
              <div className="wax-seal-inner">
                <span className="wax-seal-heart">❤</span>
              </div>
            </div>
          </div>
        </div>

        <h2 className="script-heading">A special letter for you</h2>
        <p className="subtext-soft">Sealed with all my heart, just waiting for your touch.</p>

        <div className="button-row">
          <button onClick={onOpen} className="pill-btn btn-primary pulse-glow">Click here to open 💌</button>
        </div>
      </div>
    </section>
  );
}
