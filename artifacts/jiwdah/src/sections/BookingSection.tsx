import { useState } from "react";
import { motion } from "framer-motion";
import { MessageSquare, Phone, Check, AlertCircle } from "lucide-react";
import { SERVICES, WHATSAPP_NUMBER } from "@/const";
import { trpc } from "@/providers/trpc";
import type { ServiceValue } from "@workspace/api-client-react";

const OMANI_PHONE_RE = /^(\+9689\d{7}|09\d{7})$/;

export default function BookingSection() {
  const [formData, setFormData] = useState({ name: "", phone: "", service: "" });
  const [phoneError, setPhoneError] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const createLead = trpc.leads.create.useMutation({
    onSuccess: () => {
      setIsSubmitted(true);
      setFormData({ name: "", phone: "", service: "" });
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (name === "phone") {
      const cleaned = value.replace(/\s/g, "");
      setPhoneError(cleaned && !OMANI_PHONE_RE.test(cleaned) ? "رقم غير صحيح. مثال: +96891234567 أو 091234567" : "");
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleaned = formData.phone.replace(/\s/g, "");
    if (!OMANI_PHONE_RE.test(cleaned)) {
      setPhoneError("رقم غير صحيح. مثال: +96891234567 أو 091234567");
      return;
    }
    createLead.mutate({
      name: formData.name,
      phone: cleaned,
      service: formData.service as ServiceValue,
      source: "home",
    });
  };

  const openWhatsApp = () => {
    const msg = encodeURIComponent("مرحباً مشاريع جودة الإنطلاقة،\nأرغب في الاستفسار عن خدماتكم.");
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`, "_blank", "noopener,noreferrer");
  };

  const inputClass =
    "w-full bg-transparent border-b text-cream text-sm placeholder:text-cream/20 focus:outline-none transition-all duration-300 py-3 pb-2.5 border-gold/12 focus:border-gold/40";

  return (
    <section id="booking" className="py-24 px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <div
          className="grid grid-cols-1 md:grid-cols-2 gap-px border border-gold/8 rounded overflow-hidden"
          style={{ background: "rgba(200,164,92,0.06)" }}
        >
          {/* Quick booking form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="p-10 md:p-12 flex flex-col"
            style={{ backgroundColor: "#161616" }}
          >
            {isSubmitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="flex flex-col h-full"
              >
                <div className="w-10 h-10 bg-gold/10 border border-gold/20 rounded-full flex items-center justify-center mb-6">
                  <Check className="w-5 h-5 text-gold" />
                </div>
                <h3
                  className="text-xl text-cream mb-3"
                  style={{ fontFamily: "'Noto Serif Arabic', serif", fontWeight: 500 }}
                >
                  تم استلام طلبك
                </h3>
                <p className="text-cream/45 text-sm leading-relaxed mb-6 font-light flex-1">
                  سنتواصل معك خلال 24 ساعة لتأكيد تفاصيل مناسبتك.
                </p>
                <button onClick={() => setIsSubmitted(false)} className="btn-outline self-start text-sm py-2.5">
                  طلب جديد
                </button>
              </motion.div>
            ) : (
              <>
                <h3
                  className="text-xl text-cream mb-3"
                  style={{ fontFamily: "'Noto Serif Arabic', serif", fontWeight: 500 }}
                >
                  احجز عبر الموقع
                </h3>
                <p className="text-cream/45 text-sm leading-relaxed mb-8 font-light">
                  أرسل تفاصيل مناسبتك وسيتواصل فريقنا معك خلال 24 ساعة.
                </p>
                <form onSubmit={handleSubmit} className="space-y-5 flex-1 flex flex-col">
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
                      <option value="" disabled className="bg-surface text-cream/50">
                        اختر نوع الخدمة
                      </option>
                      {SERVICES.map((s) => (
                        <option key={s.id} value={s.id} className="bg-surface text-cream">
                          {s.title}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-cream/40 text-xs mb-2 tracking-wide">
                      الاسم <span className="text-gold/60">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="اسمك الكامل"
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className="block text-cream/40 text-xs mb-2 tracking-wide">
                      رقم الهاتف <span className="text-gold/60">*</span>
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      placeholder="+968 9XXX XXXX"
                      className={inputClass}
                      dir="ltr"
                    />
                    {phoneError && (
                      <p className="text-red-400/70 text-xs mt-1">{phoneError}</p>
                    )}
                  </div>

                  {createLead.isError && (
                    <div className="flex items-center gap-2 text-red-400/70 text-xs">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      حدث خطأ. يرجى المحاولة مرة أخرى.
                    </div>
                  )}

                  <div className="mt-auto pt-2">
                    <button
                      type="submit"
                      disabled={createLead.isPending}
                      className="btn-gold self-start disabled:opacity-50"
                    >
                      {createLead.isPending ? "جاري الإرسال..." : "إرسال الطلب"}
                    </button>
                  </div>
                </form>
              </>
            )}
          </motion.div>

          {/* WhatsApp / phone contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="p-10 md:p-12 flex flex-col"
            style={{ backgroundColor: "#141414" }}
          >
            <div className="w-10 h-10 bg-gold/8 border border-gold/12 rounded flex items-center justify-center mb-6">
              <MessageSquare className="w-5 h-5 text-gold/70" />
            </div>
            <h3
              className="text-xl text-cream mb-3"
              style={{ fontFamily: "'Noto Serif Arabic', serif", fontWeight: 500 }}
            >
              تواصل مباشرة
            </h3>
            <p className="text-cream/45 text-sm leading-relaxed mb-8 font-light flex-1">
              للاستفسارات السريعة والحجز الفوري، تواصل معنا مباشرة عبر واتساب أو الهاتف.
            </p>
            <div className="flex flex-col gap-3">
              <button
                onClick={openWhatsApp}
                className="btn-outline self-start flex items-center gap-2"
              >
                <MessageSquare className="w-4 h-4" />
                واتساب
              </button>
              {/* TODO: replace with real company phone number if different from WhatsApp number */}
              <a
                href="tel:+96892770091"
                className="flex items-center gap-2 text-cream/40 text-sm hover:text-cream/70 transition-colors duration-300 mt-1"
              >
                <Phone className="w-4 h-4" />
                <span dir="ltr">+968 9277 0091</span>
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
