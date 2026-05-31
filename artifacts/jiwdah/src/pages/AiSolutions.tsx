import { Bot, Workflow } from "lucide-react";
import AppShell from "@/components/AppShell";
import { useSiteCopy } from "@/hooks/useSiteCopy";

export default function AiSolutions() {
  const copy = useSiteCopy();

  return (
    <AppShell>
      <section className="site-section">
        <div className="site-container hero-grid">
          <article className="bento-card hero-card bento-wide">
            <p className="section-kicker">{copy.ai.eyebrow}</p>
            <h1 className="section-title-small">{copy.ai.title}</h1>
            <p className="section-lead">{copy.ai.intro}</p>
          </article>

          <aside className="bento-card hero-side">
            <span className="service-icon"><Bot size={20} /></span>
            <p className="service-description">{copy.ai.empty}</p>
          </aside>
        </div>
      </section>

      <section className="site-section" style={{ paddingTop: 0 }}>
        <div className="site-container bento-grid">
          <article className="bento-card bento-full">
            <span className="service-icon"><Workflow size={20} /></span>
            <p className="service-description">{copy.ai.empty}</p>
          </article>
        </div>
      </section>
    </AppShell>
  );
}
