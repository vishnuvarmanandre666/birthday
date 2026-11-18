'use client';

export default function TopNav({ openCustomizeModal, stage, isSongPlaying, toggleSong }) {
  return (
    <header className="top-nav-bar">
      <div className="nav-left">
        <span className="sparkle-badge">✨ Made with all my love</span>
      </div>
      <div className="nav-right">
        {/* Memories Song Control (Appears from Stage 7 onwards) */}
        {stage >= 7 && (
          <button
            onClick={toggleSong}
            className={`floating-btn ${isSongPlaying ? 'music-playing' : ''}`}
            title={isSongPlaying ? "Pause our song" : "Play our song"}
            aria-label="Toggle Memories Song"
          >
            <span className="music-icon-disc">🎵</span>
            <span className="btn-text">{isSongPlaying ? 'Our Song 🎶' : 'Play Song ▶️'}</span>
          </button>
        )}

        {/* Edit / Personalize Button */}
        <button
          onClick={openCustomizeModal}
          className="floating-btn customize-btn"
          title="Customize Names & Message"
          aria-label="Customize"
        >
          <span>✏️</span>
          <span className="btn-text">Personalize</span>
        </button>
      </div>
    </header>
  );
}
