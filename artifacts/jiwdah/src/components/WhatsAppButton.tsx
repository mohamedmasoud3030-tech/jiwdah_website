import { MessageCircle } from "lucide-react";
import { WHATSAPP_NUMBER } from "@/const";

export default function WhatsAppButton() {
  return (
    <a
      href={`https://wa.me/${WHATSAPP_NUMBER}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-7 left-7 z-50 flex items-center justify-center w-12 h-12 rounded-full shadow-[0_4px_20px_rgba(0,0,0,0.4)] transition-all duration-300 hover:scale-105 hover:shadow-[0_8px_30px_rgba(0,0,0,0.5)]"
      style={{ backgroundColor: "#25D366" }}
      aria-label="تواصل عبر واتساب"
    >
      <MessageCircle className="w-5 h-5 text-white" />
    </a>
  );
}
