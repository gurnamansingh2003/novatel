import "../page.css";
import Link from "next/link";
import { ipSpeakers } from "./ip-speakers";

export default function IPSpeakersPage() {
  return (
    <div className="page-offset">
      <div className="page-container">
        <h1 className="page-title">IP PA Speakers</h1>

        <div className="product-grid">
          {ipSpeakers.map((product) => (
            <Link
              key={product.slug}
              href={`/distribution/ip-speakers/${product.slug}`}
              className="product-card"
            >
              <img src={product.image} alt={product.name} />
              <p>{product.name}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}