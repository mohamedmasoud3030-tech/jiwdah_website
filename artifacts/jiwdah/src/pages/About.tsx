import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Target, Heart, Shield, Award, Users, MapPin, Plus, Minus } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { Link } from "react-router";
import { FAQS } from "@/const";
import { trpc } from "@/providers/trpc";
import { fadeSlideUp, staggerChildren, slowReveal } from "@/lib/motion";

const team = [
  {
    name: "أحمد الرحبي",
    role: "المدير التنفيذي والمؤسس",
    image: "/images/team_1.webp",
    bio: "أكثر من عشر سنوات من الخبرة في قطاع الضيافة العُمانية. أسّس جودة الإنطلاقة من نزوى برؤية واضحة لرفع مستوى الضيافة المتنقلة في السلطنة، وقاد الشركة لتصبح اسماً موثوقاً في أرقى المناسبات.",
  },
  {
    name: "سالم الحارثي",
    role: "مدير العمليات",
    image: "/images/team_2.webp",
    bio: "خبير في إدارة الفرق الميدانية وتنسيق الفعاليات الكبرى. يضمن سالم أن تسير كل مناسبة بسلاسة تامة، من التجهيز الأول حتى آخر لحظة في الحفل.",
  },
  {
    name: "خالد البلوشي",
    role: "رئيس فريق الضيافة",
    image: "/images/team.jpg",
    bio: "متخصص في فنون الضيافة العربية الأصيلة والتقديم الاحترافي. يتولى خالد تدريب الطواقم وضمان الالتزام بأعلى معايير الجودة في كل تفصيلة.",
  },
];

const values = [
  { icon: Award, title: "التميز", description: "أعلى معايير الجودة في كل خدمة" },
  { icon: Heart, title: "الشغف", description: "نحب ما نفعله ونعكسه في تفاصيل عملنا" },
  { icon: Shield, title: "الموثوقية", description: "نلتزم بوعودنا في كل مناسبة" },
  { icon: Target, title: "الابتكار", description: "حلول مبتكرة لتجارب فريدة لا تُنسى" },
];

function InstagramEmbed({ postId, className }: { postId: string; className?: string }) {
  useEffect(() => {
    if (typeof window !== "undefined" && window.instgrm) {
      window.instgrm.Embeds.process();
    }
  }, [postId]);

  return (
    <div className={className}>
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

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-gold/8 last:border-b-0">
      <button onClick={() => setIsOpen(!isOpen)} className="w-full flex items-center justify-between py-5 text-right group">
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
  const { data: igPosts = [] } = trpc.instagramPosts.list.useQuery();
  const aboutPost = igPosts.find((p) => p.section === "about");
  const teamPosts = igPosts.filter((p) => p.section === "team").sort((a, b) => a.sortOrder - b.sortOrder);

  return (
    <div className="min-h-screen bg-surface">
      <Navbar />

      <section className="relative min-h-screen flex items-end overflow-hidden">
        <motion.div className="absolute inset-0" variants={slowReveal} initial="hidden" animate="visible">
          <img src="/images/team_2.png" alt="مشاريع جودة الإنطلاقة" className="w-full h-full object-cover" />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to top, #0e0e0e 30%, rgba(14,14,14,0.55) 65%, rgba(14,14,14,0.2) 100%)" }} />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to right, rgba(14,14,14,0.6) 0%, transparent 60%)" }} />
        </motion.div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 pb-20 pt-40 w-full">
          <motion.div variants={fadeSlideUp} initial="hidden" animate="visible">
            <div className="section-eyebrow mb-5">من نحن</div>
            <h1
              className="text-5xl md:text-7xl text-cream leading-tight mb-5 max-w-2xl"
              style={{ fontFamily: "'Noto Serif Arabic', serif", fontWeight: 500 }}
            >
              قصة <span className="text-gradient-gold">جودة الإنطلاقة</span>
            </h1>
            <p className="text-cream/55 text-base md:text-lg max-w-lg font-light leading-relaxed">
              رواد خدمات الضيافة المتنقلة في سلطنة عمان منذ أكثر من عشر سنوات
            </p>
          </motion.div>
        </div>
      </section>

      <main>
        <section className="py-24 px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
              <motion.div variants={fadeSlideUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                <h2 className="text-2xl md:text-3xl text-cream mb-6" style={{ fontFamily: "'Noto Serif Arabic', serif", fontWeight: 500 }}>
                  نحن نؤمن بأن الضيافة <span className="text-gold">فن</span>
                </h2>
                <div className="space-y-4 text-cream/50 text-sm leading-relaxed font-light mb-10">
                  <p>
                    تأسست مشاريع جودة الإنطلاقة في نزوى بهدف تقديم خدمات ضيافة استثنائية تليق بأرقى المناسبات.
                    بدأنا رحلتنا بفريق صغير وطموح كبير، واليوم نفخر بكوننا من رواد خدمات الضيافة المتنقلة في سلطنة عمان.
                  </p>
                  <p>
                    نمتلك فريقاً من المحترفين المدربين على أعلى معايير الضيافة العالمية، ونستخدم أفضل المواد
                    والمكونات لضمان تجربة لا تُنسى لكم ولضيوفكم.
                  </p>
                </div>

                <div
                  className="rounded overflow-hidden border border-gold/15"
                  style={{ background: "rgba(200,164,92,0.04)" }}
                >
                  <div className="px-4 pt-4 pb-1">
                    <span className="text-gold/60 text-xs tracking-widest uppercase">من نحن</span>
                  </div>
                  {aboutPost && <InstagramEmbed postId={aboutPost.instagramId} />}
                </div>
              </motion.div>

              <motion.div
                variants={staggerChildren}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="grid grid-cols-2 gap-px"
                style={{ background: "rgba(200,164,92,0.06)" }}
              >
                <motion.div variants={fadeSlideUp} className="p-8" style={{ backgroundColor: "#161616" }}>
                  <div className="w-8 h-8 bg-gold/8 border border-gold/12 rounded flex items-center justify-center mb-4">
                    <Target className="w-4 h-4 text-gold/70" />
                  </div>
                  <h3 className="text-base text-cream mb-2" style={{ fontFamily: "'Noto Serif Arabic', serif", fontWeight: 500 }}>رؤيتنا</h3>
                  <p className="text-cream/45 text-sm leading-relaxed font-light">أن نكون الخيار الأول لخدمات الضيافة المتنقلة في سلطنة عمان.</p>
                </motion.div>
                <motion.div variants={fadeSlideUp} className="p-8" style={{ backgroundColor: "#141414" }}>
                  <div className="w-8 h-8 bg-gold/8 border border-gold/12 rounded flex items-center justify-center mb-4">
                    <Heart className="w-4 h-4 text-gold/70" />
                  </div>
                  <h3 className="text-base text-cream mb-2" style={{ fontFamily: "'Noto Serif Arabic', serif", fontWeight: 500 }}>رسالتنا</h3>
                  <p className="text-cream/45 text-sm leading-relaxed font-light">تقديم ضيافة متنقلة بأعلى معايير الجودة والالتزام التام بمواعيدنا.</p>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>

        <section className="py-16 px-6 lg:px-8 border-y border-gold/6">
          <div className="max-w-7xl mx-auto">
            <motion.div
              variants={staggerChildren}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-x-reverse divide-gold/8"
            >
              {values.map((value) => (
                <motion.div key={value.title} variants={fadeSlideUp} className="flex flex-col items-center text-center px-8 py-8 group">
                  <div className="w-10 h-10 bg-gold/6 border border-gold/12 rounded-full flex items-center justify-center mb-4 group-hover:bg-gold/12 group-hover:border-gold/25 transition-all duration-400">
                    <value.icon className="w-4 h-4 text-gold/65" />
                  </div>
                  <h4 className="text-cream text-sm font-medium mb-1.5" style={{ fontFamily: "'Noto Serif Arabic', serif" }}>{value.title}</h4>
                  <p className="text-cream/35 text-xs leading-relaxed font-light">{value.description}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        <section className="py-24 px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <motion.div variants={fadeSlideUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="mb-12">
              <div className="section-eyebrow mb-4">الفريق</div>
              <h2 className="text-3xl md:text-4xl text-cream" style={{ fontFamily: "'Noto Serif Arabic', serif", fontWeight: 500 }}>
                تعرّف على <span className="text-gradient-gold">فريقنا</span>
              </h2>
            </motion.div>

            <motion.div
              variants={staggerChildren}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-12"
            >
              {team.map((member) => (
                <motion.div key={member.name} variants={fadeSlideUp} className="group relative overflow-hidden rounded border border-gold/6 hover:border-gold/20 transition-all duration-500">
                  <div className="aspect-[3/4] overflow-hidden">
                    <img src={member.image} alt={member.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/60 to-transparent" />
                  </div>
                  <div className="absolute bottom-0 right-0 left-0 p-5">
                    <h4 className="text-cream text-base font-medium mb-0.5" style={{ fontFamily: "'Noto Serif Arabic', serif" }}>{member.name}</h4>
                    <p className="text-gold/70 text-xs mb-3">{member.role}</p>
                    <p className="text-cream/45 text-xs leading-relaxed font-light opacity-0 group-hover:opacity-100 transition-opacity duration-500 max-h-0 group-hover:max-h-24 overflow-hidden transition-all">{member.bio}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            <div className="divider-gold mb-12" />

            <motion.div variants={fadeSlideUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="mb-8">
              <h3 className="text-lg text-cream" style={{ fontFamily: "'Noto Serif Arabic', serif", fontWeight: 500 }}>
                لحظاتنا على <span className="text-gold">إنستغرام</span>
              </h3>
            </motion.div>

            <motion.div
              variants={staggerChildren}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
            >
              {teamPosts.map((post, index) => (
                <motion.div
                  key={post.id}
                  variants={fadeSlideUp}
                  className="rounded overflow-hidden border border-gold/8 hover:border-gold/20 transition-all duration-500"
                  style={{ transitionDelay: `${index * 40}ms` }}
                >
                  <InstagramEmbed postId={post.instagramId} />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        <section className="py-16 px-6 lg:px-8 border-t border-gold/6">
          <div className="max-w-7xl mx-auto">
            <motion.div
              variants={staggerChildren}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-3 gap-10"
            >
              {[
                { icon: Users, title: "طاقم محترف", desc: "فريق مدرب على أعلى معايير الضيافة العالمية بخبرة عشر سنوات." },
                { icon: MapPin, title: "تغطية شاملة", desc: "نخدم جميع مناطق سلطنة عمان دون استثناء، نصلك أينما كنت." },
                { icon: Shield, title: "جودة مضمونة", desc: "مواد أولى فاخرة ومعايير صارمة في كل تفصيلة من تفاصيل عملنا." },
              ].map((item) => (
                <motion.div key={item.title} variants={fadeSlideUp} className="flex items-start gap-4">
                  <div className="w-9 h-9 bg-gold/8 border border-gold/12 rounded flex items-center justify-center shrink-0">
                    <item.icon className="w-4 h-4 text-gold/70" />
                  </div>
                  <div>
                    <h4 className="text-cream text-sm font-medium mb-1.5">{item.title}</h4>
                    <p className="text-cream/40 text-xs leading-relaxed font-light">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
            <motion.div variants={fadeSlideUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="mt-12 text-center">
              <Link to="/contact" className="btn-gold">تواصل معنا</Link>
            </motion.div>
          </div>
        </section>

        <section className="py-20 px-6 lg:px-8 border-t border-gold/6">
          <div className="max-w-3xl mx-auto">
            <motion.div variants={fadeSlideUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="mb-10">
              <div className="section-eyebrow mb-4">الأسئلة الشائعة</div>
              <h2 className="text-3xl text-cream" style={{ fontFamily: "'Noto Serif Arabic', serif", fontWeight: 500 }}>
                أسئلة <span className="text-gradient-gold">شائعة</span>
              </h2>
            </motion.div>
            <motion.div variants={fadeSlideUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="border border-gold/8 rounded px-6" style={{ backgroundColor: "#161616" }}>
              {FAQS.map((faq) => <FAQItem key={faq.question} question={faq.question} answer={faq.answer} />)}
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
      <WhatsAppButton />
    </div>
  );
}
