import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router";
import AppShell from "@/components/AppShell";
import ServiceGrid from "@/components/ServiceGrid";
import { useSiteCopy } from "@/hooks/useSiteCopy";

export default function Services() {
  const copy = useSiteCopy();

  return (
    <AppShell>
      <section className="site-section">
        <div className="site-container">
          <p className="section-kicker">{copy.services.eyebrow}</p>
          <h1 className="section-title-small">{copy.services.title}</h1>
          <p className="section-lead">{copy.services.intro}</p>
        </div>
      </section>

      <section className="site-section" style={{ paddingTop: 0 }}>
        <div className="site-container">
          <ServiceGrid />
        </div>
      </section>

      <section className="site-section">
        <div className="site-container">
          <div className="bento-card bento-full">
            <p className="section-kicker">{copy.home.ctaTitle}</p>
            <p className="service-description">{copy.home.ctaText}</p>
            <div className="actions-row">
              <Link className="btn-primary" to="/contact">
                {copy.common.contact}
                <ArrowUpRight size={17} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </AppShell>
  );
}
