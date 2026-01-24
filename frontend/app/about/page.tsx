import "./page.css";

export const metadata = {
  title: "About Us | Novatel",
  description:
    "Learn about Novatel, our expertise in telecom, networking, power systems, and long-term enterprise solutions.",
};

export default function AboutPage() {
  return (
    <main className="page-offset">
      {/* ================= HERO SECTION ================= */}
      <section
        className="about-hero"
        style={{
          height: "320px",
          backgroundImage: "url('/images/about-banner.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          position: "relative",
        }}
      >
        {/* Overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundColor: "rgba(0,0,0,0.55)",
          }}
        />

        {/* Text on Image */}
        <div
          style={{
            position: "relative",
            zIndex: 2,
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            color: "#fff",
          }}
        >
          
        </div>
      </section>

      {/* ================= CONTENT SECTION ================= */}
      <section
        className="about-content"
        style={{
          padding: "60px 80px",
          backgroundColor: "#ffffff",
        }}
      >
        <h2 style={{ color: "#1d4ed8", marginBottom: "10px" }}>
          ABOUT
        </h2>

        <p style={{ lineHeight: "1.8", color: "#111" }}>
          Novatel is a partnership company dealing in sale and service of
          Telecom, Power, networking and Office Automation equipment.
          It is an ISO 9001:2008 company.
        </p>

        <p
          style={{
            lineHeight: "1.8",
            color: "#111",
            marginTop: "15px",
          }}
        >
          We serve leading companies across government, healthcare,
          education, hospitality, utilities, finance and transportation.
          We design, setup, operate and manage complex communication
          networks connecting global locations.
        </p>

        <h2
          style={{
            color: "#1d4ed8",
            marginTop: "40px",
            marginBottom: "10px",
          }}
        >
          OUR MISSION
        </h2>

        <p style={{ lineHeight: "1.8", color: "#444" }}>
          Our mission is to simplify technology for end users by
          providing best quality products and prompt service support.
          Our deep commitment and logical approach help fulfill diverse
          customer requirements and enable businesses to grow swiftly.
        </p>
      </section>
    </main>
  );
}
