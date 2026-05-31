import { SITE_CONFIG } from "@/config/site";

export const WHATSAPP_NUMBER = SITE_CONFIG.primaryWhatsApp;

export const NAV_LINKS = [
  { label: "الرئيسية", href: "/" },
  { label: "الخدمات", href: "/services" },
  { label: "الأعمال", href: "/portfolio" },
  { label: "من أنا", href: "/about" },
  { label: "حلول الذكاء الاصطناعي", href: "/ai-solutions" },
  { label: "تواصل معي", href: "/contact" },
];

export type PlatformServiceId =
  | "software"
  | "web-platforms"
  | "design-branding"
  | "digital-marketing"
  | "content-management"
  | "other";

export const SERVICES: Array<{
  id: PlatformServiceId;
  title: string;
  description: string;
  icon: string;
  features: string[];
}> = [
  {
    id: "software",
    title: "تطوير البرمجيات",
    description: "حلول برمجية يتم تحديد نطاقها وفق احتياج المشروع وأهدافه التشغيلية.",
    icon: "Code2",
    features: ["تحليل الاحتياج", "تخطيط التنفيذ", "تطوير قابل للتوسع"],
  },
  {
    id: "web-platforms",
    title: "تصميم وتطوير المواقع والمنصات",
    description: "بناء تجارب رقمية مرتبة وسريعة تناسب طبيعة النشاط والجمهور المستهدف.",
    icon: "PanelsTopLeft",
    features: ["هيكلة واضحة", "تجربة مستخدم", "واجهات متجاوبة"],
  },
  {
    id: "design-branding",
    title: "التصميم والهوية البصرية",
    description: "تجهيز عناصر بصرية متناسقة تساعد المشروع على الظهور بصورة احترافية.",
    icon: "PenTool",
    features: ["اتجاه بصري", "تصميمات رقمية", "مواد تسويقية"],
  },
  {
    id: "digital-marketing",
    title: "التسويق الرقمي",
    description: "تنظيم حضور المشروع ورسائله التسويقية بما يدعم الوصول والتحويل.",
    icon: "Megaphone",
    features: ["تخطيط الحملات", "تنظيم الرسائل", "تحسين العرض"],
  },
  {
    id: "content-management",
    title: "إدارة المحتوى",
    description: "تخطيط وتجهيز محتوى منظم يخدم أهداف النشاط عبر القنوات الرقمية.",
    icon: "FileText",
    features: ["خطة محتوى", "تنسيق المنشورات", "مراجعة مستمرة"],
  },
  {
    id: "other",
    title: "خدمات أخرى",
    description: "يمكن مناقشة الاحتياجات المركبة أو غير المصنفة وتحديد أفضل مسار لتنفيذها.",
    icon: "Layers3",
    features: ["دراسة الطلب", "تحديد النطاق", "اقتراح المسار"],
  },
];

export const FAQS: Array<{ question: string; answer: string }> = [];
export const TESTIMONIALS: Array<{
  id: number;
  name: string;
  role: string;
  service: string;
  rating: number;
  text: string;
  content: string;
  avatar: string;
}> = [];

export const STATS: Array<{ label: string; value: number; suffix: string }> = [];
export const LOGIN_PATH = "/login";
export const INSTAGRAM_PORTFOLIO_ITEMS: Array<never> = [];
export const ABOUT_INSTAGRAM_POST = "";
export const TEAM_INSTAGRAM_POSTS: string[] = [];
