'use client';
import { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';

export default function Stage10MusicPlayer({
  herName = 'Mummylu',
  yourName = 'Naveen',
  onRestart,
  onNext
}) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isLooping, setIsLooping] = useState(false);

  const videoRef = useRef(null);
  const scrubberTrackRef = useRef(null);

  // Sync video time and events
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleTimeUpdate = () => {
      setCurrentTime(video.currentTime);
      if (video.duration && !isNaN(video.duration)) {
        setDuration(video.duration);
      }
    };

    const handleLoadedMetadata = () => {
      if (video.duration && !isNaN(video.duration)) {
        setDuration(video.duration);
      }
    };

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    const handleEnded = () => {
      if (!isLooping) {
        setIsPlaying(false);
      }
    };

    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('loadedmetadata', handleLoadedMetadata);
    video.addEventListener('play', handlePlay);
    video.addEventListener('pause', handlePause);
    video.addEventListener('ended', handleEnded);

    // If metadata already loaded
    if (video.duration && !isNaN(video.duration)) {
      setDuration(video.duration);
    }

    return () => {
      if (video) video.pause();
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
      video.removeEventListener('play', handlePlay);
      video.removeEventListener('pause', handlePause);
      video.removeEventListener('ended', handleEnded);
    };
  }, [isLooping]);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsPlaying(true);
          })
          .catch((err) => {
            console.log('Video play error / gesture needed:', err);
          });
      }
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  const handleNext = () => {
    const video = videoRef.current;
    if (!video) return;
    video.currentTime = Math.min((video.duration || 100), video.currentTime + 10);
  };

  const handlePrev = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.currentTime > 3) {
      video.currentTime = 0;
    } else {
      video.currentTime = Math.max(0, video.currentTime - 10);
    }
  };

  const formatTime = (seconds) => {
    if (isNaN(seconds) || seconds < 0) return '0:00';
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const progressPercent = duration > 0 ? Math.min(100, (currentTime / duration) * 100) : 0;

  const handleScrubberClick = (e) => {
    const video = videoRef.current;
    if (!scrubberTrackRef.current || !video) return;

    const rect = scrubberTrackRef.current.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const width = rect.width;
    const percentage = Math.max(0, Math.min(1, clickX / width));
    const newTime = percentage * (duration || 0);
    video.currentTime = newTime;
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
    const video = videoRef.current;
    if (video) {
      video.loop = !isLooping;
      setIsLooping(!isLooping);
    }
  };

  const handleFullRestart = () => {
    const video = videoRef.current;
    if (video) {
      video.pause();
      video.currentTime = 0;
    }
    setIsPlaying(false);
    if (onRestart) onRestart();
  };

  return (
    <section className="stage-card active-stage stage-music-player-card" aria-label="Romantic Music & Video Player">
      {/* Dark Crimson Peonies Backdrop */}
      <div className="music-player-bg-art" style={{ backgroundImage: "url('/images/music-player-bg.jpg')" }}></div>
      <div className="music-player-backdrop-overlay"></div>

      <div className="stage-content text-center music-player-content">
        {/* Luxury Burgundy Frosted Glass Player Card */}
        <div className="luxury-player-card">
          {/* Card Header */}
          <div className="player-header">
            <span className="player-now-playing">Now Playing</span>
            <p className="player-song-title-artist">Our Special Memories Video ❤️</p>
          </div>

          {/* Stitched Gold Border Frame with Video */}
          <div
            className="player-album-wrap"
            onClick={togglePlay}
            title={isPlaying ? "Click to Pause" : "Click to Play Video"}
          >
            <div className="player-album-frame player-video-frame">
              <video
                ref={videoRef}
                src="/video.mp4"
                playsInline
                webkit-playsinline="true"
                x5-playsinline="true"
                preload="metadata"
                className="player-video-element"
                loop={isLooping}
              >
                <source src="/video.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              <div className="album-stitch-inner-border"></div>
              <div className="album-glass-glare"></div>

              {/* Subtle play hint overlay when paused */}
              {!isPlaying && (
                <div className="video-paused-overlay">
                  <div className="video-play-hint-circle">
                    <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor">
                      <polygon points="6 4 20 12 6 20 6 4"></polygon>
                    </svg>
                  </div>
                </div>
              )}
            </div>
            <p className="player-video-tap-hint">🎬 Tap video or button below to play</p>
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

          {/* 5 Music / Video Controls */}
          <div className="player-controls-row">
            {/* Shuffle / Confetti */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handleShuffle();
              }}
              className="player-icon-btn"
              title="Sparkle celebration"
              aria-label="Sparkle celebration"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="16 3 21 3 21 8"></polyline>
                <line x1="4" y1="20" x2="21" y2="3"></line>
                <polyline points="21 16 21 21 16 21"></polyline>
                <line x1="15" y1="15" x2="21" y2="21"></line>
                <line x1="4" y1="4" x2="9" y2="9"></line>
              </svg>
            </button>

            {/* Rewind 10s */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handlePrev();
              }}
              className="player-icon-btn"
              title="Rewind / Restart video"
              aria-label="Rewind"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                <polygon points="19 20 9 12 19 4 19 20"></polygon>
                <line x1="5" y1="19" x2="5" y2="5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"></line>
              </svg>
            </button>

            {/* Main 3D Circular Play / Pause Button */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                togglePlay();
              }}
              className="player-play-btn"
              title={isPlaying ? "Pause video" : "Play video"}
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

            {/* Forward 10s */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handleNext();
              }}
              className="player-icon-btn"
              title="Skip forward 10s"
              aria-label="Forward"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                <polygon points="5 4 15 12 5 20 5 4"></polygon>
                <line x1="19" y1="5" x2="19" y2="19" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"></line>
              </svg>
            </button>

            {/* Repeat / Loop */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                toggleLoop();
              }}
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

        {/* Section Footer: One More Surprise */}
        <div className="music-player-footer mt-4">
          <p className="music-love-quote">“Every love song has always been about you.” ❤️</p>
          <button
            type="button"
            onClick={() => {
              if (videoRef.current) videoRef.current.pause();
              setIsPlaying(false);
              if (onNext) onNext();
            }}
            className="pill-btn btn-primary pulse-glow mt-3"
            title="Click for one more special surprise"
          >
            One More Surprise ✨
          </button>
        </div>
      </div>
    </section>
  );
}
