import { CheckCircle2, Compass, Layers3 } from "lucide-react";
import AppShell from "@/components/AppShell";
import { useSiteCopy } from "@/hooks/useSiteCopy";

export default function About() {
  const copy = useSiteCopy();

  return (
    <AppShell>
      <section className="site-section">
        <div className="site-container hero-grid">
          <article className="bento-card hero-card bento-wide">
            <p className="section-kicker">{copy.about.eyebrow}</p>
            <h1 className="section-title-small">{copy.about.title}</h1>
            <p className="section-lead">{copy.about.intro}</p>
          </article>

          <aside className="bento-card hero-side">
            <span className="service-icon"><Compass size={20} /></span>
            <p className="section-kicker">{copy.about.approachTitle}</p>
            <p className="service-description">{copy.about.intro}</p>
          </aside>
        </div>
      </section>

      <section className="site-section" style={{ paddingTop: 0 }}>
        <div className="site-container bento-grid">
          {copy.about.approach.map((item, index) => (
            <article key={item} className={`bento-card ${index === 0 ? "bento-wide" : ""}`}>
              <span className="service-icon">{index === 0 ? <Layers3 size={20} /> : <CheckCircle2 size={20} />}</span>
              <h2 className="service-title">{item}</h2>
            </article>
          ))}
        </div>
      </section>
    </AppShell>
  );
}
