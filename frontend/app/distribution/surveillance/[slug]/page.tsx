import "../../page.css";
import { surveillanceProducts } from "../surveillanceProducts";
import { notFound } from "next/navigation";
import ProductDetailClient from "@/app/components/ProductDetail/ProductDetailClient";

type Props = {
  params: {
    slug: string;
  };
};

export default function SurveillanceDetailPage({ params }: Props) {
  const product = surveillanceProducts.find(
    (item) => item.slug === params.slug
  );

  if (!product) return notFound();

  return (
    <ProductDetailClient
      product={product}
      basePath="/distribution/surveillance"
      categoryLabel="Surveillance"
    />
  );
}
