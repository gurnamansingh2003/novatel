import { notFound } from "next/navigation";
import ProductDetailPage from "@/app/components/ProductDetailPage/ProductDetailPage";

export const dynamic = "force-dynamic";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function SurveillanceDetailPage({ params }: Props) {
  const { id } = await params;

  try {
    const res = await fetch(`http://localhost:3001/api/products/${id}`, {
      cache: 'no-store'
    });

    if (!res.ok) return notFound();

    const result = await res.json();
    const product = result.data;

    return (
      <ProductDetailPage
        product={product}
        basePath="/distribution/surveillance"
        categoryLabel="Surveillance"
      />
    );
  } catch (error) {
    console.error("Fetch error:", error);
    return notFound();
  }
}