import Link from "next/link";
import "./page.css";

export const metadata = {
  title: "Solutions | Novatel",
  description:
    "Explore Novatel's enterprise solutions: Enterprise Networking and Audio-Visual System Integration for modern businesses.",
};

export default function SolutionsLandingPage() {
  return (
    <div className="solutions-landing page-offset">
      {/* Hero: content + background image (add your image at public/images/solutions/hero-bg.jpg) */}
      <section className="solutions-hero" aria-label="Solutions overview">
        <div className="solutions-hero__overlay" />
        <div className="solutions-hero__content">
          <h1 className="solutions-hero__title">Solutions</h1>
          <p className="solutions-hero__tagline">
            Enterprise-grade technology and integration for the way you work
          </p>
          <p className="solutions-hero__about">
            Novatel delivers end-to-end solutions that connect people, spaces, and systems.
            From robust enterprise networking to seamless audio-visual integration, we help
            organisations build reliable, scalable infrastructure that drives productivity
            and collaboration.
          </p>
          <p className="solutions-hero__about solutions-hero__about--last">
            Choose a solution below to explore capabilities, use cases, and how we can
            support your goals.
          </p>
        </div>
      </section>

      {/* Two solution cards – scroll down to see */}
      <section className="solutions-cards" aria-label="Solution offerings">
        <div className="solutions-cards__inner">
          <h2 className="solutions-cards__heading">Our solutions</h2>
          <div className="solutions-cards__grid">
            <Link
              href="/solutions/enterprise-networking"
              className="solutions-card solutions-card--networking"
            >
              <span className="solutions-card__label">Solution</span>
              <h3 className="solutions-card__title">Enterprise Networking</h3>
              <p className="solutions-card__desc">
                Build the backbone of your business with advanced network infrastructure,
                security, and connectivity designed for scale and reliability.
              </p>
              <span className="solutions-card__cta">Explore →</span>
            </Link>
            <Link
              href="/solutions/audio-visual-system-integration"
              className="solutions-card solutions-card--av"
            >
              <span className="solutions-card__label">Solution</span>
              <h3 className="solutions-card__title">Audio–Visual Integration</h3>
              <p className="solutions-card__desc">
                Transform spaces with cutting-edge AV solutions—meeting rooms, digital
                signage, and unified communication experiences.
              </p>
              <span className="solutions-card__cta">Explore →</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
