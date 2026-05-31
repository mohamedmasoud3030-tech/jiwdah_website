import type { ReactNode } from "react";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import WhatsAppButton from "@/components/WhatsAppButton";

export default function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className="app-shell min-h-screen">
      <Navbar />
      <main className="pt-24">{children}</main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}
