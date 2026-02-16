export const dynamic = "force-dynamic"; // Sabse upar add karein
import "../../page.css";
import { notFound } from "next/navigation";
import ProductDetailPage from "@/app/components/ProductDetailPage/ProductDetailPage";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function PhoneDetailPage({ params }: Props) {
  const { id } = await params;

  try {
    // Replace with your actual backend URL (usually from an env variable)
    const res = await fetch(`http://localhost:3001/api/products/${id}`, {
      cache: 'no-store' // Ensures you get fresh data from the dashboard
    });

    if (!res.ok) return notFound();

    const result = await res.json();
    const product = result.data;

    return (
      <ProductDetailPage
        product={product}
        basePath="/distribution/phones"
        categoryLabel="Phones"
      />
    );
  } catch (error) {
    console.error("Fetch error:", error);
    return notFound();
  }
}