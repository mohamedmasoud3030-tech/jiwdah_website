import { useState } from "react";
import { Link } from "react-router";
import { motion } from "framer-motion";
import { Phone, Instagram, MapPin, Clock, MessageSquare, Send, AlertCircle } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { trpc } from "@/providers/trpc";
import { SERVICES, WHATSAPP_NUMBER } from "@/const";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    service: "",
    eventDate: "",
    location: "",
    guests: "",
    notes: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const createLead = trpc.leads.create.useMutation({
    onSuccess: () => {
      setIsSubmitted(true);
      setFormData({
        name: "",
        phone: "",
        service: "",
        eventDate: "",
        location: "",
        guests: "",
        notes: "",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.service) return;

    createLead.mutate({
      name: formData.name,
      phone: formData.phone,
      service: formData.service,
      eventDate: formData.eventDate || undefined,
      location: formData.location || undefined,
      guests: formData.guests ? parseInt(formData.guests) : undefined,
      notes: formData.notes || undefined,
    });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const openWhatsApp = () => {
    const message = encodeURIComponent(
      `مرحباً مشاريع جودة الإنطلاقة،\nالاسم: ${formData.name || "[اسمك]"}\nالخدمة: ${formData.service || "[نوع الخدمة]"}\nالتاريخ: ${formData.eventDate || "[التاريخ]"}\nأرغب في الاستفسار عن الخدمة.`
    );
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="min-h-screen bg-surface">
      <Navbar />
      <main className="pt-20">
        {/* Header */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="text-gold text-sm font-semibold tracking-wider uppercase">
                تواصل معنا
              </span>
              <h1 className="text-3xl md:text-5xl font-bold text-cream mt-3 mb-4">
                نحن هنا <span className="text-gradient-gold">لمساعدتك</span>
              </h1>
              <p className="text-cream-muted max-w-2xl mx-auto">
                سواء كنت تخطط لمناسبة كبيرة أو صغيرة، فريقنا جاهز لمساعدتك
              </p>
            </motion.div>
          </div>
        </section>

        <section className="pb-24 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
              {/* Contact Info */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="lg:col-span-2 space-y-8"
              >
                <div>
                  <h3 className="text-xl font-bold text-cream mb-6">معلومات التواصل</h3>
                  <div className="space-y-5">
<div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-gold/10 rounded-xl flex items-center justify-center shrink-0">
                          <Phone className="w-5 h-5 text-gold" />
                        </div>
                        <div>
                          <p className="text-cream-muted text-sm">الهاتف</p>
                          <p className="text-cream font-semibold" dir="ltr">+968 9277 0091</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-gold/10 rounded-xl flex items-center justify-center shrink-0">
                          <MessageSquare className="w-5 h-5 text-gold" />
                        </div>
                        <div>
                          <p className="text-cream-muted text-sm">واتساب</p>
                          <p className="text-cream font-semibold" dir="ltr">+968 9277 0091</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-gold/10 rounded-xl flex items-center justify-center shrink-0">
                          <Instagram className="w-5 h-5 text-gold" />
                        </div>
                        <div>
                          <p className="text-cream-muted text-sm">إنستقرام</p>
                          <a href="https://www.instagram.com/jawdat_alantlaqa_nizwa" target="_blank" rel="noopener noreferrer" className="text-cream font-semibold hover:text-gold transition-colors">jawdat_alantlaqa_nizwa</a>
                        </div>
                      </div>

                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-gold/10 rounded-xl flex items-center justify-center shrink-0">
                          <MapPin className="w-5 h-5 text-gold" />
                        </div>
                        <div>
                          <p className="text-cream-muted text-sm">الموقع</p>
                          <a href="https://maps.app.goo.gl/i4VJX9VKgRsPTsbY7" target="_blank" rel="noopener noreferrer" className="text-cream font-semibold hover:text-gold transition-colors">نزوى، سلطنة عمان</a>
                          <p className="text-cream-muted text-xs">نخدم جميع مناطق سلطنة عمان</p>
                        </div>
                      </div>

                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-gold/10 rounded-xl flex items-center justify-center shrink-0">
                        <Clock className="w-5 h-5 text-gold" />
                      </div>
                      <div>
                        <p className="text-cream-muted text-sm">ساعات العمل</p>
                        <p className="text-cream font-semibold">السبت - الخميس: 8 ص - 10 م</p>
                        <p className="text-cream font-semibold">الجمعة: 2 م - 10 م</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Quick WhatsApp */}
                <div className="bg-gold/5 border border-gold/20 rounded-xl p-6">
                  <h4 className="text-gold font-bold mb-2">تواصل سريع عبر واتساب</h4>
                  <p className="text-cream-muted text-sm mb-4">
                    للاستفسارات السريعة والحجز الفوري
                  </p>
                  <button onClick={openWhatsApp} className="btn-gold w-full">
                    <MessageSquare className="w-5 h-5" />
                    تواصل عبر واتساب
                  </button>
                </div>
              </motion.div>

              {/* Form */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="lg:col-span-3"
              >
                {isSubmitted ? (
                  <div className="bg-surface-light border border-gold/20 rounded-2xl p-10 text-center">
                    <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                      <Send className="w-8 h-8 text-green-500" />
                    </div>
                    <h3 className="text-2xl font-bold text-cream mb-4">
                      تم استلام طلبك بنجاح!
                    </h3>
                    <p className="text-cream-muted mb-6">
                      سنتواصل معك خلال 24 ساعة لتأكيد التفاصيل.
                    </p>
                    <div className="flex gap-4 justify-center">
                      <button onClick={() => setIsSubmitted(false)} className="btn-outline">
                        طلب جديد
                      </button>
                      <button onClick={openWhatsApp} className="btn-gold">
                        تواصل عبر واتساب
                      </button>
                    </div>
                  </div>
                ) : (
                  <form
                    onSubmit={handleSubmit}
                    className="bg-surface-light border border-gold/10 rounded-2xl p-6 md:p-8 space-y-6"
                  >
                    <h3 className="text-xl font-bold text-cream mb-2">نموذج الطلب</h3>

                    {createLead.isError && (
                      <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 flex items-center gap-3">
                        <AlertCircle className="w-5 h-5 text-red-500 shrink-0" />
                        <p className="text-red-400 text-sm">
                          حدث خطأ أثناء إرسال الطلب. يرجى المحاولة مرة أخرى.
                        </p>
                      </div>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-cream text-sm font-semibold mb-2">
                          الاسم <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          placeholder="اسمك الكامل"
                          className="w-full bg-surface border border-gold/20 rounded-lg px-4 py-3 text-cream placeholder:text-cream-muted/50 focus:outline-none focus:border-gold transition-colors"
                        />
                      </div>

                      <div>
                        <label className="block text-cream text-sm font-semibold mb-2">
                          رقم الهاتف <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          required
                          placeholder="+968 XXXX XXXX"
                          className="w-full bg-surface border border-gold/20 rounded-lg px-4 py-3 text-cream placeholder:text-cream-muted/50 focus:outline-none focus:border-gold transition-colors"
                          dir="ltr"
                        />
                      </div>

                      <div>
                        <label className="block text-cream text-sm font-semibold mb-2">
                          نوع الخدمة <span className="text-red-500">*</span>
                        </label>
                        <select
                          name="service"
                          value={formData.service}
                          onChange={handleChange}
                          required
                          className="w-full bg-surface border border-gold/20 rounded-lg px-4 py-3 text-cream focus:outline-none focus:border-gold transition-colors appearance-none"
                        >
                          <option value="" disabled>اختر الخدمة</option>
                          {SERVICES.map((s) => (
                            <option key={s.id} value={s.title}>{s.title}</option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-cream text-sm font-semibold mb-2">
                          تاريخ المناسبة
                        </label>
                        <input
                          type="date"
                          name="eventDate"
                          value={formData.eventDate}
                          onChange={handleChange}
                          className="w-full bg-surface border border-gold/20 rounded-lg px-4 py-3 text-cream focus:outline-none focus:border-gold transition-colors"
                        />
                      </div>

                      <div>
                        <label className="block text-cream text-sm font-semibold mb-2">
                          الموقع
                        </label>
                        <input
                          type="text"
                          name="location"
                          value={formData.location}
                          onChange={handleChange}
                          placeholder="مدينة / ولاية"
                          className="w-full bg-surface border border-gold/20 rounded-lg px-4 py-3 text-cream placeholder:text-cream-muted/50 focus:outline-none focus:border-gold transition-colors"
                        />
                      </div>

                      <div>
                        <label className="block text-cream text-sm font-semibold mb-2">
                          عدد الضيوف
                        </label>
                        <input
                          type="number"
                          name="guests"
                          value={formData.guests}
                          onChange={handleChange}
                          placeholder="عدد الضيوف المتوقع"
                          className="w-full bg-surface border border-gold/20 rounded-lg px-4 py-3 text-cream placeholder:text-cream-muted/50 focus:outline-none focus:border-gold transition-colors"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-cream text-sm font-semibold mb-2">
                        ملاحظات إضافية
                      </label>
                      <textarea
                        name="notes"
                        value={formData.notes}
                        onChange={handleChange}
                        rows={4}
                        placeholder="أي تفاصيل إضافية عن مناسبتك..."
                        className="w-full bg-surface border border-gold/20 rounded-lg px-4 py-3 text-cream placeholder:text-cream-muted/50 focus:outline-none focus:border-gold transition-colors resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={createLead.isPending}
                      className="btn-gold w-full disabled:opacity-50"
                    >
                      {createLead.isPending ? "جاري الإرسال..." : "إرسال الطلب"}
                    </button>

                    <button
                      type="button"
                      onClick={openWhatsApp}
                      className="w-full py-3 text-gold text-sm font-semibold hover:underline flex items-center justify-center gap-2"
                    >
                      <MessageSquare className="w-4 h-4" />
                      أو تواصل معنا عبر واتساب
                    </button>
                  </form>
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
