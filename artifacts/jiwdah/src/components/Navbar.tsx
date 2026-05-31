import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router";
import { Languages, LayoutDashboard, Menu, Moon, Sun, X } from "lucide-react";
import { SITE_CONFIG } from "@/config/site";
import { useAuth } from "@/hooks/useAuth";
import { useSiteCopy } from "@/hooks/useSiteCopy";
import { usePreferences } from "@/providers/preferences";
import { trpc } from "@/providers/trpc";

const ROUTES = [
  ["home", "/"],
  ["services", "/services"],
  ["portfolio", "/portfolio"],
  ["about", "/about"],
  ["ai", "/ai-solutions"],
  ["contact", "/contact"],
] as const;

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const copy = useSiteCopy();
  const { theme, toggleTheme, toggleLocale } = usePreferences();
  const { user, isAdmin } = useAuth();
  const { data: newLeadsCount } = trpc.leads.countNew.useQuery(undefined, {
    enabled: !!user && !!isAdmin,
    refetchInterval: 30000,
  });

  useEffect(() => setIsOpen(false), [location.pathname]);

  const isActive = (href: string) =>
    href === "/" ? location.pathname === "/" : location.pathname.startsWith(href);

  return (
    <header className="site-header">
      <nav className="glass-nav" aria-label="Main navigation">
        <Link to="/" className="brand-link">
          <span className="brand-mark">MM</span>
          <span className="brand-copy">
            <strong>{SITE_CONFIG.brandName}</strong>
            <small>DIGITAL PLATFORM</small>
          </span>
        </Link>

        <div className="desktop-nav">
          {ROUTES.map(([key, href]) => (
            <Link key={href} to={href} className={`nav-pill ${isActive(href) ? "nav-pill-active" : ""}`}>
              {copy.nav[key]}
            </Link>
          ))}
        </div>

        <div className="nav-actions">
          <button type="button" className="icon-button" onClick={toggleLocale} aria-label={copy.common.language}>
            <Languages size={17} />
          </button>
          <button type="button" className="icon-button" onClick={toggleTheme} aria-label={copy.common.theme}>
            {theme === "dark" ? <Sun size={17} /> : <Moon size={17} />}
          </button>
          <Link to={user ? "/dashboard" : "/login"} className="icon-button dashboard-button" aria-label={copy.nav.dashboard}>
            <LayoutDashboard size={17} />
            {!!newLeadsCount && newLeadsCount > 0 && <span className="notification-dot">{newLeadsCount > 9 ? "9+" : newLeadsCount}</span>}
          </Link>
          <Link to="/contact" className="btn-primary nav-cta">{copy.nav.start}</Link>
          <button type="button" className="icon-button mobile-toggle" onClick={() => setIsOpen((value) => !value)} aria-expanded={isOpen} aria-label="Menu">
            {isOpen ? <X size={19} /> : <Menu size={19} />}
          </button>
        </div>
      </nav>

      {isOpen && (
        <div className="mobile-nav glass-nav">
          {ROUTES.map(([key, href]) => (
            <Link key={href} to={href} className={`nav-mobile ${isActive(href) ? "nav-mobile-active" : ""}`}>
              {copy.nav[key]}
            </Link>
          ))}
          <Link to={user ? "/dashboard" : "/login"} className="nav-mobile">{copy.nav.dashboard}</Link>
          <Link to="/contact" className="btn-primary">{copy.nav.start}</Link>
        </div>
      )}
    </header>
  );
}
