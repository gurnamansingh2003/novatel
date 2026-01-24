import "../page.css";
import Link from "next/link";
import { phonesProducts } from "./phonesProducts";
import ProductCard from "@/app/components/ProductCard/ProductCard";

export default function PhonesPage() {
  return (
    <div className="page-offset">
      <div className="page-container">
        <h1 className="page-title">Phone Products</h1>

        <div className="product-grid">
          {phonesProducts.map((p) => (
            <Link
              key={p.slug}
              href={`/distribution/phones/${p.slug}`}
            >
              <ProductCard product={p} />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
