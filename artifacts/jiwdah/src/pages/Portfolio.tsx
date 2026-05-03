import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { PORTFOLIO_ITEMS } from "@/const";

const categories = [
  { key: "all", label: "الكل" },
  { key: "vip", label: "VIP" },
  { key: "wedding", label: "أفراح" },
  { key: "events", label: "فعاليات" },
  { key: "team", label: "فريق العمل" },
];

type PortfolioItem = { id: number; title: string; category: string; video?: string; image?: string };

export default function Portfolio() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [selectedItem, setSelectedItem] = useState<PortfolioItem | null>(null);

  const filteredItems =
    activeCategory === "all"
      ? PORTFOLIO_ITEMS
      : PORTFOLIO_ITEMS.filter((item) => item.category === activeCategory);

  return (
    <div className="min-h-screen bg-surface">
      <Navbar />
      <main className="pt-20">
        {/* Header */}
        <section className="py-20 px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="section-eyebrow mb-5">معرض الأعمال</div>
              <h1
                className="text-4xl md:text-6xl text-cream leading-tight mb-5"
                style={{ fontFamily: "'Noto Serif Arabic', serif", fontWeight: 500 }}
              >
                أعمالنا <span className="text-gradient-gold">المميزة</span>
              </h1>
              <p className="text-cream/45 text-base max-w-lg font-light leading-relaxed">
                نفخر بتقديم خدماتنا لأرقى المناسبات في سلطنة عمان
              </p>
            </motion.div>
          </div>
        </section>

        <div className="divider-gold mx-6 lg:mx-8 max-w-7xl xl:mx-auto" />

        <section className="py-16 px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            {/* Filter */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-wrap gap-2 mb-10"
            >
              {categories.map((cat) => (
                <button
                  key={cat.key}
                  onClick={() => setActiveCategory(cat.key)}
                  className={`px-4 py-1.5 rounded text-xs font-medium tracking-wide transition-all duration-300 ${
                    activeCategory === cat.key
                      ? "bg-gold text-surface"
                      : "bg-surface-light text-cream/45 hover:text-cream/70 border border-gold/10 hover:border-gold/20"
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </motion.div>

            {/* Masonry Grid */}
            <motion.div layout className="columns-2 md:columns-3 gap-3 space-y-3">
              <AnimatePresence mode="popLayout">
                {filteredItems.map((item, index) => (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    className={`group relative rounded overflow-hidden break-inside-avoid cursor-pointer ${
                      index % 3 === 0 ? "aspect-[3/4]" : "aspect-[4/3]"
                    }`}
                    onClick={() => setSelectedItem(item as PortfolioItem)}
                  >
                    {(item as PortfolioItem).video ? (
                      <video
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      >
                        <source src={(item as PortfolioItem).video} type="video/mp4" />
                      </video>
                    ) : (
                      <img
                        src={(item as PortfolioItem).image}
                        alt={item.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-surface/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
                    <div className="absolute bottom-0 right-0 left-0 p-3 translate-y-2 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-400">
                      <h4 className="text-cream text-xs font-medium">{item.title}</h4>
                      <p className="text-gold/60 text-xs">{categories.find((c) => c.key === item.category)?.label}</p>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppButton />

      {/* Media Lightbox */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-6"
            style={{ backgroundColor: "rgba(0,0,0,0.92)" }}
            onClick={() => setSelectedItem(null)}
          >
            <button
              onClick={() => setSelectedItem(null)}
              className="absolute top-6 right-6 w-10 h-10 border border-cream/10 rounded flex items-center justify-center text-cream/60 hover:text-gold transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            <motion.div
              initial={{ scale: 0.93 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="max-w-4xl w-full rounded overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {selectedItem.video ? (
                <video autoPlay loop muted playsInline controls className="w-full max-h-[80vh] object-contain">
                  <source src={selectedItem.video} type="video/mp4" />
                </video>
              ) : (
                <img src={selectedItem.image} alt={selectedItem.title} className="w-full max-h-[80vh] object-contain" />
              )}
              <div className="px-4 py-3 border-t border-cream/5" style={{ backgroundColor: "#141414" }}>
                <h4 className="text-cream/80 text-sm">{selectedItem.title}</h4>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
