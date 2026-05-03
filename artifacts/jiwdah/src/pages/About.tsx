import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Award, Users, MapPin, Shield, Target, Heart, Plus, Minus } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { Link } from "react-router";
import { FAQS } from "@/const";

const values = [
  { icon: Award, title: "التميز", description: "نسعى دائماً لتقديم أعلى معايير الجودة في كل خدمة نقدمها." },
  { icon: Heart, title: "الشغف", description: "نحب ما نفعله ونعكس ذلك في كل تفصيلة من تفاصيل عملنا." },
  { icon: Shield, title: "الموثوقية", description: "نلتزم بمواعيدنا ووعودنا دون استثناء في كل مناسبة." },
  { icon: Target, title: "الابتكار", description: "نبتكر حلولاً جديدة لجعل كل مناسبة تجربة فريدة ولا تُنسى." },
];

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-gold/8 last:border-b-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between py-5 text-right group"
      >
        <span className={`text-sm font-medium transition-colors duration-300 leading-relaxed ${isOpen ? "text-gold" : "text-cream/70 group-hover:text-cream"}`}>
          {question}
        </span>
        <span className={`shrink-0 mr-4 transition-colors duration-300 ${isOpen ? "text-gold" : "text-cream/25"}`}>
          {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
        </span>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <p className="text-cream/45 text-sm leading-relaxed pb-5 font-light">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function About() {
  return (
    <div className="min-h-screen bg-surface">
      <Navbar />
      <main className="pt-20">

        {/* Hero */}
        <section className="py-20 px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="section-eyebrow mb-5">من نحن</div>
              <h1
                className="text-4xl md:text-6xl text-cream leading-tight mb-5 max-w-2xl"
                style={{ fontFamily: "'Noto Serif Arabic', serif", fontWeight: 500 }}
              >
                قصة <span className="text-gradient-gold">مشاريع جودة الإنطلاقة</span>
              </h1>
            </motion.div>
          </div>
        </section>

        <div className="divider-gold mx-6 lg:mx-8 max-w-7xl xl:mx-auto" />

        {/* Story */}
        <section className="py-20 px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                className="relative"
              >
                <div className="relative rounded overflow-hidden aspect-[4/5]">
                  <img src="/images/team_2.webp" alt="فريق مشاريع جودة الإنطلاقة" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-surface/60 to-transparent" />
                  <div className="absolute top-4 right-4 w-14 h-14 border-t border-r border-gold/25" />
                  <div className="absolute bottom-4 left-4 w-14 h-14 border-b border-l border-gold/25" />
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              >
                <h2
                  className="text-2xl md:text-3xl text-cream mb-6"
                  style={{ fontFamily: "'Noto Serif Arabic', serif", fontWeight: 500 }}
                >
                  نحن نؤمن بأن الضيافة <span className="text-gold">فن</span>
                </h2>
                <div className="space-y-4 text-cream/50 text-sm leading-relaxed font-light">
                  <p>
                    تأسست مشاريع جودة الإنطلاقة في نزوى، سلطنة عمان، بهدف تقديم خدمات ضيافة
                    استثنائية تليق بأرقى المناسبات. بدأنا رحلتنا بفريق صغير وطموح كبير،
                    واليوم نفخر بكوننا من رواد خدمات الضيافة المتنقلة في سلطنة عمان.
                  </p>
                  <p>
                    نمتلك فريقاً من المحترفين المدربين على أعلى معايير الضيافة العالمية،
                    ونستخدم أفضل المواد والمكونات لضمان تجربة لا تُنسى لكم ولضيوفكم.
                  </p>
                  <p>
                    نخدم جميع مناطق سلطنة عمان، ونصل إلى موقعكم أينما كنتم بخدمة ضيافة
                    متنقلة كاملة تشمل جميع احتياجاتكم.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Vision & Mission */}
        <section className="py-16 px-6 lg:px-8 border-y border-gold/6">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-px" style={{ background: "rgba(200,164,92,0.06)" }}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="p-10 md:p-12"
                style={{ backgroundColor: "#161616" }}
              >
                <div className="w-9 h-9 bg-gold/8 border border-gold/12 rounded flex items-center justify-center mb-6">
                  <Target className="w-4 h-4 text-gold/70" />
                </div>
                <h3 className="text-lg text-cream mb-3" style={{ fontFamily: "'Noto Serif Arabic', serif", fontWeight: 500 }}>رؤيتنا</h3>
                <p className="text-cream/45 text-sm leading-relaxed font-light">
                  أن نكون الخيار الأول لخدمات الضيافة المتنقلة في سلطنة عمان،
                  ونقدم تجربة ضيافة استثنائية تفوق توقعات عملائنا في كل مناسبة.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
                className="p-10 md:p-12"
                style={{ backgroundColor: "#141414" }}
              >
                <div className="w-9 h-9 bg-gold/8 border border-gold/12 rounded flex items-center justify-center mb-6">
                  <Heart className="w-4 h-4 text-gold/70" />
                </div>
                <h3 className="text-lg text-cream mb-3" style={{ fontFamily: "'Noto Serif Arabic', serif", fontWeight: 500 }}>رسالتنا</h3>
                <p className="text-cream/45 text-sm leading-relaxed font-light">
                  تقديم خدمات ضيافة متنقلة بأعلى معايير الجودة والاحترافية،
                  مع الالتزام الكامل بمواعيدنا ووعودنا لضمان رضا عملائنا التام.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-20 px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="mb-12"
            >
              <div className="section-eyebrow mb-4">ما نؤمن به</div>
              <h2
                className="text-3xl md:text-4xl text-cream"
                style={{ fontFamily: "'Noto Serif Arabic', serif", fontWeight: 500 }}
              >
                قيمنا <span className="text-gradient-gold">الأساسية</span>
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {values.map((value, index) => (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
                  className="p-6 border border-gold/8 rounded hover:border-gold/20 transition-all duration-500"
                  style={{ backgroundColor: "#161616" }}
                >
                  <div className="w-9 h-9 bg-gold/8 border border-gold/12 rounded flex items-center justify-center mb-5">
                    <value.icon className="w-4 h-4 text-gold/70" />
                  </div>
                  <h4 className="text-cream text-sm font-medium mb-2" style={{ fontFamily: "'Noto Serif Arabic', serif" }}>{value.title}</h4>
                  <p className="text-cream/40 text-xs leading-relaxed font-light">{value.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Us strip */}
        <section className="py-16 px-6 lg:px-8 border-t border-gold/6">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              {[
                { icon: Users, title: "طاقم محترف", desc: "فريق مدرب على أعلى معايير الضيافة العالمية بخبرة عشر سنوات." },
                { icon: MapPin, title: "تغطية شاملة", desc: "نخدم جميع مناطق سلطنة عمان دون استثناء، نصلك أينما كنت." },
                { icon: Shield, title: "جودة مضمونة", desc: "مواد أولى فاخرة ومعايير صارمة في كل تفصيلة من تفاصيل عملنا." },
              ].map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
                  className="flex items-start gap-4"
                >
                  <div className="w-9 h-9 bg-gold/8 border border-gold/12 rounded flex items-center justify-center shrink-0">
                    <item.icon className="w-4 h-4 text-gold/70" />
                  </div>
                  <div>
                    <h4 className="text-cream text-sm font-medium mb-1.5">{item.title}</h4>
                    <p className="text-cream/40 text-xs leading-relaxed font-light">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="mt-12 text-center"
            >
              <Link to="/contact" className="btn-gold">
                تواصل معنا
              </Link>
            </motion.div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-20 px-6 lg:px-8 border-t border-gold/6">
          <div className="max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="mb-10"
            >
              <div className="section-eyebrow mb-4">الأسئلة الشائعة</div>
              <h2
                className="text-3xl text-cream"
                style={{ fontFamily: "'Noto Serif Arabic', serif", fontWeight: 500 }}
              >
                أسئلة <span className="text-gradient-gold">شائعة</span>
              </h2>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="border border-gold/8 rounded px-6"
              style={{ backgroundColor: "#161616" }}
            >
              {FAQS.map((faq) => (
                <FAQItem key={faq.question} question={faq.question} answer={faq.answer} />
              ))}
            </motion.div>
          </div>
        </section>

      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}
