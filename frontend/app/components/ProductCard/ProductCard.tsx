"use client";

import Image from "next/image";
import "./ProductCard.css";
import type { DistributionProduct } from "@/app/distribution/types";

type Props = {
  product: Pick<DistributionProduct, "id" | "name" | "image" | "description">;
};

export default function ProductCard({ product }: Props) {
  const desc = product.description ?? "";
  const truncated = desc.length > 100 ? `${desc.slice(0, 97)}…` : desc;

  return (
    <article className="product-card">
      <div className="product-card__image-wrap">
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 480px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className="product-card__image"
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
