import Link from "next/link";
import ProductCard from "@/app/components/ProductCard/ProductCard";
import "../page.css";

export const dynamic = "force-dynamic";

// 1. Interface define karo (Matching your MongoDB)
interface Product {
  _id: string;
  name: string;
  images: string[];
  description: string;
  category: string;
  isActive: boolean;
}

export default async function IPSpeakersPage() {
  let products: Product[] = []; // 2. Yahan 'Product[]' type set karo
  
  try {
    const res = await fetch(`http://localhost:3001/api/products?t=${Date.now()}`, {
      cache: 'no-store'
    });
    const result = await res.json();
    
    if (result.success) {
      // 3. Filter karte waqt type safety ensure karo
      products = result.data.filter((p: Product) => 
        p.category.toLowerCase() === "ip speakers" && p.isActive !== false
      );
    }
  } catch (error) {
    console.error("Fetch error:", error);
  }

  return (
    <div className="page-offset">
      <div className="page-container">
        <h1 className="page-title">IP PA Speakers</h1>
        <div className="product-grid">
          {products.length > 0 ? (
            products.map((product) => (
              <Link
                key={product._id}
                href={`/distribution/ip-speakers/${product._id}`}
              >
                {/* 4. Ab TypeScript ko pata hai ki 'product' sahi hai */}
                <ProductCard product={product} />
              </Link>
            ))
          ) : (
            <p style={{ textAlign: 'center', padding: '40px' }}>No speakers found.</p>
          )}
        </div>
      </div>
    </div>
  );
}