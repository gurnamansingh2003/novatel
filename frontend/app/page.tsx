export const metadata = {
  title: "Novatel | Telecom, Networking & IT Solutions",
  description:
    "Novatel provides enterprise-grade telecom, networking, power, and IT infrastructure solutions across India.",
};

import Hero from "./components/Hero/Hero";
import FeatureCards from "./components/FeatureCards/FeatureCards";
import CTA from "./components/CTA/CTA";

export default function Home() {
  return (
    <>
      <Hero />
      <FeatureCards />
      <CTA/>
    </>
  );
}
