import { Link } from "react-router";
import { Phone } from "lucide-react";
import { SITE_CONFIG } from "@/config/site";
import { useSiteCopy } from "@/hooks/useSiteCopy";

const ROUTES = [
  ["home", "/"],
  ["services", "/services"],
  ["portfolio", "/portfolio"],
  ["about", "/about"],
  ["ai", "/ai-solutions"],
  ["contact", "/contact"],
] as const;

export default function Footer() {
  const copy = useSiteCopy();

  return (
    <footer className="site-footer">
      <div className="footer-grid">
        <div>
          <div className="footer-brand">
            <span className="brand-mark">MM</span>
            <strong>{SITE_CONFIG.brandName}</strong>
          </div>
          <p className="footer-description">{copy.footer.description}</p>
        </div>

        <div>
          <h2 className="footer-heading">{copy.footer.links}</h2>
          <div className="footer-links">
            {ROUTES.map(([key, href]) => (
              <Link key={href} to={href}>{copy.nav[key]}</Link>
            ))}
          </div>
        </div>

        <div>
          <h2 className="footer-heading">{copy.footer.contact}</h2>
          <div className="footer-links">
            {SITE_CONFIG.phones.length > 0 ? (
              SITE_CONFIG.phones.map((phone) => (
                <a key={phone.tel} href={`tel:${phone.tel}`}>
                  <Phone size={16} />
                  <span dir="ltr">{phone.display}</span>
                </a>
              ))
            ) : (
              <p>{copy.contact.notConfigured}</p>
            )}
          </div>
        </div>
      </div>
      <div className="footer-bottom">© {new Date().getFullYear()} {SITE_CONFIG.brandName}. {copy.footer.rights}</div>
    </footer>
  );
}
