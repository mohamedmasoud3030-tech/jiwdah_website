import { useState } from "react";
import { Link } from "react-router";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Crown, Calendar, X, Check, ArrowLeft } from "lucide-react";
import { SERVICES } from "@/const";

const iconMap: Record<string, React.ElementType> = { Heart, Crown, Calendar };

interface ServiceDrawerProps {
  service: (typeof SERVICES)[0] | null;
  onClose: () => void;
}

function ServiceDrawer({ service, onClose }: ServiceDrawerProps) {
  const IconComponent = service ? (iconMap[service.icon] || Crown) : Crown;

  return (
    <AnimatePresence>
      {service && (
        <>
          <motion.div
            key="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="drawer-overlay"
            onClick={onClose}
          />
          <motion.div
            key="drawer"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="drawer-panel"
          >
            {/* Image header */}
            <div className="relative h-56 overflow-hidden">
              <img src={service.image} alt={service.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-black/30 to-transparent" />
              <button
                onClick={onClose}
                className="absolute top-5 right-5 w-9 h-9 bg-surface/80 backdrop-blur-sm border border-gold/20 rounded flex items-center justify-center text-cream hover:text-gold transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Content */}
            <div className="p-7">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-9 h-9 bg-gold/10 border border-gold/15 rounded flex items-center justify-center">
                  <IconComponent className="w-4 h-4 text-gold" />
                </div>
                <h3 className="text-xl text-cream" style={{ fontFamily: "'Noto Serif Arabic', serif", fontWeight: 500 }}>{service.title}</h3>
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
                <span className="text-2xl text-gold font-bold" style={{ fontFamily: "'Noto Serif Arabic', serif" }}>
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

  return (
    <section id="services" className="py-24 px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
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
            <Link to="/services" className="flex items-center gap-2 text-gold/70 text-sm hover:text-gold transition-colors duration-300 group shrink-0">
              <span>عرض جميع الخدمات</span>
              <ArrowLeft className="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-1" />
            </Link>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {SERVICES.map((service, index) => {
            const IconComponent = iconMap[service.icon] || Crown;
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="luxury-card group cursor-pointer"
                onClick={() => setSelectedService(service)}
              >
                <div className="relative h-52 overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#181818] via-transparent to-transparent" />
                  <div className="absolute top-4 right-4 w-9 h-9 bg-surface/70 backdrop-blur-sm border border-gold/20 rounded flex items-center justify-center">
                    <IconComponent className="w-4 h-4 text-gold" />
                  </div>
                </div>

                <div className="p-5">
                  <h3 className="text-base text-cream font-medium mb-2 group-hover:text-gold transition-colors duration-300">
                    {service.title}
                  </h3>
                  <p className="text-cream/45 text-sm leading-relaxed mb-4 line-clamp-2 font-light">{service.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-gold/70 text-sm">يبدأ من {service.price} ر.ع</span>
                    <span className="text-gold/50 text-xs group-hover:text-gold transition-colors duration-300">التفاصيل ←</span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      <ServiceDrawer service={selectedService} onClose={() => setSelectedService(null)} />
    </section>
  );
}
