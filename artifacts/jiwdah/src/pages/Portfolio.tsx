import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { PORTFOLIO_ITEMS } from "@/const";

const categories = [
  { key: "all", label: "الكل" },
  { key: "wedding", label: "أفراح" },
  { key: "conference", label: "مؤتمرات" },
  { key: "private", label: "فعاليات خاصة" },
  { key: "corporate", label: "شركات" },
  { key: "coffee", label: "قهوة عربية" },
];

export default function Portfolio() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const filteredItems =
    activeCategory === "all"
      ? PORTFOLIO_ITEMS
      : PORTFOLIO_ITEMS.filter((item) => item.category === activeCategory);

  return (
    <div className="min-h-screen bg-surface">
      <Navbar />
      <main className="pt-20">
        {/* Header */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="text-gold text-sm font-semibold tracking-wider uppercase">
                معرض الأعمال
              </span>
              <h1 className="text-3xl md:text-5xl font-bold text-cream mt-3 mb-4">
                أعمالنا <span className="text-gradient-gold">المميزة</span>
              </h1>
              <p className="text-cream-muted max-w-2xl mx-auto">
                نفخر بتقديم خدماتنا لأرقى المناسبات في سلطنة عمان
              </p>
            </motion.div>
          </div>
        </section>

        {/* Filter & Grid */}
        <section className="pb-24 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            {/* Filter */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex flex-wrap justify-center gap-3 mb-10"
            >
              {categories.map((cat) => (
                <button
                  key={cat.key}
                  onClick={() => setActiveCategory(cat.key)}
                  className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
                    activeCategory === cat.key
                      ? "bg-gold text-surface"
                      : "bg-surface-light text-cream-muted hover:text-gold border border-gold/20"
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </motion.div>

            {/* Masonry Grid */}
            <motion.div layout className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
              <AnimatePresence mode="popLayout">
                {filteredItems.map((item, index) => (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3 }}
                    className={`group relative rounded-xl overflow-hidden break-inside-avoid cursor-pointer ${
                      index % 3 === 0 ? "aspect-[3/4]" : "aspect-[3/2]"
                    }`}
                    onClick={() => setSelectedImage(item.image)}
                  >
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-surface/90 via-surface/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute bottom-0 right-0 left-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                      <h4 className="text-cream font-bold">{item.title}</h4>
                      <p className="text-cream-muted text-sm">
                        {categories.find((c) => c.key === item.category)?.label}
                      </p>
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

      {/* Lightbox */}
      {selectedImage && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90"
          onClick={() => setSelectedImage(null)}
        >
          <button
            onClick={() => setSelectedImage(null)}
            className="absolute top-6 right-6 w-10 h-10 bg-surface/80 rounded-full flex items-center justify-center text-cream hover:text-gold transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
          <motion.img
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            src={selectedImage}
            alt=""
            className="max-w-full max-h-[90vh] rounded-lg object-contain"
            onClick={(e) => e.stopPropagation()}
          />
        </motion.div>
      )}
    </div>
  );
}
