import "../../page.css";
import { notFound } from "next/navigation";
import { epabxProducts } from "../epabxProducts";
import ProductDetailClient from "@/app/components/ProductDetail/ProductDetailClient";

interface ProductDetailPageProps {
  params: Promise<{
    productDetail: string;
  }>;
}

export default async function ProductDetailPage({ params }: ProductDetailPageProps) {
  const resolvedParams = await params;
  const product = epabxProducts.find((p) => p.slug === resolvedParams.productDetail);

  if (!product) {
    notFound();
  }

  return <ProductDetailClient product={product} basePath="/distribution/epabx" categoryLabel="EPABX" />;
}

// Generate static params for all products
export async function generateStaticParams() {
  return epabxProducts.map((product) => ({
    productDetail: product.slug,
  }));
}