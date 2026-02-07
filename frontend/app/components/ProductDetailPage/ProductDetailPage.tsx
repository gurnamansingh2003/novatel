"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import QuickEnquiryModal from "@/app/components/QuickEnquiryModal/QuickEnquiryModal";
import styles from "./ProductDetailPage.module.css";

interface Product {
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
  const [activeTab, setActiveTab] = useState("features");
  const [showEnquiry, setShowEnquiry] = useState(false);

  const tabs = [
    { id: "features", label: "Features", show: true },
    { id: "specifications", label: "Specifications", show: !!product.specifications?.length },
    { id: "benefits", label: "Benefits", show: !!product.benefits?.length },
    { id: "downloads", label: "Downloads", show: !!product.downloads?.length },
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
                  src={product.image}
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
                {product.fullDescription || product.description}
              </p>
              <button
                type="button"
                className={styles.ctaButton}
                onClick={() => setShowEnquiry(true)}
              >
                Enquire now
              </button>
              {product.categories && product.categories.length > 0 && (
                <div className={styles.metaInfo}>
                  <span className={styles.metaLabel}>Categories</span>
                  <div className={styles.metaTags}>
                    {product.categories.map((cat) => (
                      <span key={cat} className={styles.metaTag}>
                        {cat}
                      </span>
                    ))}
                  </div>
                </div>
              )}
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
            {activeTab === "features" && (
              <ul className={styles.featureList}>
                {product.features.map((feature, i) => (
                  <li key={i} className={styles.featureItem}>
                    <span className={styles.itemNumber}>{i + 1}</span>
                    <span className={styles.featureText}>{feature}</span>
                  </li>
                ))}
              </ul>
            )}

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

            {activeTab === "benefits" && product.benefits && (
              <ul className={styles.benefitList}>
                {product.benefits.map((benefit, i) => (
                  <li key={i} className={styles.benefitItem}>
                    <span className={styles.benefitBullet} aria-hidden />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            )}

            {activeTab === "downloads" && product.downloads && product.downloads.length > 0 && (
              <ul className={styles.downloadList}>
                {product.downloads.map((d, i) => (
                  <li key={i} className={styles.downloadItem}>
                    <a
                      href={d.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.downloadLink}
                    >
                      <span className={styles.downloadIcon} aria-hidden>↓</span>
                      {d.name}
                    </a>
                  </li>
                ))}
              </ul>
            )}

            {activeTab === "downloads" && (!product.downloads || product.downloads.length === 0) && (
              <p className={styles.downloadEmpty}>No downloads available for this product.</p>
            )}
          </div>
        </div>
      </div>

      {showEnquiry && <QuickEnquiryModal onClose={() => setShowEnquiry(false)} />}
    </div>
  );
}
