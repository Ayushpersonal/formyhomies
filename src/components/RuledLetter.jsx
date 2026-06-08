import React from 'react';

const RuledLetter = ({ letter, onReset }) => {
  const handleReset = (e) => {
    if (window.triggerBurst) {
      const rect = e.currentTarget.getBoundingClientRect();
      window.triggerBurst(rect.left + rect.width / 2, rect.top + rect.height / 2);
    }
    onReset();
  };

  return (
    <div className="stage-container letter-stage">
      <div className="letter-card">
        {/* Pink flower top left */}
        <svg className="flower-top-left" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          <circle cx="50" cy="50" r="14" fill="#fae8eb" />
          <circle cx="50" cy="28" r="17" fill="#ffb7b2" />
          <circle cx="50" cy="72" r="17" fill="#ffb7b2" />
          <circle cx="28" cy="50" r="17" fill="#ffb7b2" />
          <circle cx="72" cy="50" r="17" fill="#ffb7b2" />
          <circle cx="34" cy="34" r="17" fill="#ffb7b2" />
          <circle cx="66" cy="66" r="17" fill="#ffb7b2" />
          <circle cx="34" cy="66" r="17" fill="#ffb7b2" />
          <circle cx="66" cy="34" r="17" fill="#ffb7b2" />
          <circle cx="50" cy="50" r="10" fill="#ffd166" />
        </svg>

        {/* Peach flower top right */}
        <svg className="flower-top-right" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          <circle cx="50" cy="50" r="14" fill="#faf0e6" />
          <circle cx="50" cy="28" r="17" fill="#fec5bb" />
          <circle cx="50" cy="72" r="17" fill="#fec5bb" />
          <circle cx="28" cy="50" r="17" fill="#fec5bb" />
          <circle cx="72" cy="50" r="17" fill="#fec5bb" />
          <circle cx="34" cy="34" r="17" fill="#fec5bb" />
          <circle cx="66" cy="66" r="17" fill="#fec5bb" />
          <circle cx="34" cy="66" r="17" fill="#fec5bb" />
          <circle cx="66" cy="34" r="17" fill="#fec5bb" />
          <circle cx="50" cy="50" r="10" fill="#ffd166" />
        </svg>

        {/* Purple flower bottom right */}
        <svg className="flower-bottom-right" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          <g fill="#e8dbfc">
            <ellipse cx="50" cy="50" rx="6" ry="32" transform="rotate(0 50 50)" />
            <ellipse cx="50" cy="50" rx="6" ry="32" transform="rotate(30 50 50)" />
            <ellipse cx="50" cy="50" rx="6" ry="32" transform="rotate(60 50 50)" />
            <ellipse cx="50" cy="50" rx="6" ry="32" transform="rotate(90 50 50)" />
            <ellipse cx="50" cy="50" rx="6" ry="32" transform="rotate(120 50 50)" />
            <ellipse cx="50" cy="50" rx="6" ry="32" transform="rotate(150 50 50)" />
          </g>
          <circle cx="50" cy="50" r="12" fill="#ffd166" />
        </svg>

        {/* Center overlapping avatar with gradient double ring */}
        <div className="letter-avatar-container">
          <div className="letter-avatar-border">
            <div className="letter-avatar-inner">
              <img src="/me.png" alt="Headphones Character" />
            </div>
          </div>
        </div>

        {/* Header tag */}
        <span className="letter-tag-header">{letter.tagHeader || '✦ A letter, just for you ✦'}</span>

        {/* Dear heading */}
        <h3 className="letter-dear">{letter.dear || 'Dear bestie,'}</h3>

        {/* Lined body content */}
        {letter.paragraphs && letter.paragraphs.map((p, idx) => (
          <p className={`letter-body-p ${idx === 2 ? 'highlight-p' : ''}`} key={idx}>{p}</p>
        ))}

        {/* Dotted signoff line */}
        <div className="letter-end-divider">
          <span className="heart-icon">💗</span>
          <div className="divider-line"></div>
        </div>

        <p className="letter-signature">{letter.signature || 'with love (and zero regrets),'}</p>
        <span className="letter-tag-footer">{letter.tagFooter || '— YOUR BHONDU FRIND'}</span>
      </div>

      <span className="letter-outside-footer">{letter.outsideFooter || 'WITH LOVE · YOUR BHONDU FRIND'}</span>

      <button className="start-again-btn" onClick={handleReset}>
        ↺ START AGAIN
      </button>
    </div>
  );
};

export default RuledLetter;
