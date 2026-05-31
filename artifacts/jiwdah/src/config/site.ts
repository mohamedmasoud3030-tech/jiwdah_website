const env = import.meta.env;

export const SITE_CONFIG = {
  ownerName: "Mohamed Masoud",
  brandName: "Mohamed Masoud",
  brandSubtitle: "منصة أعمال وخدمات رقمية",
  phones: [
    {
      label: "الرقم الأساسي",
      display: env.VITE_PRIMARY_PHONE_DISPLAY ?? "",
      tel: env.VITE_PRIMARY_PHONE_TEL ?? "",
      whatsapp: env.VITE_PRIMARY_WHATSAPP ?? "",
    },
    {
      label: "رقم إضافي",
      display: env.VITE_SECONDARY_PHONE_DISPLAY ?? "",
      tel: env.VITE_SECONDARY_PHONE_TEL ?? "",
    },
  ].filter((phone) => phone.display && phone.tel),
  primaryWhatsApp: env.VITE_PRIMARY_WHATSAPP ?? "",
  locationLabel: "سلطنة عمان",
} as const;

export const PRIMARY_PHONE = SITE_CONFIG.phones[0];
export const SECONDARY_PHONE = SITE_CONFIG.phones[1];
