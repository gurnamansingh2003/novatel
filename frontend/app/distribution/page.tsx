import "./page.css";
import Link from "next/link";

export const metadata = {
  title: "Products & Solutions | Novatel",
  description:
    "Explore Novatel's range of telecom, power, networking, and office automation products.",
};

export default function DistributionPage() {
  return (
    <div className="page-offset">
      <div className="page-container">
      <h1 className="page-title">Distribution</h1>

      <div className="distribution-grid">
        <Link href="/distribution/epabx" className="distribution-card">
          <img src="/images/distributions/matrix-epabx-system.jpg" alt="EPABX" />
          <h3>EPABX</h3>
        </Link>

        <Link href="/distribution/phones" className="distribution-card">
          <img src="/images/phones/NEOPHONE-FKT-01-B.jpg" alt="Phones" />
          <h3>Phones</h3>
        </Link>

        <Link href="/distribution/surveillance" className="distribution-card">
          <img src="/images/surveillance/NT-IDN22V.jpg" alt="Surveillance" />
          <h3>Surveillance</h3>
        </Link>
        <Link href="/distribution/ip-speakers" className="distribution-card">
          <img src="/images/ip-speakers/Ceiling-speaker-3.png" alt="IP Speakers" />
          <h3>IP Speakers</h3>
        </Link>
      </div>
      </div>
    </div>
  );
}
