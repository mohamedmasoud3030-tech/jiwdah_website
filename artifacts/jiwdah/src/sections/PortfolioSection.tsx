import { useState } from "react";
import { Link } from "react-router";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { PORTFOLIO_ITEMS } from "@/const";
import { fadeSlideUp, staggerChildren } from "@/lib/motion";

const categories = [
  { key: "all", label: "الكل" },
  { key: "vip", label: "VIP" },
  { key: "wedding", label: "أفراح" },
  { key: "events", label: "فعاليات" },
  { key: "team", label: "فريق العمل" },
];

const FEATURED_IDS = [1, 2, 3];

export default function PortfolioSection() {
  const [activeCategory, setActiveCategory] = useState("all");

  const featuredItems = PORTFOLIO_ITEMS.filter((item) => FEATURED_IDS.includes(item.id));
  const filteredItems =
    activeCategory === "all"
      ? PORTFOLIO_ITEMS
      : PORTFOLIO_ITEMS.filter((item) => item.category === activeCategory);

  return (
    <section id="portfolio" className="py-24 px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          variants={fadeSlideUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mb-14"
        >
          <div className="section-eyebrow mb-4">معرض الأعمال</div>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <h2
              className="text-3xl md:text-4xl text-cream max-w-xs"
              style={{ fontFamily: "'Noto Serif Arabic', serif", fontWeight: 500 }}
            >
              أعمالنا <span className="text-gradient-gold">المميزة</span>
            </h2>
            <Link
              to="/portfolio"
              className="flex items-center gap-2 text-gold/70 text-sm hover:text-gold transition-colors duration-300 group shrink-0"
            >
              <span>عرض جميع الأعمال</span>
              <ArrowLeft className="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-1" />
            </Link>
          </div>
        </motion.div>

        <motion.div
          variants={staggerChildren}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-10"
        >
          {featuredItems.map((item, index) => (
            <motion.div
              key={item.id}
              variants={fadeSlideUp}
              className={`group relative rounded overflow-hidden cursor-pointer ${index === 0 ? "md:col-span-2 aspect-[16/9]" : "aspect-[4/3]"}`}
            >
              {item.video ? (
                <video autoPlay loop muted playsInline className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105">
                  <source src={item.video} type="video/mp4" />
                </video>
              ) : (
                <img src={item.image} alt={item.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-surface/85 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
              <div className="absolute bottom-0 right-0 left-0 p-4 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-400">
                <p className="text-cream/40 text-[10px] tracking-widest uppercase mb-0.5">أبرز الأعمال</p>
                <h4 className="text-cream text-sm font-medium">{item.title}</h4>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <div className="divider-gold mb-10" />

        <motion.div
          variants={fadeSlideUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="flex flex-wrap gap-2 mb-7"
        >
          {categories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setActiveCategory(cat.key)}
              className={`px-4 py-1.5 rounded text-xs font-medium transition-all duration-300 ${
                activeCategory === cat.key
                  ? "bg-gold text-surface"
                  : "bg-surface-light text-cream/50 hover:text-cream border border-gold/10 hover:border-gold/20"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </motion.div>

        <motion.div layout className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="group relative rounded overflow-hidden aspect-[3/2] cursor-pointer"
              >
                {item.video ? (
                  <video autoPlay loop muted playsInline className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105">
                    <source src={item.video} type="video/mp4" />
                  </video>
                ) : (
                  <img src={item.image} alt={item.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-surface/85 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
                <div className="absolute bottom-0 right-0 left-0 p-3 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-400">
                  <h4 className="text-cream text-xs font-medium">{item.title}</h4>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
