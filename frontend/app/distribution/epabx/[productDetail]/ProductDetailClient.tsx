"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

interface EpabxProduct {
  slug: string;
  name: string;
  image: string;
  description: string;
  fullDescription?: string;
  features: string[];
  categories?: string[];
  specifications?: {
    label: string;
    value: string;
  }[];
  benefits?: string[];
  downloads?: {
    name: string;
    url: string;
  }[];
}

interface ProductDetailClientProps {
  product: EpabxProduct;
}

export default function ProductDetailClient({ product }: ProductDetailClientProps) {
  const [activeTab, setActiveTab] = useState("features");

  const tabs = [
    { id: "features", label: "Features", show: true },
    { id: "specifications", label: "Specifications", show: product.specifications },
    { id: "benefits", label: "Benefits", show: product.benefits },
    { id: "downloads", label: "Downloads", show: product.downloads },
  ].filter((tab) => tab.show);

  return (
    <div className="page-offset min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto px-4 py-12 max-w-7xl">
        {/* Breadcrumb */}
        <nav className="mb-8 text-sm text-gray-600">
          <Link href="/" className="hover:text-blue-600 transition">
            Home
          </Link>
          <span className="mx-2">/</span>
          <Link href="/distribution" className="hover:text-blue-600 transition">
            Distribution
          </Link>
          <span className="mx-2">/</span>
          <Link href="/distribution/epabx" className="hover:text-blue-600 transition">
            EPABX
          </Link>
          <span className="mx-2">/</span>
          <span className="text-gray-900 font-medium">{product.name}</span>
        </nav>

        {/* Product Header */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-8">
          <div className="grid md:grid-cols-2 gap-8 p-8">
            {/* Product Image */}
            <div className="relative bg-gradient-to-br from-blue-50 to-slate-100 rounded-xl p-8 flex items-center justify-center">
              <div className="relative w-full h-96">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-contain"
                  priority
                />
              </div>
              <button className="absolute top-4 right-4 bg-white p-2 rounded-full shadow-lg hover:shadow-xl transition">
                <svg
                  className="w-6 h-6 text-gray-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"
                  />
                </svg>
              </button>
            </div>

            {/* Product Info */}
            <div className="flex flex-col justify-center">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                {product.name}
              </h1>
              <p className="text-xl text-gray-600 mb-6">
                {product.fullDescription || product.description}
              </p>

              <button className="bg-gradient-to-r from-red-600 to-red-700 text-white px-8 py-4 rounded-full text-lg font-semibold hover:from-red-700 hover:to-red-800 transition shadow-lg hover:shadow-xl w-fit">
                ENQUIRE NOW
              </button>

              {/* Categories */}
              {product.categories && (
                <div className="mt-6">
                  <p className="text-gray-700 mb-2">
                    <span className="font-semibold">Categories:</span>{" "}
                    {product.categories.map((cat, idx) => (
                      <span key={idx}>
                        <Link
                          href={`/distribution?category=${cat}`}
                          className="text-blue-600 hover:underline"
                        >
                          {cat}
                        </Link>
                        {idx < (product.categories?.length ?? 0) - 1 && ", "}
                      </span>
                    ))}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Tabs Section */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Tab Navigation */}
          <div className="border-b border-gray-200">
            <nav className="flex overflow-x-auto">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-8 py-4 font-semibold whitespace-nowrap transition ${
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

          {/* Tab Content */}
          <div className="p-8">
            {/* Features Tab */}
            {activeTab === "features" && (
              <div className="bg-gradient-to-br from-blue-50 to-slate-50 rounded-xl p-8 border-2 border-blue-100">
                {product.features.map((feature, idx) => (
                  <div key={idx} className="flex items-start mb-4 last:mb-0">
                    <span className="text-2xl font-bold text-blue-600 mr-4">
                      {idx + 1})
                    </span>
                    <p className="text-gray-800 text-lg leading-relaxed pt-1">
                      {feature}
                    </p>
                  </div>
                ))}
              </div>
            )}

            {/* Specifications Tab */}
            {activeTab === "specifications" && product.specifications && (
              <div className="bg-gradient-to-br from-blue-50 to-slate-50 rounded-xl p-8 border-2 border-blue-100">
                <div className="grid md:grid-cols-2 gap-6">
                  {product.specifications.map((spec, idx) => (
                    <div
                      key={idx}
                      className="bg-white p-6 rounded-lg shadow-sm"
                    >
                      <h3 className="font-bold text-gray-900 mb-2">
                        {spec.label}
                      </h3>
                      <p className="text-gray-700">{spec.value}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Benefits Tab */}
            {activeTab === "benefits" && product.benefits && (
              <div className="bg-gradient-to-br from-blue-50 to-slate-50 rounded-xl p-8 border-2 border-blue-100">
                {product.benefits.map((benefit, idx) => (
                  <div key={idx} className="flex items-start mb-4 last:mb-0">
                    <span className="text-2xl font-bold text-blue-600 mr-4">
                      {idx + 1})
                    </span>
                    <p className="text-gray-800 text-lg leading-relaxed pt-1">
                      {benefit}
                    </p>
                  </div>
                ))}
              </div>
            )}

            {/* Downloads Tab */}
            {activeTab === "downloads" && product.downloads && (
              <div className="bg-gradient-to-br from-blue-50 to-slate-50 rounded-xl p-8 border-2 border-blue-100">
                <div className="space-y-4">
                  {product.downloads.map((download, idx) => (
                    <a
                      key={idx}
                      href={download.url}
                      className="flex items-center justify-between bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition group"
                    >
                      <span className="text-gray-800 font-medium group-hover:text-blue-600">
                        {download.name}
                      </span>
                      <svg
                        className="w-6 h-6 text-blue-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        />
                      </svg>
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}