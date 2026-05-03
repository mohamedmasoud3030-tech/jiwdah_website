import { useRef } from "react";
import { Link } from "react-router";
import { motion, useScroll, useTransform } from "framer-motion";
import { ChevronDown } from "lucide-react";

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end start"] });
  const videoY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <section ref={containerRef} className="relative min-h-screen flex items-center justify-center overflow-hidden bg-surface">
      {/* Parallax Video */}
      <motion.div className="absolute inset-0" style={{ y: videoY }}>
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
          style={{ opacity: 0.45 }}
        >
          <source src="/videos/hero_video.mp4" type="video/mp4" />
        </video>
      </motion.div>

      {/* Layered Overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-surface/60 via-surface/30 to-surface/85 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-r from-surface/40 via-transparent to-surface/40 pointer-events-none" />

      {/* Decorative thin lines */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/15 to-transparent" />

      {/* Content */}
      <motion.div
        className="relative z-10 max-w-4xl mx-auto px-6 text-center"
        style={{ y: contentY, opacity }}
      >
        {/* Eyebrow label */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="flex items-center justify-center gap-3 mb-8"
        >
          <span className="block w-8 h-px bg-gold/50" />
          <span className="text-gold/80 text-xs tracking-widest uppercase font-medium">
            خدمات الضيافة المتنقلة في سلطنة عمان
          </span>
          <span className="block w-8 h-px bg-gold/50" />
        </motion.div>

        {/* Main headline - serif */}
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-cream leading-tight mb-6"
          style={{ fontFamily: "'Noto Serif Arabic', serif", fontWeight: 500 }}
        >
          ضيافة احترافية{" "}
          <span className="text-shimmer">تليق بمناسبتك</span>
        </motion.h1>

        {/* Sub-headline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="text-cream/60 text-base sm:text-lg leading-relaxed mb-12 max-w-xl mx-auto font-light"
        >
          نذهب إليك أينما كنت في سلطنة عمان. طاقم محترف، أجواء فاخرة، وخدمة لا تُنسى.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <Link to="/contact" className="btn-gold min-w-[160px]">
            اطلب عرض سعر
          </Link>
          <Link to="/services" className="btn-outline min-w-[160px]">
            تصفح خدماتنا
          </Link>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.8 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="w-5 h-5 text-gold/50" />
        </motion.div>
      </motion.div>
    </section>
  );
}
