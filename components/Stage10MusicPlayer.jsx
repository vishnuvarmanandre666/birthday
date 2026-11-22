'use client';
import { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';

export default function Stage10MusicPlayer({
  herName = 'Souji',
  yourName = 'Naveen',
  onRestart
}) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [isLooping, setIsLooping] = useState(false);
  const duration = 204; // 3:24 matching reference template

  const scrubberTrackRef = useRef(null);

  // Simulated player scrubber progress when Play is toggled
  useEffect(() => {
    let interval = null;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentTime((prev) => {
          if (prev >= duration) {
            if (isLooping) return 0;
            setIsPlaying(false);
            return 0;
          }
          return prev + 1;
        });
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isPlaying, isLooping, duration]);

  const togglePlay = () => {
    setIsPlaying((prev) => !prev);
  };

  const handleNext = () => {
    setCurrentTime(0);
  };

  const handlePrev = () => {
    setCurrentTime(0);
  };

  const formatTime = (seconds) => {
    if (isNaN(seconds) || seconds < 0) return '0:00';
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const progressPercent = duration > 0 ? Math.min(100, (currentTime / duration) * 100) : 0;

  const handleScrubberClick = (e) => {
    if (!scrubberTrackRef.current) return;
    const rect = scrubberTrackRef.current.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const width = rect.width;
    const percentage = Math.max(0, Math.min(1, clickX / width));
    const newTime = Math.round(percentage * duration);
    setCurrentTime(newTime);
  };

  const handleShuffle = () => {
    if (typeof confetti === 'function') {
      confetti({
        particleCount: 50,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#ffd700', '#ff4d6d', '#8d1326', '#ffffff']
      });
    }
  };

  const toggleLoop = () => {
    setIsLooping((prev) => !prev);
  };

  const handleFullRestart = () => {
    setIsPlaying(false);
    setCurrentTime(0);
    if (onRestart) onRestart();
  };

  return (
    <section className="stage-card active-stage stage-music-player-card" aria-label="Romantic Music Player">
      {/* Dark Crimson Peonies Backdrop */}
      <div className="music-player-bg-art" style={{ backgroundImage: "url('/images/music-player-bg.jpg')" }}></div>
      <div className="music-player-backdrop-overlay"></div>

      <div className="stage-content text-center music-player-content">
        {/* Luxury Burgundy Frosted Glass Player Card */}
        <div className="luxury-player-card">
          {/* Card Header matching template */}
          <div className="player-header">
            <span className="player-now-playing">Now Playing</span>
            <p className="player-song-title-artist">Song Title • Artist Name</p>
          </div>

          {/* Stitched Gold Border Album Art Frame (Empty clean canvas matching template) */}
          <div className="player-album-wrap">
            <div className="player-album-frame">
              <div className="album-stitch-inner-border"></div>
              <div className="album-glass-glare"></div>
            </div>
          </div>

          {/* Golden Scrubber Bar */}
          <div className="player-timeline-wrap">
            <div
              className="player-scrubber-track"
              ref={scrubberTrackRef}
              onClick={handleScrubberClick}
              title="Click to seek"
            >
              <div
                className="player-scrubber-fill"
                style={{ width: `${progressPercent}%` }}
              ></div>
              <div
                className="player-scrubber-thumb"
                style={{ left: `${progressPercent}%` }}
              ></div>
            </div>
            <div className="player-timestamps">
              <span className="time-current">{formatTime(currentTime)}</span>
              <span className="time-duration">{formatTime(duration)}</span>
            </div>
          </div>

          {/* 5 Music Controls matching user's template */}
          <div className="player-controls-row">
            {/* Shuffle */}
            <button
              type="button"
              onClick={handleShuffle}
              className="player-icon-btn"
              title="Shuffle"
              aria-label="Shuffle"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="16 3 21 3 21 8"></polyline>
                <line x1="4" y1="20" x2="21" y2="3"></line>
                <polyline points="21 16 21 21 16 21"></polyline>
                <line x1="15" y1="15" x2="21" y2="21"></line>
                <line x1="4" y1="4" x2="9" y2="9"></line>
              </svg>
            </button>

            {/* Previous */}
            <button
              type="button"
              onClick={handlePrev}
              className="player-icon-btn"
              title="Previous"
              aria-label="Previous"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                <polygon points="19 20 9 12 19 4 19 20"></polygon>
                <line x1="5" y1="19" x2="5" y2="5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"></line>
              </svg>
            </button>

            {/* Main 3D Circular Play / Pause Button */}
            <button
              type="button"
              onClick={togglePlay}
              className="player-play-btn"
              title={isPlaying ? "Pause" : "Play"}
              aria-label={isPlaying ? "Pause" : "Play"}
            >
              {isPlaying ? (
                <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor">
                  <rect x="6" y="4" width="4" height="16" rx="1"></rect>
                  <rect x="14" y="4" width="4" height="16" rx="1"></rect>
                </svg>
              ) : (
                <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor" style={{ marginLeft: '3px' }}>
                  <polygon points="6 4 20 12 6 20 6 4"></polygon>
                </svg>
              )}
            </button>

            {/* Next */}
            <button
              type="button"
              onClick={handleNext}
              className="player-icon-btn"
              title="Next"
              aria-label="Next"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                <polygon points="5 4 15 12 5 20 5 4"></polygon>
                <line x1="19" y1="5" x2="19" y2="19" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"></line>
              </svg>
            </button>

            {/* Repeat / Loop */}
            <button
              type="button"
              onClick={toggleLoop}
              className={`player-icon-btn ${isLooping ? 'active-loop' : ''}`}
              title={isLooping ? "Loop enabled" : "Loop disabled"}
              aria-label="Repeat"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="17 1 21 5 17 9"></polyline>
                <path d="M3 11V9a4 4 0 0 1 4-4h14"></path>
                <polyline points="7 23 3 19 7 15"></polyline>
                <path d="M21 13v2a4 4 0 0 1-4 4H3"></path>
              </svg>
            </button>
          </div>
        </div>

        {/* Section Footer: Relive the Journey */}
        <div className="music-player-footer mt-4">
          <p className="music-love-quote">“Every love song has always been about you.” ❤️</p>
          <button
            type="button"
            onClick={handleFullRestart}
            className="pill-btn btn-primary pulse-glow mt-3"
            title="Start from beginning"
          >
            ↺ Relive the Journey
          </button>
        </div>
      </div>
    </section>
  );
}
