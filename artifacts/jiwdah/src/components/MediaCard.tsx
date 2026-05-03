import { Camera, ExternalLink, LayoutDashboard } from "lucide-react";

function isVideo(url: string) {
  return /\.(mp4|webm|ogg)(\?|$)/i.test(url);
}

type MediaCardProps = {
  thumbnailUrl?: string | null;
  title?: string;
  categoryLabel?: string;
  className?: string;
  onClick?: () => void;
  instagramId?: string | null;
};

export default function MediaCard({ thumbnailUrl, title, categoryLabel, className = "", onClick, instagramId }: MediaCardProps) {
  if (!thumbnailUrl) {
    return (
      <div
        className={`relative flex flex-col items-center justify-center rounded overflow-hidden border border-gold/20 bg-surface-light ${className}`}
        style={{ minHeight: 200 }}
        onClick={onClick}
      >
        <div className="flex flex-col items-center gap-3 px-6 py-8 text-center">
          <div className="w-12 h-12 rounded-full border border-gold/20 bg-gold/6 flex items-center justify-center">
            <Camera className="w-5 h-5 text-gold/40" />
          </div>
          {title && (
            <p className="text-cream/40 text-xs font-light leading-relaxed">{title}</p>
          )}
          {categoryLabel && (
            <span className="text-gold/40 text-[10px] tracking-widest uppercase">{categoryLabel}</span>
          )}
          <div className="flex items-center gap-1.5 mt-1 px-3 py-1.5 rounded border border-gold/10 bg-gold/4">
            <LayoutDashboard className="w-3 h-3 text-gold/35 shrink-0" />
            <span className="text-cream/25 text-[9px] leading-tight">أضف صورة من لوحة التحكم</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`group relative rounded overflow-hidden cursor-pointer ${className}`}
      onClick={onClick}
    >
      {isVideo(thumbnailUrl) ? (
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        >
          <source src={thumbnailUrl} type="video/mp4" />
        </video>
      ) : (
        <img
          src={thumbnailUrl}
          alt={title || ""}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-surface/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
      {(title || categoryLabel) && (
        <div className="absolute bottom-0 right-0 left-0 p-3 translate-y-2 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-400">
          {categoryLabel && <p className="text-gold/60 text-[10px] tracking-widest uppercase mb-0.5">{categoryLabel}</p>}
          {title && <h4 className="text-cream text-xs font-medium" style={{ fontFamily: "'Noto Serif Arabic', serif" }}>{title}</h4>}
        </div>
      )}
      {instagramId && (
        <a
          href={`https://www.instagram.com/p/${instagramId}/`}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="absolute top-2.5 left-2.5 flex items-center gap-1.5 px-2.5 py-1.5 rounded bg-surface/70 backdrop-blur-sm border border-gold/15 text-cream/70 text-[10px] tracking-wide opacity-0 group-hover:opacity-100 transition-all duration-400 hover:bg-surface/90 hover:text-gold hover:border-gold/35"
        >
          <ExternalLink className="w-3 h-3" />
          <span>View on Instagram</span>
        </a>
      )}
    </div>
  );
}
