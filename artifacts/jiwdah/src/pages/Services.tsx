import { useState } from "react";
import { Link } from "react-router";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Crown, Calendar, X, Check, Star } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { SERVICES } from "@/const";
import { fadeSlideUp, staggerChildren, drawerSlide, overlayFade } from "@/lib/motion";

const iconMap: Record<string, React.ElementType> = { Heart, Crown, Calendar };

const SIGNATURE = SERVICES.slice(0, 1);
const COMPLETE = SERVICES.slice(1);

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
            <div className="relative h-64 overflow-hidden shrink-0">
              <img src={service.image} alt={service.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#141414] to-transparent" />
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
        {/* Header */}
        <section className="py-20 px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <motion.div variants={fadeSlideUp} initial="hidden" animate="visible">
              <div className="section-eyebrow mb-5">خدماتنا</div>
              <h1
                className="text-4xl md:text-6xl text-cream leading-tight mb-5 max-w-2xl"
                style={{ fontFamily: "'Noto Serif Arabic', serif", fontWeight: 500 }}
              >
                حلول ضيافة <span className="text-gradient-gold">شاملة</span>
              </h1>
              <p className="text-cream/45 text-base max-w-lg font-light leading-relaxed">
                نقدم مجموعة من خدمات الضيافة المتنقلة لتلبية جميع احتياجات مناسبتك في سلطنة عمان.
              </p>
            </motion.div>
          </div>
        </section>

        <div className="divider-gold mx-6 lg:mx-8 max-w-7xl xl:mx-auto" />

        {/* ── SIGNATURE EXPERIENCES ── */}
        <section className="py-20 px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <motion.div variants={fadeSlideUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="flex items-center gap-3 mb-10">
              <div className="w-7 h-7 bg-gold/10 border border-gold/20 rounded flex items-center justify-center">
                <Star className="w-3.5 h-3.5 text-gold" />
              </div>
              <span className="text-gold/70 text-xs tracking-widest uppercase font-medium">التجارب الحصرية</span>
            </motion.div>

            {SIGNATURE.map((service, index) => {
              const IconComponent = iconMap[service.icon] || Crown;
              return (
                <motion.div
                  key={service.id}
                  variants={fadeSlideUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="group border border-gold/15 rounded overflow-hidden cursor-pointer hover:border-gold/35 transition-all duration-500"
                  style={{ background: "linear-gradient(135deg, #1a1a16 0%, #161610 100%)" }}
                  onClick={() => setSelectedService(service)}
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
                    <div className="relative aspect-[4/3] md:aspect-auto overflow-hidden min-h-64">
                      <img
                        src={service.image}
                        alt={service.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-l from-[#1a1a16] to-transparent" />
                    </div>
                    <div className="p-10 lg:p-14 flex flex-col justify-center">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-9 h-9 bg-gold/10 border border-gold/20 rounded flex items-center justify-center">
                          <IconComponent className="w-4.5 h-4.5 text-gold" />
                        </div>
                        <span className="text-gold/60 text-xs tracking-widest uppercase">{`0${index + 1}`}</span>
                      </div>
                      <h2
                        className="text-3xl md:text-4xl text-cream mb-4"
                        style={{ fontFamily: "'Noto Serif Arabic', serif", fontWeight: 500 }}
                      >
                        {service.title}
                      </h2>
                      <p className="text-cream/50 text-sm leading-relaxed mb-6 font-light">{service.description}</p>
                      <div className="flex flex-wrap gap-2 mb-8">
                        {service.features.map((f) => (
                          <span key={f} className="flex items-center gap-1.5 text-xs text-cream/45 border border-gold/12 rounded px-3 py-1.5">
                            <Check className="w-3 h-3 text-gold/50" />
                            {f}
                          </span>
                        ))}
                      </div>
                      <div className="flex items-center gap-6">
                        <span className="text-gold/60 text-sm">يبدأ من <strong className="text-gold text-lg">{service.price} ر.ع</strong></span>
                        <Link to="/contact" className="btn-gold text-xs py-2.5 px-5" onClick={(e) => e.stopPropagation()}>
                          احجز الآن
                        </Link>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </section>

        <div className="divider-gold mx-6 lg:mx-8 max-w-7xl xl:mx-auto" />

        {/* ── COMPLETE SERVICES ── */}
        <section className="py-20 px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <motion.div variants={fadeSlideUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="flex items-center gap-3 mb-10">
              <div className="w-7 h-7 bg-gold/6 border border-gold/10 rounded flex items-center justify-center">
                <Calendar className="w-3.5 h-3.5 text-gold/60" />
              </div>
              <span className="text-cream/40 text-xs tracking-widest uppercase font-medium">الخدمات الشاملة</span>
            </motion.div>

            <motion.div
              variants={staggerChildren}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="space-y-0"
            >
              {COMPLETE.map((service, index) => {
                const IconComponent = iconMap[service.icon] || Crown;
                return (
                  <motion.div
                    key={service.id}
                    variants={fadeSlideUp}
                    className="group border-b border-gold/8 last:border-b-0"
                  >
                    <div
                      className="flex flex-col md:flex-row gap-8 py-10 cursor-pointer"
                      onClick={() => setSelectedService(service)}
                    >
                      <div className="md:w-72 lg:w-80 shrink-0">
                        <div className="relative rounded overflow-hidden aspect-[16/9] md:aspect-[4/3]">
                          <img
                            src={service.image}
                            alt={service.title}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-103"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-surface/40 to-transparent" />
                        </div>
                      </div>
                      <div className="flex-1 flex flex-col justify-center">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-7 h-7 bg-gold/8 border border-gold/12 rounded flex items-center justify-center">
                            <IconComponent className="w-3.5 h-3.5 text-gold/70" />
                          </div>
                          <span className="text-gold/45 text-xs tracking-widest uppercase">{`0${index + 2}`}</span>
                        </div>
                        <h2
                          className="text-2xl md:text-3xl text-cream mb-3 group-hover:text-gold/90 transition-colors duration-400"
                          style={{ fontFamily: "'Noto Serif Arabic', serif", fontWeight: 500 }}
                        >
                          {service.title}
                        </h2>
                        <p className="text-cream/45 text-sm leading-relaxed mb-5 font-light max-w-md">{service.description}</p>
                        <div className="flex flex-wrap gap-2 mb-5">
                          {service.features.map((f) => (
                            <span key={f} className="flex items-center gap-1.5 text-xs text-cream/40 border border-gold/8 rounded px-2.5 py-1">
                              <Check className="w-3 h-3 text-gold/50" />
                              {f}
                            </span>
                          ))}
                        </div>
                        <div className="flex items-center gap-6">
                          <span className="text-gold/55 text-sm">يبدأ من <strong className="text-gold">{service.price} ر.ع</strong></span>
                          <button className="text-cream/35 text-sm hover:text-gold transition-colors duration-300">
                            التفاصيل ←
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 px-6 lg:px-8">
          <div className="max-w-7xl mx-auto text-center">
            <motion.div variants={fadeSlideUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <p className="text-cream/40 text-sm mb-5 font-light">هل لديك سؤال أو تريد خدمة مخصصة؟</p>
              <Link to="/contact" className="btn-gold">تواصل مع فريقنا</Link>
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
