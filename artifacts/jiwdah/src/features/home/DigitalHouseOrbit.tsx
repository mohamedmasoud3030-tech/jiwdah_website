import type { PointerEvent } from "react";
const LABELS = ["Strategy", "Branding", "Marketing", "Content", "UI/UX", "Web", "Automation", "AI", "Systems", "Experience"];

export default function DigitalHouseOrbit() {
  function move(event: PointerEvent<HTMLDivElement>) {
    if (window.matchMedia("(max-width: 900px)").matches || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const rect = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty("--orbit-x", `${((event.clientX - rect.left) / rect.width - .5) * 12}px`);
    event.currentTarget.style.setProperty("--orbit-y", `${((event.clientY - rect.top) / rect.height - .5) * 12}px`);
  }
  function reset(event: PointerEvent<HTMLDivElement>) { event.currentTarget.style.setProperty("--orbit-x", "0px"); event.currentTarget.style.setProperty("--orbit-y", "0px"); }
  return <div className="lena-orbit" onPointerMove={move} onPointerLeave={reset} aria-hidden="true"><i className="lena-ring ring-1" /><i className="lena-ring ring-2" /><i className="lena-ring ring-3" /><i className="lena-ring ring-4" /><div className="lena-house"><small>LENA</small><strong>DIGITAL<br />HOUSE</strong><span>Creative systems</span></div>{LABELS.map((label, index) => <span className={`lena-orbit-label label-${index + 1}`} key={label}>{label}</span>)}</div>;
}
