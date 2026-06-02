import LenaCta from "@/components/LenaCta";
import ServiceGrid from "@/components/ServiceGrid";
import PublicShell from "@/layouts/PublicShell";
import { useSiteCopy } from "@/hooks/useSiteCopy";
export default function Services() { const copy = useSiteCopy(); return <PublicShell><section className="lena-page lena-container"><p className="lena-kicker">{copy.services.eyebrow}</p><h1 className="lena-page-title">{copy.services.title}</h1><p className="lena-lead">{copy.services.intro}</p></section><section className="lena-section"><div className="lena-container"><ServiceGrid /></div></section><LenaCta /></PublicShell>; }
