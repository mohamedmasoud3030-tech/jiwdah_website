import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Award } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { trpc } from "@/providers/trpc";
import { CATEGORY_VALUES } from "@workspace/api-client-react";
import { fadeSlideUp } from "@/lib/motion";
import { INSTAGRAM_PORTFOLIO_ITEMS, type InstagramPortfolioItem } from "@/const";

const CATEGORY_LABELS: Record<string, string> = {
  wedding: "أفراح",
  conference: "مؤتمرات",
  private: "فعاليات خاصة",
  corporate: "شركات",
  coffee: "قهوة عربية",
  vip: "ضيافة VIP",
};

const categories = [
  { key: "all", label: "الكل" },
  ...CATEGORY_VALUES.map((key: string) => ({ key, label: CATEGORY_LABELS[key as keyof typeof CATEGORY_LABELS] ?? key })),
];

function isVideo(url: string) {
  return /\.(mp4|webm|ogg)(\?|$)/i.test(url);
}

type DbPortfolioItem = {
  id: number;
  title: string;
  imageUrl: string;
  category: string;
  createdAt: Date;
  type?: undefined;
};

type CombinedItem = DbPortfolioItem | (InstagramPortfolioItem & { id: string });

function InstagramEmbed({ postId, className }: { postId: string; className?: string }) {
  useEffect(() => {
    if (typeof window !== "undefined" && window.instgrm) {
      window.instgrm.Embeds.process();
    }
  }, [postId]);

  return (
    <div className={className} style={{ minHeight: 480 }}>
      <blockquote
        className="instagram-media"
        data-instgrm-captioned
        data-instgrm-permalink={`https://www.instagram.com/p/${postId}/`}
        data-instgrm-version="14"
        style={{
          background: "#161616",
          border: "1px solid rgba(200,164,92,0.12)",
          borderRadius: "4px",
          margin: 0,
          padding: 0,
          width: "100%",
          minWidth: "unset",
          maxWidth: "100%",
        }}
      />
    </div>
  );
}

export default function Portfolio() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [selectedItem, setSelectedItem] = useState<DbPortfolioItem | null>(null);
  const { data: dbItems = [], isLoading } = trpc.portfolio.list.useQuery();

  const igItems: (InstagramPortfolioItem & { id: string })[] = INSTAGRAM_PORTFOLIO_ITEMS.map((item) => ({
    ...item,
    id: `ig-${item.instagramId}`,
  }));

  const allItems: CombinedItem[] = [...dbItems, ...igItems];

  const featuredItems = dbItems.slice(0, 3);
  const filteredItems: CombinedItem[] =
    activeCategory === "all"
      ? allItems
      : allItems.filter((item) => item.category === activeCategory);

  return (
    <div className="min-h-screen bg-surface">
      <Navbar />
      <main className="pt-20">
        <section className="py-20 px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}>
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

        {isLoading ? (
          <div className="flex justify-center py-24">
            <div className="w-8 h-8 border-2 border-gold border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (
          <section className="py-16 px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
              {featuredItems.length > 0 && (
                <>
                  <motion.div
                    variants={fadeSlideUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="flex items-center gap-3 mb-8"
                  >
                    <div className="w-7 h-7 bg-gold/8 border border-gold/15 rounded flex items-center justify-center">
                      <Award className="w-3.5 h-3.5 text-gold/70" />
                    </div>
                    <h2 className="text-xl text-cream" style={{ fontFamily: "'Noto Serif Arabic', serif", fontWeight: 500 }}>
                      أبرز الأعمال
                    </h2>
                  </motion.div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-14">
                    {featuredItems.map((item, index) => (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.65, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
                        className={`group relative rounded overflow-hidden cursor-pointer ${index === 0 ? "md:col-span-2 lg:col-span-1 aspect-[4/3] lg:aspect-[3/4]" : "aspect-[4/3]"}`}
                        onClick={() => setSelectedItem(item)}
                      >
                        {isVideo(item.imageUrl) ? (
                          <video autoPlay loop muted playsInline className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105">
                            <source src={item.imageUrl} type="video/mp4" />
                          </video>
                        ) : (
                          <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-surface/90 via-surface/20 to-transparent opacity-70 group-hover:opacity-100 transition-opacity duration-400" />
                        <div className="absolute bottom-0 right-0 left-0 p-5">
                          <span className="inline-block text-gold/60 text-xs tracking-widest uppercase mb-1.5">
                            {categories.find((c) => c.key === item.category)?.label}
                          </span>
                          <h3 className="text-cream text-base font-medium" style={{ fontFamily: "'Noto Serif Arabic', serif" }}>
                            {item.title}
                          </h3>
                        </div>
                        {index === 0 && (
                          <div className="absolute top-4 right-4 bg-gold/90 text-surface text-xs font-bold px-2.5 py-1 rounded">مميز</div>
                        )}
                      </motion.div>
                    ))}
                  </div>

                  <div className="divider-gold mb-14" />
                </>
              )}

              <div className="flex items-center justify-between mb-8">
                <h2 className="text-lg text-cream" style={{ fontFamily: "'Noto Serif Arabic', serif", fontWeight: 500 }}>
                  جميع الأعمال
                </h2>
                <div className="flex flex-wrap gap-2">
                  {categories.map((cat) => (
                    <button
                      key={cat.key}
                      onClick={() => setActiveCategory(cat.key)}
                      className={`px-3.5 py-1.5 rounded text-xs font-medium tracking-wide transition-all duration-300 ${
                        activeCategory === cat.key
                          ? "bg-gold text-surface"
                          : "bg-surface-light text-cream/45 hover:text-cream/70 border border-gold/10 hover:border-gold/20"
                      }`}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>
              </div>

              <motion.div layout className="columns-2 md:columns-3 gap-3 space-y-3">
                <AnimatePresence mode="popLayout">
                  {filteredItems.map((item, index) => {
                    if (item.type === "instagram") {
                      return (
                        <motion.div
                          key={item.id}
                          layout
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.95 }}
                          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                          className="break-inside-avoid"
                        >
                          <InstagramEmbed postId={item.instagramId} />
                        </motion.div>
                      );
                    }

                    const dbItem = item as DbPortfolioItem;
                    return (
                      <motion.div
                        key={dbItem.id}
                        layout
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                        className={`group relative rounded overflow-hidden break-inside-avoid cursor-pointer ${index % 3 === 0 ? "aspect-[3/4]" : "aspect-[4/3]"}`}
                        onClick={() => setSelectedItem(dbItem)}
                      >
                        {isVideo(dbItem.imageUrl) ? (
                          <video autoPlay loop muted playsInline className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105">
                            <source src={dbItem.imageUrl} type="video/mp4" />
                          </video>
                        ) : (
                          <img src={dbItem.imageUrl} alt={dbItem.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-surface/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
                        <div className="absolute bottom-0 right-0 left-0 p-3 translate-y-2 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-400">
                          <h4 className="text-cream text-xs font-medium">{dbItem.title}</h4>
                          <p className="text-gold/60 text-xs">{categories.find((c) => c.key === dbItem.category)?.label}</p>
                        </div>
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
              </motion.div>
            </div>
          </section>
        )}
      </main>
      <Footer />
      <WhatsAppButton />

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
              {isVideo(selectedItem.imageUrl) ? (
                <video autoPlay loop muted playsInline controls className="w-full max-h-[80vh] object-contain">
                  <source src={selectedItem.imageUrl} type="video/mp4" />
                </video>
              ) : (
                <img src={selectedItem.imageUrl} alt={selectedItem.title} className="w-full max-h-[80vh] object-contain" />
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
