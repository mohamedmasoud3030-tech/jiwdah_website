import { useState } from "react";
import { useNavigate } from "react-router";
import { motion } from "framer-motion";
import {
  LayoutDashboard, Users, Calendar, Phone, MapPin,
  ChevronDown, LogOut, RefreshCw, Filter,
  CheckCircle, Clock, XCircle, AlertCircle,
} from "lucide-react";
import { trpc } from "@/providers/trpc";
import { useAuth } from "@/hooks/useAuth";

const statusConfig = {
  new: { label: "جديد", color: "bg-blue-500/20 text-blue-400 border-blue-500/30", icon: AlertCircle },
  contacted: { label: "تم التواصل", color: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30", icon: Clock },
  confirmed: { label: "مؤكد", color: "bg-green-500/20 text-green-400 border-green-500/30", icon: CheckCircle },
  completed: { label: "مكتمل", color: "bg-purple-500/20 text-purple-400 border-purple-500/30", icon: CheckCircle },
  cancelled: { label: "ملغي", color: "bg-red-500/20 text-red-400 border-red-500/30", icon: XCircle },
};

export default function Dashboard() {
  const navigate = useNavigate();
  const { user, logout, isLoading: authLoading } = useAuth();
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [expandedLead, setExpandedLead] = useState<number | null>(null);

  // Query leads
  const { data: leads, isLoading, refetch } = trpc.leads.list.useQuery();

  // Mutation to update status
  const updateStatus = trpc.leads.updateStatus.useMutation({
    onSuccess: () => refetch(),
  });

  // Mutation to delete
  const deleteLead = trpc.leads.delete.useMutation({
    onSuccess: () => refetch(),
  });

  // Redirect if not authenticated
  if (authLoading) {
    return (
      <div className="min-h-screen bg-surface flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-gold border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!user) {
    navigate("/login");
    return null;
  }

  const filteredLeads =
    statusFilter === "all" ? leads : leads?.filter((l) => l.status === statusFilter);

  const stats = {
    total: leads?.length || 0,
    new: leads?.filter((l) => l.status === "new").length || 0,
    confirmed: leads?.filter((l) => l.status === "confirmed").length || 0,
    completed: leads?.filter((l) => l.status === "completed").length || 0,
  };

  return (
    <div className="min-h-screen bg-surface" dir="rtl">
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

        {/* Filters */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <h2 className="text-xl font-bold text-cream">الطلبات</h2>

          <div className="flex items-center gap-3">
            <button
              onClick={() => refetch()}
              className="flex items-center gap-2 px-4 py-2 bg-surface-light border border-gold/20 rounded-lg text-cream-muted hover:text-gold transition-colors text-sm"
            >
              <RefreshCw className="w-4 h-4" />
              تحديث
            </button>

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
          </div>
        </div>

        {/* Leads Table */}
        {isLoading ? (
          <div className="text-center py-12">
            <div className="w-8 h-8 border-2 border-gold border-t-transparent rounded-full animate-spin mx-auto" />
          </div>
        ) : !filteredLeads?.length ? (
          <div className="text-center py-12 bg-surface-light border border-gold/10 rounded-xl">
            <AlertCircle className="w-12 h-12 text-cream-muted mx-auto mb-4" />
            <p className="text-cream-muted">لا توجد طلبات</p>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredLeads.map((lead) => {
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
                  {/* Header Row */}
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

                  {/* Expanded Details */}
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
                      </div>

                      {lead.notes && (
                        <div className="mb-4">
                          <span className="text-cream-muted text-xs">ملاحظات</span>
                          <p className="text-cream text-sm">{lead.notes}</p>
                        </div>
                      )}

                      {/* Actions */}
                      <div className="flex flex-wrap items-center gap-3 pt-3 border-t border-gold/10">
                        <span className="text-cream-muted text-sm">تحديث الحالة:</span>
                        {Object.entries(statusConfig).map(([key, config]) => (
                          <button
                            key={key}
                            onClick={() => updateStatus.mutate({ id: lead.id, status: key as "new" | "contacted" | "confirmed" | "completed" | "cancelled" })}
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
      </main>
    </div>
  );
}
