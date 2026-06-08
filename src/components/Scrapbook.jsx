import React, { useState } from 'react';

const Scrapbook = ({ memories, onNext }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const totalSlides = memories.length || 3;

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const handleNextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const handleDotClick = (index) => {
    setCurrentSlide(index);
  };

  const handleNextStage = (e) => {
    if (window.triggerBurst) {
      const rect = e.currentTarget.getBoundingClientRect();
      window.triggerBurst(rect.left + rect.width / 2, rect.top + rect.height / 2);
    }
    onNext();
  };

  return (
    <div className="stage-container album-stage">
      <div className="album-badge">
        💖 OUR ALBUM · BESTIE
      </div>

      <h2 className="album-title">our little album</h2>
      <div className="album-subtitle">a few moments i never want to forget ♡</div>

      <div className="carousel-container">
        <button className="carousel-arrow prev-arrow" onClick={handlePrev}>
          ←
        </button>
        <button className="carousel-arrow next-arrow" onClick={handleNextSlide}>
          →
        </button>

        <div className="carousel-viewport">
          <div
            className="carousel-track"
            style={{
              transform: `translateX(-${currentSlide * 33.3333}%)`,
              width: `${totalSlides * 100}%`
            }}
          >
            {memories.map((memory, index) => (
              <div className="carousel-card-item" key={index} style={{ width: `${100 / totalSlides}%` }}>
                <div className="scrapbook-card">
                  <div className="card-tape"></div>

                  {/* Corner flower top left */}
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

                  {/* Corner flower bottom right */}
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

                  <div className="scrapbook-img-frame">
                    <img
                      className={`scrapbook-img ${memory.img === 'all3.jpeg' ? 'rotate-90-full' : ''}`}
                      src={`/${memory.img}`}
                      alt={`Memory ${memory.index}`}
                    />
                  </div>
                  <div className="scrapbook-info">
                    <span className="memory-number">Memory {memory.index} of {totalSlides.toString().padStart(2, '0')}</span>
                    <p className="memory-caption">{memory.caption}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="carousel-dots">
        {memories.map((_, index) => (
          <span
            key={index}
            className={`dot ${index === currentSlide ? 'active' : ''}`}
            onClick={() => handleDotClick(index)}
          ></span>
        ))}
      </div>

      <button className="return-greeting-btn" onClick={handleNextStage}>
        OPEN THE CARDS →
      </button>
    </div>
  );
};

export default Scrapbook;
