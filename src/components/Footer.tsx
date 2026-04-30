import { Link } from "react-router";
import { Crown, Phone, Instagram, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-surface border-t border-gold/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-3 group">
              <Crown className="w-8 h-8 text-gold" />
              <div className="flex flex-col">
                <span className="text-xl font-bold text-cream">مشاريع جودة الإنطلاقة</span>
                <span className="text-xs text-cream-muted -mt-1">خدمات الضيافة المتنقلة</span>
              </div>
            </Link>
            <p className="mt-4 text-cream-muted text-sm leading-relaxed">
              نقدم خدمات ضيافة احترافية متنقلة لجميع المناسبات في سلطنة عمان.
              نصلك أينما كنت بأعلى معايير الجودة.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-gold font-bold text-lg mb-6">روابط سريعة</h4>
            <ul className="space-y-3">
              {[
                { label: "الرئيسية", href: "/" },
                { label: "الخدمات", href: "/services" },
                { label: "الأعمال", href: "/portfolio" },
                { label: "من نحن", href: "/about" },
                { label: "تواصل معنا", href: "/contact" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-cream-muted hover:text-gold transition-colors duration-300 text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-gold font-bold text-lg mb-6">خدماتنا</h4>
            <ul className="space-y-3 text-sm">
              <li className="text-cream-muted hover:text-gold transition-colors cursor-pointer">ضيافة الزفاف</li>
              <li className="text-cream-muted hover:text-gold transition-colors cursor-pointer">ضيافة الشركات</li>
              <li className="text-cream-muted hover:text-gold transition-colors cursor-pointer">البوفيه المفتوح</li>
              <li className="text-cream-muted hover:text-gold transition-colors cursor-pointer">القهوة العربية</li>
              <li className="text-cream-muted hover:text-gold transition-colors cursor-pointer">ضيافة VIP</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-gold font-bold text-lg mb-6">تواصل معنا</h4>
            <ul className="space-y-4">
              <li className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-gold shrink-0" />
                <a href="https://maps.app.goo.gl/i4VJX9VKgRsPTsbY7" target="_blank" rel="noopener noreferrer" className="text-cream-muted text-sm hover:text-gold transition-colors">نزوى، سلطنة عمان</a>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-gold shrink-0" />
                <span className="text-cream-muted text-sm" dir="ltr">+968 9277 0091</span>
              </li>
              <li className="flex items-center gap-3">
                <Instagram className="w-5 h-5 text-gold shrink-0" />
                <a href="https://www.instagram.com/jawdat_alantlaqa_nizwa" target="_blank" rel="noopener noreferrer" className="text-cream-muted text-sm hover:text-gold transition-colors">jawdat_alantlaqa_nizwa</a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-gold/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-cream-muted text-sm">
            &copy; {new Date().getFullYear()} مشاريع جودة الإنطلاقة. جميع الحقوق محفوظة.
          </p>
          <p className="text-cream-muted/60 text-xs">
            صُنع بإتقان في سلطنة عمان
          </p>
        </div>
      </div>
    </footer>
  );
}
