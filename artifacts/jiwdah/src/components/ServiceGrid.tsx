import { Code2, FileText, Layers3, Megaphone, PanelsTopLeft, PenTool, type LucideIcon } from "lucide-react";
import { PLATFORM_SERVICES } from "@/content/services";
import { usePreferences } from "@/providers/preferences";

const ICONS: Record<string, LucideIcon> = {
  Code2,
  PanelsTopLeft,
  PenTool,
  Megaphone,
  FileText,
  Layers3,
};

export default function ServiceGrid({ limit }: { limit?: number }) {
  const { locale } = usePreferences();
  const services = typeof limit === "number" ? PLATFORM_SERVICES.slice(0, limit) : PLATFORM_SERVICES;

  return (
    <div className="bento-grid">
      {services.map((service, index) => {
        const Icon = ICONS[service.icon] ?? Layers3;
        return (
          <article key={service.id} className={`bento-card ${index === 0 || index === 3 ? "bento-wide" : ""}`}>
            <span className="service-icon"><Icon size={20} /></span>
            <h3 className="service-title">{service.title[locale]}</h3>
            <p className="service-description">{service.description[locale]}</p>
            <ul className="feature-list">
              {service.features[locale].map((feature) => <li key={feature}>{feature}</li>)}
            </ul>
          </article>
        );
      })}
    </div>
  );
}
