import "../page.css";
import Link from "next/link";
import { epabxProducts } from "./epabxProducts";
import ProductCard from "@/app/components/ProductCard/ProductCard";

export default function EpabxPage() {
  return (
    <div className="page-container">
      <h1 className="page-title">EPABX Products</h1>

      <div className="product-grid">
        {epabxProducts.map((p) => (
          <Link
            key={p.slug}
            href={`/distribution/epabx/${p.slug}`}
          >
            <ProductCard product={p} />
          </Link>
        ))}
      </div>
    </div>
  );
}
