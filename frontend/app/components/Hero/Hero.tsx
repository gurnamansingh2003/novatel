"use client";

import "./Hero.css";
import Link from "next/link";
import { motion } from "framer-motion";
import React, { useState } from "react";
import QuickEnquiryModal from "../QuickEnquiryModal/QuickEnquiryModal";

type HeroProps = {
  title?: string;
  subtitle?: string;
  showButtons?: boolean;
};

export default function Hero({
  title = "Powering Secure & Scalable Digital Infrastructure",
  subtitle = "NOVATEL delivers enterprise-grade networking, security, and software solutions built for tomorrow",
  showButtons = true,
}: HeroProps) {
  const [showEnquiry, setShowEnquiry] = useState(false);

  return (
    <>
      <section className="hero-section">
        <div className="hero-overlay"></div>
        
        {/* MAIN CONTENT */}
        <div className="hero-content-wrapper">
          {/* LEFT TEXT */}
          <motion.div
            className="hero-left"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="hero-title">{title}</h1>
          </motion.div>

          {/* BOTTOM RIGHT SECTION */}
          <motion.div
            className="hero-bottom-right"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <p className="hero-subtitle">{subtitle}</p>

            {showButtons && (
              <div className="hero-buttons">
                <Link href="/distribution" className="hero-primary-btn">
                  Explore Products
                </Link>

                <button
                  className="hero-secondary-btn"
                  onClick={() => setShowEnquiry(true)}
                >
                  Enquire Now
                </button>
              </div>
            )}
          </motion.div>
        </div>
      </section>

      {/* QUICK ENQUIRY MODAL */}
      {showEnquiry && (
        <QuickEnquiryModal onClose={() => setShowEnquiry(false)} />
      )}
    </>
  );
}