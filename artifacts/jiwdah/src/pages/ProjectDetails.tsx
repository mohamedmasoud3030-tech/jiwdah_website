import { CheckCircle2 } from "lucide-react";
import { Navigate, useParams } from "react-router";
import LenaCta from "@/components/LenaCta";
import { findStudioProject } from "@/content/projects";
import ProjectVisual from "@/features/projects/ProjectVisual";
import PublicShell from "@/layouts/PublicShell";
import { usePreferences } from "@/providers/preferences";
export default function ProjectDetails() { const { projectId } = useParams(); const { locale } = usePreferences(); const project = findStudioProject(projectId); if (!project) return <Navigate to="/portfolio" replace />; return <PublicShell><section className="lena-page lena-container lena-case-hero"><div><p className="lena-kicker">LENA ORIGINALS</p><p className="lena-kicker">{project.category[locale]}</p><h1 className="lena-page-title">{project.title[locale]}</h1><p className="lena-lead">{project.summary[locale]}</p><div className="lena-tags">{project.tags.map((tag) => <span key={tag}>{tag}</span>)}</div></div><ProjectVisual project={project} /></section><section className="lena-section"><div className="lena-container lena-split"><article className="lena-glass lena-info-panel"><p className="lena-kicker">{locale === "ar" ? "الاتجاه" : "The Direction"}</p><h2>{project.direction[locale]}</h2></article><article className="lena-glass lena-info-panel"><p className="lena-kicker">{locale === "ar" ? "المخرجات" : "Deliverables"}</p><ul>{project.deliverables[locale].map((item) => <li key={item}><CheckCircle2 size={16} />{item}</li>)}</ul></article></div></section><LenaCta project /></PublicShell>; }
