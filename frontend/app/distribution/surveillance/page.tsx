import "../page.css";
import Link from "next/link";
import { surveillanceProducts } from "./surveillanceProducts";

export default function SurveillancePage() {
  return (
    <div className="page-offset">
      <div className="page-container">
        <h1 className="page-title">Surveillance Products</h1>

        <div className="product-grid">
          {surveillanceProducts.map((product) => (
            <Link
              key={product.slug}
              href={`/distribution/surveillance/${product.slug}`}
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
