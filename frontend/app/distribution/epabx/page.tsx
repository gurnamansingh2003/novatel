import "../page.css";
import Link from "next/link";
import { epabxProducts } from "./epabxProducts";
import ProductCard from "@/app/components/ProductCard/ProductCard";

export default function EpabxPage() {
  return (
    <div className="page-offset">
      <div className="page-container">
        <h1 className="page-title">EPABX Products</h1>
        <div className="product-grid">
          {epabxProducts.map((p) => (
            <Link key={p.id} href={`/distribution/epabx/${p.id}`}>
              <ProductCard product={p} />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
