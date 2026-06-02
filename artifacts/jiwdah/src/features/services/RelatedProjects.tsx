import ProjectCard from "@/features/projects/ProjectCard";
import { STUDIO_PROJECTS } from "@/content/projects";
import type { LenaServiceId } from "@/content/services";
import { usePreferences } from "@/providers/preferences";

export default function RelatedProjects({ serviceId }: { serviceId: LenaServiceId }) {
  const { locale } = usePreferences();
  const projects = STUDIO_PROJECTS.filter((project) => project.services.includes(serviceId)).slice(0, 3);

  if (projects.length === 0) return null;

  return (
    <section className="lena-section">
      <div className="lena-container">
        <p className="lena-kicker">LENA ORIGINALS</p>
        <h2 className="lena-section-title">
          {locale === "ar" ? "مشاريع مرتبطة بهذا المسار" : "Projects connected to this track"}
        </h2>
        <p className="lena-section-lead">
          {locale === "ar"
            ? "نماذج توضّح كيف تتحول الخدمة إلى جزء عملي من تجربة رقمية متكاملة."
            : "Selected examples showing how this service becomes part of a complete digital experience."}
        </p>
        <div className="lena-bento lena-project-grid">
          {projects.map((project) => <ProjectCard key={project.id} project={project} />)}
        </div>
      </div>
    </section>
  );
}
