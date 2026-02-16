"use client";

import { useEffect, useState } from "react";
import "../page.css";
import Link from "next/link";
import ProductCard from "@/app/components/ProductCard/ProductCard";

export default function SurveillancePage() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api";

  useEffect(() => {
    const fetchSurveillance = async () => {
      try {
        const res = await fetch(`${API_BASE}/products`);
        const data = await res.json();

        if (data.success) {
          // Filter products for surveillance category
          const filtered = data.data.filter(
            (p: any) => p.category.toLowerCase() === "surveillance" && p.isActive !== false
          );
          setProducts(filtered);
        }
      } catch (err) {
        console.error("Error fetching surveillance products:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchSurveillance();
  }, [API_BASE]);

  if (loading) return <div className="page-offset"><div className="loading">Loading Surveillance...</div></div>;

  return (
    <div className="page-offset">
      <div className="page-container">
        <h1 className="page-title">Surveillance Products</h1>
        <div className="product-grid">
          {products.length > 0 ? (
            products.map((p) => (
              <Link key={p._id} href={`/distribution/surveillance/${p._id}`}>
                <ProductCard product={p} />
              </Link>
            ))
          ) : (
            <p className="no-products">No surveillance products found.</p>
          )}
        </div>
      </div>
    </div>
  );
}