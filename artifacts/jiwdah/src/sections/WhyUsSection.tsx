import { motion, type Variants } from "framer-motion";
import { Award, Users, MapPin, Shield, Clock, Headphones } from "lucide-react";

const features = [
  { icon: Award, title: "خبرة ١٠+ سنوات", description: "سنوات من الخبرة في خدمات الضيافة الفاخرة بسلطنة عمان" },
  { icon: Users, title: "طاقم مدرب", description: "فريق محترف بأعلى معايير الاحترافية والخدمة الراقية" },
  { icon: MapPin, title: "خدمة متنقلة", description: "نصلك أينما كنت في جميع أنحاء سلطنة عمان" },
  { icon: Shield, title: "جودة مضمونة", description: "مواد أولى فاخرة ومعايير جودة صارمة في كل مناسبة" },
  { icon: Clock, title: "التزام بالمواعيد", description: "نلتزم بالوقت المحدد لضمان سير كل شيء بسلاسة" },
  { icon: Headphones, title: "دعم مستمر", description: "فريق خدمة عملاء متاح قبل المناسبة وبعدها" },
];

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7 } },
};

export default function WhyUsSection() {
  return (
    <section id="why-us" className="py-24 px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Image column */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="relative order-2 lg:order-1"
          >
            <div className="relative rounded overflow-hidden aspect-[4/5]">
              <img
                src="/images/team_1.webp"
                alt="فريق جودة الانطلاقة"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-surface/70 via-transparent to-transparent" />
              {/* Corner accent */}
              <div className="absolute top-4 right-4 w-16 h-16 border-t border-r border-gold/30" />
              <div className="absolute bottom-4 left-4 w-16 h-16 border-b border-l border-gold/30" />
            </div>

            {/* Floating stat */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="absolute -bottom-6 -left-4 sm:-left-8 bg-surface-light border border-gold/20 rounded p-5 shadow-deep"
            >
              <div className="text-center">
                <div className="text-3xl font-bold text-gold" style={{ fontFamily: "'Noto Serif Arabic', serif" }}>٥٠٠+</div>
                <div className="text-cream/50 text-xs mt-1 tracking-wide">مناسبة ناجحة</div>
              </div>
            </motion.div>
          </motion.div>

          {/* Content column */}
          <div className="order-1 lg:order-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="mb-10"
            >
              <div className="section-eyebrow mb-4">لماذا نحن</div>
              <h2
                className="text-3xl md:text-4xl text-cream leading-snug mb-4"
                style={{ fontFamily: "'Noto Serif Arabic', serif", fontWeight: 500 }}
              >
                لماذا تختار{" "}
                <span className="text-gradient-gold">مشاريع جودة الإنطلاقة</span>؟
              </h2>
              <p className="text-cream/55 leading-relaxed font-light">
                نفتخر بتقديم خدمات ضيافة استثنائية تلبي أعلى المعايير. فريقنا المحترف ملتزم بجعل مناسبتك مميزة ولا تُنسى.
              </p>
            </motion.div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-6"
            >
              {features.map((feature) => (
                <motion.div key={feature.title} variants={itemVariants} className="group flex items-start gap-4">
                  <div className="w-10 h-10 bg-gold/8 border border-gold/12 rounded flex items-center justify-center shrink-0 group-hover:bg-gold/15 group-hover:border-gold/25 transition-all duration-300">
                    <feature.icon className="w-5 h-5 text-gold/70" />
                  </div>
                  <div>
                    <h4 className="text-cream text-sm font-semibold mb-1 group-hover:text-gold transition-colors duration-300">
                      {feature.title}
                    </h4>
                    <p className="text-cream/45 text-xs leading-relaxed">{feature.description}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
