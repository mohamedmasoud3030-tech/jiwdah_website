import { ArrowUpRight, BriefcaseBusiness, LayoutGrid, MessageCircle } from "lucide-react";
import { Link } from "react-router";
import AppShell from "@/components/AppShell";
import ServiceGrid from "@/components/ServiceGrid";
import { useSiteCopy } from "@/hooks/useSiteCopy";

export default function Home() {
  const copy = useSiteCopy();

  return (
    <AppShell>
      <section className="site-section">
        <div className="site-container hero-grid">
          <div className="bento-card hero-card bento-wide">
            <p className="section-kicker">{copy.home.eyebrow}</p>
            <h1 className="section-title">
              {copy.home.title} <span style={{ color: "var(--platform-accent)" }}>{copy.home.titleAccent}</span>
            </h1>
            <p className="section-lead">{copy.home.intro}</p>
            <div className="actions-row">
              <Link className="btn-primary" to="/services">
                {copy.common.explore}
                <ArrowUpRight size={17} />
              </Link>
              <Link className="btn-secondary" to="/portfolio">{copy.common.viewWork}</Link>
            </div>
          </div>

          <aside className="bento-card hero-side">
            <span className="service-icon"><LayoutGrid size={20} /></span>
            <p className="section-kicker">{copy.home.capabilities}</p>
            <p className="service-description">{copy.home.capabilitiesIntro}</p>
            <Link className="btn-secondary" to="/contact">
              <MessageCircle size={17} />
              {copy.common.contact}
            </Link>
          </aside>
        </div>
      </section>

      <section className="site-section">
        <div className="site-container">
          <p className="section-kicker">{copy.home.capabilities}</p>
          <h2 className="section-title-small">{copy.home.capabilitiesIntro}</h2>
          <div style={{ marginTop: 28 }}>
            <ServiceGrid limit={4} />
          </div>
        </div>
      </section>

      <section className="site-section">
        <div className="site-container bento-grid">
          <div className="bento-card bento-wide">
            <span className="service-icon"><BriefcaseBusiness size={20} /></span>
            <p className="section-kicker" style={{ marginTop: 18 }}>{copy.home.work}</p>
            <h2 className="service-title">{copy.home.workIntro}</h2>
            <div className="actions-row">
              <Link className="btn-secondary" to="/portfolio">{copy.common.viewWork}</Link>
            </div>
          </div>
          <div className="bento-card">
            <p className="section-kicker">{copy.home.ctaTitle}</p>
            <p className="service-description">{copy.home.ctaText}</p>
            <div className="actions-row">
              <Link className="btn-primary" to="/contact">{copy.common.contact}</Link>
            </div>
          </div>
        </div>
      </section>
    </AppShell>
  );
}
