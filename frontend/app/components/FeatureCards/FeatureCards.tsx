"use client";

import "./FeatureCards.css";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";

const FeatureCards = () => {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(1);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  const features = [
    {
      title: "Products",
      description: "Explore our advanced telecom and networking products",
      path: "/distribution",
      image: "/images/productshome.jpg",
    },
    {
      title: "Services",
      description: "Installation, maintenance & technical support",
      path: "/service",
      image: "/images/serviceshome.jpg",
    },
    {
      title: "Solutions",
      description: "Custom enterprise and industry solutions",
      path: "/solutions",
      image: "/images/homesolutions.jpg",
    },
  ];

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? features.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === features.length - 1 ? 0 : prev + 1));
  };

  // Touch handlers for mobile swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 75) {
      // Swipe left
      handleNext();
    }

    if (touchStart - touchEnd < -75) {
      // Swipe right
      handlePrev();
    }
  };

  const getCardPosition = (index: number) => {
    const diff = index - currentIndex;
    const isCenter = diff === 0;
    const isLeft = diff === -1 || (currentIndex === 0 && index === features.length - 1);
    const isRight = diff === 1 || (currentIndex === features.length - 1 && index === 0);

    if (isCenter) return "carousel-card-center";
    if (isLeft) return "carousel-card-left";
    if (isRight) return "carousel-card-right";
    return "carousel-card-hidden";
  };

  return (
    <section className="feature-cards-section carousel-section">
      <h2 className="feature-cards-heading carousel-heading">WHAT WE OFFER</h2>

      <div className="carousel-container">
        {/* Left Arrow */}
        <button
          onClick={handlePrev}
          className="carousel-arrow carousel-arrow-left"
          aria-label="Previous"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>

        {/* Cards Container */}
        <div 
          className="carousel-wrapper"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {features.map((item, index) => (
            <div
              key={index}
              className={`carousel-card ${getCardPosition(index)}`}
              onClick={() => {
                if (index === currentIndex) {
                  router.push(item.path);
                } else {
                  setCurrentIndex(index);
                }
              }}
            >
              {/* Image Container */}
              <div className="carousel-image-container">
                {item.image && (
                  <img
                    src={item.image}
                    alt={item.title}
                    className="carousel-image"
                  />
                )}
                <div className="carousel-overlay" />

                {/* Content Overlay (only for center card) */}
                {index === currentIndex && (
                  <div className="carousel-content">
                    <div className="carousel-icon">📍</div>
                    <h3 className="carousel-title">{item.title}</h3>
                    <p className="carousel-description">{item.description}</p>
                    <div className="carousel-buttons">
                      <button
                        className="carousel-btn-primary"
                        onClick={(e) => {
                          e.stopPropagation();
                          router.push(item.path);
                        }}
                      >
                        See More
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Right Arrow */}
        <button
          onClick={handleNext}
          className="carousel-arrow carousel-arrow-right"
          aria-label="Next"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M9 18l6-6-6-6" />
          </svg>
        </button>
      </div>

      {/* Bottom Info */}
      <div className="carousel-info">
        <h3 className="carousel-info-title">{features[currentIndex].title}</h3>
        <p className="carousel-info-subtitle">
          📍 Comprehensive {features[currentIndex].title.toLowerCase()} offerings
        </p>
      </div>
    </section>
  );
};

export default FeatureCards;