import { useState } from "react";
import { Link } from "react-router";
import { motion } from "framer-motion";
import { Phone, Calendar, MapPin, Users, MessageSquare, Send } from "lucide-react";
import { trpc } from "@/providers/trpc";
import { SERVICES } from "@/const";

export default function BookingSection() {
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

  if (isSubmitted) {
    return (
      <section id="booking" className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-surface-light border border-gold/20 rounded-2xl p-10 text-center"
          >
            <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <Send className="w-8 h-8 text-green-500" />
            </div>
            <h3 className="text-2xl font-bold text-cream mb-4">
              تم استلام طلبك بنجاح!
            </h3>
            <p className="text-cream-muted mb-6">
              سنتواصل معك خلال 24 ساعة لتأكيد التفاصيل. شكراً لاختياركم جودة الانطلاقة.
            </p>
            <button
              onClick={() => setIsSubmitted(false)}
              className="btn-outline"
            >
              تقديم طلب جديد
            </button>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section id="booking" className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          {/* Info */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2"
          >
            <span className="text-gold text-sm font-semibold tracking-wider uppercase">
              احجز الآن
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-cream mt-3 mb-4">
              احجز خدمتك <span className="text-gradient-gold">الآن</span>
            </h2>
            <p className="text-cream-muted mb-8 leading-relaxed">
              املأ النموذج وسنتواصل معك خلال 24 ساعة. يمكنك أيضاً التواصل معنا
              مباشرة عبر واتساب.
            </p>

            <div className="space-y-4 mb-8">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gold/10 rounded-xl flex items-center justify-center">
                  <Phone className="w-5 h-5 text-gold" />
                </div>
                <div>
                  <p className="text-cream-muted text-sm">اتصل بنا</p>
                  <p className="text-cream font-semibold" dir="ltr">+968 XXXX XXXX</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gold/10 rounded-xl flex items-center justify-center">
                  <MessageSquare className="w-5 h-5 text-gold" />
                </div>
                <div>
                  <p className="text-cream-muted text-sm">واتساب</p>
                  <p className="text-cream font-semibold" dir="ltr">+968 XXXX XXXX</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gold/10 rounded-xl flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-gold" />
                </div>
                <div>
                  <p className="text-cream-muted text-sm">الموقع</p>
                  <p className="text-cream font-semibold">نزوى، سلطنة عمان</p>
                </div>
              </div>
            </div>

            <Link to="/contact" className="btn-gold">
              تواصل معنا مباشرة
            </Link>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-3"
          >
            <form
              onSubmit={handleSubmit}
              className="bg-surface-light border border-gold/10 rounded-2xl p-6 md:p-8 space-y-6"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Name */}
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

                {/* Phone */}
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

                {/* Service */}
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
                    <option value="" disabled>
                      اختر الخدمة
                    </option>
                    {SERVICES.map((s) => (
                      <option key={s.id} value={s.title}>
                        {s.title}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Event Date */}
                <div>
                  <label className="block text-cream text-sm font-semibold mb-2">
                    <Calendar className="w-4 h-4 inline-block ml-1" />
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

                {/* Location */}
                <div>
                  <label className="block text-cream text-sm font-semibold mb-2">
                    <MapPin className="w-4 h-4 inline-block ml-1" />
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

                {/* Guests */}
                <div>
                  <label className="block text-cream text-sm font-semibold mb-2">
                    <Users className="w-4 h-4 inline-block ml-1" />
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

              {/* Notes */}
              <div>
                <label className="block text-cream text-sm font-semibold mb-2">
                  ملاحظات إضافية
                </label>
                <textarea
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                  rows={3}
                  placeholder="أي تفاصيل إضافية عن مناسبتك..."
                  className="w-full bg-surface border border-gold/20 rounded-lg px-4 py-3 text-cream placeholder:text-cream-muted/50 focus:outline-none focus:border-gold transition-colors resize-none"
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={createLead.isPending}
                className="btn-gold w-full disabled:opacity-50"
              >
                {createLead.isPending ? "جاري الإرسال..." : "إرسال الطلب"}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
