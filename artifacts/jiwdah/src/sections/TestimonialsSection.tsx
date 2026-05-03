import { useRef } from "react";
import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { TESTIMONIALS } from "@/const";

export default function TestimonialsSection() {
  const scrollRef = useRef<HTMLDivElement>(null);

  // Double the testimonials for seamless loop
  const allTestimonials = [...TESTIMONIALS, ...TESTIMONIALS];

  return (
    <section id="testimonials" className="py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <span className="text-gold text-sm font-semibold tracking-wider uppercase">
            آراء العملاء
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-cream mt-3 mb-4">
            ما يقوله <span className="text-gradient-gold">عملاؤنا</span> عنا
          </h2>
          <p className="text-cream-muted max-w-2xl mx-auto">
            نفخر بثقة عملائنا ونسعى دائماً لتقديم الأفضل
          </p>
        </motion.div>
      </div>

      {/* Scrolling Container */}
      <div className="relative">
        {/* Fade edges */}
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-surface to-transparent z-10 pointer-events-none" />
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-surface to-transparent z-10 pointer-events-none" />

        <div
          ref={scrollRef}
          className="flex gap-6 animate-scroll-left hover:[animation-play-state:paused]"
          style={{ width: "max-content" }}
        >
          {allTestimonials.map((testimonial, index) => (
            <div
              key={`${testimonial.id}-${index}`}
              className="w-[350px] shrink-0 bg-surface-light border border-gold/10 rounded-xl p-6"
            >
              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-gold text-gold" />
                ))}
              </div>

              {/* Text */}
              <p className="text-cream/90 text-sm leading-relaxed mb-4">
                &ldquo;{testimonial.text}&rdquo;
              </p>

              {/* Author */}
              <div className="flex items-center justify-between pt-4 border-t border-gold/10">
                <div>
                  <h4 className="text-cream font-semibold text-sm">{testimonial.name}</h4>
                  <p className="text-cream-muted text-xs">{testimonial.service}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
