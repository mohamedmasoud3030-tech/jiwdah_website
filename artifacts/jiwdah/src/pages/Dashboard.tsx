import { FileText, FolderKanban, Inbox, LogOut, ShieldAlert } from "lucide-react";
import AppShell from "@/components/AppShell";
import { useAuth } from "@/hooks/useAuth";
import { useSiteCopy } from "@/hooks/useSiteCopy";

export default function Dashboard() {
  const copy = useSiteCopy();
  const { user, isAdmin, isLoading, logout } = useAuth({ redirectOnUnauthenticated: true });

  if (isLoading) {
    return (
      <AppShell>
        <section className="site-section">
          <div className="site-container empty-state" aria-live="polite">Loading...</div>
        </section>
      </AppShell>
    );
  }

  if (!user || !isAdmin) {
    return (
      <AppShell>
        <section className="site-section">
          <div className="site-container empty-state" role="alert">
            <ShieldAlert size={24} style={{ margin: "0 auto 12px" }} />
            {copy.dashboard.empty}
          </div>
        </section>
      </AppShell>
    );
  }

  const cards = [
    { icon: Inbox, title: copy.dashboard.inquiries },
    { icon: FolderKanban, title: copy.dashboard.portfolio },
    { icon: FileText, title: copy.dashboard.content },
  ];

  return (
    <AppShell>
      <section className="site-section">
        <div className="site-container bento-grid">
          <article className="bento-card bento-wide">
            <p className="section-kicker">{copy.dashboard.title}</p>
            <h1 className="section-title-small">{copy.dashboard.subtitle}</h1>
            <p className="section-lead">{copy.dashboard.empty}</p>
          </article>
          <article className="bento-card">
            <p className="section-kicker">{user.name || user.email}</p>
            <div className="actions-row">
              <button type="button" className="btn-secondary" onClick={logout}>
                <LogOut size={17} />
                Sign out
              </button>
            </div>
          </article>
        </div>
      </section>
      <section className="site-section" style={{ paddingTop: 0 }}>
        <div className="site-container bento-grid">
          {cards.map(({ icon: Icon, title }) => (
            <article key={title} className="bento-card">
              <span className="service-icon"><Icon size={20} /></span>
              <h2 className="service-title">{title}</h2>
              <p className="service-description">{copy.dashboard.empty}</p>
            </article>
          ))}
        </div>
      </section>
    </AppShell>
  );
}
