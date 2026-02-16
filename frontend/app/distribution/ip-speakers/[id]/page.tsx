import "../../page.css";
import { notFound } from "next/navigation";
import ProductDetailPage from "@/app/components/ProductDetailPage/ProductDetailPage";

export const dynamic = "force-dynamic";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function IPSpeakerDetailPage({ params }: Props) {
  const { id } = await params;

  try {
    const res = await fetch(`http://localhost:3001/api/products/${id}`, {
      cache: 'no-store'
    });

    if (!res.ok) return notFound();

    const result = await res.json();
    const product = result.data;

    // Agar product ki category ip-speakers nahi hai toh 404 dikha sakte ho (Optional)
    if (!product) return notFound();

    return (
      <ProductDetailPage
        product={product}
        basePath="/distribution/ip-speakers"
        categoryLabel="IP Speakers"
      />
    );
  } catch (error) {
    console.error("Detail Fetch error:", error);
    return notFound();
  }
}