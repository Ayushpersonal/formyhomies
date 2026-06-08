import React from 'react';

const GreetingCard = ({
  track,
  musicPlaying,
  musicProgress,
  currentTime,
  durationTime,
  toggleMusic,
  onScrub,
  onNext
}) => {
  const handleTimelineClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const width = rect.width;
    const ratio = clickX / width;
    onScrub(ratio);
  };

  return (
    <div className="stage-container card-stage">
      <div className="main-card">
        {/* Flower SVG Top Left */}
        <svg className="flower-top-left" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="15" fill="#fcdcd3" />
          <circle cx="50" cy="25" r="19" fill="rgba(247, 204, 205, 0.75)" />
          <circle cx="50" cy="75" r="19" fill="rgba(247, 204, 205, 0.75)" />
          <circle cx="25" cy="50" r="19" fill="rgba(247, 204, 205, 0.75)" />
          <circle cx="75" cy="50" r="19" fill="rgba(247, 204, 205, 0.75)" />
          <circle cx="32" cy="32" r="19" fill="rgba(247, 204, 205, 0.65)" />
          <circle cx="68" cy="68" r="19" fill="rgba(247, 204, 205, 0.65)" />
          <circle cx="32" cy="68" r="19" fill="rgba(247, 204, 205, 0.65)" />
          <circle cx="68" cy="32" r="19" fill="rgba(247, 204, 205, 0.65)" />
          <circle cx="50" cy="50" r="12" fill="#e57c82" />
        </svg>

        {/* Flower SVG Top Right */}
        <svg className="flower-top-right" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="15" fill="#faece9" />
          <circle cx="50" cy="25" r="19" fill="rgba(253, 211, 182, 0.75)" />
          <circle cx="50" cy="75" r="19" fill="rgba(253, 211, 182, 0.75)" />
          <circle cx="25" cy="50" r="19" fill="rgba(253, 211, 182, 0.75)" />
          <circle cx="75" cy="50" r="19" fill="rgba(253, 211, 182, 0.75)" />
          <circle cx="32" cy="32" r="19" fill="rgba(253, 211, 182, 0.65)" />
          <circle cx="68" cy="68" r="19" fill="rgba(253, 211, 182, 0.65)" />
          <circle cx="32" cy="68" r="19" fill="rgba(253, 211, 182, 0.65)" />
          <circle cx="68" cy="32" r="19" fill="rgba(253, 211, 182, 0.65)" />
          <circle cx="50" cy="50" r="12" fill="#f4a261" />
        </svg>

        {/* Overlapping Avatar */}
        <div className="avatar-container">
          <div className="avatar-glow"></div>
          <img className="avatar-img" src="/WEBP-36-1-500x500.webp" alt="Bestie Character" />
        </div>

        <div className="crime-badge">
          ❤️ FOR MY FAVOURITE PARTNER-IN-CRIME
        </div>

        <h2 className="card-title">Happy National Best Friend Day</h2>
        <div className="card-subtitle">for my bestie ✦</div>

        <div className="card-divider">
          <span className="dots">·················</span>
          <span className="divider-flower">✿</span>
          <span className="dots">·················</span>
        </div>

        <p className="card-message">
          Today is yours. A little corner of the internet — built just to say thanks for every inside joke we still laugh about, every secret we kept, and every time you had my back. Stay a while, bestie.
        </p>

        {/* Music Player */}
        <div className="music-player">
          <div className="player-sticker-frame">
            <img
              className="player-sticker"
              src="/me.png"
              alt="Music sticker"
            />
          </div>

          <div className="player-info">
            <span className="track-name">{track.name || 'Ashiyan'}</span>
            <span className="track-tag">{track.tag || 'A Track For You'}</span>

            <div className="progress-wrapper">
              <span className="progress-time">{currentTime}</span>
              <div className="progress-container" onClick={handleTimelineClick}>
                <div className="progress-bar" style={{ width: `${musicProgress}%` }}>
                  <div className="progress-handle"></div>
                </div>
              </div>
              <span className="progress-time">{durationTime}</span>
            </div>
          </div>

          <button className="play-btn" onClick={toggleMusic}>
            {musicPlaying ? (
              // Pause SVG Icon
              <svg viewBox="0 0 24 24">
                <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
              </svg>
            ) : (
              // Play SVG Icon
              <svg viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            )}
          </button>
        </div>

        <p className="player-caption">
          {track.caption || 'press play – this one always reminds me of you and our long drives.'}
        </p>
      </div>

      <button className="album-trigger-btn" onClick={onNext}>
        SEE OUR ALBUM →
      </button>
    </div>
  );
};

export default GreetingCard;
