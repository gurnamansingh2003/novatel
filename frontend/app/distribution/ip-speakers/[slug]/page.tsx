import "../../page.css";
import { notFound } from "next/navigation";
import { ipSpeakers } from "../ip-speakers";
import ProductDetailClient from "@/app/components/ProductDetail/ProductDetailClient";

export default function IPSpeakerDetail({
  params,
}: {
  params: { slug: string };
}) {
  const product = ipSpeakers.find(
    (item) => item.slug === params.slug
  );

  if (!product) return notFound();

  return (
    <ProductDetailClient
      product={product}
      basePath="/distribution/ip-speakers"
      categoryLabel="IP Speakers"
    />
  );
}
