export interface DistributionProduct {
  id: string;
  slug?: string;
  name: string;
  image: string;
  description: string;
  fullDescription?: string;
  features: string[];
  categories?: string[];
  specifications?: { label: string; value: string }[];
  benefits?: string[];
  downloads?: { name: string; url: string }[];
}
