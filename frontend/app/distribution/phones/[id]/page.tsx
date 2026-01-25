import "../../page.css";
import { phonesProducts } from "../phonesProducts";
import { notFound } from "next/navigation";
import ProductDetailPage from "@/app/components/ProductDetailPage/ProductDetailPage";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function PhoneDetailPage({ params }: Props) {
  const { id } = await params;
  const product = phonesProducts.find((p) => p.id === id);

  if (!product) return notFound();

  return (
    <ProductDetailPage
      product={product}
      basePath="/distribution/phones"
      categoryLabel="Phones"
    />
  );
}
