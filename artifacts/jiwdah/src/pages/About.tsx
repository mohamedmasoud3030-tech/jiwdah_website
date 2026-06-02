import { CheckCircle2 } from "lucide-react";
import LenaCta from "@/components/LenaCta";
import ProcessSection from "@/features/home/ProcessSection";
import PublicShell from "@/layouts/PublicShell";
import { useSiteCopy } from "@/hooks/useSiteCopy";
export default function About() { const copy = useSiteCopy(); return <PublicShell><section className="lena-page lena-container"><p className="lena-kicker">{copy.about.eyebrow}</p><h1 className="lena-page-title">{copy.about.title}</h1><p className="lena-lead">{copy.about.intro}</p></section><section className="lena-section"><div className="lena-container lena-bento">{copy.about.approach.map((item, index) => <article className={`lena-glass lena-principle${index === 0 ? " wide" : ""}`} key={item}><small>{String(index + 1).padStart(2, "0")}</small><CheckCircle2 size={18} /><h2>{item}</h2></article>)}</div></section><ProcessSection /><LenaCta /></PublicShell>; }
