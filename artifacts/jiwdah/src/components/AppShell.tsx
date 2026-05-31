import type { ReactNode } from "react";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import WhatsAppButton from "@/components/WhatsAppButton";
import { usePreferences } from "@/providers/preferences";

export default function AppShell({ children }: { children: ReactNode }) {
  const { locale } = usePreferences();

  return (
    <div className="app-shell min-h-screen">
      <a className="skip-link" href="#main-content">
        {locale === "ar" ? "انتقل إلى المحتوى" : "Skip to content"}
      </a>
      <Navbar />
      <main id="main-content" className="pt-24">{children}</main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}
