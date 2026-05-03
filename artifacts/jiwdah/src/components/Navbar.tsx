import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router";
import { Menu, X } from "lucide-react";
import { NAV_LINKS } from "@/const";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 80);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const isActive = (href: string) =>
    href === "/" ? location.pathname === "/" : location.pathname.startsWith(href);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "backdrop-blur-xl shadow-[0_1px_0_rgba(200,164,92,0.08)]"
          : "bg-transparent"
      }`}
      style={isScrolled ? { backgroundColor: "rgba(14,14,14,0.92)" } : {}}
    >
      {/* Top gold line */}
      {isScrolled && (
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />
      )}

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-18" style={{ height: "72px" }}>

          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <img
              src="/images/jiwdah_logo.webp"
              alt="جودة الانطلاقة"
              className="w-10 h-10 rounded-full border border-gold/20 object-cover transition-all duration-500 group-hover:border-gold/40"
            />
            <div className="flex flex-col">
              <span
                className="text-base text-cream font-medium leading-tight"
                style={{ fontFamily: "'Noto Serif Arabic', serif" }}
              >
                مشاريع جودة الإنطلاقة
              </span>
              <span className="text-[10px] text-cream/35 tracking-wider">خدمات الضيافة</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={`relative text-xs tracking-wider font-medium transition-colors duration-300 uppercase ${
                  isActive(link.href) ? "text-gold" : "text-cream/50 hover:text-cream/80"
                }`}
              >
                {link.label}
                {isActive(link.href) && (
                  <span className="absolute -bottom-1 left-0 right-0 h-px bg-gold/50 rounded-full" />
                )}
              </Link>
            ))}
          </div>

          {/* CTA */}
          <div className="hidden md:block">
            <Link to="/contact" className="btn-gold text-xs py-2 px-5">
              احجز الآن
            </Link>
          </div>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-cream/60 hover:text-gold transition-colors duration-300 p-1"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden transition-all duration-400 overflow-hidden ${
          isMobileMenuOpen ? "max-h-80 opacity-100" : "max-h-0 opacity-0"
        }`}
        style={{ transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)" }}
      >
        <div className="px-6 py-5 space-y-1 border-t border-gold/8"
          style={{ backgroundColor: "rgba(14,14,14,0.97)" }}>
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className={`block py-2.5 text-sm font-medium transition-colors duration-300 ${
                isActive(link.href) ? "text-gold" : "text-cream/55 hover:text-cream/80"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <div className="pt-3">
            <Link to="/contact" className="btn-gold text-xs py-2 px-5 block text-center">
              احجز الآن
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
