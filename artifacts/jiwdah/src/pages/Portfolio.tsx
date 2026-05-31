import { BriefcaseBusiness, FolderKanban } from "lucide-react";
import AppShell from "@/components/AppShell";
import { useSiteCopy } from "@/hooks/useSiteCopy";

export default function Portfolio() {
  const copy = useSiteCopy();

  return (
    <AppShell>
      <section className="site-section">
        <div className="site-container">
          <p className="section-kicker">{copy.portfolio.eyebrow}</p>
          <h1 className="section-title-small">{copy.portfolio.title}</h1>
          <p className="section-lead">{copy.portfolio.intro}</p>
        </div>
      </section>

      <section className="site-section" style={{ paddingTop: 0 }}>
        <div className="site-container bento-grid">
          <article className="bento-card bento-wide">
            <span className="service-icon"><BriefcaseBusiness size={20} /></span>
            <h2 className="service-title">{copy.portfolio.title}</h2>
            <p className="service-description">{copy.portfolio.intro}</p>
          </article>

          <article className="bento-card">
            <span className="service-icon"><FolderKanban size={20} /></span>
            <p className="service-description">{copy.portfolio.empty}</p>
          </article>

          <div className="empty-state bento-full" aria-live="polite">
            {copy.portfolio.empty}
          </div>
        </div>
      </section>
    </AppShell>
  );
}
