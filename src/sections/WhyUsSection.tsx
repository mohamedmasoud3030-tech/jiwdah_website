import { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Award, Users, MapPin, Shield, Clock, Headphones } from "lucide-react";

const features = [
  {
    icon: Award,
    title: "خبرة ١٠+ سنوات",
    description: "سنوات من الخبرة في خدمات الضيافة الفاخرة",
  },
  {
    icon: Users,
    title: "طاقم مدرب",
    description: "فريق محترف بأعلى معايير الاحترافية والخدمة",
  },
  {
    icon: MapPin,
    title: "خدمة متنقلة",
    description: "نصلك أينما كنت في جميع أنحاء سلطنة عمان",
  },
  {
    icon: Shield,
    title: "جودة مضمونة",
    description: "مواد أولى فاخرة ومعايير جودة صارمة",
  },
  {
    icon: Clock,
    title: "التزام بالمواعيد",
    description: "نلتزم بالوقت المحدد دون تأخير",
  },
  {
    icon: Headphones,
    title: "دعم ٢٤/٧",
    description: "فريق خدمة عملاء متاح على مدار الساعة",
  },
];

export default function WhyUsSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;

    const resize = () => {
      const rect = canvas.parentElement?.getBoundingClientRect();
      if (rect) {
        canvas.width = rect.width;
        canvas.height = rect.height;
      }
    };
    resize();
    window.addEventListener("resize", resize);

    const particles: Array<{ x: number; y: number; vx: number; vy: number; r: number; o: number }> = [];
    for (let i = 0; i < 50; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        r: Math.random() * 2 + 1,
        o: Math.random() * 0.3 + 0.1,
      });
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            particles.forEach((p) => {
              p.x += p.vx;
              p.y += p.vy;
              if (p.x < 0) p.x = canvas.width;
              if (p.x > canvas.width) p.x = 0;
              if (p.y < 0) p.y = canvas.height;
              if (p.y > canvas.height) p.y = 0;

              ctx.beginPath();
              ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
              ctx.fillStyle = `rgba(200, 164, 92, ${p.o})`;
              ctx.fill();
            });

            animationId = requestAnimationFrame(animate);
          };
          animate();
        } else {
          cancelAnimationFrame(animationId);
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(canvas);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
      observer.disconnect();
    };
  }, []);

  return (
    <section id="why-us" className="py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none"
      />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative order-2 lg:order-1"
          >
            <div className="relative rounded-2xl overflow-hidden">
              <img
                src="/images/team_1.webp"
                alt="فريق جودة الانطلاقة"
                className="w-full h-auto object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-surface/60 to-transparent" />
            </div>

            {/* Floating Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="absolute -bottom-6 -left-6 bg-surface-light border border-gold/30 rounded-xl p-4 shadow-gold"
            >
              <div className="text-center">
                <div className="text-3xl font-bold text-gold font-arabic">٥٠٠+</div>
                <div className="text-cream-muted text-sm">مناسبة ناجحة</div>
              </div>
            </motion.div>
          </motion.div>

          {/* Content */}
          <div className="order-1 lg:order-2">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="text-gold text-sm font-semibold tracking-wider uppercase">
                لماذا نحن
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-cream mt-3 mb-4">
                لماذا تختار{" "}
                <span className="text-gradient-gold">جودة الانطلاقة</span>؟
              </h2>
              <p className="text-cream-muted mb-10 leading-relaxed">
                نفتخر بتقديم خدمات ضيافة استثنائية تلبي أعلى المعايير. فريقنا
                المحترف ملتزم بجعل مناسبتك مميزة ولا تُنسى.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gold/10 rounded-xl flex items-center justify-center shrink-0 group-hover:bg-gold/20 transition-colors">
                      <feature.icon className="w-6 h-6 text-gold" />
                    </div>
                    <div>
                      <h4 className="text-cream font-bold mb-1 group-hover:text-gold transition-colors">
                        {feature.title}
                      </h4>
                      <p className="text-cream-muted text-sm leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
