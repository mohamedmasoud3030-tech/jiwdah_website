import { useState, type FormEvent } from "react";
import { MessageCircle, Phone, Send } from "lucide-react";
import AppShell from "@/components/AppShell";
import { SITE_CONFIG } from "@/config/site";
import { useSiteCopy } from "@/hooks/useSiteCopy";
import { usePreferences } from "@/providers/preferences";
import { trpc } from "@/providers/trpc";
import "./contact.css";

type InquiryForm = {
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
};

const EMPTY_FORM: InquiryForm = {
  name: "",
  email: "",
  phone: "",
  service: "",
  message: "",
};

const FORM_COPY = {
  ar: {
    title: "أرسل تفاصيل مشروعك",
    intro: "اكتب احتياجك الأساسي وسأراجع الاستفسار لتحديد الخطوة التالية.",
    name: "الاسم",
    email: "البريد الإلكتروني",
    phone: "رقم الهاتف",
    service: "الخدمة المطلوبة",
    message: "تفاصيل الطلب",
    submit: "إرسال الاستفسار",
    sending: "جارٍ الإرسال...",
    success: "تم إرسال استفسارك بنجاح. سيتم التواصل معك بعد المراجعة.",
    failed: "تعذر إرسال الاستفسار حاليًا. حاول مرة أخرى أو استخدم وسائل التواصل المباشر.",
    optional: "اختياري",
  },
  en: {
    title: "Send your project details",
    intro: "Describe your core requirement and I will review the inquiry to define the next step.",
    name: "Name",
    email: "Email",
    phone: "Phone number",
    service: "Requested service",
    message: "Project details",
    submit: "Send inquiry",
    sending: "Sending...",
    success: "Your inquiry has been sent successfully. I will follow up after reviewing it.",
    failed: "The inquiry could not be sent right now. Try again or use the direct contact options.",
    optional: "Optional",
  },
} as const;

export default function Contact() {
  const copy = useSiteCopy();
  const { locale } = usePreferences();
  const text = FORM_COPY[locale];
  const [form, setForm] = useState<InquiryForm>(EMPTY_FORM);
  const [submitted, setSubmitted] = useState(false);

  const createInquiry = trpc.inquiries.create.useMutation({
    onSuccess: () => {
      setSubmitted(true);
      setForm(EMPTY_FORM);
    },
  });

  function submitInquiry(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(false);
    createInquiry.mutate({
      name: form.name,
      email: form.email || undefined,
      phone: form.phone || undefined,
      service: form.service || undefined,
      message: form.message,
      source: "contact",
    });
  }

  return (
    <AppShell>
      <section className="site-section">
        <div className="site-container">
          <p className="section-kicker">{copy.contact.eyebrow}</p>
          <h1 className="section-title-small">{copy.contact.title}</h1>
          <p className="section-lead">{copy.contact.intro}</p>
        </div>
      </section>

      <section className="site-section" style={{ paddingTop: 0 }}>
        <div className="site-container contact-grid">
          {SITE_CONFIG.phones.length > 0 ? (
            SITE_CONFIG.phones.map((phone) => (
              <article key={phone.tel} className="bento-card contact-card">
                <div>
                  <span className="service-icon"><Phone size={20} /></span>
                  <h2 className="service-title">{copy.contact.call}</h2>
                  <p className="service-description" dir="ltr">{phone.display}</p>
                </div>
                <a className="btn-secondary" href={`tel:${phone.tel}`}>{copy.contact.call}</a>
              </article>
            ))
          ) : (
            <div className="empty-state" aria-live="polite">{copy.contact.notConfigured}</div>
          )}

          {SITE_CONFIG.primaryWhatsApp && (
            <article className="bento-card contact-card">
              <div>
                <span className="service-icon"><MessageCircle size={20} /></span>
                <h2 className="service-title">{copy.contact.whatsapp}</h2>
                <p className="service-description">{copy.contact.intro}</p>
              </div>
              <a
                className="btn-primary"
                href={`https://wa.me/${SITE_CONFIG.primaryWhatsApp}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {copy.contact.whatsapp}
              </a>
            </article>
          )}
        </div>
      </section>

      <section className="site-section contact-form-section">
        <div className="site-container">
          <form className="contact-form bento-card bento-full" onSubmit={submitInquiry}>
            <div>
              <p className="section-kicker">{copy.contact.eyebrow}</p>
              <h2 className="service-title">{text.title}</h2>
              <p className="service-description">{text.intro}</p>
            </div>

            <div className="contact-form-grid">
              <label>
                <span>{text.name}</span>
                <input required value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} />
              </label>
              <label>
                <span>{text.email} <small>{text.optional}</small></span>
                <input type="email" dir="ltr" value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} />
              </label>
              <label>
                <span>{text.phone} <small>{text.optional}</small></span>
                <input dir="ltr" value={form.phone} onChange={(event) => setForm({ ...form, phone: event.target.value })} />
              </label>
              <label>
                <span>{text.service} <small>{text.optional}</small></span>
                <input value={form.service} onChange={(event) => setForm({ ...form, service: event.target.value })} />
              </label>
              <label className="contact-form-wide">
                <span>{text.message}</span>
                <textarea required rows={6} value={form.message} onChange={(event) => setForm({ ...form, message: event.target.value })} />
              </label>
            </div>

            {submitted && <p className="contact-form-success" role="status">{text.success}</p>}
            {createInquiry.error && <p className="contact-form-error" role="alert">{text.failed}</p>}

            <div className="actions-row">
              <button type="submit" className="btn-primary" disabled={createInquiry.isPending}>
                <Send size={17} />
                {createInquiry.isPending ? text.sending : text.submit}
              </button>
            </div>
          </form>
        </div>
      </section>
    </AppShell>
  );
}
