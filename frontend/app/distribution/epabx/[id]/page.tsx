import { notFound } from "next/navigation";
import { epabxProducts } from "../epabxProducts";
import ProductDetailPage from "@/app/components/ProductDetailPage/ProductDetailPage";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function EpabxProductDetailPage({ params }: Props) {
  const { id } = await params;
  const product = epabxProducts.find((p) => p.id === id);

  if (!product) {
    notFound();
  }

  return (
    <ProductDetailPage
      product={product}
      basePath="/distribution/epabx"
      categoryLabel="Epabx"
    />
  );
}
