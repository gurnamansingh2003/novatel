"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export type ProductDetail = {
  slug: string;
  name: string;
  image: string;
  description: string;
  fullDescription?: string;
  features?: string[];
  categories?: string[];
  specifications?: { label: string; value: string }[];
  benefits?: string[];
  downloads?: { name: string; url: string }[];
};

type Props = {
  product: ProductDetail;
  basePath: string; // e.g. "/distribution/epabx"
  categoryLabel: string; // e.g. "EPABX"
};

export default function ProductDetailClient({ product, basePath, categoryLabel }: Props) {
  const [activeTab, setActiveTab] = useState<"features" | "specifications" | "benefits" | "downloads">(
    "features"
  );

  const tabs = [
    { id: "features" as const, label: "Features", show: product.features?.length },
    { id: "specifications" as const, label: "Specifications", show: product.specifications?.length },
    { id: "benefits" as const, label: "Benefits", show: product.benefits?.length },
    { id: "downloads" as const, label: "Downloads", show: product.downloads?.length },
  ].filter((t) => t.show);

  const renderList = (items?: string[]) =>
    items?.length ? (
      <ul className="space-y-2 list-disc list-inside text-gray-800 leading-relaxed">
        {items.map((item, idx) => (
          <li key={idx}>{item}</li>
        ))}
      </ul>
    ) : (
      <p className="text-gray-600">No data available.</p>
    );

  return (
    <div className="page-offset min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto px-4 py-12 max-w-6xl">
        {/* Breadcrumb */}
        <nav className="mb-8 text-sm text-gray-600 flex flex-wrap gap-1 items-center">
          <Link href="/" className="hover:text-blue-600 transition">
            Home
          </Link>
          <span className="text-gray-400">/</span>
          <Link href="/distribution" className="hover:text-blue-600 transition">
            Distribution
          </Link>
          <span className="text-gray-400">/</span>
          <Link href={basePath} className="hover:text-blue-600 transition">
            {categoryLabel}
          </Link>
          <span className="text-gray-400">/</span>
          <span className="text-gray-900 font-medium">{product.name}</span>
        </nav>

        {/* Header */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-10">
          <div className="grid md:grid-cols-2 gap-8 p-8">
            <div className="relative bg-gradient-to-br from-blue-50 to-slate-100 rounded-xl p-6 flex items-center justify-center">
              <div className="relative w-full h-80">
                <Image src={product.image} alt={product.name} fill className="object-contain" priority />
              </div>
            </div>

            <div className="flex flex-col justify-center gap-4">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900">{product.name}</h1>
              <p className="text-lg text-gray-700 leading-relaxed">
                {product.fullDescription || product.description}
              </p>

              <div className="flex flex-wrap gap-3">
                <button className="bg-gradient-to-r from-red-600 to-red-700 text-white px-6 py-3 rounded-full text-base font-semibold hover:from-red-700 hover:to-red-800 transition shadow-md hover:shadow-lg">
                  ENQUIRE NOW
                </button>
              </div>

              {product.categories?.length ? (
                <p className="text-gray-700">
                  <span className="font-semibold">Categories:</span>{" "}
                  {product.categories.map((cat, idx) => (
                    <span key={idx} className="text-blue-600 hover:underline">
                      {cat}
                      {idx < product.categories!.length - 1 ? ", " : ""}
                    </span>
                  ))}
                </p>
              ) : null}
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="border-b border-gray-200">
            <nav className="flex overflow-x-auto">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-6 py-4 font-semibold whitespace-nowrap transition ${
                    activeTab === tab.id
                      ? "text-blue-600 border-b-2 border-blue-600"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          <div className="p-8 space-y-6">
            {activeTab === "features" && (
              <div className="bg-gradient-to-br from-blue-50 to-slate-50 rounded-xl p-6 border border-blue-100">
                {renderList(product.features)}
              </div>
            )}

            {activeTab === "specifications" && (
              <div className="bg-gradient-to-br from-blue-50 to-slate-50 rounded-xl p-6 border border-blue-100">
                {product.specifications?.length ? (
                  <div className="grid md:grid-cols-2 gap-4">
                    {product.specifications.map((spec, idx) => (
                      <div key={idx} className="bg-white p-4 rounded-lg shadow-sm">
                        <h3 className="font-semibold text-gray-900 mb-1">{spec.label}</h3>
                        <p className="text-gray-700">{spec.value}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-600">No specifications available.</p>
                )}
              </div>
            )}

            {activeTab === "benefits" && (
              <div className="bg-gradient-to-br from-blue-50 to-slate-50 rounded-xl p-6 border border-blue-100">
                {renderList(product.benefits)}
              </div>
            )}

            {activeTab === "downloads" && (
              <div className="bg-gradient-to-br from-blue-50 to-slate-50 rounded-xl p-6 border border-blue-100">
                {product.downloads?.length ? (
                  <div className="space-y-3">
                    {product.downloads.map((dl, idx) => (
                      <a
                        key={idx}
                        href={dl.url}
                        className="flex items-center justify-between bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition"
                      >
                        <span className="text-gray-800 font-medium">{dl.name}</span>
                        <span className="text-blue-600 text-sm font-semibold">Download</span>
                      </a>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-600">No downloads available.</p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

