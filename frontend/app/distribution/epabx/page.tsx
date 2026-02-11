"use client"; // Kyunki hum data fetch karenge client-side par

import { useEffect, useState } from "react";
import "../page.css";
import Link from "next/link";
import ProductCard from "@/app/components/ProductCard/ProductCard";

export default function EpabxPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEpabxProducts = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api"}/products`);
        const data = await res.json();
        
        if (data.success) {
          // DATABASE SE SIRF 'epabx' WALE PRODUCTS FILTER KARO (Case-insensitive)
          const epabxOnly = data.data.filter(
            (p: any) => p.category.toLowerCase() === "epabx"
          );
          setProducts(epabxOnly);
        }
      } catch (err) {
        console.error("Error fetching products:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchEpabxProducts();
  }, []);

  if (loading) return <div className="loading">Loading Products...</div>;

  return (
    <div className="page-offset">
      <div className="page-container">
        <h1 className="page-title">EPABX Products</h1>
        <div className="product-grid">
          {products.length > 0 ? (
            products.map((p) => (
              <Link key={p._id} href={`/distribution/epabx/${p._id}`}>
                <ProductCard product={p} />
              </Link>
            ))
          ) : (
            <p>No products found in this category.</p>
          )}
        </div>
      </div>
    </div>
  );
}