import "../../page.css";
import { notFound } from "next/navigation";
import { ipSpeakers } from "../ip-speakers";
import ProductDetailPage from "@/app/components/ProductDetailPage/ProductDetailPage";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function IPSpeakerDetailPage({ params }: Props) {
  const { id } = await params;
  const product = ipSpeakers.find((p) => p.id === id);

  if (!product) return notFound();

  return (
    <ProductDetailPage
      product={product}
      basePath="/distribution/ip-speakers"
      categoryLabel="IP Speakers"
    />
  );
}
