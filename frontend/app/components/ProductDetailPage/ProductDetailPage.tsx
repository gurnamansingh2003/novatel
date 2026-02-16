"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import QuickEnquiryModal from "@/app/components/QuickEnquiryModal/QuickEnquiryModal";
import styles from "./ProductDetailPage.module.css";

// Interface strictly matching your MongoDB screenshot
interface Product {
  _id: string;          // Maps to ObjectId in MongoDB
  name: string;
  description: string;
  images: string[];     // Array of image strings
  category: string;
  specifications?: { label: string; value: string }[]; // Array of spec objects
  isActive: boolean;
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
}

interface ProductDetailPageProps {
  product: Product;
  basePath: string;
  categoryLabel: string;
}

export default function ProductDetailPage({
  product,
  basePath,
  categoryLabel,
}: ProductDetailPageProps) {
  const [activeTab, setActiveTab] = useState("specifications"); // Defaulting to specs as they exist in your DB
  const [showEnquiry, setShowEnquiry] = useState(false);

  // Safely grab the first image from the 'images' array
  const displayImage = product.images && product.images.length > 0 
    ? product.images[0] 
    : "/placeholder.png";

  // Define tabs based on your MongoDB fields
  const tabs = [
    { id: "specifications", label: "Specifications", show: !!product.specifications?.length },
    // If you plan to add 'features' or 'benefits' to your DB later, they can stay here
    { id: "description", label: "Overview", show: !!product.description },
  ].filter((tab) => tab.show);

  return (
    <div className={`${styles.pageWrapper} page-offset`}>
      <div className={styles.container}>
        <nav className={styles.breadcrumb} aria-label="Breadcrumb">
          <Link href="/" className={styles.breadcrumbLink}>Home</Link>
          <span className={styles.breadcrumbSep} aria-hidden>/</span>
          <Link href="/distribution" className={styles.breadcrumbLink}>Distribution</Link>
          <span className={styles.breadcrumbSep} aria-hidden>/</span>
          <Link href={basePath} className={styles.breadcrumbLink}>{categoryLabel}</Link>
          <span className={styles.breadcrumbSep} aria-hidden>/</span>
          <span className={styles.breadcrumbCurrent}>{product.name}</span>
        </nav>

        <div className={styles.heroCard}>
          <div className={styles.heroGrid}>
            <div className={styles.imageSection}>
              <div className={styles.imageInner}>
                <Image
                  src={displayImage}
                  alt={product.name}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 560px"
                  className={styles.productImage}
                  priority
                />
              </div>
            </div>
            <div className={styles.detailsSection}>
              <h1 className={styles.productTitle}>{product.name}</h1>
              <p className={styles.productDescription}>
                {product.description}
              </p>
              <button
                type="button"
                className={styles.ctaButton}
                onClick={() => setShowEnquiry(true)}
              >
                Enquire now
              </button>
              
              <div className={styles.metaInfo}>
                <span className={styles.metaLabel}>Category</span>
                <div className={styles.metaTags}>
                  <span className={styles.metaTag}>
                    {product.category}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.tabsContainer}>
          <div className={styles.tabHeader} role="tablist">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={activeTab === tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`${styles.tabToggle} ${activeTab === tab.id ? styles.activeTab : ""}`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className={styles.tabContent} role="tabpanel">
            {activeTab === "specifications" && product.specifications && (
              <div className={styles.specGrid}>
                {product.specifications.map((spec, i) => (
                  <div key={i} className={styles.specItem}>
                    <dt className={styles.specLabel}>{spec.label}</dt>
                    <dd className={styles.specValue}>{spec.value}</dd>
                  </div>
                ))}
              </div>
            )}

            {activeTab === "description" && (
              <div className={styles.descriptionTabContent}>
                <p className={styles.featureText}>{product.description}</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {showEnquiry && <QuickEnquiryModal onClose={() => setShowEnquiry(false)} />}
    </div>
  );
}