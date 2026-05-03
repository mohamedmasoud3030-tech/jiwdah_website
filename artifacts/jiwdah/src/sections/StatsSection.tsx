import { useEffect, useRef } from "react";
import { motion, useInView, useMotionValue, useTransform, animate } from "framer-motion";
import { STATS } from "@/const";
import { staggerChildren, fadeSlideUp } from "@/lib/motion";

function AnimatedStat({
  value,
  suffix,
  label,
  shouldStart,
}: {
  value: number;
  suffix: string;
  label: string;
  shouldStart: boolean;
}) {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (v) => Math.round(v));
  const displayStr = useTransform(rounded, (n) => n.toLocaleString("ar-EG"));

  useEffect(() => {
    if (!shouldStart) return;
    const controls = animate(count, value, {
      duration: 1.8,
      ease: [0.16, 1, 0.3, 1],
    });
    return () => controls.stop();
  }, [shouldStart, count, value]);

  return (
    <div className="flex flex-col items-center text-center px-6 py-8">
      <span
        className="text-3xl md:text-4xl text-gold mb-1.5"
        style={{ fontFamily: "'Noto Serif Arabic', serif", fontWeight: 500 }}
      >
        <motion.span>{displayStr}</motion.span>
        {suffix}
      </span>
      <span className="text-cream/35 text-xs tracking-wide">{label}</span>
    </div>
  );
}

export default function StatsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 1 });

  return (
    <section ref={sectionRef} className="py-10 px-6 lg:px-8 border-y border-gold/6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          variants={staggerChildren}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-x-reverse divide-gold/8"
        >
          {STATS.map((stat) => (
            <motion.div key={stat.label} variants={fadeSlideUp}>
              <AnimatedStat
                value={stat.value}
                suffix={stat.suffix}
                label={stat.label}
                shouldStart={isInView}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
