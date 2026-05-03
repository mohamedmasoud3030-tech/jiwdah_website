import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { STATS } from "@/const";

function AnimatedCounter({ value, suffix, inView }: { value: number; suffix: string; inView: boolean }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const duration = 2200;
    const steps = 60;
    const increment = value / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        current = value;
        clearInterval(timer);
      }
      setCount(Math.floor(current));
    }, duration / steps);
    return () => clearInterval(timer);
  }, [inView, value]);

  return (
    <span
      className="text-4xl md:text-5xl font-bold text-gold tabular-nums"
      style={{ fontFamily: "'Noto Serif Arabic', serif" }}
    >
      {count.toLocaleString("ar-EG")}{suffix}
    </span>
  );
}

export default function StatsSection() {
  const [inView, setInView] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setInView(true); observer.disconnect(); } },
      { threshold: 0.3 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-20 px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="relative border border-gold/10 rounded p-10 md:p-14 overflow-hidden"
          style={{ background: "linear-gradient(135deg, rgba(24,24,24,0.9) 0%, rgba(20,20,20,0.95) 100%)" }}
        >
          {/* Corner decorations */}
          <div className="absolute top-0 right-0 w-20 h-20 border-t border-r border-gold/15 rounded-tr" />
          <div className="absolute bottom-0 left-0 w-20 h-20 border-b border-l border-gold/15 rounded-bl" />

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4">
            {STATS.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="text-center"
              >
                <AnimatedCounter value={stat.value} suffix={stat.suffix} inView={inView} />
                <div className="w-8 h-px bg-gold/25 mx-auto my-2" />
                <p className="text-cream/45 text-xs tracking-wide">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
