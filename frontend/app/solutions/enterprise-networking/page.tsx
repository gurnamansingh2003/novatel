import "./page.css";

export const metadata = {
  title: "Enterprise Networking Solutions | Novatel",
  description:
    "Comprehensive enterprise networking solutions for modern businesses. Build robust, scalable, and secure network infrastructure with our cutting-edge networking systems.",
};

export default function EnterpriseNetworkingPage() {
  return (
    <div className="enterprise-networking-page">
      {/* Hero Section - Full Page */}
      <div className="hero-section">
        <div className="hero-overlay">
          <div className="hero-content">
            <h1 className="hero-title">
              Enterprise Networking Solutions
            </h1>
            <p className="hero-subtitle">
              Building the Backbone of Your Business with Advanced Network Infrastructure
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
                src="/images/networking.jpg"
                alt="Enterprise Networking"
                className="solution-image"
              />
            </div>

            {/* Text Section */}
            <div className="text-container">
              <h2 className="section-title">
                Powering Business Success Through Reliable Networks
              </h2>
              <p className="section-description">
                In today's digital-first world, a robust and reliable network infrastructure 
                is the foundation of every successful business. Our Enterprise Networking 
                solutions provide organizations with high-performance, secure, and scalable 
                network systems that drive productivity and innovation.
              </p>
              <p className="section-description">
                From network design and implementation to ongoing management and support, 
                we deliver comprehensive networking solutions that keep your business 
                connected, secure, and operating at peak efficiency.
              </p>

              <button className="enquiry-btn">Request Network Assessment</button>
            </div>
          </div>

          {/* Features Section */}
          <div className="features-section">
            <h2 className="features-title">
              Our Enterprise Networking Solutions Include
            </h2>
            <div className="features-grid">
              <div className="feature-card">
                <div className="feature-icon">🌐</div>
                <h3>Network Design & Architecture</h3>
                <p>
                  Custom-designed network infrastructure tailored to your business 
                  requirements and growth plans
                </p>
              </div>
              <div className="feature-card">
                <div className="feature-icon">🔒</div>
                <h3>Network Security</h3>
                <p>
                  Advanced firewall, VPN, and intrusion prevention systems to 
                  protect your network from threats
                </p>
              </div>
              <div className="feature-card">
                <div className="feature-icon">📡</div>
                <h3>Wireless Solutions</h3>
                <p>
                  Enterprise-grade Wi-Fi systems with seamless coverage and 
                  high-speed connectivity
                </p>
              </div>
              <div className="feature-card">
                <div className="feature-icon">🔄</div>
                <h3>Network Management</h3>
                <p>
                  24/7 monitoring, maintenance, and optimization to ensure 
                  maximum uptime and performance
                </p>
              </div>
              <div className="feature-card">
                <div className="feature-icon">☁️</div>
                <h3>Cloud Networking</h3>
                <p>
                  Hybrid and cloud-based networking solutions for flexible and 
                  scalable infrastructure
                </p>
              </div>
              <div className="feature-card">
                <div className="feature-icon">⚡</div>
                <h3>High-Speed Connectivity</h3>
                <p>
                  Fiber optic, SD-WAN, and high-bandwidth solutions for 
                  lightning-fast data transfer
                </p>
              </div>
            </div>
          </div>

          {/* Benefits Section */}
          <div className="benefits-section">
            <h2 className="benefits-title">Why Choose Our Networking Solutions?</h2>
            <div className="benefits-grid">
              <div className="benefit-item">
                <div className="benefit-number">01</div>
                <h3>Scalability</h3>
                <p>
                  Our solutions grow with your business, easily accommodating 
                  increased users, devices, and bandwidth requirements.
                </p>
              </div>
              <div className="benefit-item">
                <div className="benefit-number">02</div>
                <h3>Reliability</h3>
                <p>
                  Redundant systems and failover mechanisms ensure your network 
                  stays operational 24/7 with minimal downtime.
                </p>
              </div>
              <div className="benefit-item">
                <div className="benefit-number">03</div>
                <h3>Security-First</h3>
                <p>
                  Multi-layered security protocols protect your data and systems 
                  from cyber threats and unauthorized access.
                </p>
              </div>
              <div className="benefit-item">
                <div className="benefit-number">04</div>
                <h3>Expert Support</h3>
                <p>
                  Our certified network engineers provide round-the-clock support 
                  and proactive maintenance for peace of mind.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}