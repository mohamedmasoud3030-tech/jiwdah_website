import { motion } from "framer-motion";
import { STATS } from "@/const";
import { staggerChildren, fadeSlideUp } from "@/lib/motion";

export default function StatsSection() {
  return (
    <section className="py-10 px-6 lg:px-8 border-y border-gold/6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          variants={staggerChildren}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-x-reverse divide-gold/8"
        >
          {STATS.map((stat) => (
            <motion.div
              key={stat.label}
              variants={fadeSlideUp}
              className="flex flex-col items-center text-center px-6 py-8"
            >
              <span
                className="text-3xl md:text-4xl text-gold mb-1.5"
                style={{ fontFamily: "'Noto Serif Arabic', serif", fontWeight: 500 }}
              >
                {stat.value.toLocaleString("ar-EG")}{stat.suffix}
              </span>
              <span className="text-cream/35 text-xs tracking-wide">{stat.label}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
