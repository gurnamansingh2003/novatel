import type { Metadata } from "next";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Novatel | Telecom & IT Infrastructure Solutions",
    template: "%s | Novatel",
  },
  description:
    "Novatel provides enterprise-grade telecom, networking, power, and IT infrastructure solutions.",
  openGraph: {
    title: "Novatel Technologies",
    description:
      "Enterprise-grade telecom, networking, power, and IT infrastructure solutions.",
    url: "https://novatel.in",
    siteName: "Novatel",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Novatel Technologies",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
