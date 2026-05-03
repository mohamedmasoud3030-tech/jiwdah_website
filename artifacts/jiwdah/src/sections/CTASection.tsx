import { Link } from "react-router";
import { motion } from "framer-motion";

export default function CTASection() {
  return (
    <section className="py-24 px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="relative overflow-hidden rounded border border-gold/12 text-center px-8 py-16 md:py-20"
          style={{ background: "linear-gradient(135deg, #161616 0%, #141414 50%, #181818 100%)" }}
        >
          {/* Decorative corners */}
          <div className="absolute top-0 right-0 w-24 h-24 border-t border-r border-gold/15" />
          <div className="absolute bottom-0 left-0 w-24 h-24 border-b border-l border-gold/15" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gold/3 rounded-full blur-3xl pointer-events-none" />

          {/* Eyebrow */}
          <div className="section-eyebrow justify-center mb-6">ابدأ رحلتك معنا</div>

          {/* Headline */}
          <h2
            className="text-3xl md:text-4xl text-cream mb-4 leading-snug"
            style={{ fontFamily: "'Noto Serif Arabic', serif", fontWeight: 500 }}
          >
            مناسبتك تستحق <span className="text-gradient-gold">الأفضل</span>
          </h2>

          <p className="text-cream/50 max-w-md mx-auto mb-10 font-light leading-relaxed">
            احجز خدمتك اليوم وسيتواصل معك فريقنا خلال 24 ساعة لتأكيد جميع التفاصيل.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link to="/contact" className="btn-gold min-w-[160px]">
              احجز الآن
            </Link>
            <Link to="/services" className="btn-outline min-w-[160px]">
              تصفح الخدمات
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
