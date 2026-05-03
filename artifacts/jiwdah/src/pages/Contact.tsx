import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, Instagram, MapPin, Clock, MessageSquare, Check, ArrowLeft } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { trpc } from "@/providers/trpc";
import type { ServiceValue } from "@workspace/api-client-react";
import { SERVICES, WHATSAPP_NUMBER } from "@/const";
import { fadeSlideUp } from "@/lib/motion";

const STEPS = ["تفاصيل المناسبة", "بياناتك"];

export default function Contact() {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({
    service: "",
    eventDate: "",
    name: "",
    phone: "",
    guests: "",
    location: "",
    notes: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const createLead = trpc.leads.create.useMutation({
    onSuccess: () => {
      setIsSubmitted(true);
      setFormData({ service: "", eventDate: "", name: "", phone: "", guests: "", location: "", notes: "" });
      setStep(0);
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.service) return;
    setStep(1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) return;
    createLead.mutate({
      name: formData.name,
      phone: formData.phone,
      service: formData.service as ServiceValue,
      eventDate: formData.eventDate || undefined,
      location: formData.location || undefined,
      guests: formData.guests ? parseInt(formData.guests) : undefined,
      notes: formData.notes || undefined,
    });
  };

  const openWhatsApp = () => {
    const msg = encodeURIComponent(
      `مرحباً مشاريع جودة الإنطلاقة،\nالاسم: ${formData.name || "[اسمك]"}\nالخدمة: ${formData.service || "[نوع الخدمة]"}\nأرغب في الاستفسار عن خدماتكم.`
    );
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`, "_blank", "noopener,noreferrer");
  };

  const inputClass =
    "w-full bg-transparent border-b text-cream text-sm placeholder:text-cream/20 focus:outline-none transition-all duration-300 py-3 pb-2.5 border-gold/12 focus:border-gold/40";

  return (
    <div className="min-h-screen bg-surface">
      <Navbar />
      <main className="pt-20">
        <section className="py-20 px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <motion.div variants={fadeSlideUp} initial="hidden" animate="visible">
              <div className="section-eyebrow mb-5">تواصل معنا</div>
              <h1
                className="text-4xl md:text-6xl text-cream leading-tight mb-5 max-w-2xl"
                style={{ fontFamily: "'Noto Serif Arabic', serif", fontWeight: 500 }}
              >
                نحن هنا <span className="text-gradient-gold">لمساعدتك</span>
              </h1>
              <p className="text-cream/45 text-base max-w-md font-light">
                أخبرنا عن مناسبتك وسيتواصل فريقنا معك خلال 24 ساعة.
              </p>
            </motion.div>
          </div>
        </section>

        <div className="divider-gold mx-6 lg:mx-8 max-w-7xl xl:mx-auto" />

        <section className="py-20 px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-16">
              <motion.div variants={fadeSlideUp} initial="hidden" animate="visible" className="lg:col-span-2 space-y-10">
                <div>
                  <h3 className="text-xs text-cream/35 tracking-widest uppercase mb-6">معلومات التواصل</h3>
                  <div className="space-y-6">
                    {[
                      { icon: Phone, label: "الهاتف", value: "+968 9277 0091", href: "tel:+96892770091", ltr: true },
                      { icon: MessageSquare, label: "واتساب", value: "+968 9277 0091", href: `https://wa.me/${WHATSAPP_NUMBER}`, ltr: true },
                      { icon: Instagram, label: "إنستقرام", value: "jawdat_alantlaqa_nizwa", href: "https://www.instagram.com/jawdat_alantlaqa_nizwa", ltr: false },
                      { icon: MapPin, label: "الموقع", value: "نزوى، سلطنة عمان", href: "https://maps.app.goo.gl/i4VJX9VKgRsPTsbY7", ltr: false },
                    ].map(({ icon: Icon, label, value, href, ltr }) => (
                      <div key={label} className="flex items-start gap-4 group">
                        <div className="w-8 h-8 bg-gold/6 border border-gold/10 rounded flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-gold/10 transition-colors duration-300">
                          <Icon className="w-3.5 h-3.5 text-gold/60" />
                        </div>
                        <div>
                          <p className="text-cream/30 text-xs tracking-wider mb-1">{label}</p>
                          <a
                            href={href}
                            target={href.startsWith("http") ? "_blank" : undefined}
                            rel="noopener noreferrer"
                            className="text-cream/65 text-sm hover:text-gold transition-colors duration-300"
                            dir={ltr ? "ltr" : undefined}
                          >
                            {value}
                          </a>
                        </div>
                      </div>
                    ))}
                    <div className="flex items-start gap-4">
                      <div className="w-8 h-8 bg-gold/6 border border-gold/10 rounded flex items-center justify-center shrink-0 mt-0.5">
                        <Clock className="w-3.5 h-3.5 text-gold/60" />
                      </div>
                      <div>
                        <p className="text-cream/30 text-xs tracking-wider mb-1">ساعات العمل</p>
                        <p className="text-cream/65 text-sm">السبت – الخميس: ٨ص – ١٠م</p>
                        <p className="text-cream/65 text-sm">الجمعة: ٢م – ١٠م</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="border border-gold/10 rounded p-6" style={{ backgroundColor: "#161616" }}>
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-cream/35 text-xs tracking-widest uppercase">تواصل سريع</p>
                    <span className="text-[10px] text-gold/50 border border-gold/15 rounded px-2 py-0.5">متاح ٢٤/٧</span>
                  </div>
                  <h4 className="text-cream text-sm mb-3 font-medium">للاستفسارات الفورية</h4>
                  <button onClick={openWhatsApp} className="btn-outline w-full justify-center text-xs py-2.5">
                    <MessageSquare className="w-3.5 h-3.5" />
                    واتساب
                  </button>
                </div>
              </motion.div>

              <motion.div variants={fadeSlideUp} initial="hidden" animate="visible" className="lg:col-span-3">
                {isSubmitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.97 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    className="border border-gold/12 rounded p-12 text-center"
                    style={{ backgroundColor: "#161616" }}
                  >
                    <div className="w-12 h-12 bg-gold/10 border border-gold/20 rounded-full flex items-center justify-center mx-auto mb-6">
                      <Check className="w-5 h-5 text-gold" />
                    </div>
                    <h3 className="text-2xl text-cream mb-3" style={{ fontFamily: "'Noto Serif Arabic', serif", fontWeight: 500 }}>
                      تم استلام طلبك
                    </h3>
                    <p className="text-cream/45 text-sm mb-8 font-light">سنتواصل معك خلال 24 ساعة لتأكيد تفاصيل مناسبتك.</p>
                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                      <button onClick={() => setIsSubmitted(false)} className="btn-outline text-sm py-2.5">طلب جديد</button>
                      <button onClick={openWhatsApp} className="btn-ghost text-sm">
                        <MessageSquare className="w-4 h-4" />
                        واتساب
                      </button>
                    </div>
                  </motion.div>
                ) : (
                  <div className="border border-gold/8 rounded overflow-hidden" style={{ backgroundColor: "#161616" }}>
                    <div className="px-8 pt-8 pb-6 border-b border-gold/6">
                      <div className="flex items-center gap-3">
                        {STEPS.map((label, i) => (
                          <div key={label} className="flex items-center gap-3">
                            <div className="flex items-center gap-2">
                              <div
                                className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium transition-all duration-400 ${
                                  i < step
                                    ? "bg-gold/20 border border-gold/40 text-gold"
                                    : i === step
                                    ? "bg-gold text-surface"
                                    : "bg-surface-lighter border border-gold/10 text-cream/30"
                                }`}
                              >
                                {i < step ? <Check className="w-3 h-3" /> : i + 1}
                              </div>
                              <span className={`text-xs transition-colors duration-300 ${i === step ? "text-cream/70" : "text-cream/30"}`}>
                                {label}
                              </span>
                            </div>
                            {i < STEPS.length - 1 && (
                              <div
                                className="flex-1 h-px w-8"
                                style={{ backgroundColor: i < step ? "rgba(200,164,92,0.3)" : "rgba(200,164,92,0.08)" }}
                              />
                            )}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="px-8 py-8">
                      <AnimatePresence mode="wait">
                        {step === 0 ? (
                          <motion.form
                            key="step-0"
                            initial={{ opacity: 0, x: 16 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -12 }}
                            transition={{ duration: 0.3 }}
                            onSubmit={handleNext}
                            className="space-y-8"
                          >
                            <div>
                              <p className="text-cream/30 text-xs tracking-widest uppercase mb-6">الخطوة الأولى — نوع المناسبة</p>
                              <div className="space-y-6">
                                <div>
                                  <label className="block text-cream/40 text-xs mb-2 tracking-wide">
                                    نوع الخدمة <span className="text-gold/60">*</span>
                                  </label>
                                  <select
                                    name="service"
                                    value={formData.service}
                                    onChange={handleChange}
                                    required
                                    className={inputClass + " appearance-none cursor-pointer"}
                                  >
                                    <option value="" disabled className="bg-surface text-cream/50">اختر نوع الخدمة</option>
                                    {SERVICES.map((s) => (
                                      <option key={s.id} value={s.id} className="bg-surface text-cream">{s.title}</option>
                                    ))}
                                  </select>
                                </div>
                                <div>
                                  <label className="block text-cream/40 text-xs mb-2 tracking-wide">تاريخ المناسبة</label>
                                  <input type="date" name="eventDate" value={formData.eventDate} onChange={handleChange} className={inputClass} />
                                </div>
                              </div>
                            </div>
                            <div className="flex justify-end">
                              <button type="submit" className="btn-gold flex items-center gap-2">
                                التالي <ArrowLeft className="w-4 h-4" />
                              </button>
                            </div>
                          </motion.form>
                        ) : (
                          <motion.form
                            key="step-1"
                            initial={{ opacity: 0, x: 16 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -12 }}
                            transition={{ duration: 0.3 }}
                            onSubmit={handleSubmit}
                            className="space-y-8"
                          >
                            <div>
                              <p className="text-cream/30 text-xs tracking-widest uppercase mb-6">الخطوة الثانية — بياناتك</p>
                              <div className="space-y-5">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                  <div>
                                    <label className="block text-cream/40 text-xs mb-2 tracking-wide">الاسم الكامل <span className="text-gold/60">*</span></label>
                                    <input type="text" name="name" value={formData.name} onChange={handleChange} required placeholder="اسمك الكامل" className={inputClass} />
                                  </div>
                                  <div>
                                    <label className="block text-cream/40 text-xs mb-2 tracking-wide">رقم الهاتف <span className="text-gold/60">*</span></label>
                                    <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required placeholder="+968 XXXX XXXX" className={inputClass} dir="ltr" />
                                  </div>
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                  <div>
                                    <label className="block text-cream/40 text-xs mb-2 tracking-wide">عدد الضيوف</label>
                                    <input type="number" name="guests" value={formData.guests} onChange={handleChange} placeholder="تقريباً" className={inputClass} />
                                  </div>
                                  <div>
                                    <label className="block text-cream/40 text-xs mb-2 tracking-wide">الموقع</label>
                                    <input type="text" name="location" value={formData.location} onChange={handleChange} placeholder="المدينة أو الولاية" className={inputClass} />
                                  </div>
                                </div>
                                <div>
                                  <label className="block text-cream/40 text-xs mb-2 tracking-wide">ملاحظات إضافية</label>
                                  <textarea name="notes" value={formData.notes} onChange={handleChange} rows={3} placeholder="أي تفاصيل تودّ إضافتها..." className={inputClass + " resize-none"} />
                                </div>
                              </div>
                            </div>

                            {createLead.isError && (
                              <p className="text-red-400/70 text-xs">حدث خطأ. يرجى المحاولة مرة أخرى.</p>
                            )}

                            <div className="flex items-center justify-between gap-4">
                              <button type="button" onClick={() => setStep(0)} className="text-cream/30 text-sm hover:text-cream/55 transition-colors duration-300">رجوع</button>
                              <button type="submit" disabled={createLead.isPending} className="btn-gold disabled:opacity-50">
                                {createLead.isPending ? "جاري الإرسال..." : "طلب استشارة خاصة"}
                              </button>
                            </div>
                          </motion.form>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                )}
              </motion.div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}
