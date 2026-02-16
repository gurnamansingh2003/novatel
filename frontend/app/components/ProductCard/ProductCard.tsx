"use client";

import Image from "next/image";
import "./ProductCard.css";

// Interface strictly matching your MongoDB
interface ProductProps {
  product: {
    _id: string;      
    name: string;
    images: string[]; // MongoDB array
    description: string;
  };
}

export default function ProductCard({ product }: ProductProps) {
  const desc = product.description ?? "";
  const truncated = desc.length > 100 ? `${desc.slice(0, 97)}…` : desc;

  // Safeguard for image
  const displayImage = product.images && product.images.length > 0 
    ? product.images[0] 
    : "/placeholder.png";

  return (
    <article className="product-card">
      <div className="product-card__image-wrap">
        <Image
          src={displayImage}
          alt={product.name}
          fill
          sizes="(max-width: 480px) 100vw, (max-width: 768px) 50vw, 300px"
          className="product-card__image"
          unoptimized={displayImage.includes('cloudinary')} // Better for external URLs
        />
      </div>
      <div className="product-card__body">
        <h3 className="product-card__title">{product.name}</h3>
        {truncated && (
          <p className="product-card__desc">{truncated}</p>
        )}
        <span className="product-card__cta">View details →</span>
      </div>
    </article>
  );
}