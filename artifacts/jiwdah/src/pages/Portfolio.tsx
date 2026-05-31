import { ArrowUpRight, BriefcaseBusiness, FolderKanban, Github } from "lucide-react";
import AppShell from "@/components/AppShell";
import { useSiteCopy } from "@/hooks/useSiteCopy";
import { usePreferences } from "@/providers/preferences";
import { trpc } from "@/providers/trpc";

const PORTFOLIO_COPY = {
  ar: {
    loading: "جارٍ تحميل المشاريع...",
    failed: "تعذر تحميل المشاريع حاليًا.",
    viewProject: "عرض المشروع",
    viewRepository: "عرض المستودع",
  },
  en: {
    loading: "Loading projects...",
    failed: "Projects could not be loaded right now.",
    viewProject: "View project",
    viewRepository: "View repository",
  },
} as const;

export default function Portfolio() {
  const copy = useSiteCopy();
  const { locale } = usePreferences();
  const text = PORTFOLIO_COPY[locale];
  const projectsQuery = trpc.projects.listPublished.useQuery();

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
            <p className="service-description">
              {projectsQuery.data?.length ? `${projectsQuery.data.length}` : copy.portfolio.empty}
            </p>
          </article>

          {projectsQuery.isLoading ? (
            <div className="empty-state bento-full" aria-live="polite">{text.loading}</div>
          ) : projectsQuery.error ? (
            <div className="empty-state bento-full" role="alert">{text.failed}</div>
          ) : projectsQuery.data?.length ? (
            projectsQuery.data.map((project) => (
              <article key={project.id} className="bento-card">
                {project.imageUrl && (
                  <img
                    src={project.imageUrl}
                    alt=""
                    loading="lazy"
                    style={{ width: "100%", aspectRatio: "16 / 10", borderRadius: 12, objectFit: "cover" }}
                  />
                )}
                <h2 className="service-title">{project.title}</h2>
                <p className="service-description">{project.summary || project.description || project.slug}</p>
                {(project.projectUrl || project.repositoryUrl) && (
                  <div className="actions-row">
                    {project.projectUrl && (
                      <a className="btn-primary" href={project.projectUrl} target="_blank" rel="noopener noreferrer">
                        {text.viewProject}<ArrowUpRight size={16} />
                      </a>
                    )}
                    {project.repositoryUrl && (
                      <a className="btn-secondary" href={project.repositoryUrl} target="_blank" rel="noopener noreferrer">
                        <Github size={16} />{text.viewRepository}
                      </a>
                    )}
                  </div>
                )}
              </article>
            ))
          ) : (
            <div className="empty-state bento-full" aria-live="polite">{copy.portfolio.empty}</div>
          )}
        </div>
      </section>
    </AppShell>
  );
}
