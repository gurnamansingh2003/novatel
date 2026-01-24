"use client";

import "./ServiceCards.css";
import Image from "next/image";
import Link from "next/link";

const services = [
  {
    title: "CONSULTING",
    description:
      "Our organization maintains a strong focus on its delivery capabilities and has built a strong reputation for meeting client expectations.",
    image: "/images/consulting.jpg", // YOU WILL ADD
    link: "/service/consulting",
  },
  {
    title: "INSTALLATION AND COMMISSIONING",
    description:
      "We provide engineering and installation services through experienced field engineers backed by highly skilled technical resources.",
    image: "/images/installation.jpg", // YOU WILL ADD
    link: "/service/installation",
  },
  {
    title: "MAINTENANCE",
    description:
      "We offer regular preventive maintenance inspections allowing organizations to better predict system reliability.",
    image: "/images/maintenance.jpg", // YOU WILL ADD
    link: "/service/maintenance",
  },
];

export default function ServiceCards() {
  return (
    <section
      className="service-cards-section"
      style={{
        padding: "80px 8%",
        backgroundColor: "#fff",
      }}
    >
      <div
        className="service-cards-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "40px",
        }}
      >
        {services.map((service) => (
          <div
            key={service.title}
            className="service-card-item"
            style={{
              borderRadius: "16px",
              overflow: "hidden",
              boxShadow: "0 12px 30px rgba(0,0,0,0.12)",
              backgroundColor: "#fff",
              transition: "transform 0.3s ease, box-shadow 0.3s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-8px)";
              e.currentTarget.style.boxShadow =
                "0 20px 45px rgba(0,0,0,0.18)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow =
                "0 12px 30px rgba(0,0,0,0.12)";
            }}
          >
            {/* IMAGE */}
            <div style={{ position: "relative", height: "200px" }}>
              <Image
                src={service.image}
                alt={service.title}
                fill
                style={{ objectFit: "cover" }}
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            </div>

            {/* CONTENT */}
            <div style={{ padding: "26px" }}>
              <h3
                style={{
                  fontSize: "18px",
                  fontWeight: 800,
                  marginBottom: "12px",
                  textTransform: "uppercase",
                }}
              >
                {service.title}
              </h3>

              <p
                style={{
                  fontSize: "14.5px",
                  color: "#444",
                  lineHeight: 1.6,
                  marginBottom: "18px",
                }}
              >
                {service.description}
              </p>

              <Link
                href={service.link}
                style={{
                  fontWeight: 700,
                  color: "#000",
                  textDecoration: "none",
                  fontSize: "14px",
                }}
              >
                Read More →
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
