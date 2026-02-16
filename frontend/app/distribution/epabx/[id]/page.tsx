import { notFound } from "next/navigation";
import ProductDetailPage from "@/app/components/ProductDetailPage/ProductDetailPage";

// Force dynamic fetch so it updates when you change things in admin
export const dynamic = "force-dynamic";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function EpabxDetailPage({ params }: Props) {
  const { id } = await params;

  try {
    // API se data fetch karo, static file se nahi
    const res = await fetch(`http://localhost:3001/api/products/${id}`, {
      cache: 'no-store'
    });

    if (!res.ok) return notFound();

    const result = await res.json();
    const product = result.data;

    return (
      <ProductDetailPage
        product={product}
        basePath="/distribution/epabx"
        categoryLabel="EPABX"
      />
    );
  } catch (error) {
    console.error("Fetch error:", error);
    return notFound();
  }
}