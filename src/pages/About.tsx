import { motion } from "framer-motion";
import { Award, Users, MapPin, Shield, Target, Heart } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { Link } from "react-router";

const values = [
  { icon: Award, title: "التميز", description: "نسعى دائماً لتقديم أعلى معايير الجودة في كل خدمة" },
  { icon: Heart, title: "الشغف", description: "نحب ما نفعله ونعكس ذلك في كل تفصيلة" },
  { icon: Shield, title: "الموثوقية", description: "نلتزم بمواعيدنا ووعودنا دون استثناء" },
  { icon: Target, title: "الابتكار", description: "نبتكر حلولاً جديدة لجعل كل مناسبة فريدة" },
];

export default function About() {
  return (
    <div className="min-h-screen bg-surface">
      <Navbar />
      <main className="pt-20">
        {/* Hero */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="text-gold text-sm font-semibold tracking-wider uppercase">
                من نحن
              </span>
              <h1 className="text-3xl md:text-5xl font-bold text-cream mt-3 mb-6">
                قصة <span className="text-gradient-gold">جودة الانطلاقة</span>
              </h1>
            </motion.div>
          </div>
        </section>

        {/* Story */}
        <section className="pb-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
              >
                <div className="relative rounded-2xl overflow-hidden">
                  <img
                    src="/images/team_2.webp"
                    alt="فريق جودة الانطلاقة"
                    className="w-full h-auto object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-surface/60 to-transparent" />
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
              >
                <h2 className="text-2xl md:text-3xl font-bold text-cream mb-4">
                  نحن نؤمن بأن الضيافة <span className="text-gold">فن</span>
                </h2>
                <div className="space-y-4 text-cream-muted leading-relaxed">
                  <p>
                    تأسست جودة الانطلاقة في نزوى، سلطنة عمان، بهدف تقديم خدمات ضيافة
                    استثنائية تليق بأرقى المناسبات. بدأنا رحلتنا بفريق صغير وطموح كبير،
                    واليوم نفخر بكوننا من رواد خدمات الضيافة المتنقلة في سلطنة عمان.
                  </p>
                  <p>
                    نمتلك فريقاً من المحترفين المدربين على أعلى معايير الضيافة العالمية،
                    ونستخدم أفضل المواد والمكونات لضمان تجربة لا تُنسى لكم ولضيوفكم.
                  </p>
                  <p>
                    نخدم جميع مناطق سلطنة عمان، ونصل إلى موقعكم أينما كنتم بخدمة ضيافة
                    متنقلة كاملة تشكل جميع احتياجاتكم.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Vision & Mission */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-surface-light/50">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-surface-light border border-gold/10 rounded-2xl p-8"
              >
                <div className="w-14 h-14 bg-gold/10 rounded-xl flex items-center justify-center mb-6">
                  <Target className="w-7 h-7 text-gold" />
                </div>
                <h3 className="text-xl font-bold text-cream mb-4">رؤيتنا</h3>
                <p className="text-cream-muted leading-relaxed">
                  أن نكون الخيار الأول لخدمات الضيافة المتنقلة في سلطنة عمان،
                  ونقدم تجربة ضيافة استثنائية تفوق توقعات عملائنا في كل مناسبة.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="bg-surface-light border border-gold/10 rounded-2xl p-8"
              >
                <div className="w-14 h-14 bg-gold/10 rounded-xl flex items-center justify-center mb-6">
                  <Heart className="w-7 h-7 text-gold" />
                </div>
                <h3 className="text-xl font-bold text-cream mb-4">رسالتنا</h3>
                <p className="text-cream-muted leading-relaxed">
                  تقديم خدمات ضيافة متنقلة بأعلى معايير الجودة والاحترافية،
                  مع الالتزام الكامل بمواعيدنا ووعودنا لضمان رضا عملائنا التام.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-24 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold text-cream mb-4">
                قيمنا <span className="text-gradient-gold">الأساسية</span>
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value, index) => (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-surface-light border border-gold/10 rounded-xl p-6 text-center hover:border-gold/30 transition-colors"
                >
                  <div className="w-14 h-14 bg-gold/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <value.icon className="w-7 h-7 text-gold" />
                  </div>
                  <h4 className="text-cream font-bold mb-2">{value.title}</h4>
                  <p className="text-cream-muted text-sm">{value.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Us */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-surface-light/50">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold text-cream mb-4">
                لماذا <span className="text-gradient-gold">نحن الأفضل</span>؟
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  icon: Users,
                  title: "طاقم محترف",
                  desc: "فريق مدرب على أعلى معايير الضيافة العالمية",
                },
                {
                  icon: MapPin,
                  title: "تغطية شاملة",
                  desc: "نخدم جميع مناطق سلطنة عمان دون استثناء",
                },
                {
                  icon: Shield,
                  title: "جودة مضمونة",
                  desc: "مواد أولى فاخرة ومعايير صارمة في كل تفصيلة",
                },
              ].map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-start gap-4"
                >
                  <div className="w-12 h-12 bg-gold/10 rounded-xl flex items-center justify-center shrink-0">
                    <item.icon className="w-6 h-6 text-gold" />
                  </div>
                  <div>
                    <h4 className="text-cream font-bold mb-1">{item.title}</h4>
                    <p className="text-cream-muted text-sm">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mt-12"
            >
              <Link to="/contact" className="btn-gold">
                تواصل معنا
              </Link>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}
