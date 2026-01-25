import "../page.css";
import Link from "next/link";
import { surveillanceProducts } from "./surveillanceProducts";
import ProductCard from "@/app/components/ProductCard/ProductCard";

export default function SurveillancePage() {
  return (
    <div className="page-offset">
      <div className="page-container">
        <h1 className="page-title">Surveillance Products</h1>
        <div className="product-grid">
          {surveillanceProducts.map((product) => (
            <Link
              key={product.id}
              href={`/distribution/surveillance/${product.id}`}
            >
              <ProductCard product={product} />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
