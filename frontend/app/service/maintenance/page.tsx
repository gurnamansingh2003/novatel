export const metadata = {
  title: "Maintenance Services | Novatel",
  description:
    "Reliable AMC and maintenance services ensuring uninterrupted enterprise operations.",
};

import Hero from "@/app/components/Hero/Hero";
import ServiceDetail from "@/app/components/ServiceDetail/ServiceDetail";

export default function MaintenancePage() {
  return (
    <div className="page-offset">
      <Hero
        title="Maintenance Services"
        subtitle="Reliable support for uninterrupted operations."
        showButtons={false}
      />

      <ServiceDetail
        title="Proactive Maintenance & Support"
        description="Our maintenance services ensure system reliability, performance, and longevity."
        points={[
          "Preventive & corrective maintenance",
          "24/7 technical support",
          "AMC & SLA-based services",
          "Rapid fault resolution",
        ]}
        image="/images/maintenance.jpg"
      />
    </div>
  );
}
