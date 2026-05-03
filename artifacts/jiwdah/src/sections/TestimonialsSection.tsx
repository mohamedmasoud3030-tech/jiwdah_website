import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { TESTIMONIALS } from "@/const";

export default function TestimonialsSection() {
  const allTestimonials = [...TESTIMONIALS, ...TESTIMONIALS];

  return (
    <section id="testimonials" className="py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 mb-14">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-center"
        >
          <div className="section-eyebrow justify-center mb-4">آراء العملاء</div>
          <h2
            className="text-3xl md:text-4xl text-cream"
            style={{ fontFamily: "'Noto Serif Arabic', serif", fontWeight: 500 }}
          >
            ما يقوله <span className="text-gradient-gold">عملاؤنا</span> عنا
          </h2>
        </motion.div>
      </div>

      {/* Scrolling strip */}
      <div className="relative">
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-surface to-transparent z-10 pointer-events-none" />
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-surface to-transparent z-10 pointer-events-none" />

        <div
          className="flex gap-5 animate-scroll-left hover:[animation-play-state:paused]"
          style={{ width: "max-content" }}
        >
          {allTestimonials.map((t, index) => (
            <div
              key={`${t.id}-${index}`}
              className="w-[340px] shrink-0 border border-gold/8 rounded p-6"
              style={{ backgroundColor: "#181818" }}
            >
              {/* Stars */}
              <div className="flex gap-0.5 mb-4">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-gold text-gold" />
                ))}
              </div>

              <p className="text-cream/70 text-sm leading-relaxed mb-5 font-light">
                &ldquo;{t.text}&rdquo;
              </p>

              <div className="flex items-center gap-3 pt-4 border-t border-gold/8">
                <img src={t.avatar} alt={t.name} className="w-9 h-9 rounded-full object-cover opacity-80" />
                <div>
                  <h4 className="text-cream text-sm font-medium">{t.name}</h4>
                  <p className="text-gold/60 text-xs">{t.service}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
