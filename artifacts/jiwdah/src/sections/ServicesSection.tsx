import { useState } from "react";
import { Link } from "react-router";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Crown, Calendar, X, Check, ArrowLeft } from "lucide-react";
import { SERVICES } from "@/const";
import { staggerChildren, fadeSlideUp, drawerSlide, overlayFade } from "@/lib/motion";

const iconMap: Record<string, React.ElementType> = { Heart, Crown, Calendar };

function ServiceDrawer({ service, onClose }: { service: (typeof SERVICES)[0] | null; onClose: () => void }) {
  const IconComponent = service ? (iconMap[service.icon] || Crown) : Crown;
  return (
    <AnimatePresence>
      {service && (
        <>
          <motion.div key="overlay" {...overlayFade} className="drawer-overlay" onClick={onClose} />
          <motion.div
            key="drawer"
            initial={drawerSlide.initial}
            animate={drawerSlide.animate}
            exit={drawerSlide.exit}
            transition={drawerSlide.transition}
            className="drawer-panel"
          >
            <div className="relative h-56 overflow-hidden shrink-0">
              <img src={service.image} alt={service.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-black/30 to-transparent" />
              <button
                onClick={onClose}
                className="absolute top-5 right-5 w-9 h-9 bg-surface/80 backdrop-blur-sm border border-gold/20 rounded flex items-center justify-center text-cream hover:text-gold transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="p-7 overflow-y-auto flex-1">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-9 h-9 bg-gold/10 border border-gold/15 rounded flex items-center justify-center">
                  <IconComponent className="w-4 h-4 text-gold" />
                </div>
                <h3 className="text-xl text-cream" style={{ fontFamily: "'Noto Serif Arabic', serif", fontWeight: 500 }}>
                  {service.title}
                </h3>
              </div>
              <p className="text-cream/55 text-sm leading-relaxed mb-6 font-light">{service.description}</p>
              <div className="divider-gold mb-6" />
              <div className="mb-6">
                <p className="text-cream/40 text-xs tracking-wider uppercase mb-3">ما يشمله</p>
                <div className="space-y-2.5">
                  {service.features.map((f) => (
                    <div key={f} className="flex items-center gap-3">
                      <Check className="w-3.5 h-3.5 text-gold/70 shrink-0" />
                      <span className="text-cream/65 text-sm">{f}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="divider-gold mb-6" />
              <div className="flex items-baseline gap-2 mb-7">
                <span className="text-cream/40 text-xs">يبدأ من</span>
                <span className="text-2xl text-gold" style={{ fontFamily: "'Noto Serif Arabic', serif", fontWeight: 600 }}>
                  {service.price} ر.ع
                </span>
              </div>
              <Link to="/contact" className="btn-gold w-full justify-center" onClick={onClose}>
                احجز هذه الخدمة
              </Link>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

export default function ServicesSection() {
  const [selectedService, setSelectedService] = useState<(typeof SERVICES)[0] | null>(null);
  const [featured, ...rest] = SERVICES;

  return (
    <section id="services" className="py-24 px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          variants={fadeSlideUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mb-14"
        >
          <div className="section-eyebrow mb-4">خدماتنا</div>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <h2
              className="text-3xl md:text-4xl text-cream max-w-sm"
              style={{ fontFamily: "'Noto Serif Arabic', serif", fontWeight: 500 }}
            >
              حلول ضيافة <span className="text-gradient-gold">شاملة</span>
            </h2>
            <Link
              to="/services"
              className="flex items-center gap-2 text-gold/70 text-sm hover:text-gold transition-colors duration-300 group shrink-0"
            >
              <span>عرض جميع الخدمات</span>
              <ArrowLeft className="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-1" />
            </Link>
          </div>
        </motion.div>

        <motion.div
          variants={staggerChildren}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-0 border border-gold/8 rounded overflow-hidden"
        >
          {[featured, ...rest].map((service, index) => {
            const IconComponent = iconMap[service.icon] || Crown;
            const isFirst = index === 0;
            return (
              <motion.div
                key={service.id}
                variants={fadeSlideUp}
                onClick={() => setSelectedService(service)}
                className={`group relative cursor-pointer flex flex-col ${
                  index < SERVICES.length - 1 ? "border-b md:border-b-0 md:border-l border-gold/8" : ""
                } hover:bg-surface-light transition-colors duration-400`}
                style={{ backgroundColor: isFirst ? "#1c1c18" : "#181818" }}
              >
                <div className="relative overflow-hidden aspect-[4/3]">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-surface/80 to-transparent" />
                  {isFirst && (
                    <div className="absolute top-4 right-4 px-2.5 py-1 text-[10px] tracking-widest uppercase border border-gold/30 text-gold/80 rounded"
                      style={{ backgroundColor: "rgba(14,14,14,0.7)" }}>
                      حصري
                    </div>
                  )}
                  <div className="absolute top-4 left-4 w-8 h-8 bg-surface/70 backdrop-blur-sm border border-gold/20 rounded flex items-center justify-center">
                    <IconComponent className="w-3.5 h-3.5 text-gold" />
                  </div>
                </div>

                <div className="p-6 flex flex-col flex-1">
                  <div className="flex items-baseline justify-between gap-2 mb-2">
                    <h3
                      className="text-base text-cream font-medium group-hover:text-gold/90 transition-colors duration-300"
                      style={{ fontFamily: "'Noto Serif Arabic', serif" }}
                    >
                      {service.title}
                    </h3>
                    <span className="text-gold/60 text-xs shrink-0">{service.price} ر.ع+</span>
                  </div>
                  <p className="text-cream/40 text-sm leading-relaxed mb-5 font-light line-clamp-2">{service.description}</p>
                  <div className="mt-auto flex items-center justify-between">
                    <div className="flex flex-wrap gap-1.5">
                      {service.features.slice(0, 2).map((f) => (
                        <span key={f} className="text-[10px] text-cream/35 border border-gold/8 rounded px-2 py-0.5">{f}</span>
                      ))}
                    </div>
                    <span className="text-gold/45 text-xs group-hover:text-gold transition-colors duration-300">←</span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      <ServiceDrawer service={selectedService} onClose={() => setSelectedService(null)} />
    </section>
  );
}
