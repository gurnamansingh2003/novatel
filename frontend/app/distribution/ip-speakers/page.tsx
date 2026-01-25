import "../page.css";
import Link from "next/link";
import { ipSpeakers } from "./ip-speakers";
import ProductCard from "@/app/components/ProductCard/ProductCard";

export default function IPSpeakersPage() {
  return (
    <div className="page-offset">
      <div className="page-container">
        <h1 className="page-title">IP PA Speakers</h1>
        <div className="product-grid">
          {ipSpeakers.map((product) => (
            <Link
              key={product.id}
              href={`/distribution/ip-speakers/${product.id}`}
            >
              <ProductCard product={product} />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}