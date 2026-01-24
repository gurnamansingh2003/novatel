import "./page.css";
import ServiceCards from "../components/ServiceCards/ServiceCards";

export const metadata = {
  title: "Services | Novatel",
  description:
    "Novatel offers consulting, installation, and maintenance services for enterprise infrastructure.",
};

export default function ServicePage() {
  return (
    <div className="page-offset">
      {/* HERO IMAGE SECTION */}
      <section
        className="service-hero"
        style={{
          height: "390px",
          backgroundImage: "url('/images/ourservices.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
        }}
      >
        {/* Dark overlay to reduce brightness */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundColor: "rgba(0, 0, 0, 0.7)",
          }}
        />
        
        <h1
          className="service-hero-title"
          style={{
            color: "#ffffff",
            fontSize: "36px",
            fontWeight: "900",
            letterSpacing: "1px",
           //background: "rgba(0, 0, 0, 0.4)",
            padding: "14px 28px",
            borderRadius: "14px",
            position: "relative",
            zIndex: 1,
          }}
        >
          OUR SERVICES
        </h1>
      </section>

      <ServiceCards />
    </div>
  );
}