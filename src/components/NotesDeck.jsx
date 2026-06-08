import React, { useState } from 'react';

const NotesDeck = ({ notes, onNext }) => {
  const [flippedCards, setFlippedCards] = useState(new Set());

  const handleCardClick = (id, e) => {
    if (flippedCards.has(id)) return;

    // Trigger heart particle burst at the center of the card
    if (window.triggerBurst) {
      const rect = e.currentTarget.getBoundingClientRect();
      const clickX = rect.left + rect.width / 2;
      const clickY = rect.top + rect.height / 2;
      window.triggerBurst(clickX, clickY);
    }

    setFlippedCards((prev) => {
      const updated = new Set(prev);
      updated.add(id);
      return updated;
    });
  };

  const allFlipped = flippedCards.size === notes.length;

  return (
    <div className={`stage-container notes-stage ${flippedCards.size > 0 ? 'show-cards' : ''}`}>
      <div className="notes-badge">
        💖 THREE NOTES FOR BESTIE
      </div>

      <h2 className="notes-title">three things i never said out loud</h2>
      <p className="notes-subtitle">tap each card — there's a note inside ✦</p>

      <div className="cards-row">
        {notes.map((note) => {
          const isFlipped = flippedCards.has(note.id);
          const cardClass = `flip-card card-${note.color} ${isFlipped ? 'flipped' : ''}`;

          return (
            <div
              key={note.id}
              className={cardClass}
              onClick={(e) => handleCardClick(note.id, e)}
              style={{ opacity: 1, transform: 'translateY(0)' }} // Override transition for direct render
            >
              <div className="flip-card-inner">
                {/* Front Side */}
                <div className={`flip-card-front card-${note.color}`}>
                  <svg className="card-rose-svg" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="14" fill="#ffffff" opacity="0.6" />
                    <circle cx="50" cy="28" r="17" fill="currentColor" opacity="0.18" />
                    <circle cx="50" cy="72" r="17" fill="currentColor" opacity="0.18" />
                    <circle cx="28" cy="50" r="17" fill="currentColor" opacity="0.18" />
                    <circle cx="72" cy="50" r="17" fill="currentColor" opacity="0.18" />
                    <circle cx="34" cy="34" r="17" fill="currentColor" opacity="0.12" />
                    <circle cx="66" cy="66" r="17" fill="currentColor" opacity="0.12" />
                    <circle cx="34" cy="66" r="17" fill="currentColor" opacity="0.12" />
                    <circle cx="66" cy="34" r="17" fill="currentColor" opacity="0.12" />
                    <circle cx="50" cy="50" r="10" fill="currentColor" />
                  </svg>
                  <span className="pick-me-text">Pick Me</span>
                </div>

                {/* Back Side */}
                <div className={`flip-card-back card-${note.color}`}>
                  <svg className="mini-flower-icon" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="15" fill="currentColor" />
                    <circle cx="50" cy="25" r="20" fill="currentColor" opacity="0.4" />
                    <circle cx="50" cy="75" r="20" fill="currentColor" opacity="0.4" />
                    <circle cx="25" cy="50" r="20" fill="currentColor" opacity="0.4" />
                    <circle cx="75" cy="50" r="20" fill="currentColor" opacity="0.4" />
                  </svg>
                  <span className="back-header">✿ {note.header} ✿</span>
                  <p className="back-quote">{note.quote}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="envelope-cup-wrapper">
        <div id="envelope-cup"></div>
      </div>

      <button
        className={`album-trigger-btn ${allFlipped ? 'show' : ''}`}
        id="notes-proceed-btn"
        onClick={onNext}
      >
        OPEN NEXT CARD →
      </button>
    </div>
  );
};

export default NotesDeck;
