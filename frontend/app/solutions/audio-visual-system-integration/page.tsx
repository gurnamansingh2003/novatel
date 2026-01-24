import "./page.css";

export const metadata = {
  title: "Audio-Visual System Integration | Novatel",
  description:
    "Transform your space with our cutting-edge AV solutions. Novatel specializes in Audio-Visual System Integration for professional and educational settings.",
};

export default function AudioVisualIntegrationPage() {
  return (
    <div className="av-solution-page">
      {/* Hero Section - Full Page */}
      <div className="hero-section">
        <div className="hero-overlay">
          <div className="hero-content">
            <h1 className="hero-title">
              Audio-Visual System Integration
            </h1>
            <p className="hero-subtitle">
              Transform your Space with our Cutting-Edge AV Solutions
            </p>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="content-section">
        <div className="content-container">
          <div className="content-grid">
            {/* Image Section */}
            <div className="image-container">
              <img
                src="/images/audio-visual.png"
                alt="Audio-Visual Integration"
                className="solution-image"
              />
            </div>

            {/* Text Section */}
            <div className="text-container">
              <h2 className="section-title">
                Enhancing Communication Through Innovative AV Solutions
              </h2>
              <p className="section-description">
                Effective and seamless audio-visual (AV) integration is
                essential for enhancing communication in both professional and
                educational settings. At Novatel, we specialize in
                Audio-Visual System Integration, providing state-of-the-art
                solutions tailored to meet the unique needs of our clients.
              </p>
              <p className="section-description">
                Our team of experts ensures that every aspect of your AV system
                is designed, installed, and maintained to deliver optimal
                performance and reliability.
              </p>

              <button className="enquiry-btn">Get a Quote</button>
            </div>
          </div>

          {/* Features/Benefits Section */}
          <div className="features-section">
            <h2 className="features-title">Our AV Solutions Include</h2>
            <div className="features-grid">
              <div className="feature-card">
                <div className="feature-icon">🎥</div>
                <h3>Video Conferencing</h3>
                <p>
                  High-quality video conferencing systems for seamless remote
                  collaboration
                </p>
              </div>
              <div className="feature-card">
                <div className="feature-icon">🔊</div>
                <h3>Sound Systems</h3>
                <p>
                  Professional audio solutions for crystal-clear sound in any
                  environment
                </p>
              </div>
              <div className="feature-card">
                <div className="feature-icon">📺</div>
                <h3>Display Solutions</h3>
                <p>
                  Advanced display technologies including LED walls and
                  projection systems
                </p>
              </div>
              <div className="feature-card">
                <div className="feature-icon">🎛️</div>
                <h3>Control Systems</h3>
                <p>
                  Intuitive control interfaces for easy management of your AV
                  infrastructure
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}