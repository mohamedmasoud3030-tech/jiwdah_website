import { MessageCircle, Phone } from "lucide-react";
import AppShell from "@/components/AppShell";
import { SITE_CONFIG } from "@/config/site";
import { useSiteCopy } from "@/hooks/useSiteCopy";

export default function Contact() {
  const copy = useSiteCopy();

  return (
    <AppShell>
      <section className="site-section">
        <div className="site-container">
          <p className="section-kicker">{copy.contact.eyebrow}</p>
          <h1 className="section-title-small">{copy.contact.title}</h1>
          <p className="section-lead">{copy.contact.intro}</p>
        </div>
      </section>

      <section className="site-section" style={{ paddingTop: 0 }}>
        <div className="site-container contact-grid">
          {SITE_CONFIG.phones.length > 0 ? (
            SITE_CONFIG.phones.map((phone) => (
              <article key={phone.tel} className="bento-card contact-card">
                <div>
                  <span className="service-icon"><Phone size={20} /></span>
                  <h2 className="service-title">{copy.contact.call}</h2>
                  <p className="service-description" dir="ltr">{phone.display}</p>
                </div>
                <a className="btn-secondary" href={`tel:${phone.tel}`}>{copy.contact.call}</a>
              </article>
            ))
          ) : (
            <div className="empty-state" aria-live="polite">{copy.contact.notConfigured}</div>
          )}

          {SITE_CONFIG.primaryWhatsApp && (
            <article className="bento-card contact-card">
              <div>
                <span className="service-icon"><MessageCircle size={20} /></span>
                <h2 className="service-title">{copy.contact.whatsapp}</h2>
                <p className="service-description">{copy.contact.intro}</p>
              </div>
              <a
                className="btn-primary"
                href={`https://wa.me/${SITE_CONFIG.primaryWhatsApp}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {copy.contact.whatsapp}
              </a>
            </article>
          )}
        </div>
      </section>
    </AppShell>
  );
}
