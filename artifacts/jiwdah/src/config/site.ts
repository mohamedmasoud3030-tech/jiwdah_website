const env = import.meta.env;
const display = env.VITE_PRIMARY_PHONE_DISPLAY ?? "91928186";
const tel = env.VITE_PRIMARY_PHONE_TEL ?? "+96891928186";
const whatsapp = env.VITE_PRIMARY_WHATSAPP ?? "96891928186";
const email = env.VITE_CONTACT_EMAIL ?? "Mohamedms.oud@outlook.com";
const message = "مرحبًا LENA، لدي فكرة مشروع وأرغب في معرفة التفاصيل.";
export const SITE_CONFIG = {
  brandName: "LENA",
  brandFullName: "LENA Digital House",
  brandSubtitle: "بيت الحلول الرقمية الإبداعية",
  phone: { display, tel, whatsapp },
  email,
  whatsappUrl: `https://wa.me/${whatsapp}?text=${encodeURIComponent(message)}`,
  emailUrl: `mailto:${email}?subject=${encodeURIComponent("استفسار مشروع جديد — LENA Digital House")}`,
} as const;
