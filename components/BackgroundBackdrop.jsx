'use client';
import { useEffect, useState } from 'react';

export default function BackgroundBackdrop() {
  const [petals, setPetals] = useState([]);
  const [sparkles, setSparkles] = useState([]);

  useEffect(() => {
    // Generate initial petals
    const initialPetals = Array.from({ length: 22 }).map((_, i) => ({
      id: `p-${i}-${Math.random()}`,
      size: Math.random() * 14 + 10,
      left: Math.random() * 100,
      duration: Math.random() * 7 + 7,
      delay: Math.random() * 5,
    }));
    setPetals(initialPetals);

    // Generate initial sparkles
    const initialSparkles = Array.from({ length: 20 }).map((_, i) => ({
      id: `s-${i}-${Math.random()}`,
      size: Math.random() * 7 + 4,
      left: Math.random() * 100,
      top: Math.random() * 100,
      duration: Math.random() * 4 + 3,
    }));
    setSparkles(initialSparkles);
  }, []);

  return (
    <>
      {/* Global SVG Definitions */}
      <svg className="global-defs" aria-hidden="true" width="0" height="0" style={{ position: 'absolute', width: 0, height: 0, overflow: 'hidden' }}>
        <defs>
          <radialGradient id="balloonGloss" cx="35%" cy="30%" r="65%">
            <stop offset="0%" stopColor="#ffa3b5"/>
            <stop offset="25%" stopColor="#e6194b"/>
            <stop offset="65%" stopColor="#990924"/>
            <stop offset="90%" stopColor="#540211"/>
            <stop offset="100%" stopColor="#2d0007"/>
          </radialGradient>

          <radialGradient id="balloonGlossBack" cx="40%" cy="30%" r="60%">
            <stop offset="0%" stopColor="#e63956"/>
            <stop offset="45%" stopColor="#aa0e2a"/>
            <stop offset="85%" stopColor="#5c0312"/>
            <stop offset="100%" stopColor="#250005"/>
          </radialGradient>

          <linearGradient id="goldRibbon" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fff2b2"/>
            <stop offset="40%" stopColor="#f5c242"/>
            <stop offset="80%" stopColor="#c98a16"/>
            <stop offset="100%" stopColor="#805004"/>
          </linearGradient>

          <filter id="balloonShadow" x="-30%" y="-30%" width="160%" height="160%">
            <feDropShadow dx="3" dy="8" stdDeviation="5" floodColor="#3b0811" floodOpacity="0.38"/>
          </filter>
        </defs>
      </svg>

      <div className="background-backdrop">
        <div className="water-shimmer"></div>
        <div className="golden-glimmer-overlay"></div>

        {/* Floating Petals */}
        <div className="floating-petals-container">
          {petals.map(p => (
            <div
              key={p.id}
              className="falling-petal"
              style={{
                width: `${p.size}px`,
                height: `${p.size * 1.3}px`,
                left: `${p.left}%`,
                animationDuration: `${p.duration}s`,
                animationDelay: `${p.delay}s`,
              }}
            />
          ))}

          {sparkles.map(s => (
            <div
              key={s.id}
              className="floating-sparkle"
              style={{
                width: `${s.size}px`,
                height: `${s.size}px`,
                left: `${s.left}%`,
                top: `${s.top}%`,
                animationDuration: `${s.duration}s`,
              }}
            />
          ))}
        </div>

        {/* Top-Right Floral Corner */}
        <div className="floral-corner-container floral-top-right" aria-hidden="true">
          <img
            src="/images/floral-corner.png"
            alt="Floral Corner Decoration"
            className="floral-corner-img"
          />
        </div>

        {/* Bottom-Left Floral Corner */}
        <div className="floral-corner-container floral-bottom-left" aria-hidden="true">
          <img
            src="/images/floral-corner.png"
            alt="Floral Corner Decoration"
            className="floral-corner-img"
          />
        </div>
      </div>
    </>
  );
}
