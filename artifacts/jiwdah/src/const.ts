import type { ServiceValue } from "@workspace/api-client-react";

export const WHATSAPP_NUMBER = "96892770091";

export const NAV_LINKS = [
  { label: "الرئيسية", href: "/" },
  { label: "الخدمات", href: "/services" },
  { label: "الأعمال", href: "/portfolio" },
  { label: "من نحن", href: "/about" },
  { label: "تواصل معنا", href: "/contact" },
];

export const SERVICES: Array<{
  id: ServiceValue;
  title: string;
  description: string;
  image: string;
  icon: string;
  price?: string;
  features?: string[];
}> = [
  {
    id: "vip",
    title: "ضيافة VIP",
    description: "خدمات ضيافة ملكية للشخصيات الهامة والمناسبات الرسمية بأعلى معايير الرقي والفخامة.",
    image: "/images/portfolio_1.webp",
    icon: "Crown",
    price: "250",
    features: ["طاقم خدمة نخبوي", "مشروبات فاخرة مختارة", "تنسيق وتجهيز كامل", "ضمان الخصوصية"],
  },
  {
    id: "wedding",
    title: "خدمات الأفراح",
    description: "تنظيم ضيافة متكاملة لحفلات الزفاف، تضمن ليلة العمر بكل تفاصيلها الجمالية والتقليدية.",
    image: "/images/portfolio_2.webp",
    icon: "Heart",
    price: "500",
    features: ["تصميم جلسات فاخرة", "قهوة عربية وتمر", "طاقم نسائي ورجالي", "تغطية شاملة للمناسبة"],
  },
  {
    id: "conference",
    title: "ضيافة المؤتمرات",
    description: "تغطية شاملة للمؤتمرات والفعاليات الرسمية والأعمال في جميع أنحاء السلطنة.",
    image: "/images/team_2.webp",
    icon: "Calendar",
    price: "300",
    features: ["تجهيز ميداني متنقل", "طاقم مدرب ومتخصص", "مرونة في المواعيد", "تغطية جميع مناطق عمان"],
  },
  {
    id: "private",
    title: "المناسبات الخاصة",
    description: "تنظيم ضيافة فاخرة للمناسبات الخاصة والعائلية بلمسة شخصية مميزة.",
    image: "/images/portfolio_2.webp",
    icon: "Star",
    price: "200",
    features: ["تخصيص كامل حسب الطلب", "خصوصية تامة", "طاقم محترف", "تجربة لا تُنسى"],
  },
  {
    id: "corporate",
    title: "ضيافة الشركات",
    description: "خدمات ضيافة احترافية للشركات والمؤسسات تعكس مكانتها وتُبهر شركاءها.",
    image: "/images/team_1.webp",
    icon: "Briefcase",
    price: "400",
    features: ["هوية بصرية للشركة", "طاقم بزي رسمي", "ضيافة كاملة ومتكاملة", "تقارير وتوثيق"],
  },
  {
    id: "coffee",
    title: "ضيافة القهوة العربية",
    description: "تقديم القهوة العربية الأصيلة والتمر في مناسباتكم بأسلوب عماني تقليدي راقٍ.",
    image: "/images/portfolio_1.webp",
    icon: "Coffee",
    price: "150",
    features: ["قهوة عربية أصيلة", "تمر عماني فاخر", "طاقم بالزي التقليدي", "أواني نحاسية تراثية"],
  },
];


export const STATS = [
  { label: "مناسبة سعيدة", value: 500, suffix: "+" },
  { label: "عميل راضٍ", value: 1000, suffix: "+" },
  { label: "فريق محترف", value: 50, suffix: "+" },
  { label: "سنوات خبرة", value: 10, suffix: "+" },
];

export const FAQS = [
  {
    question: "ما هي المناطق التي تغطونها؟",
    answer: "نغطي جميع ولايات سلطنة عمان، من مسقط إلى صلالة وكل ما بينهما. خدمتنا متنقلة بالكامل ونصل إليكم أينما كنتم.",
  },
  {
    question: "هل تقدمون خدمات الضيافة للرجال والنساء؟",
    answer: "نعم، نوفر طواقم عمل متخصصة للرجال وطواقم متخصصة للنساء حسب الطلب، مع الحفاظ على الخصوصية التامة.",
  },
  {
    question: "كيف يمكنني الحجز؟",
    answer: "يمكنكم الحجز عبر نموذج الاستفسار في موقعنا أو التواصل مباشرة عبر الواتساب. سيتواصل معكم فريقنا خلال 24 ساعة.",
  },
  {
    question: "ما هو الحد الأدنى للضيوف للحجز؟",
    answer: "نستقبل جميع أحجام المناسبات، من التجمعات العائلية الصغيرة إلى المؤتمرات الكبرى. لا يوجد حد أدنى لعدد الضيوف.",
  },
  {
    question: "هل يمكنني تخصيص الخدمة حسب طلبي؟",
    answer: "بالتأكيد. نفتخر بتقديم تجارب ضيافة مخصصة تماماً لاحتياجاتكم. يمكننا تصميم حزمة خدمة تتوافق مع رؤيتكم وميزانيتكم.",
  },
  {
    question: "ما هي سياسة الإلغاء؟",
    answer: "يمكن إلغاء الحجز أو تعديله قبل 72 ساعة من موعد المناسبة دون رسوم. للمناسبات الكبرى قد تطبق شروط خاصة يتم الاتفاق عليها مسبقاً.",
  },
];

export const TESTIMONIALS = [
  {
    id: 1,
    name: "سالم العلوي",
    role: "عميل",
    service: "ضيافة أفراح",
    rating: 5,
    text: "خدمة استثنائية وطاقم عمل محترف جداً. شرفونا أمام ضيوفنا في حفل الزفاف وكانت الضيافة على أعلى مستوى.",
    content: "خدمة استثنائية وطاقم عمل محترف جداً. شرفونا أمام ضيوفنا في حفل الزفاف وكانت الضيافة على أعلى مستوى.",
    avatar: "/images/team_1.webp",
  },
  {
    id: 2,
    name: "فاطمة البلوشي",
    role: "منظمة فعاليات",
    service: "تنظيم فعاليات",
    rating: 5,
    text: "أفضل شركة ضيافة تعاملت معها في سلطنة عمان. التزام بالمواعيد وجودة لا تضاهى في كل تفصيلة.",
    content: "أفضل شركة ضيافة تعاملت معها في سلطنة عمان. التزام بالمواعيد وجودة لا تضاهى في كل تفصيلة.",
    avatar: "/images/team_2.webp",
  },
  {
    id: 3,
    name: "أحمد الحارثي",
    role: "عميل",
    service: "ضيافة VIP",
    rating: 5,
    text: "وفّروا لنا تجربة ضيافة فاخرة تليق بضيوفنا الكرام. الاحترافية والتميز في كل شيء.",
    content: "وفّروا لنا تجربة ضيافة فاخرة تليق بضيوفنا الكرام. الاحترافية والتميز في كل شيء.",
    avatar: "/images/team_1.webp",
  },
  {
    id: 4,
    name: "نورة الرواحي",
    role: "عميل",
    service: "ضيافة مؤتمرات",
    rating: 5,
    text: "تعاملنا معهم في مؤتمر شركتنا وكانوا على مستوى رفيع جداً. سنتعامل معهم دائماً.",
    content: "تعاملنا معهم في مؤتمر شركتنا وكانوا على مستوى رفيع جداً. سنتعامل معهم دائماً.",
    avatar: "/images/team_2.webp",
  },
];

export const LOGIN_PATH = "/login";

export type InstagramPortfolioItem = {
  instagramId: string;
  category: string;
  title: string;
  type: "instagram";
};

export const INSTAGRAM_PORTFOLIO_ITEMS: InstagramPortfolioItem[] = [
  { instagramId: "DXb2TfxjVBg", category: "wedding", title: "أفراح", type: "instagram" },
  { instagramId: "DS103e_jI-w", category: "wedding", title: "أفراح", type: "instagram" },
  { instagramId: "DSxRofqAdzT", category: "wedding", title: "أفراح", type: "instagram" },
  { instagramId: "DSPZ5DrDKIp", category: "wedding", title: "أفراح", type: "instagram" },
  { instagramId: "DGAUJTqMZs_", category: "wedding", title: "أفراح", type: "instagram" },
  { instagramId: "C3O-a0nIV4b", category: "wedding", title: "أفراح", type: "instagram" },
  { instagramId: "DHf8mVJMkEK", category: "wedding", title: "أفراح", type: "instagram" },
  { instagramId: "DT7CaguDF5J", category: "conference", title: "مؤتمرات", type: "instagram" },
  { instagramId: "DTIfRLuDLyO", category: "conference", title: "مؤتمرات", type: "instagram" },
  { instagramId: "DSrUrcYjJjr", category: "conference", title: "مؤتمرات", type: "instagram" },
  { instagramId: "DJleSjhsFot", category: "conference", title: "مؤتمرات", type: "instagram" },
  { instagramId: "DIsoLdxMyhg", category: "conference", title: "مؤتمرات", type: "instagram" },
  { instagramId: "DAP6RahMBRd", category: "vip", title: "ضيافة VIP", type: "instagram" },
  { instagramId: "DUAa9diDdtZ", category: "vip", title: "ضيافة VIP", type: "instagram" },
  { instagramId: "DJleSjhsFot", category: "vip", title: "ضيافة VIP", type: "instagram" },
  { instagramId: "DBjXBw4s8ou", category: "vip", title: "ضيافة VIP", type: "instagram" },
  { instagramId: "DA29EDXMAmm", category: "vip", title: "ضيافة VIP", type: "instagram" },
  { instagramId: "DXb2TfxjVBg", category: "vip", title: "ضيافة VIP", type: "instagram" },
  { instagramId: "DUz7ASsDZgr", category: "vip", title: "ضيافة VIP", type: "instagram" },
  { instagramId: "C_Lcso5MzUI", category: "private", title: "فعاليات", type: "instagram" },
  { instagramId: "DT7UjMBDdg5", category: "private", title: "فعاليات", type: "instagram" },
  { instagramId: "DXEtd21DTB7", category: "private", title: "فعاليات", type: "instagram" },
  { instagramId: "DW-qlSLChtC", category: "private", title: "فعاليات", type: "instagram" },
  { instagramId: "DVvWNTvDX3R", category: "corporate", title: "شركات", type: "instagram" },
  { instagramId: "DUVDW10jSsz", category: "corporate", title: "شركات", type: "instagram" },
];

export const ABOUT_INSTAGRAM_POST = "DUf0Fbhjcc9";

export const TEAM_INSTAGRAM_POSTS = [
  "DUVGJpuDerL",
  "DLRfGvFMYrz",
  "DTIe_tqDHwf",
  "DMNZwS3s9Ep",
  "DSPc3xAjD-w",
  "DAJrVt6sVhp",
  "DFfC3gMs_Sc",
  "DBk8CzpsX82",
];
