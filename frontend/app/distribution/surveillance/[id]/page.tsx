import { notFound } from "next/navigation";
import ProductDetailPage from "@/app/components/ProductDetailPage/ProductDetailPage";
import { surveillanceProducts } from "../surveillanceProducts";
// Import your DB client (Prisma, Mongoose, etc.)
// import { db } from "@/lib/db"; 

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export default async function ProductPage({ params }: Props) {
  const { id } = await params;

  // Example DB Fetch (replace with your actual DB call)
  // const product = await db.product.findUnique({ where: { id } });
  
  // For now, simulating a DB fetch from your array using ID:
  const product = surveillanceProducts.find((p) => p.id === id);

  if (!product) {
    notFound();
  }

  return (
    <ProductDetailPage 
      product={product} 
      basePath="/distribution/surveillance" 
      categoryLabel="Surveillance" 
    />
  );
}