import { useState, useEffect, useRef } from "react";
import { DayPicker } from "react-day-picker";
import { format, parseISO } from "date-fns";
import { ar } from "date-fns/locale";
import { CalendarDays, X } from "lucide-react";

interface DatePickerProps {
  value: string;
  onChange: (date: string) => void;
  bookedDates?: string[];
  placeholder?: string;
}

const WEEKDAY_LABELS = ["أحد", "إثن", "ثلاث", "أربع", "خمس", "جمع", "سبت"];

export default function DatePicker({
  value,
  onChange,
  bookedDates = [],
  placeholder = "اختر تاريخ المناسبة",
}: DatePickerProps) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const selected = value ? parseISO(value) : undefined;

  const bookedDateObjects = bookedDates
    .filter((d) => d && /^\d{4}-\d{2}-\d{2}$/.test(d))
    .map((d) => parseISO(d));

  const handleSelect = (date: Date | undefined) => {
    if (date) {
      onChange(format(date, "yyyy-MM-dd"));
      setOpen(false);
    }
  };

  const displayValue = selected
    ? format(selected, "d MMMM yyyy", { locale: ar })
    : null;

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    if (open) document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between py-3 pb-2.5 border-b border-gold/12 hover:border-gold/40 transition-all duration-300 text-sm focus:outline-none group"
      >
        <span className={displayValue ? "text-cream" : "text-cream/20"}>
          {displayValue || placeholder}
        </span>
        <div className="flex items-center gap-1.5">
          {value && (
            <span
              role="button"
              tabIndex={0}
              onClick={(e) => {
                e.stopPropagation();
                onChange("");
              }}
              className="text-cream/25 hover:text-cream/60 transition-colors p-0.5 rounded"
            >
              <X className="w-3 h-3" />
            </span>
          )}
          <CalendarDays className="w-4 h-4 text-gold/50 group-hover:text-gold/70 transition-colors" />
        </div>
      </button>

      {open && (
        <div
          className="absolute z-50 top-full mt-2 left-0 right-0 border border-gold/15 rounded-lg shadow-2xl overflow-hidden"
          style={{ backgroundColor: "#111111" }}
        >
          <DayPicker
            mode="single"
            selected={selected}
            onSelect={handleSelect}
            disabled={[{ before: today }]}
            modifiers={{ booked: bookedDateObjects }}
            modifiersClassNames={{ booked: "rdp-day-booked" }}
            locale={ar}
            dir="rtl"
            formatters={{
              formatWeekdayName: (date) => WEEKDAY_LABELS[date.getDay()],
            }}
            classNames={{
              root: "p-4 select-none",
              months: "",
              month: "w-full",
              month_caption: "flex justify-between items-center px-1 pb-3",
              caption_label: "text-cream text-sm font-medium",
              nav: "flex items-center gap-2",
              button_previous:
                "w-7 h-7 flex items-center justify-center text-cream/40 hover:text-gold transition-colors rounded hover:bg-gold/10",
              button_next:
                "w-7 h-7 flex items-center justify-center text-cream/40 hover:text-gold transition-colors rounded hover:bg-gold/10",
              month_grid: "w-full",
              weekdays: "flex",
              weekday:
                "flex-1 text-center text-cream/25 text-[10px] tracking-wide pb-2 font-normal",
              weeks: "flex flex-col gap-0.5",
              week: "flex",
              day: "flex-1 p-[1px]",
              day_button:
                "w-full h-8 flex items-center justify-center text-xs rounded transition-all duration-150 text-cream/55 hover:bg-gold/10 hover:text-cream cursor-pointer font-normal",
              selected:
                "!bg-gold !text-surface !font-semibold hover:!bg-gold-dark",
              today: "!text-gold !font-semibold",
              outside: "!text-cream/15 pointer-events-none",
              disabled:
                "!text-cream/15 !cursor-not-allowed hover:!bg-transparent hover:!text-cream/15",
              hidden: "invisible",
            }}
          />
          {bookedDateObjects.length > 0 && (
            <div className="px-4 pb-3 pt-0 flex items-center gap-2 border-t border-gold/8">
              <span
                className="w-2 h-2 rounded-full shrink-0"
                style={{ background: "rgba(200,164,92,0.5)", border: "1px solid rgba(200,164,92,0.6)" }}
              />
              <p className="text-cream/30 text-[10px]">الأيام المميزة بها حجوزات مسبقة</p>
            </div>
          )}
        </div>
      )}

      <style>{`
        .rdp-day-booked {
          position: relative;
        }
        .rdp-day-booked::after {
          content: '';
          position: absolute;
          bottom: 1px;
          left: 50%;
          transform: translateX(-50%);
          width: 4px;
          height: 4px;
          border-radius: 9999px;
          background: rgba(200, 164, 92, 0.7);
        }
      `}</style>
    </div>
  );
}
