'use client';
import { useState } from 'react';
import { playTone } from '@/lib/audio';

export default function Stage6Reasons({ onNext }) {
  const [flipped, setFlipped] = useState({});

  const toggleFlip = (index) => {
    setFlipped(prev => ({ ...prev, [index]: !prev[index] }));
    playTone(520, 'triangle', 0.15, 0.08);
  };

  const cards = [
    {
      icon: '✨',
      title: 'Your Smile',
      back: 'The way your eyes crinkle when you truly laugh is my favorite view in the entire universe.'
    },
    {
      icon: '🌸',
      title: 'Your Gentle Heart',
      back: 'How deeply you care about everyone around you. You make this world a softer, kinder place.'
    },
    {
      icon: '🌙',
      title: 'Our Late Talks',
      back: 'Losing all track of time talking about our wildest dreams, silly secrets, and future together.'
    },
    {
      icon: '🏡',
      title: 'My Safe Haven',
      back: 'In your arms, all my stress vanishes. Being with you is coming home.'
    }
  ];

  return (
    <section className="stage-card active-stage" aria-label="Reasons Why I Adore You">
      <div className="stage-content text-center">
        <h2 className="romantic-title">Little Things I Adore About You ✨</h2>
        <p className="subtext-soft">Tap each card to reveal what my heart whispers about you...</p>

        {/* Interactive Flip Cards Grid */}
        <div className="reasons-grid">
          {cards.map((card, idx) => (
            <div
              key={idx}
              className={`reason-card ${flipped[idx] ? 'is-flipped' : ''}`}
              onClick={() => toggleFlip(idx)}
              onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && toggleFlip(idx)}
              tabIndex={0}
            >
              <div className="reason-card-inner">
                <div className="reason-card-front">
                  <span className="card-icon">{card.icon}</span>
                  <h3>{card.title}</h3>
                  <p className="tap-hint">Tap to flip</p>
                </div>
                <div className="reason-card-back">
                  <p>{card.back}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="button-row mt-4">
          <button onClick={onNext} className="pill-btn btn-primary pulse-glow">Our Sweet Memories 📸</button>
        </div>
      </div>
    </section>
  );
}
