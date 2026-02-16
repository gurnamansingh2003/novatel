"use client";
import { useEffect, useState } from "react";
import "../page.css";
import Link from "next/link";
import ProductCard from "@/app/components/ProductCard/ProductCard";

export default function PhonesPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api";

  useEffect(() => {
    const fetchPhones = async () => {
      try {
        const res = await fetch(`${API_BASE}/products`);
        const data = await res.json();
        if (data.success) {
          // DATABASE SE SIRF 'phones' FILTER KARO
          const filtered = data.data.filter(
            (p: any) => p.category.toLowerCase() === "phones" && p.isActive !== false
          );
          setProducts(filtered);
        }
      } catch (err) { console.error(err); } finally { setLoading(false); }
    };
    fetchPhones();
  }, [API_BASE]);

  if (loading) return <div className="page-offset">Loading...</div>;

  return (
    <div className="page-offset">
      <div className="page-container">
        <h1 className="page-title">Phone Products</h1>
        <div className="product-grid">
          {products.map((p) => (
            <Link key={p._id} href={`/distribution/phones/${p._id}`}>
              <ProductCard product={p} />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}