import React from 'react';

const ThankYou = ({ onNext }) => {
  const handleProceed = (e) => {
    if (window.triggerBurst) {
      const rect = e.currentTarget.getBoundingClientRect();
      window.triggerBurst(rect.left + rect.width / 2, rect.top + rect.height / 2);
    }
    onNext();
  };

  return (
    <div className="stage-container thanks-stage">
      <div className="thanks-card">
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

        {/* Flower SVG Bottom Right */}
        <svg className="flower-bottom-right" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="15" fill="#f3ebff" />
          <circle cx="50" cy="25" r="19" fill="rgba(216, 180, 254, 0.75)" />
          <circle cx="50" cy="75" r="19" fill="rgba(216, 180, 254, 0.75)" />
          <circle cx="25" cy="50" r="19" fill="rgba(216, 180, 254, 0.75)" />
          <circle cx="75" cy="50" r="19" fill="rgba(216, 180, 254, 0.75)" />
          <circle cx="32" cy="32" r="19" fill="rgba(216, 180, 254, 0.65)" />
          <circle cx="68" cy="68" r="19" fill="rgba(216, 180, 254, 0.65)" />
          <circle cx="32" cy="68" r="19" fill="rgba(216, 180, 254, 0.65)" />
          <circle cx="68" cy="32" r="19" fill="rgba(216, 180, 254, 0.65)" />
          <circle cx="50" cy="50" r="12" fill="#a855f7" />
        </svg>

        {/* Center Overlapping Avatar */}
        <div className="thanks-avatar-container">
          <div className="avatar-glow"></div>
          <img className="avatar-img" src="/WEBP-36-1-500x500.webp" alt="Bestie Character" />
        </div>

        <h2 className="thanks-title">thank you, bestie.</h2>

        <p className="thanks-message">
          for the laughs, the comebacks, the bad jokes, and the rare-but-perfect serious talks. for being the constant. happy national bestfriend day — you deserve every bit of this and more.
        </p>

        <button className="album-trigger-btn" id="thanks-proceed-btn" onClick={handleProceed}>
          READ MY LETTER →
        </button>
      </div>
    </div>
  );
};

export default ThankYou;
