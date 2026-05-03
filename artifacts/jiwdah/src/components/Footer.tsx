import { Link } from "react-router";
import { Phone, Instagram, MapPin } from "lucide-react";
import { NAV_LINKS } from "@/const";

export default function Footer() {
  return (
    <footer className="border-t border-gold/8" style={{ backgroundColor: "#0a0a0a" }}>
      {/* Gold top line */}
      <div className="h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Brand */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-3 group mb-5">
              <img
                src="/images/jiwdah_logo.webp"
                alt="جودة الانطلاقة"
                className="w-10 h-10 rounded-full border border-gold/20 object-cover"
              />
              <div className="flex flex-col">
                <span className="text-base text-cream font-medium" style={{ fontFamily: "'Noto Serif Arabic', serif" }}>
                  مشاريع جودة الإنطلاقة
                </span>
                <span className="text-[10px] text-cream/35 tracking-wider">خدمات الضيافة المتنقلة</span>
              </div>
            </Link>
            <p className="text-cream/40 text-sm leading-relaxed max-w-xs font-light">
              نقدم خدمات ضيافة احترافية متنقلة لجميع المناسبات في سلطنة عمان.
              نصلك أينما كنت بأعلى معايير الجودة.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-gold/60 text-xs tracking-widest uppercase mb-5">روابط سريعة</h4>
            <ul className="space-y-3">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-cream/40 hover:text-cream/70 transition-colors duration-300 text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-gold/60 text-xs tracking-widest uppercase mb-5">تواصل معنا</h4>
            <ul className="space-y-4">
              <li>
                <a
                  href="https://maps.app.goo.gl/i4VJX9VKgRsPTsbY7"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 text-cream/40 hover:text-cream/65 transition-colors duration-300 group"
                >
                  <MapPin className="w-4 h-4 text-gold/40 group-hover:text-gold/60 transition-colors shrink-0" />
                  <span className="text-sm">نزوى، سلطنة عمان</span>
                </a>
              </li>
              <li>
                <a
                  href="tel:+96892770091"
                  className="flex items-center gap-2.5 text-cream/40 hover:text-cream/65 transition-colors duration-300 group"
                >
                  <Phone className="w-4 h-4 text-gold/40 group-hover:text-gold/60 transition-colors shrink-0" />
                  <span className="text-sm" dir="ltr">+968 9277 0091</span>
                </a>
              </li>
              <li>
                <a
                  href="https://www.instagram.com/jawdat_alantlaqa_nizwa"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 text-cream/40 hover:text-cream/65 transition-colors duration-300 group"
                >
                  <Instagram className="w-4 h-4 text-gold/40 group-hover:text-gold/60 transition-colors shrink-0" />
                  <span className="text-sm">jawdat_alantlaqa_nizwa</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-gold/6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-cream/25 text-xs">
            &copy; {new Date().getFullYear()} مشاريع جودة الإنطلاقة. جميع الحقوق محفوظة.
          </p>
          <p className="text-cream/20 text-xs">صُنع بإتقان في سلطنة عمان</p>
        </div>
      </div>
    </footer>
  );
}
