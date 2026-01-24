import "./ProductCard.css";
import { IPSpeaker } from "@/app/distribution/ip-speakers/ip-speakers";

type Props = {
  product: IPSpeaker;
};

export default function ProductCard({ product }: Props) {
  return (
    <div className="product-card">
      <img src={product.image} alt={product.name} />
      <p>{product.name}</p>
    </div>
  );
}
