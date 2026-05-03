import { useState } from "react";
import { Link } from "react-router";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Crown, Calendar, X, Check } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
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
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="drawer-panel"
          >
            <div className="relative h-64 overflow-hidden shrink-0">
              <img src={service.image} alt={service.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#141414] to-transparent" />
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />
              <button
                onClick={onClose}
                className="absolute top-5 right-5 w-9 h-9 bg-surface/70 backdrop-blur-sm border border-gold/20 rounded flex items-center justify-center text-cream/70 hover:text-gold transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-7 overflow-y-auto flex-1">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-9 h-9 bg-gold/8 border border-gold/12 rounded flex items-center justify-center">
                  <IconComponent className="w-4 h-4 text-gold" />
                </div>
                <h3 className="text-xl text-cream" style={{ fontFamily: "'Noto Serif Arabic', serif", fontWeight: 500 }}>
                  {service.title}
                </h3>
              </div>

              <p className="text-cream/50 text-sm leading-relaxed mb-6 font-light">{service.description}</p>

              <div className="divider-gold mb-6" />

              <div className="mb-6">
                <p className="text-cream/35 text-xs tracking-widest uppercase mb-4">تشمل الخدمة</p>
                <div className="space-y-3">
                  {service.features.map((f) => (
                    <div key={f} className="flex items-center gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-gold/60 shrink-0" />
                      <span className="text-cream/60 text-sm">{f}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="divider-gold mb-6" />

              <div className="flex items-baseline gap-2 mb-8">
                <span className="text-cream/35 text-xs">يبدأ من</span>
                <span className="text-3xl text-gold" style={{ fontFamily: "'Noto Serif Arabic', serif", fontWeight: 600 }}>
                  {service.price}
                </span>
                <span className="text-cream/35 text-sm">ر.ع</span>
              </div>

              <Link to="/contact" className="btn-gold w-full justify-center" onClick={onClose}>
                احجز هذه الخدمة
              </Link>

              <div className="mt-4 text-center">
                <button onClick={onClose} className="text-cream/30 text-xs hover:text-cream/50 transition-colors">
                  إغلاق
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

export default function Services() {
  const [selectedService, setSelectedService] = useState<(typeof SERVICES)[0] | null>(null);

  return (
    <div className="min-h-screen bg-surface">
      <Navbar />
      <main className="pt-20">
        {/* Editorial header */}
        <section className="py-20 px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="section-eyebrow mb-5">خدماتنا</div>
              <h1
                className="text-4xl md:text-6xl text-cream leading-tight mb-5 max-w-2xl"
                style={{ fontFamily: "'Noto Serif Arabic', serif", fontWeight: 500 }}
              >
                حلول ضيافة{" "}
                <span className="text-gradient-gold">شاملة</span>
              </h1>
              <p className="text-cream/45 text-base max-w-lg font-light leading-relaxed">
                نقدم مجموعة من خدمات الضيافة المتنقلة لتلبية جميع احتياجات مناسبتك في سلطنة عمان.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Thin divider */}
        <div className="divider-gold mx-6 lg:mx-8 max-w-7xl xl:mx-auto" />

        {/* Services editorial list */}
        <section className="py-20 px-6 lg:px-8">
          <div className="max-w-7xl mx-auto space-y-0">
            {SERVICES.map((service, index) => {
              const IconComponent = iconMap[service.icon] || Crown;
              return (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
                  className="group border-b border-gold/8 last:border-b-0"
                >
                  <div
                    className="flex flex-col md:flex-row gap-8 py-10 cursor-pointer transition-all duration-300"
                    onClick={() => setSelectedService(service)}
                  >
                    {/* Image */}
                    <div className="md:w-72 lg:w-80 shrink-0">
                      <div className="relative rounded overflow-hidden aspect-[16/9] md:aspect-[4/3]">
                        <img
                          src={service.image}
                          alt={service.title}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-103"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-surface/50 to-transparent" />
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 flex flex-col justify-center">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-7 h-7 bg-gold/8 border border-gold/12 rounded flex items-center justify-center">
                          <IconComponent className="w-3.5 h-3.5 text-gold/70" />
                        </div>
                        <span className="text-gold/50 text-xs tracking-widest uppercase">{`0${index + 1}`}</span>
                      </div>

                      <h2
                        className="text-2xl md:text-3xl text-cream mb-3 group-hover:text-gradient-gold transition-colors duration-300"
                        style={{ fontFamily: "'Noto Serif Arabic', serif", fontWeight: 500 }}
                      >
                        {service.title}
                      </h2>

                      <p className="text-cream/45 text-sm leading-relaxed mb-5 font-light max-w-md">
                        {service.description}
                      </p>

                      <div className="flex flex-wrap gap-2 mb-5">
                        {service.features.map((f) => (
                          <span key={f} className="flex items-center gap-1.5 text-xs text-cream/40 border border-gold/8 rounded px-2.5 py-1">
                            <Check className="w-3 h-3 text-gold/50" />
                            {f}
                          </span>
                        ))}
                      </div>

                      <div className="flex items-center gap-6">
                        <span className="text-gold/60 text-sm">يبدأ من <strong className="text-gold">{service.price} ر.ع</strong></span>
                        <button
                          className="text-cream/40 text-sm hover:text-gold transition-colors duration-300 flex items-center gap-1.5"
                          onClick={(e) => { e.stopPropagation(); setSelectedService(service); }}
                        >
                          عرض التفاصيل
                          <span className="text-xs">←</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* CTA strip */}
        <section className="py-16 px-6 lg:px-8">
          <div className="max-w-7xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <p className="text-cream/40 text-sm mb-5 font-light">هل لديك سؤال أو تريد خدمة مخصصة؟</p>
              <Link to="/contact" className="btn-gold">
                تواصل مع فريقنا
              </Link>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppButton />
      <ServiceDrawer service={selectedService} onClose={() => setSelectedService(null)} />
    </div>
  );
}
