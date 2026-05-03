import { MessageCircle } from "lucide-react";
import { WHATSAPP_NUMBER } from "@/const";

export default function WhatsAppButton() {
  return (
    <a
      href={`https://wa.me/${WHATSAPP_NUMBER}`}
      target="_blank"
      rel="noopener noreferrer"
      className="whatsapp-fab"
      aria-label="تواصل عبر واتساب"
    >
      <span className="whatsapp-pulse" />
      <span className="whatsapp-pulse whatsapp-pulse--delay" />
      <MessageCircle className="w-5 h-5 relative z-10" style={{ color: "#c8a45c" }} />
    </a>
  );
}
