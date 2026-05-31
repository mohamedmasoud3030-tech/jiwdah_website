import { MessageCircle } from "lucide-react";
import { SITE_CONFIG } from "@/config/site";

export default function WhatsAppButton() {
  if (!SITE_CONFIG.primaryWhatsApp) return null;

  return (
    <a
      href={`https://wa.me/${SITE_CONFIG.primaryWhatsApp}`}
      target="_blank"
      rel="noopener noreferrer"
      className="whatsapp-fab"
      aria-label="WhatsApp"
    >
      <MessageCircle size={20} />
    </a>
  );
}
