"use client";

import "./FeatureCards.css";
import { useState } from "react";
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

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) handleNext();
    if (isRightSwipe) handlePrev();
    
    setTouchStart(0);
    setTouchEnd(0);
  };

  const getCardPosition = (index: number) => {
    const diff = index - currentIndex;
    if (diff === 0) return "carousel-card-center";
    if (diff === -1 || (currentIndex === 0 && index === features.length - 1)) return "carousel-card-left";
    if (diff === 1 || (currentIndex === features.length - 1 && index === 0)) return "carousel-card-right";
    return "carousel-card-hidden";
  };

  return (
    <section className="carousel-section">
      <h2 className="carousel-heading">WHAT WE OFFER</h2>

      <div className="carousel-main-container">
        {/* Left Arrow - Outside the wrapper */}
        <button onClick={handlePrev} className="carousel-arrow arrow-left" aria-label="Previous">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>

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
              onClick={() => index !== currentIndex ? setCurrentIndex(index) : null}
            >
              <div className="carousel-image-container">
                <img src={item.image} alt={item.title} className="carousel-image" />
                <div className={`carousel-overlay ${index === currentIndex ? 'active' : ''}`} />

                {index === currentIndex && (
                  <div className="carousel-content">
                    <h3 className="carousel-title">{item.title}</h3>
                    <p className="carousel-description">{item.description}</p>
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
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Right Arrow - Outside the wrapper */}
        <button onClick={handleNext} className="carousel-arrow arrow-right" aria-label="Next">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
            <path d="M9 18l6-6-6-6" />
          </svg>
        </button>
      </div>
    </section>
  );
};

export default FeatureCards;