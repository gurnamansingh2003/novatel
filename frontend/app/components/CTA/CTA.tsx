"use client";

import "./CTA.css";
import { useState } from "react";
import QuickEnquiryModal from "../QuickEnquiryModal/QuickEnquiryModal";

export default function CTA() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <section className="cta">
        <h2>Do you want our quality services for your business?</h2>

        <button className="cta-btn" onClick={() => setOpen(true)}>
          CONTACT US →
        </button>
      </section>

      {open && <QuickEnquiryModal onClose={() => setOpen(false)} />}
    </>
  );
}
