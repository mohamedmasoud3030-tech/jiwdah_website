import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router";
import { Menu, X, Crown } from "lucide-react";
import { NAV_LINKS } from "@/const";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const isActive = (href: string) => {
    if (href === "/") return location.pathname === "/";
    return location.pathname.startsWith(href);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-surface/95 backdrop-blur-md shadow-lg"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <img src="/images/jiwdah_logo.webp" alt="جودة الانطلاقة" className="w-12 h-12 rounded-full border border-gold/30 object-cover transition-transform duration-300 group-hover:scale-110" />
            <div className="flex flex-col">
              <span className="text-xl font-bold text-cream">مشاريع جودة الإنطلاقة</span>
              <span className="text-xs text-cream-muted -mt-1">خدمات الضيافة</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={`relative text-sm font-semibold transition-colors duration-300 ${
                  isActive(link.href)
                    ? "text-gold"
                    : "text-cream/80 hover:text-gold"
                }`}
              >
                {link.label}
                {isActive(link.href) && (
                  <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gold rounded-full" />
                )}
              </Link>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden md:block">
            <Link to="/contact" className="btn-gold text-sm py-2 px-6">
              احجز الآن
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-gold p-2"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden transition-all duration-300 overflow-hidden ${
          isMobileMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="bg-surface/95 backdrop-blur-md border-t border-gold/20 px-4 py-4 space-y-3">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className={`block py-2 text-base font-semibold transition-colors ${
                isActive(link.href) ? "text-gold" : "text-cream/80 hover:text-gold"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Link to="/contact" className="btn-gold text-sm py-2 px-6 w-full text-center mt-3 block">
            احجز الآن
          </Link>
        </div>
      </div>
    </nav>
  );
}
