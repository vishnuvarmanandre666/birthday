'use client';
import { useState } from 'react';

export default function Stage1Greeting({ onYes, onNo }) {
  const [noStyle, setNoStyle] = useState({});
  const [noAttempts, setNoAttempts] = useState(0);

  const handleNoMouseEnter = () => {
    if (noAttempts < 2) {
      const randomX = (Math.random() - 0.5) * 60;
      const randomY = (Math.random() - 0.5) * 40;
      setNoStyle({ transform: `translate(${randomX}px, ${randomY}px)` });
      setNoAttempts(prev => prev + 1);
    }
  };

  const handleNoClick = () => {
    setNoStyle({});
    onNo();
  };

  return (
    <section className="stage-card active-stage" aria-label="Birthday Greeting">
      {/* Left Foil Heart Balloons Decoration */}
      <div className="card-decor-balloons" aria-hidden="true">
        <svg viewBox="0 0 140 240" className="balloons-svg">
          {/* Strings */}
          <path d="M 50,75 Q 65,130 70,210" stroke="#c0a080" strokeWidth="1.5" fill="none"/>
          <path d="M 85,85 Q 75,140 70,210" stroke="#c0a080" strokeWidth="1.5" fill="none"/>
          <path d="M 68,110 Q 70,160 70,210" stroke="#c0a080" strokeWidth="1.5" fill="none"/>
          
          {/* Back Balloons */}
          <g filter="url(#balloonShadow)">
            <path d="M 50,45 C 50,30 30,25 25,40 C 20,55 45,75 50,85 C 55,75 80,55 75,40 C 70,25 50,30 50,45 Z" fill="url(#balloonGlossBack)" transform="rotate(-12 50 50)"/>
            <path d="M 90,55 C 90,40 70,35 65,50 C 60,65 85,85 90,95 C 95,85 120,65 115,50 C 110,35 90,40 90,55 Z" fill="url(#balloonGlossBack)" transform="rotate(14 90 60)"/>
          </g>

          {/* Front Main Balloon */}
          <g filter="url(#balloonShadow)">
            <path d="M 68,75 C 68,55 40,50 35,70 C 30,90 62,115 68,125 C 74,115 106,90 101,70 C 96,50 68,55 68,75 Z" fill="url(#balloonGloss)"/>
            <ellipse cx="52" cy="72" rx="6" ry="12" fill="#ffffff" opacity="0.5" transform="rotate(-25 52 72)"/>
          </g>

          {/* Bow at Knot */}
          <g transform="translate(62, 204) scale(0.7)">
            <path d="M 12,8 C 0,0 0,16 12,8 Z" fill="#9e122b"/>
            <path d="M 12,8 C 24,0 24,16 12,8 Z" fill="#9e122b"/>
            <circle cx="12" cy="8" r="3" fill="#6d091a"/>
          </g>
        </svg>
      </div>

      {/* Right Red Ribbon Bow Decoration */}
      <div className="card-decor-bow" aria-hidden="true">
        <svg viewBox="0 0 100 80" className="bow-svg">
          <path d="M 50,35 C 20,10 5,45 42,40 C 25,60 10,75 15,80 C 25,80 45,55 50,45 C 55,55 75,80 85,80 C 90,75 75,60 58,40 C 95,45 80,10 50,35 Z" fill="#a01228"/>
          <path d="M 50,35 C 30,18 20,38 45,37 C 32,50 22,65 26,67 C 33,67 46,48 50,42 C 54,48 67,67 74,67 C 78,65 68,50 55,37 C 80,38 70,18 50,35 Z" fill="#c31835"/>
          <ellipse cx="50" cy="38" rx="7" ry="5" fill="#7a0a1c"/>
        </svg>
      </div>

      {/* Content */}
      <div className="stage-content text-center">
        {/* Cute Kitten */}
        <div className="cute-cat-avatar">
          <svg viewBox="0 0 120 120" className="cat-svg">
            <ellipse cx="60" cy="68" rx="42" ry="36" fill="#fdf2ea" stroke="#d4a373" strokeWidth="2"/>
            <polygon points="26,45 20,18 46,33" fill="#fdf2ea" stroke="#d4a373" strokeWidth="2"/>
            <polygon points="28,42 24,24 43,34" fill="#fbb1bd"/>
            <polygon points="94,45 100,18 74,33" fill="#fdf2ea" stroke="#d4a373" strokeWidth="2"/>
            <polygon points="92,42 96,24 77,34" fill="#fbb1bd"/>
            
            {/* Sparkly Anime Eyes */}
            <ellipse cx="44" cy="62" rx="6.5" ry="8" fill="#442a1b"/>
            <circle cx="42" cy="59" r="2.5" fill="#ffffff"/>
            <circle cx="46" cy="65" r="1.2" fill="#ffffff"/>
            <ellipse cx="76" cy="62" rx="6.5" ry="8" fill="#442a1b"/>
            <circle cx="74" cy="59" r="2.5" fill="#ffffff"/>
            <circle cx="78" cy="65" r="1.2" fill="#ffffff"/>
            
            {/* Blush */}
            <ellipse cx="33" cy="71" rx="7" ry="4" fill="#ff99a8" opacity="0.6"/>
            <ellipse cx="87" cy="71" rx="7" ry="4" fill="#ff99a8" opacity="0.6"/>
            
            {/* Mouth */}
            <polygon points="57,69 63,69 60,72" fill="#ff758f"/>
            <path d="M 55,73 Q 60,77 60,74 Q 60,77 65,73" fill="none" stroke="#6b4c3b" strokeWidth="1.8" strokeLinecap="round"/>
            
            {/* Paws with Red Heart */}
            <ellipse cx="48" cy="88" rx="9" ry="8" fill="#fdf2ea" stroke="#d4a373" strokeWidth="1.5"/>
            <ellipse cx="72" cy="88" rx="9" ry="8" fill="#fdf2ea" stroke="#d4a373" strokeWidth="1.5"/>
            <path d="M 60,82 C 60,76 52,72 48,77 C 44,82 56,92 60,96 C 64,92 76,82 72,77 C 68,72 60,76 60,82 Z" fill="#e63946"/>
          </svg>
        </div>

        <h1 className="main-title">HEY!!</h1>
        <h2 className="sub-title">HAPPY BIRTHDAY!!</h2>
        <p className="script-lead">I made something special for you</p>
        <p className="question-text">Do you want to see it?</p>

        {/* Choice Buttons */}
        <div className="choice-buttons-group">
          <button onClick={onYes} className="pill-btn btn-primary">Yes ❤️</button>
          <button
            onClick={handleNoClick}
            onMouseEnter={handleNoMouseEnter}
            style={noStyle}
            className="pill-btn btn-secondary"
          >
            No 😜
          </button>
        </div>
        <p className="hint-small">(Choose wisely, my love! 😉)</p>
      </div>
    </section>
  );
}
