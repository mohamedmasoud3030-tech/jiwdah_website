import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { motion } from "framer-motion";
import {
  LayoutDashboard, Users, Calendar, Phone, MapPin,
  ChevronDown, LogOut, RefreshCw, Filter,
  CheckCircle, Clock, XCircle, AlertCircle, List, ChevronLeft, ChevronRight,
  Search, ArrowUpDown, ImageIcon, Trash2, Plus, Link as LinkIcon,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { trpc } from "@/providers/trpc";
import { useAuth } from "@/hooks/useAuth";
import { CATEGORY_VALUES } from "@workspace/api-client-react";

const statusConfig = {
  new: { label: "جديد", color: "bg-blue-500/20 text-blue-400 border-blue-500/30", icon: AlertCircle },
  contacted: { label: "تم التواصل", color: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30", icon: Clock },
  confirmed: { label: "مؤكد", color: "bg-green-500/20 text-green-400 border-green-500/30", icon: CheckCircle },
  completed: { label: "مكتمل", color: "bg-purple-500/20 text-purple-400 border-purple-500/30", icon: CheckCircle },
  cancelled: { label: "ملغي", color: "bg-red-500/20 text-red-400 border-red-500/30", icon: XCircle },
};

const CATEGORY_LABELS: Record<string, string> = {
  wedding: "أفراح",
  conference: "مؤتمرات",
  private: "فعاليات خاصة",
  corporate: "شركات",
  coffee: "قهوة عربية",
  vip: "ضيافة VIP",
};

const ARABIC_MONTHS = [
  "يناير","فبراير","مارس","أبريل","مايو","يونيو",
  "يوليو","أغسطس","سبتمبر","أكتوبر","نوفمبر","ديسمبر",
];
const ARABIC_WEEKDAYS = ["أحد","إثنين","ثلاثاء","أربعاء","خميس","جمعة","سبت"];

type Lead = {
  id: number;
  name: string;
  phone: string;
  service: string;
  eventDate?: string | null;
  location?: string | null;
  guests?: number | null;
  budget?: string | null;
  notes?: string | null;
  source?: string | null;
  status: string;
  createdAt: Date;
};

function isVideo(url: string) {
  return /\.(mp4|webm|ogg)(\?|$)/i.test(url);
}

function MiniCalendar({ leads }: { leads: Lead[] }) {
  const today = new Date();
  const [calDate, setCalDate] = useState(new Date(today.getFullYear(), today.getMonth(), 1));
  const [selectedDay, setSelectedDay] = useState<string | null>(null);

  const year = calDate.getFullYear();
  const month = calDate.getMonth();

  const firstDayOfMonth = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const leadsByDate: Record<string, Lead[]> = {};
  for (const lead of leads) {
    if (lead.eventDate && /^\d{4}-\d{2}-\d{2}$/.test(lead.eventDate)) {
      if (!leadsByDate[lead.eventDate]) leadsByDate[lead.eventDate] = [];
      leadsByDate[lead.eventDate].push(lead);
    }
  }

  const prevMonth = () => setCalDate(new Date(year, month - 1, 1));
  const nextMonth = () => setCalDate(new Date(year, month + 1, 1));

  const cells: (number | null)[] = [];
  for (let i = 0; i < firstDayOfMonth; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);

  const todayStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;

  const getDateStr = (day: number) =>
    `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;

  const selectedLeads = selectedDay ? (leadsByDate[selectedDay] || []) : [];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 bg-surface-light border border-gold/10 rounded-xl p-6">
        <div className="flex items-center justify-between mb-5">
          <button onClick={prevMonth} className="w-8 h-8 flex items-center justify-center text-cream-muted hover:text-gold hover:bg-gold/10 rounded-lg transition-colors">
            <ChevronRight className="w-4 h-4" />
          </button>
          <h3 className="text-cream font-semibold">
            {ARABIC_MONTHS[month]} {year}
          </h3>
          <button onClick={nextMonth} className="w-8 h-8 flex items-center justify-center text-cream-muted hover:text-gold hover:bg-gold/10 rounded-lg transition-colors">
            <ChevronLeft className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-7 mb-2">
          {ARABIC_WEEKDAYS.map((d) => (
            <div key={d} className="text-center text-cream-muted text-[10px] pb-2 tracking-wide">{d}</div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-1">
          {cells.map((day, idx) => {
            if (!day) return <div key={`empty-${idx}`} />;
            const dateStr = getDateStr(day);
            const dayLeads = leadsByDate[dateStr] || [];
            const isToday = dateStr === todayStr;
            const isSelected = dateStr === selectedDay;
            const hasLeads = dayLeads.length > 0;
            const isPast = dateStr < todayStr;

            return (
              <button
                key={dateStr}
                onClick={() => setSelectedDay(isSelected ? null : dateStr)}
                className={`relative flex flex-col items-center justify-center min-h-[40px] rounded-lg text-xs transition-all duration-150 ${
                  isSelected
                    ? "bg-gold text-surface font-semibold"
                    : isToday
                    ? "border border-gold/40 text-gold font-semibold hover:bg-gold/10"
                    : isPast
                    ? "text-cream/25 hover:bg-gold/5"
                    : "text-cream/70 hover:bg-gold/10 hover:text-cream"
                }`}
              >
                <span>{day}</span>
                {hasLeads && (
                  <div className="flex gap-0.5 mt-0.5">
                    {dayLeads.slice(0, 3).map((_, i) => (
                      <span
                        key={i}
                        className={`w-1 h-1 rounded-full ${isSelected ? "bg-surface" : "bg-gold"}`}
                      />
                    ))}
                  </div>
                )}
              </button>
            );
          })}
        </div>

        <div className="mt-4 pt-4 border-t border-gold/8 flex items-center gap-4 text-xs text-cream-muted">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-gold" />
            <span>يوم فيه حجوزات</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded border border-gold/40" />
            <span>اليوم</span>
          </div>
        </div>
      </div>

      <div className="bg-surface-light border border-gold/10 rounded-xl p-6">
        {selectedDay ? (
          <>
            <h3 className="text-cream font-semibold mb-4 text-sm">
              حجوزات {selectedDay}
            </h3>
            {selectedLeads.length === 0 ? (
              <p className="text-cream-muted text-sm">لا توجد حجوزات في هذا اليوم</p>
            ) : (
              <div className="space-y-3">
                {selectedLeads.map((lead) => {
                  const sc = statusConfig[lead.status as keyof typeof statusConfig];
                  return (
                    <div key={lead.id} className="border border-gold/10 rounded-lg p-3">
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <span className="text-cream text-sm font-medium">{lead.name}</span>
                        {sc && (
                          <span className={`px-2 py-0.5 rounded-full text-[10px] border shrink-0 ${sc.color}`}>
                            {sc.label}
                          </span>
                        )}
                      </div>
                      <p className="text-cream-muted text-xs">{lead.phone}</p>
                      <p className="text-gold/70 text-xs mt-1">{lead.service}</p>
                      {lead.guests && (
                        <p className="text-cream-muted text-xs mt-0.5 flex items-center gap-1">
                          <Users className="w-3 h-3" />
                          {lead.guests} ضيف
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </>
        ) : (
          <div className="flex flex-col items-center justify-center h-full min-h-[200px] text-center">
            <Calendar className="w-8 h-8 text-gold/30 mb-3" />
            <p className="text-cream-muted text-sm">اختر يوماً من التقويم</p>
            <p className="text-cream/30 text-xs mt-1">لعرض الحجوزات المرتبطة به</p>
          </div>
        )}
      </div>
    </div>
  );
}

function PortfolioManager() {
  const { data: items = [], isLoading, refetch } = trpc.portfolio.list.useQuery();
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState<string>(CATEGORY_VALUES[0]);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>("");
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [formError, setFormError] = useState("");

  const createItem = trpc.portfolio.create.useMutation({
    onSuccess: () => {
      setTitle("");
      setSelectedFile(null);
      setPreviewUrl("");
      setUploadProgress(0);
      setFormError("");
      refetch();
    },
    onError: (err) => setFormError(err.message),
  });

  const deleteItem = trpc.portfolio.delete.useMutation({
    onSuccess: () => refetch(),
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setSelectedFile(file);
    setPreviewUrl(URL.createObjectURL(file));
    setFormError("");
  };

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) { setFormError("أدخل عنوان العمل"); return; }
    if (!selectedFile) { setFormError("اختر ملف صورة أو فيديو"); return; }

    setFormError("");
    setIsUploading(true);
    setUploadProgress(10);

    try {
      const formData = new FormData();
      formData.append("file", selectedFile);

      setUploadProgress(30);
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
        credentials: "include",
      });

      setUploadProgress(70);

      if (!res.ok) {
        const err = await res.json().catch(() => ({ error: "فشل الرفع" }));
        throw new Error(err.error || "فشل رفع الملف");
      }

      const { objectPath } = await res.json();
      setUploadProgress(90);

      await createItem.mutateAsync({
        title: title.trim(),
        category: category as typeof CATEGORY_VALUES[number],
        imageUrl: objectPath,
      });

      setUploadProgress(100);
    } catch (err) {
      setFormError(err instanceof Error ? err.message : "حدث خطأ");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Add form */}
      <div className="bg-surface-light border border-gold/10 rounded-xl p-6">
        <h3 className="text-cream font-semibold mb-5 flex items-center gap-2">
          <Plus className="w-4 h-4 text-gold" />
          إضافة عمل جديد
        </h3>
        <form onSubmit={handleAdd} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="sm:col-span-2">
            <label className="text-cream-muted text-xs mb-1.5 block">عنوان العمل</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="مثال: حفل زفاف فاخر"
              dir="rtl"
              className="w-full bg-surface border border-gold/20 rounded-lg px-4 py-2.5 text-cream text-sm placeholder:text-cream-muted focus:outline-none focus:border-gold/50 transition-colors"
            />
          </div>

          <div>
            <label className="text-cream-muted text-xs mb-1.5 block">الفئة</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full bg-surface border border-gold/20 rounded-lg px-4 py-2.5 text-cream text-sm focus:outline-none focus:border-gold/50 appearance-none transition-colors"
            >
              {CATEGORY_VALUES.map((val) => (
                <option key={val} value={val}>{CATEGORY_LABELS[val] ?? val}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-cream-muted text-xs mb-1.5 block">الملف (صورة أو فيديو)</label>
            <label className="flex items-center gap-3 cursor-pointer w-full bg-surface border border-gold/20 border-dashed rounded-lg px-4 py-3 hover:border-gold/40 transition-colors group">
              <ImageIcon className="w-4 h-4 text-gold/50 group-hover:text-gold/70 shrink-0 transition-colors" />
              <span className="text-cream-muted text-sm truncate">
                {selectedFile ? selectedFile.name : "اختر صورة أو فيديو..."}
              </span>
              <input
                type="file"
                accept="image/*,video/mp4,video/webm"
                onChange={handleFileChange}
                className="sr-only"
              />
            </label>
          </div>

          {previewUrl && (
            <div className="sm:col-span-2">
              <p className="text-cream-muted text-xs mb-1.5">معاينة</p>
              {selectedFile?.type.startsWith("video/") ? (
                <video src={previewUrl} className="h-28 rounded-lg object-cover" muted playsInline />
              ) : (
                <img src={previewUrl} alt="preview" className="h-28 rounded-lg object-cover" />
              )}
            </div>
          )}

          {isUploading && (
            <div className="sm:col-span-2">
              <div className="flex items-center justify-between mb-1">
                <span className="text-cream-muted text-xs">جاري الرفع...</span>
                <span className="text-gold text-xs">{uploadProgress}%</span>
              </div>
              <div className="w-full h-1.5 bg-surface rounded-full overflow-hidden">
                <div
                  className="h-full bg-gold transition-all duration-300 rounded-full"
                  style={{ width: `${uploadProgress}%` }}
                />
              </div>
            </div>
          )}

          {formError && (
            <p className="sm:col-span-2 text-red-400 text-xs">{formError}</p>
          )}

          <div className="sm:col-span-2">
            <button
              type="submit"
              disabled={isUploading || createItem.isPending}
              className="px-5 py-2.5 bg-gold text-surface rounded-lg text-sm font-medium hover:bg-gold/90 transition-colors disabled:opacity-50"
            >
              {isUploading || createItem.isPending ? "جاري الرفع والإضافة..." : "رفع وإضافة"}
            </button>
          </div>
        </form>
      </div>

      {/* Items grid */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-cream font-semibold">
            الأعمال الحالية
            <span className="text-cream-muted text-sm font-normal mr-2">({items.length})</span>
          </h3>
          <button onClick={() => refetch()} className="flex items-center gap-2 text-cream-muted hover:text-gold transition-colors text-xs">
            <RefreshCw className="w-3.5 h-3.5" />
            تحديث
          </button>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-12">
            <div className="w-8 h-8 border-2 border-gold border-t-transparent rounded-full animate-spin" />
          </div>
        ) : items.length === 0 ? (
          <div className="text-center py-12 bg-surface-light border border-gold/10 rounded-xl">
            <ImageIcon className="w-10 h-10 text-cream-muted mx-auto mb-3" />
            <p className="text-cream-muted text-sm">لا توجد أعمال حتى الآن</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {items.map((item) => (
              <div key={item.id} className="group relative rounded-xl overflow-hidden border border-gold/10 bg-surface-light aspect-[4/3]">
                {isVideo(item.imageUrl) ? (
                  <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover"
                  >
                    <source src={item.imageUrl} type="video/mp4" />
                  </video>
                ) : (
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "";
                      (e.target as HTMLImageElement).style.display = "none";
                    }}
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-surface/95 via-surface/30 to-transparent" />
                <div className="absolute bottom-0 right-0 left-0 p-3">
                  <p className="text-cream text-xs font-medium line-clamp-1">{item.title}</p>
                  <p className="text-gold/60 text-[10px] mt-0.5">{CATEGORY_LABELS[item.category] ?? item.category}</p>
                </div>
                <button
                  onClick={() => {
                    if (confirm(`حذف "${item.title}"؟`)) {
                      deleteItem.mutate({ id: item.id });
                    }
                  }}
                  disabled={deleteItem.isPending}
                  className="absolute top-2 left-2 w-7 h-7 bg-red-500/80 hover:bg-red-500 rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200"
                >
                  <Trash2 className="w-3.5 h-3.5 text-white" />
                </button>
                <div className="absolute top-2 right-2">
                  <span className="bg-surface/80 text-gold/70 text-[9px] px-1.5 py-0.5 rounded">
                    {isVideo(item.imageUrl) ? "فيديو" : "صورة"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

type SortKey = "createdAt_desc" | "createdAt_asc" | "eventDate_asc" | "eventDate_desc";

type PendingStatus = {
  leadId: number;
  leadName: string;
  status: keyof typeof statusConfig;
} | null;

type DashboardTab = "leads" | "portfolio";

export default function Dashboard() {
  const navigate = useNavigate();
  const { user, logout, isLoading: authLoading } = useAuth();
  const [activeTab, setActiveTab] = useState<DashboardTab>("leads");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [expandedLead, setExpandedLead] = useState<number | null>(null);
  const [view, setView] = useState<"list" | "calendar">("list");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortKey, setSortKey] = useState<SortKey>("createdAt_desc");
  const [pendingStatus, setPendingStatus] = useState<PendingStatus>(null);

  const { data: leads, isLoading, refetch } = trpc.leads.list.useQuery();

  const updateStatus = trpc.leads.updateStatus.useMutation({
    onSuccess: () => {
      refetch();
      setPendingStatus(null);
    },
  });

  const deleteLead = trpc.leads.delete.useMutation({
    onSuccess: () => refetch(),
  });

  useEffect(() => {
    if (!authLoading && !user) {
      navigate("/login");
    }
  }, [authLoading, user, navigate]);

  if (authLoading || !user) {
    return (
      <div className="min-h-screen bg-surface flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-gold border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const filtered = (leads ?? [])
    .filter((l) => statusFilter === "all" || l.status === statusFilter)
    .filter((l) => {
      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase();
      return l.name.toLowerCase().includes(q) || l.phone.toLowerCase().includes(q);
    })
    .sort((a, b) => {
      if (sortKey === "createdAt_desc") return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      if (sortKey === "createdAt_asc") return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      if (sortKey === "eventDate_asc") {
        const da = a.eventDate ? new Date(a.eventDate).getTime() : Infinity;
        const db = b.eventDate ? new Date(b.eventDate).getTime() : Infinity;
        return da - db;
      }
      if (sortKey === "eventDate_desc") {
        const da = a.eventDate ? new Date(a.eventDate).getTime() : -Infinity;
        const db = b.eventDate ? new Date(b.eventDate).getTime() : -Infinity;
        return db - da;
      }
      return 0;
    });

  const stats = {
    total: leads?.length || 0,
    new: leads?.filter((l) => l.status === "new").length || 0,
    confirmed: leads?.filter((l) => l.status === "confirmed").length || 0,
    completed: leads?.filter((l) => l.status === "completed").length || 0,
  };

  const confirmStatusChange = () => {
    if (!pendingStatus) return;
    updateStatus.mutate({ id: pendingStatus.leadId, status: pendingStatus.status });
  };

  return (
    <div className="min-h-screen bg-surface" dir="rtl">
      {/* Confirmation Dialog */}
      <Dialog open={!!pendingStatus} onOpenChange={(open) => { if (!open) setPendingStatus(null); }}>
        <DialogContent className="bg-surface-light border border-gold/20 text-cream" dir="rtl">
          <DialogHeader>
            <DialogTitle className="text-cream">تأكيد تغيير الحالة</DialogTitle>
            <DialogDescription className="text-cream-muted">
              هل تريد تغيير حالة <span className="text-cream font-semibold">{pendingStatus?.leadName}</span> إلى{" "}
              <span className="text-gold font-semibold">
                {pendingStatus ? statusConfig[pendingStatus.status].label : ""}
              </span>
              ؟
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex gap-3 flex-row-reverse sm:flex-row-reverse">
            <button
              onClick={confirmStatusChange}
              disabled={updateStatus.isPending}
              className="px-4 py-2 bg-gold text-surface rounded-lg text-sm font-medium hover:bg-gold/90 transition-colors disabled:opacity-50"
            >
              {updateStatus.isPending ? "جاري التحديث..." : "تأكيد"}
            </button>
            <button
              onClick={() => setPendingStatus(null)}
              className="px-4 py-2 border border-gold/20 text-cream-muted rounded-lg text-sm hover:text-cream transition-colors"
            >
              إلغاء
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Top Bar */}
      <header className="bg-surface-light border-b border-gold/10 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-gold/10 rounded-lg flex items-center justify-center">
              <LayoutDashboard className="w-5 h-5 text-gold" />
            </div>
            <div>
              <h1 className="text-cream font-bold">لوحة التحكم</h1>
              <p className="text-cream-muted text-xs">جودة الانطلاقة</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-cream-muted text-sm hidden sm:block">{user.name}</span>
            <button
              onClick={() => logout()}
              className="flex items-center gap-2 text-cream-muted hover:text-red-400 transition-colors text-sm"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">تسجيل الخروج</span>
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: "إجمالي الطلبات", value: stats.total, color: "text-cream" },
            { label: "طلبات جديدة", value: stats.new, color: "text-blue-400" },
            { label: "طلبات مؤكدة", value: stats.confirmed, color: "text-green-400" },
            { label: "طلبات مكتملة", value: stats.completed, color: "text-purple-400" },
          ].map((stat) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-surface-light border border-gold/10 rounded-xl p-5"
            >
              <p className="text-cream-muted text-sm">{stat.label}</p>
              <p className={`text-3xl font-bold font-mono ${stat.color} mt-1`}>
                {stat.value}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Main tabs */}
        <div className="flex items-center gap-1 mb-6 border-b border-gold/10">
          {([
            { key: "leads", label: "الطلبات" },
            { key: "portfolio", label: "معرض الأعمال" },
          ] as { key: DashboardTab; label: string }[]).map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`px-5 py-2.5 text-sm font-medium border-b-2 -mb-px transition-all duration-200 ${
                activeTab === tab.key
                  ? "border-gold text-gold"
                  : "border-transparent text-cream-muted hover:text-cream"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {activeTab === "portfolio" ? (
          <PortfolioManager />
        ) : (
          <>
            {/* Controls */}
            <div className="flex flex-col gap-4 mb-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="flex items-center border border-gold/15 rounded-lg overflow-hidden">
                    <button
                      onClick={() => setView("list")}
                      className={`flex items-center gap-1.5 px-3 py-1.5 text-xs transition-colors ${
                        view === "list" ? "bg-gold/15 text-gold" : "text-cream-muted hover:text-cream"
                      }`}
                    >
                      <List className="w-3.5 h-3.5" />
                      قائمة
                    </button>
                    <button
                      onClick={() => setView("calendar")}
                      className={`flex items-center gap-1.5 px-3 py-1.5 text-xs transition-colors border-r border-gold/15 ${
                        view === "calendar" ? "bg-gold/15 text-gold" : "text-cream-muted hover:text-cream"
                      }`}
                    >
                      <Calendar className="w-3.5 h-3.5" />
                      تقويم
                    </button>
                  </div>
                </div>

                <div className="flex items-center gap-3 flex-wrap">
                  <button
                    onClick={() => refetch()}
                    className="flex items-center gap-2 px-4 py-2 bg-surface-light border border-gold/20 rounded-lg text-cream-muted hover:text-gold transition-colors text-sm"
                  >
                    <RefreshCw className="w-4 h-4" />
                    تحديث
                  </button>

                  {view === "list" && (
                    <>
                      {/* Sort */}
                      <div className="relative">
                        <ArrowUpDown className="w-4 h-4 text-cream-muted absolute right-3 top-1/2 -translate-y-1/2" />
                        <select
                          value={sortKey}
                          onChange={(e) => setSortKey(e.target.value as SortKey)}
                          className="bg-surface-light border border-gold/20 rounded-lg pl-4 pr-10 py-2 text-cream text-sm focus:outline-none focus:border-gold appearance-none"
                        >
                          <option value="createdAt_desc">تاريخ الإضافة (الأحدث)</option>
                          <option value="createdAt_asc">تاريخ الإضافة (الأقدم)</option>
                          <option value="eventDate_asc">تاريخ المناسبة (الأقرب)</option>
                          <option value="eventDate_desc">تاريخ المناسبة (الأبعد)</option>
                        </select>
                        <ChevronDown className="w-4 h-4 text-cream-muted absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                      </div>

                      {/* Status Filter */}
                      <div className="relative">
                        <Filter className="w-4 h-4 text-cream-muted absolute right-3 top-1/2 -translate-y-1/2" />
                        <select
                          value={statusFilter}
                          onChange={(e) => setStatusFilter(e.target.value)}
                          className="bg-surface-light border border-gold/20 rounded-lg pl-4 pr-10 py-2 text-cream text-sm focus:outline-none focus:border-gold appearance-none"
                        >
                          <option value="all">جميع الحالات</option>
                          <option value="new">جديد</option>
                          <option value="contacted">تم التواصل</option>
                          <option value="confirmed">مؤكد</option>
                          <option value="completed">مكتمل</option>
                          <option value="cancelled">ملغي</option>
                        </select>
                        <ChevronDown className="w-4 h-4 text-cream-muted absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* Search — list view only */}
              {view === "list" && (
                <div className="relative">
                  <Search className="w-4 h-4 text-cream-muted absolute right-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="ابحث بالاسم أو رقم الهاتف..."
                    className="w-full bg-surface-light border border-gold/20 rounded-lg pr-10 pl-4 py-2 text-cream text-sm placeholder:text-cream-muted focus:outline-none focus:border-gold/50 transition-colors"
                  />
                </div>
              )}
            </div>

            {isLoading ? (
              <div className="text-center py-12">
                <div className="w-8 h-8 border-2 border-gold border-t-transparent rounded-full animate-spin mx-auto" />
              </div>
            ) : view === "calendar" ? (
              <MiniCalendar leads={(leads || []) as Lead[]} />
            ) : !filtered.length ? (
              <div className="text-center py-12 bg-surface-light border border-gold/10 rounded-xl">
                <AlertCircle className="w-12 h-12 text-cream-muted mx-auto mb-4" />
                <p className="text-cream-muted">لا توجد طلبات</p>
              </div>
            ) : (
              <div className="space-y-3">
                {filtered.map((lead) => {
                  const status = statusConfig[lead.status as keyof typeof statusConfig];
                  const StatusIcon = status?.icon || AlertCircle;
                  const isExpanded = expandedLead === lead.id;

                  return (
                    <motion.div
                      key={lead.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-surface-light border border-gold/10 rounded-xl overflow-hidden"
                    >
                      <div
                        className="flex items-center gap-4 px-5 py-4 cursor-pointer hover:bg-gold/5 transition-colors"
                        onClick={() => setExpandedLead(isExpanded ? null : lead.id)}
                      >
                        <StatusIcon className={`w-5 h-5 shrink-0 ${status?.color.split(" ")[1]}`} />

                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-3 flex-wrap">
                            <span className="text-cream font-semibold">{lead.name}</span>
                            <span className={`px-2 py-0.5 rounded-full text-xs border ${status?.color}`}>
                              {status?.label}
                            </span>
                          </div>
                          <div className="flex items-center gap-4 mt-1 text-sm text-cream-muted">
                            <span className="flex items-center gap-1">
                              <Phone className="w-3 h-3" />
                              {lead.phone}
                            </span>
                            <span className="flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              {lead.service}
                            </span>
                          </div>
                        </div>

                        <div className="text-cream-muted text-xs shrink-0">
                          {new Date(lead.createdAt).toLocaleDateString("ar-OM")}
                        </div>

                        <ChevronDown
                          className={`w-5 h-5 text-cream-muted transition-transform shrink-0 ${
                            isExpanded ? "rotate-180" : ""
                          }`}
                        />
                      </div>

                      {isExpanded && (
                        <div className="border-t border-gold/10 px-5 py-4">
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                            {lead.eventDate && (
                              <div>
                                <span className="text-cream-muted text-xs">تاريخ المناسبة</span>
                                <p className="text-cream">{lead.eventDate}</p>
                              </div>
                            )}
                            {lead.location && (
                              <div>
                                <span className="text-cream-muted text-xs flex items-center gap-1">
                                  <MapPin className="w-3 h-3" />
                                  الموقع
                                </span>
                                <p className="text-cream">{lead.location}</p>
                              </div>
                            )}
                            {lead.guests && (
                              <div>
                                <span className="text-cream-muted text-xs flex items-center gap-1">
                                  <Users className="w-3 h-3" />
                                  عدد الضيوف
                                </span>
                                <p className="text-cream">{lead.guests}</p>
                              </div>
                            )}
                            {lead.budget && (
                              <div>
                                <span className="text-cream-muted text-xs">الميزانية</span>
                                <p className="text-cream">{lead.budget}</p>
                              </div>
                            )}
                            {"source" in lead && lead.source && (
                              <div>
                                <span className="text-cream-muted text-xs">مصدر الطلب</span>
                                <p className="text-cream text-sm">
                                  {lead.source === "home" ? "الصفحة الرئيسية" : lead.source === "contact" ? "صفحة التواصل" : String(lead.source)}
                                </p>
                              </div>
                            )}
                          </div>

                          {lead.notes && (
                            <div className="mb-4">
                              <span className="text-cream-muted text-xs">ملاحظات</span>
                              <p className="text-cream text-sm">{lead.notes}</p>
                            </div>
                          )}

                          <div className="flex flex-wrap items-center gap-3 pt-3 border-t border-gold/10">
                            <span className="text-cream-muted text-sm">تحديث الحالة:</span>
                            {Object.entries(statusConfig).map(([key, config]) => (
                              <button
                                key={key}
                                onClick={() =>
                                  setPendingStatus({
                                    leadId: lead.id,
                                    leadName: lead.name,
                                    status: key as keyof typeof statusConfig,
                                  })
                                }
                                className={`px-3 py-1 rounded-full text-xs border transition-colors ${
                                  lead.status === key
                                    ? config.color
                                    : "border-gold/20 text-cream-muted hover:border-gold/50"
                                }`}
                              >
                                {config.label}
                              </button>
                            ))}

                            <div className="mr-auto">
                              <button
                                onClick={() => {
                                  if (confirm("هل أنت متأكد من حذف هذا الطلب؟")) {
                                    deleteLead.mutate({ id: lead.id });
                                  }
                                }}
                                className="text-red-400 hover:text-red-300 text-xs transition-colors"
                              >
                                حذف
                              </button>
                            </div>
                          </div>
                        </div>
                      )}
                    </motion.div>
                  );
                })}
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
}
