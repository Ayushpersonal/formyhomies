import React, { useState } from 'react';

const Envelope = ({ onComplete }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = (e) => {
    if (isOpen) return;

    // Trigger floating heart burst at current mouse/click coordinates
    if (window.triggerBurst) {
      const rect = e.currentTarget.getBoundingClientRect();
      const clickX = e.clientX || (rect.left + rect.width / 2);
      const clickY = e.clientY || (rect.top + rect.height / 2);
      window.triggerBurst(clickX, clickY);
    }

    setIsOpen(true);

    // After animations complete, proceed to Stage 2
    setTimeout(() => {
      onComplete();
    }, 2000);
  };

  return (
    <div className="stage-container envelope-stage">
      <div className="envelope-badge">
        <span className="heart-icon">🌸</span> FOR MY BESTIE
      </div>

      <h1 className="envelope-title">a little something for you</h1>
      <div className="envelope-subtitle">
        happy friendship day <span className="sparkle-char">✦</span>
      </div>

      <div className="sticker-wrapper">
        <img
          className="dancing-cat"
          src="/dancing_cat.gif"
          alt="Dancing Baby Cat"
        />
      </div>

      <div
        className={`envelope-wrapper ${isOpen ? 'open' : ''}`}
        id="envelope-trigger"
        onClick={handleOpen}
      >
        <div className="envelope">
          {/* Folded Top Lid */}
          <div className="envelope-top"></div>

          {/* Inner Pocket Background */}
          <div className="envelope-back"></div>

          {/* Envelope Stub Card */}
          <div className="envelope-letter-stub">
            {isOpen ? 'Opening card... ✨' : 'Click to open'}
          </div>

          {/* Flaps Overlays */}
          <div className="envelope-front"></div>

          {/* Wax Seal */}
          <div className="wax-seal">K</div>
        </div>
      </div>

      <div className="envelope-tap-prompt">
        TAP TO OPEN <span className="sparkle-char">✦</span>
      </div>
    </div>
  );
};

export default Envelope;
