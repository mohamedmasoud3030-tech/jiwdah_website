import { MessageCircle } from "lucide-react";
import { SITE_CONFIG } from "@/config/site";

export default function WhatsAppFAB() {
  return <a className="lena-whatsapp-fab" href={SITE_CONFIG.whatsappUrl} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp"><MessageCircle size={20} /></a>;
}
