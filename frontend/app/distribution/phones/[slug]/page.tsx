import "../../page.css";
import { phonesProducts } from "../phonesProducts";
import { notFound } from "next/navigation";
import ProductDetailClient from "@/app/components/ProductDetail/ProductDetailClient";

type Props = {
  params: { slug: string };
};

export default function PhoneDetail({ params }: Props) {
  const product = phonesProducts.find(
    (p) => p.slug === params.slug
  );

  if (!product) return notFound();

  return (
    <ProductDetailClient
      product={product}
      basePath="/distribution/phones"
      categoryLabel="Phones"
    />
  );
}
