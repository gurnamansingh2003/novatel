"use client";

import "./Navbar.css";
import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import QuickEnquiryModal from "../QuickEnquiryModal/QuickEnquiryModal";

export default function Navbar() {
  const [showDistribution, setShowDistribution] = useState(false);
  const [showSolutions, setShowSolutions] = useState(false);
  const [showEnquiry, setShowEnquiry] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showAdmin, setShowAdmin] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";

  // Handle scroll for navbar styling
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle Command+K or Ctrl+K to toggle admin link
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      // Check for Cmd+K (Mac) or Ctrl+K (Windows/Linux)
      if ((event.metaKey || event.ctrlKey) && event.key === 'k') {
        event.preventDefault();
        setShowAdmin(prev => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (mobileMenuOpen && !target.closest('.navbar') && !target.closest('.nav-menu')) {
        setMobileMenuOpen(false);
      }
    };

    if (mobileMenuOpen) {
      document.addEventListener('click', handleClickOutside);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.removeEventListener('click', handleClickOutside);
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
    setShowDistribution(false);
    setShowSolutions(false);
  };

  return (
    <>
      <nav className={`navbar ${isHome ? "home" : "light"} ${scrolled ? "scrolled" : ""}`}>
        <div className="navbar-container">
          {/* LOGO */}
          <Link href="/" className="nav-logo" onClick={closeMobileMenu}>NOVATEL</Link>

          {/* MOBILE MENU TOGGLE */}
          <button 
            className="mobile-menu-toggle" 
            onClick={toggleMobileMenu}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? '✕' : '☰'}
          </button>

          {/* MENU */}
          <div className={`nav-menu ${mobileMenuOpen ? 'active' : ''}`}>
            <Link href="/about" className="nav-link" onClick={closeMobileMenu}>About</Link>

            {/* DISTRIBUTION */}
            <div
              className="dropdown-wrapper"
              onMouseEnter={() => !mobileMenuOpen && setShowDistribution(true)}
              onMouseLeave={() => !mobileMenuOpen && setShowDistribution(false)}
            >
              {/* CLICK → LANDING PAGE */}
              <div className="nav-link dropdown-trigger" onClick={(e) => {
                if (window.innerWidth <= 768) {
                  e.preventDefault();
                  setShowDistribution(!showDistribution);
                }
              }}>
                <Link href="/distribution" onClick={(e) => {
                  if (window.innerWidth <= 768) {
                    e.preventDefault();
                  } else {
                    closeMobileMenu();
                  }
                }}>
                  Distribution
                </Link>
                <span className="dropdown-arrow">▾</span>
              </div>

              {/* HOVER → DROPDOWN */}
              {showDistribution && (
                <div className="dropdown-menu">
                  <Link href="/distribution/epabx" className="dropdown-link" onClick={closeMobileMenu}>EPABX</Link>
                  <Link href="/distribution/phones" className="dropdown-link" onClick={closeMobileMenu}>Phones</Link>
                  <Link href="/distribution/surveillance" className="dropdown-link" onClick={closeMobileMenu}>Surveillance</Link>
                  <Link href="/distribution/ip-speakers" className="dropdown-link" onClick={closeMobileMenu}>IP Speakers</Link>
                </div>
              )}
            </div>

            <Link href="/service" className="nav-link" onClick={closeMobileMenu}>Service</Link>

            {/* SOLUTIONS */}
            <div
              className="dropdown-wrapper"
              onMouseEnter={() => !mobileMenuOpen && setShowSolutions(true)}
              onMouseLeave={() => !mobileMenuOpen && setShowSolutions(false)}
            >
              <div className="nav-link dropdown-trigger" onClick={(e) => {
                if (window.innerWidth <= 768) {
                  e.preventDefault();
                  setShowSolutions(!showSolutions);
                }
              }}>
                <Link href="/solutions" onClick={(e) => {
                  if (window.innerWidth <= 768) {
                    e.preventDefault();
                  } else {
                    closeMobileMenu();
                  }
                }}>
                  Solutions
                </Link>
                <span className="dropdown-arrow">▾</span>
              </div>

              {showSolutions && (
                <div className="dropdown-menu">
                  <Link href="/solutions/enterprise-networking" className="dropdown-link" onClick={closeMobileMenu}>
                    Enterprise Networking
                  </Link>
                  <Link href="/solutions/audio-visual-system-integration" className="dropdown-link" onClick={closeMobileMenu}>
                    Audio-Visual Integration
                  </Link>
                </div>
              )}
            </div>

            {/* QUICK ENQUIRY - HIGHLIGHTED BUTTON */}
            <button 
              className="quick-enquiry-btn" 
              onClick={() => {
                setShowEnquiry(true);
                closeMobileMenu();
              }}
            >
              Quick Enquiry
            </button>

            {/* ADMIN - Only shows when Command+K is pressed */}
            {showAdmin && (
              <Link href="/admin" className="nav-link admin-link" onClick={closeMobileMenu}>
                Admin
              </Link>
            )}
          </div>
        </div>
      </nav>

      {showEnquiry && <QuickEnquiryModal onClose={() => setShowEnquiry(false)} />}
    </>
  );
}