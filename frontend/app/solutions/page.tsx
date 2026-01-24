import "../distribution/page.css";

export const metadata = {
  title: "Solutions & Partners | Novatel",
  description:
    "Explore Novatel's enterprise solutions including Enterprise Communication, Audio-Visual System Integration, and Security & Surveillance.",
};

export default function PartnersPage() {
  return (
    <div className="page-offset">
      <div className="page-container">
      <h1 className="page-title">Solutions</h1>
      <p style={{ fontSize: "18px", lineHeight: "1.8", color: "#444" }}>
        Our expertise spans Enterprise Communication, Audio-Visual System
        Integration, and Security & Surveillance solutions.
      </p>
      </div>
    </div>
  );
}
