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

export type PortfolioItem = {
  id: number;
  title: string;
  category: string;
  video?: string;
  image?: string;
};

export const PORTFOLIO_ITEMS: PortfolioItem[] = [
  { id: 1, title: "خدمات VIP فاخرة", category: "vip", video: "/videos/vip_service.mp4" },
  { id: 2, title: "تنظيم أفراح ومناسبات", category: "wedding", video: "/videos/events.mp4" },
  { id: 3, title: "فريق عمل محترف", category: "corporate", video: "/videos/team_work.mp4" },
  { id: 4, title: "ضيافة فعاليات كبرى", category: "conference", video: "/videos/hero_video.mp4" },
  { id: 5, title: "ضيافة القهوة العربية", category: "vip", image: "/images/portfolio_1.webp" },
  { id: 6, title: "تنسيق طاولات الضيافة", category: "wedding", image: "/images/portfolio_2.webp" },
  { id: 7, title: "طاقم الضيافة العماني", category: "corporate", image: "/images/team_1.webp" },
  { id: 8, title: "خدمة الفعاليات الخارجية", category: "conference", image: "/images/team_2.webp" },
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
