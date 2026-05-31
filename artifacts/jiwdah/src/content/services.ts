import type { AppLocale } from "@/providers/preferences";

export type PlatformServiceId =
  | "software"
  | "web-platforms"
  | "design-branding"
  | "digital-marketing"
  | "content-management"
  | "other";

export type PlatformService = {
  id: PlatformServiceId;
  icon: string;
  title: Record<AppLocale, string>;
  description: Record<AppLocale, string>;
  features: Record<AppLocale, string[]>;
};

export const PLATFORM_SERVICES: PlatformService[] = [
  { id: "software", icon: "Code2", title: { ar: "تطوير البرمجيات", en: "Software Development" }, description: { ar: "حلول برمجية يتم تحديد نطاقها وفق احتياج المشروع وأهدافه التشغيلية.", en: "Software solutions scoped around the project's operational needs and objectives." }, features: { ar: ["تحليل الاحتياج", "تخطيط التنفيذ", "تطوير قابل للتوسع"], en: ["Needs analysis", "Execution planning", "Scalable development"] } },
  { id: "web-platforms", icon: "PanelsTopLeft", title: { ar: "تصميم وتطوير المواقع والمنصات", en: "Websites and Platforms" }, description: { ar: "بناء تجارب رقمية مرتبة وسريعة تناسب طبيعة النشاط والجمهور المستهدف.", en: "Building clear and fast digital experiences that fit the business and its audience." }, features: { ar: ["هيكلة واضحة", "تجربة مستخدم", "واجهات متجاوبة"], en: ["Clear structure", "User experience", "Responsive interfaces"] } },
  { id: "design-branding", icon: "PenTool", title: { ar: "التصميم والهوية البصرية", en: "Design and Visual Identity" }, description: { ar: "تجهيز عناصر بصرية متناسقة تساعد المشروع على الظهور بصورة احترافية.", en: "Creating cohesive visual assets that present the project professionally." }, features: { ar: ["اتجاه بصري", "تصميمات رقمية", "مواد تسويقية"], en: ["Visual direction", "Digital designs", "Marketing assets"] } },
  { id: "digital-marketing", icon: "Megaphone", title: { ar: "التسويق الرقمي", en: "Digital Marketing" }, description: { ar: "تنظيم حضور المشروع ورسائله التسويقية بما يدعم الوصول والتحويل.", en: "Organizing the project's digital presence and messages to support reach and conversion." }, features: { ar: ["تخطيط الحملات", "تنظيم الرسائل", "تحسين العرض"], en: ["Campaign planning", "Message structure", "Offer improvement"] } },
  { id: "content-management", icon: "FileText", title: { ar: "إدارة المحتوى", en: "Content Management" }, description: { ar: "تخطيط وتجهيز محتوى منظم يخدم أهداف النشاط عبر القنوات الرقمية.", en: "Planning and preparing structured content across digital channels." }, features: { ar: ["خطة محتوى", "تنسيق المنشورات", "مراجعة مستمرة"], en: ["Content planning", "Post preparation", "Continuous review"] } },
  { id: "other", icon: "Layers3", title: { ar: "خدمات أخرى", en: "Other Services" }, description: { ar: "مناقشة الاحتياجات المركبة أو غير المصنفة وتحديد أفضل مسار لتنفيذها.", en: "Discussing complex or uncategorized needs and defining the best execution path." }, features: { ar: ["دراسة الطلب", "تحديد النطاق", "اقتراح المسار"], en: ["Request assessment", "Scope definition", "Recommended path"] } },
];
