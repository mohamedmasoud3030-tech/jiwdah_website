import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { TESTIMONIALS } from "@/const";
import { staggerChildren, fadeSlideUp } from "@/lib/motion";

const FEATURED = TESTIMONIALS.slice(0, 3);

export default function TestimonialsSection() {
  return (
    <section id="testimonials" className="py-24 px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          variants={fadeSlideUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mb-14"
        >
          <div className="section-eyebrow mb-4">آراء العملاء</div>
          <h2
            className="text-3xl md:text-4xl text-cream"
            style={{ fontFamily: "'Noto Serif Arabic', serif", fontWeight: 500 }}
          >
            ما يقوله <span className="text-gradient-gold">عملاؤنا</span> عنا
          </h2>
        </motion.div>

        <motion.div
          variants={staggerChildren}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-5"
        >
          {FEATURED.map((t, index) => (
            <motion.div
              key={t.id}
              variants={fadeSlideUp}
              className={`flex flex-col border border-gold/8 rounded p-7 ${index === 1 ? "md:border-gold/20" : ""}`}
              style={{ backgroundColor: index === 1 ? "#1c1c18" : "#181818" }}
            >
              <div className="flex gap-0.5 mb-5">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star key={i} className="w-3 h-3 fill-gold text-gold" />
                ))}
              </div>

              <blockquote className="text-cream/65 text-sm leading-relaxed mb-6 font-light flex-1">
                &ldquo;{t.text}&rdquo;
              </blockquote>

              <div className="flex items-center gap-3 pt-5 border-t border-gold/8">
                <img
                  src={t.avatar}
                  alt={t.name}
                  className="w-9 h-9 rounded-full object-cover opacity-75"
                />
                <div>
                  <p className="text-cream text-sm font-medium">{t.name}</p>
                  <p className="text-gold/55 text-xs">{t.service}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
