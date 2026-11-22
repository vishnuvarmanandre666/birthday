'use client';
import { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';

export default function Stage7Memories({ onNext, isSongPlaying, toggleSong }) {
  const [photos, setPhotos] = useState({
    1: '/images/moment1.jpg',
    2: '/images/moment2.jpg',
    3: '/images/moment3.jpg',
  });

  useEffect(() => {
    // Only load if user specifically uploaded custom image data (data URLs)
    try {
      const saved = JSON.parse(localStorage.getItem('bday_custom_photos') || '{}');
      if (saved && typeof saved === 'object') {
        const clean = {};
        Object.keys(saved).forEach(k => {
          if (typeof saved[k] === 'string' && saved[k].startsWith('data:image/')) {
            clean[k] = saved[k];
          }
        });
        if (Object.keys(clean).length > 0) {
          setPhotos(prev => ({ ...prev, ...clean }));
        }
      }
    } catch (e) {}
  }, []);

  const handlePhotoUpload = (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;

    const newPhotos = { ...photos };
    files.slice(0, 3).forEach((file, index) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const key = index + 1;
        newPhotos[key] = event.target.result;
        setPhotos({ ...newPhotos });
        try {
          localStorage.setItem('bday_custom_photos', JSON.stringify(newPhotos));
        } catch (err) {}
      };
      reader.readAsDataURL(file);
    });

    if (typeof confetti === 'function') {
      confetti({ particleCount: 50, spread: 70, origin: { x: 0.5, y: 0.6 } });
    }
  };

  return (
    <section className="stage-card active-stage" aria-label="Our Memories Gallery">
      <div className="stage-content text-center">
        <h2 className="romantic-title">Our Sweetest Moments 📸</h2>
        <p className="subtext-soft">Snapshots of us that I cherish more than words can say.</p>

        {/* Romantic Song Indicator */}
        <div className="song-status-pill-wrap">
          <button
            type="button"
            onClick={toggleSong}
            className={`song-status-pill ${isSongPlaying ? 'playing' : ''}`}
            title={isSongPlaying ? 'Pause our song' : 'Play our song'}
          >
            <span className="song-equalizer-icon">{isSongPlaying ? '🎶' : '▶️'}</span>
            <span>{isSongPlaying ? 'Now Playing: Our Song 💕' : 'Click to Play Song 🎵'}</span>
          </button>
        </div>

        {/* Polaroid Wall */}
        <div className="polaroid-wall">
          {/* Polaroid 1 */}
          <div className="polaroid-frame polaroid-tilt-left">
            <div className="washi-tape tape-pink"></div>
            <div className="polaroid-photo-box">
              <img src={photos[1]} alt="Romantic Night Together" className="polaroid-img" />
            </div>
            <p className="polaroid-caption">My favorite smile in the whole world 💕</p>
          </div>

          {/* Polaroid 2 */}
          <div className="polaroid-frame polaroid-tilt-right">
            <div className="washi-tape tape-gold"></div>
            <div className="polaroid-photo-box">
              <img src={photos[2]} alt="Sleeping Peacefully" className="polaroid-img" style={{ objectPosition: 'center 40%' }} />
            </div>
            <p className="polaroid-caption">My safe place & sweetest comfort 🥺❤️</p>
          </div>

          {/* Polaroid 3 */}
          <div className="polaroid-frame polaroid-tilt-left-2">
            <div className="washi-tape tape-red"></div>
            <div className="polaroid-photo-box">
              <img src={photos[3]} alt="Adiyogi Trip Together" className="polaroid-img" />
            </div>
            <p className="polaroid-caption">Every adventure with you is magic ✨</p>
          </div>
        </div>

        <div className="button-row mt-4">
          <button onClick={onNext} className="pill-btn btn-primary pulse-glow">Make a Birthday Wish 🎂</button>
        </div>
      </div>
    </section>
  );
}
