import { Link } from "react-router";
import { motion } from "framer-motion";
import { MessageSquare, Phone, ArrowLeft } from "lucide-react";
import { WHATSAPP_NUMBER } from "@/const";

export default function BookingSection() {
  return (
    <section id="booking" className="py-24 px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px border border-gold/8 rounded overflow-hidden" style={{ background: "rgba(200,164,92,0.06)" }}>
          {/* Book online */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="p-10 md:p-12 flex flex-col"
            style={{ backgroundColor: "#161616" }}
          >
            <div className="w-10 h-10 bg-gold/8 border border-gold/12 rounded flex items-center justify-center mb-6">
              <ArrowLeft className="w-5 h-5 text-gold/70" />
            </div>
            <h3 className="text-xl text-cream mb-3" style={{ fontFamily: "'Noto Serif Arabic', serif", fontWeight: 500 }}>
              احجز عبر الموقع
            </h3>
            <p className="text-cream/45 text-sm leading-relaxed mb-8 font-light flex-1">
              أرسل تفاصيل مناسبتك عبر النموذج وسيتواصل فريقنا معك خلال 24 ساعة لتأكيد الحجز.
            </p>
            <Link to="/contact" className="btn-gold self-start">
              نموذج الطلب
            </Link>
          </motion.div>

          {/* WhatsApp */}
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
            <h3 className="text-xl text-cream mb-3" style={{ fontFamily: "'Noto Serif Arabic', serif", fontWeight: 500 }}>
              تواصل مباشرة
            </h3>
            <p className="text-cream/45 text-sm leading-relaxed mb-8 font-light flex-1">
              للاستفسارات السريعة والحجز الفوري، تواصل معنا مباشرة عبر واتساب أو الهاتف.
            </p>
            <div className="flex flex-col gap-3">
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline self-start flex items-center gap-2"
              >
                <MessageSquare className="w-4 h-4" />
                واتساب
              </a>
              <a href="tel:+96892770091" className="flex items-center gap-2 text-cream/40 text-sm hover:text-cream/70 transition-colors duration-300 mt-1">
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
