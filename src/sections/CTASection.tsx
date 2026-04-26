import { Link } from "react-router";
import { motion } from "framer-motion";
import { ArrowLeft, Clock } from "lucide-react";

export default function CTASection() {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative bg-surface-light border border-gold/20 rounded-2xl p-8 md:p-12 overflow-hidden"
        >
          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-gold/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-gold/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="text-center md:text-right">
              <div className="flex items-center gap-2 justify-center md:justify-start mb-3">
                <Clock className="w-5 h-5 text-gold" />
                <span className="text-gold text-sm font-semibold">
                  عرض محدود
                </span>
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-cream mb-3">
                احجز الآن قبل <span className="text-gradient-gold">امتلاء المواعيد</span>
              </h2>
              <p className="text-cream-muted max-w-lg">
                الموسم موسم مناسبات و المواعيد تملأ بسرعة. لا تفوت الفرصة واحجز
                خدمتك الآن للحصول على أفضل الأسعار و الخدمة.
              </p>
            </div>

            <div className="shrink-0">
              <Link to="/contact" className="btn-gold">
                احجز الآن
                <ArrowLeft className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
