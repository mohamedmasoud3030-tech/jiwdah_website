import { useState } from "react";
import { Link } from "react-router";
import { motion } from "framer-motion";
import {
  Heart, Gem, Users, Calendar, Building2, Coffee,
  UtensilsCrossed, Clock, Crown, LayoutGrid, UserCheck, Truck,
  ArrowLeft, Check, X,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { SERVICES } from "@/const";

const iconMap: Record<string, React.ElementType> = {
  Heart, Gem, Users, Calendar, Building2, Coffee,
  UtensilsCrossed, Clock, Crown, LayoutGrid, UserCheck, Truck,
};

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function Services() {
  const [selectedService, setSelectedService] = useState<(typeof SERVICES)[0] | null>(null);

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
                خدماتنا
              </span>
              <h1 className="text-3xl md:text-5xl font-bold text-cream mt-3 mb-4">
                حلول ضيافة <span className="text-gradient-gold">شاملة</span>
              </h1>
              <p className="text-cream-muted max-w-2xl mx-auto">
                نقدم مجموعة واسعة من خدمات الضيافة المتنقلة لتلبية جميع احتياجات مناسبتك
              </p>
            </motion.div>
          </div>
        </section>

        {/* Services Grid */}
        <section className="pb-24 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {SERVICES.map((service) => {
                const IconComponent = iconMap[service.icon] || Crown;
                return (
                  <motion.div
                    key={service.id}
                    variants={itemVariants}
                    className="group bg-surface-light border border-gold/10 rounded-xl overflow-hidden card-hover cursor-pointer"
                    onClick={() => setSelectedService(service)}
                  >
                    <div className="relative h-52 overflow-hidden">
                      <img
                        src={service.image}
                        alt={service.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-surface-light via-transparent to-transparent" />
                      <div className="absolute top-4 right-4 w-10 h-10 bg-gold/20 backdrop-blur-sm rounded-lg flex items-center justify-center">
                        <IconComponent className="w-5 h-5 text-gold" />
                      </div>
                    </div>

                    <div className="p-5">
                      <h3 className="text-lg font-bold text-cream mb-2 group-hover:text-gold transition-colors">
                        {service.title}
                      </h3>
                      <p className="text-cream-muted text-sm leading-relaxed mb-4">
                        {service.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-gold font-bold">
                          يبدأ من {service.price} ر.ع
                        </span>
                        <span className="flex items-center gap-1 text-gold text-sm opacity-0 group-hover:opacity-100 transition-opacity">
                          التفاصيل
                          <ArrowLeft className="w-4 h-4" />
                        </span>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppButton />

      {/* Service Modal */}
      {selectedService && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
          onClick={() => setSelectedService(null)}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-surface-light border border-gold/20 rounded-2xl max-w-lg w-full overflow-hidden max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative h-48">
              <img
                src={selectedService.image}
                alt={selectedService.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-surface-light to-transparent" />
              <button
                onClick={() => setSelectedService(null)}
                className="absolute top-4 right-4 w-8 h-8 bg-surface/80 rounded-full flex items-center justify-center text-cream hover:text-gold transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6">
              <h3 className="text-xl font-bold text-cream mb-3">{selectedService.title}</h3>
              <p className="text-cream-muted leading-relaxed mb-4">{selectedService.description}</p>

              <div className="flex items-center gap-2 mb-6">
                <span className="text-cream-muted text-sm">يبدأ من</span>
                <span className="text-2xl font-mono text-gold font-bold">{selectedService.price} ر.ع</span>
              </div>

              <div className="space-y-2 mb-6">
                {["طاقم خدمة محترف", "مواد أولى فاخرة", "تنسيق كامل", "ضمان الجودة"].map((item) => (
                  <div key={item} className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-green-500 shrink-0" />
                    <span className="text-cream-muted text-sm">{item}</span>
                  </div>
                ))}
              </div>

              <Link
                to="/contact"
                className="btn-gold w-full text-center block"
                onClick={() => setSelectedService(null)}
              >
                احجز هذه الخدمة
              </Link>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
