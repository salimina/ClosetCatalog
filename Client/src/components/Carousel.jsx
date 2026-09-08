import { useEffect, useState } from "react";
import SwipeCard from "./SwipeCard";

const placeholderImages = {
  tops: "/images/top.png",
  bottoms: "/images/bottoms.png",
  shoes: "/images/shoes.png",
};

function Carousel({ title, items }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(null);

  const category = title.toLowerCase();
  const placeholderImage = placeholderImages[category];

  useEffect(() => {
    setCurrentIndex(0);
  }, [title, items.length]);

  const showPrevious = () => {
    if (items.length <= 1) return;

    setCurrentIndex((current) =>
      current === 0 ? items.length - 1 : current - 1,
    );
  };

  const showNext = () => {
    if (items.length <= 1) return;

    setCurrentIndex((current) =>
      current === items.length - 1 ? 0 : current + 1,
    );
  };

  const handleTouchStart = (event) => {
    if (items.length <= 1) return;

    setTouchStart(event.touches[0].clientX);
  };

  const handleTouchEnd = (event) => {
    if (touchStart === null || items.length <= 1) return;

    const touchEnd = event.changedTouches[0].clientX;
    const distance = touchStart - touchEnd;

    if (distance > 50) {
      showNext();
    } else if (distance < -50) {
      showPrevious();
    }

    setTouchStart(null);
  };

  return (
    <section className="carousel-section">
      <div
        className="carousel"
        aria-label={`${title} carousel`}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {items.length > 1 && (
          <button
            type="button"
            className="carousel-button previous"
            onClick={showPrevious}
            aria-label={`View previous ${category}`}
          >
            ‹
          </button>
        )}

        <div className="carousel-window">
          {items.length === 0 ? (
            <div className="carousel-placeholder">
              {placeholderImage && (
                <img
                  className="placeholder-image"
                  src={placeholderImage}
                  alt={`${title} placeholder`}
                />
              )}
            </div>
          ) : (
            <div
              className="carousel-track"
              style={{
                transform: `translateX(-${currentIndex * 100}%)`,
              }}
            >
              {items.map((item) => (
                <SwipeCard key={item.id} item={item} />
              ))}
            </div>
          )}
        </div>

        {items.length > 1 && (
          <button
            type="button"
            className="carousel-button next"
            onClick={showNext}
            aria-label={`View next ${category}`}
          >
            ›
          </button>
        )}
      </div>
    </section>
  );
}

export default Carousel;
