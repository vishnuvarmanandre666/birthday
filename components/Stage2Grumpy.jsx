'use client';

export default function Stage2Grumpy({ onClickBack }) {
  return (
    <section className="stage-card active-stage" aria-label="How Dare You Playful Screen">
      <div className="stage-content text-center">
        {/* Grumpy Cat with Pink Bow */}
        <div className="grumpy-cat-avatar">
          <svg viewBox="0 0 140 140" className="grumpy-cat-svg">
            <defs>
              <linearGradient id="grumpyFur" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#b89073"/>
                <stop offset="100%" stopColor="#8a5c3e"/>
              </linearGradient>
            </defs>
            <ellipse cx="70" cy="75" rx="46" ry="40" fill="url(#grumpyFur)" stroke="#593722" strokeWidth="2"/>
            <polygon points="34,48 20,30 48,38" fill="#8a5c3e" stroke="#593722" strokeWidth="2"/>
            <polygon points="35,46 25,34 45,39" fill="#f8a5b2"/>
            <polygon points="106,48 120,30 92,38" fill="#8a5c3e" stroke="#593722" strokeWidth="2"/>
            <polygon points="105,46 115,34 95,39" fill="#f8a5b2"/>
            
            {/* Pink Ribbon Bow */}
            <g transform="translate(100, 24) rotate(20) scale(0.7)">
              <path d="M 12,8 C 0,0 0,16 12,8 Z" fill="#ff4d88"/>
              <path d="M 12,8 C 24,0 24,16 12,8 Z" fill="#ff4d88"/>
              <circle cx="12" cy="8" r="3" fill="#d81159"/>
            </g>
            
            {/* Furrowed Brow */}
            <line x1="42" y1="58" x2="58" y2="65" stroke="#33180c" strokeWidth="3" strokeLinecap="round"/>
            <line x1="98" y1="58" x2="82" y2="65" stroke="#33180c" strokeWidth="3" strokeLinecap="round"/>
            
            {/* Side-Eye */}
            <ellipse cx="50" cy="72" rx="7" ry="6" fill="#f4f1de"/>
            <ellipse cx="48" cy="72" rx="3.5" ry="5.5" fill="#264653"/>
            <circle cx="47" cy="70" r="1.2" fill="#ffffff"/>
            <ellipse cx="90" cy="72" rx="7" ry="6" fill="#f4f1de"/>
            <ellipse cx="88" cy="72" rx="3.5" ry="5.5" fill="#264653"/>
            <circle cx="87" cy="70" r="1.2" fill="#ffffff"/>
            
            {/* Grumpy Frown */}
            <polygon points="67,79 73,79 70,82" fill="#33180c"/>
            <path d="M 64,88 Q 70,82 76,88" fill="none" stroke="#33180c" strokeWidth="2.5" strokeLinecap="round"/>
            
            {/* Whiskers */}
            <line x1="28" y1="76" x2="10" y2="74" stroke="#593722" strokeWidth="1.5"/>
            <line x1="28" y1="82" x2="12" y2="84" stroke="#593722" strokeWidth="1.5"/>
            <line x1="112" y1="76" x2="130" y2="74" stroke="#593722" strokeWidth="1.5"/>
            <line x1="112" y1="82" x2="128" y2="84" stroke="#593722" strokeWidth="1.5"/>
          </svg>
        </div>

        <h1 className="angry-title">HOW DARE YOU!!!</h1>
        <p className="angry-subtitle">Did you really think &quot;No&quot; was an option today? 😤</p>
        <p className="angry-caption">There&apos;s too much love waiting for you to walk away!</p>

        <div className="choice-buttons-group">
          <button onClick={onClickBack} className="pill-btn btn-primary">Click back 🥺❤️</button>
        </div>
      </div>
    </section>
  );
}
