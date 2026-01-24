export const metadata = {
  title: "Installation Services | Novatel",
  description:
    "Professional installation and commissioning services for telecom, networking, and power systems.",
};

//import Hero from "@/app/components/Hero/Hero";
import ServiceDetail from "@/app/components/ServiceDetail/ServiceDetail";

export default function InstallationPage() {
  return (
    <div className="page-offset">
      { /*<Hero 
 title="Installation & Commissioning"
 subtitle="Precision installation with zero downtime."
showButtons={false}
/>*/}

      <ServiceDetail
        title="Professional Installation Services"
        description="We provide end-to-end installation and commissioning services for telecom, power, and networking systems."
        points={[
          "On-site deployment & commissioning",
          "System testing & validation",
          "Vendor-certified engineers",
          "Minimal downtime execution",
        ]}
        image="/images/installation.jpg"
        reverse
      />
    </div>
  );
}
