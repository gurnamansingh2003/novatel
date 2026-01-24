export const metadata = {
  title: "Consulting Services | Novatel",
  description:
    "Expert consulting services to design, optimize, and scale secure telecom and IT infrastructure.",
};

import Hero from "@/app/components/Hero/Hero";
import ServiceDetail from "@/app/components/ServiceDetail/ServiceDetail";

export default function ConsultingPage() {
  return (
    <div className="page-offset">
      <ServiceDetail
        title="Expert Technology Consulting"
        description="Our consulting services help organizations plan and deploy secure, scalable, and future-ready IT infrastructure."
        points={[
          "Telecom & networking architecture design",
          "Infrastructure assessment & optimization",
          "Security & compliance consulting",
          "Technology roadmap planning",
        ]}
        image="/images/consulting.jpg"
      />
    </div>
  );
}
