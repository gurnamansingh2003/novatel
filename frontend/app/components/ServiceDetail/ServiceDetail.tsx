"use client";

import "./ServiceDetail.css";

type ServiceDetailProps = {
  title: string;
  description: string;
  points: string[];
  image: string;
  reverse?: boolean;
};

export default function ServiceDetail({
  title,
  description,
  points,
  image,
  reverse = false,
}: ServiceDetailProps) {
  return (
    <section className="service-detail-section" style={styles.section}>
      <div
        className="service-detail-container"
        style={{
          ...styles.container,
          flexDirection: reverse ? "row-reverse" : "row",
        }}
      >
        <div className="service-detail-text" style={styles.text}>
          <h2 className="service-detail-title" style={styles.title}>{title}</h2>
          <p className="service-detail-desc" style={styles.desc}>{description}</p>

          <ul className="service-detail-list" style={styles.list}>
            {points.map((point, index) => (
              <li key={index} className="service-detail-item" style={styles.listItem}>
                ✓ {point}
              </li>
            ))}
          </ul>
        </div>

        <div className="service-detail-image-wrapper" style={styles.imageWrapper}>
          <img src={image} alt={title} className="service-detail-image" style={styles.image} />
        </div>
      </div>
    </section>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  section: {
    padding: "80px 20px",
    backgroundColor: "#f8fafc",
  },

  container: {
    maxWidth: "1200px",
    margin: "0 auto",
    display: "flex",
    alignItems: "center",
    gap: "50px",
    flexWrap: "wrap",
  },

  text: {
    flex: 1,
    minWidth: "300px",
  },

  title: {
    fontSize: "2.2rem",
    fontWeight: "700",
    marginBottom: "20px",
    color: "#0f172a",
  },

  desc: {
    fontSize: "1.1rem",
    marginBottom: "20px",
    color: "#475569",
    lineHeight: "1.6",
  },

  list: {
    listStyle: "none",
    padding: 0,
  },

  listItem: {
    fontSize: "1rem",
    marginBottom: "10px",
    color: "#334155",
  },

  imageWrapper: {
    flex: 1,
    minWidth: "300px",
  },

  image: {
    width: "100%",
    borderRadius: "16px",
    boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
  },
};
