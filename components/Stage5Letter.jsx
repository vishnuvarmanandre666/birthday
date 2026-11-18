'use client';

export default function Stage5Letter({ herName, yourName, letterText, onNext }) {
  // Split custom or default letter into paragraphs
  const paragraphs = letterText ? letterText.split('\n').filter(p => p.trim() !== '') : [
    "From the moment you entered my world, everything became brighter, warmer, and endlessly more meaningful.",
    "You’ve brought so much light, laughter, and genuine peace into my life. No matter what crazy storms come our way, you are always the one who makes everything feel okay again.",
    "I am so endlessly lucky to call you mine. You truly have the kindest heart, the sweetest smile, and the most beautiful soul I have ever known.",
    "Thank you for being my favorite adventure, my safest home, and my best friend all in one."
  ];

  return (
    <section id="stage-5" className="stage-card active-stage" aria-label="The Birthday Love Letter">
      <div className="letter-layout-grid">
        {/* Left Side Foil Heart Balloons (Full 3D Metallic Bouquet) */}
        <div className="letter-side-balloons" aria-hidden="true">
          <svg viewBox="0 0 170 300" className="balloons-svg">
            {/* Balloon Strings */}
            <path d="M 50,85 Q 75,170 85,255" stroke="#b08a68" strokeWidth="2" fill="none"/>
            <path d="M 115,95 Q 95,175 85,255" stroke="#b08a68" strokeWidth="2" fill="none"/>
            <path d="M 85,125 Q 85,190 85,255" stroke="#b08a68" strokeWidth="2" fill="none"/>
            <path d="M 38,120 Q 65,185 85,255" stroke="#b08a68" strokeWidth="2" fill="none"/>
            <path d="M 132,130 Q 105,195 85,255" stroke="#b08a68" strokeWidth="2" fill="none"/>

            {/* Back Foil Balloons with Filter */}
            <g filter="url(#balloonShadow)">
              {/* Left Back Balloon */}
              <path d="M 45,55 C 45,35 20,30 15,50 C 10,70 38,95 45,108 C 52,95 80,70 75,50 C 70,30 45,35 45,55 Z" fill="url(#balloonGlossBack)" transform="rotate(-16 45 60)"/>
              <ellipse cx="32" cy="55" rx="5" ry="11" fill="#ffffff" opacity="0.38" transform="rotate(-30 32 55)"/>

              {/* Right Back Balloon */}
              <path d="M 120,60 C 120,40 95,35 90,55 C 85,75 113,100 120,113 C 127,100 155,75 150,55 C 145,35 120,40 120,60 Z" fill="url(#balloonGlossBack)" transform="rotate(18 120 65)"/>
              <ellipse cx="108" cy="62" rx="5" ry="11" fill="#ffffff" opacity="0.38" transform="rotate(-10 108 62)"/>

              {/* Top Floating Balloon */}
              <path d="M 82,32 C 82,15 62,12 58,28 C 54,44 76,64 82,74 C 88,64 110,44 106,28 C 102,12 82,15 82,32 Z" fill="url(#balloonGlossBack)" transform="rotate(4 82 35)"/>
              <ellipse cx="73" cy="30" rx="4" ry="9" fill="#ffffff" opacity="0.45" transform="rotate(-20 73 30)"/>
            </g>

            {/* Front Main Center Heart Balloon */}
            <g filter="url(#balloonShadow)">
              <path d="M 85,90 C 85,62 48,54 40,82 C 32,110 76,142 85,156 C 94,142 138,110 130,82 C 122,54 85,62 85,90 Z" fill="url(#balloonGloss)"/>
              <ellipse cx="64" cy="85" rx="7" ry="16" fill="#ffffff" opacity="0.55" transform="rotate(-28 64 85)"/>
              <circle cx="56" cy="102" r="3.5" fill="#ffffff" opacity="0.4"/>
            </g>

            {/* Satin Ribbon Bow at Knot */}
            <g transform="translate(85, 255) scale(0.9)">
              <path d="M 0,0 C -22,-14 -32,8 0,4 C -18,22 -30,35 -24,40 C -12,40 2,14 0,0 Z" fill="#9e122b"/>
              <path d="M 0,0 C 22,-14 32,8 0,4 C 18,22 30,35 24,40 C 12,40 -2,14 0,0 Z" fill="#9e122b"/>
              <path d="M 0,0 C -16,-10 -24,5 0,3 Z" fill="#c31835"/>
              <path d="M 0,0 C 16,-10 24,5 0,3 Z" fill="#c31835"/>
              <circle cx="0" cy="2" r="4.5" fill="url(#goldRibbon)"/>
            </g>
          </svg>
        </div>

        {/* The Scalloped Stationery Love Letter */}
        <div className="letter-sheet-container" id="printableLetter">
          <div className="letter-scalloped-edge">
            {/* Postage / Heart Stamp Top Right */}
            <div className="letter-post-stamp">
              <span className="stamp-heart">💌</span>
              <span className="stamp-text">SPECIAL DELIVERY</span>
              <span className="stamp-date">FOR {herName ? herName.toUpperCase() : 'SOUJI'}</span>
            </div>

            {/* Letter Header in Cursive */}
            <h2 className="letter-salutation">
              Happy birthday to my favorite person, {herName || 'Souji'} <span className="heart-pulse">❤️</span>
            </h2>

            {/* Letter Body Paragraphs */}
            <div className="letter-body-text">
              {paragraphs.map((p, idx) => (
                <p key={idx}>{p}</p>
              ))}
            </div>

            {/* Closing & Sign-off */}
            <div className="letter-closing">
              <p className="closing-phrase">Forever yours with all my heart,</p>
              <p className="signature-name">{yourName || 'Naveen'} ❤️</p>
            </div>

            {/* Angled Red "love you" Stamp (from Reference) */}
            <div className="love-you-stamp" aria-label="Love you stamp">
              <span>love you</span>
            </div>
          </div>
        </div>
      </div>

      {/* Action Button to Next Surprise */}
      <div className="letter-footer-actions">
        <button onClick={onNext} className="pill-btn btn-primary pulse-glow">Click here for more surprises ✨</button>
      </div>
    </section>
  );
}
