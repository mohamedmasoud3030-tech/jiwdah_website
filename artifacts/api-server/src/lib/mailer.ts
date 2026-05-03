import nodemailer from "nodemailer";

const SMTP_HOST = process.env.SMTP_HOST?.includes("@")
  ? "smtp.gmail.com"
  : (process.env.SMTP_HOST ?? "smtp.gmail.com");

const SMTP_PORT = parseInt(process.env.SMTP_PORT ?? "465", 10);
const SMTP_USER = process.env.SMTP_USER ?? "";
const SMTP_PASS = process.env.SMTP_PASS ?? "";
const NOTIFY_EMAIL = process.env.NOTIFY_EMAIL ?? SMTP_USER;

const transporter = nodemailer.createTransport({
  host: SMTP_HOST,
  port: SMTP_PORT,
  secure: SMTP_PORT === 465,
  auth: {
    user: SMTP_USER,
    pass: SMTP_PASS,
  },
});

const SERVICE_LABELS: Record<string, string> = {
  vip: "VIP",
  wedding: "حفل زفاف",
  conference: "مؤتمر",
  private: "مناسبة خاصة",
  corporate: "فعالية شركات",
  coffee: "كوفي كارت",
};

export interface LeadData {
  id: number;
  name: string;
  phone: string;
  service: string;
  eventDate?: string | null;
  location?: string | null;
  budget?: string | null;
  guests?: number | null;
  notes?: string | null;
  source?: string | null;
}

export async function sendNewLeadNotification(lead: LeadData): Promise<void> {
  if (!SMTP_USER || !SMTP_PASS) {
    console.warn("[mailer] SMTP credentials not configured — skipping notification");
    return;
  }

  const serviceLabel = SERVICE_LABELS[lead.service] ?? lead.service;

  const rows = [
    ["الاسم", lead.name],
    ["الهاتف", lead.phone],
    ["الخدمة", serviceLabel],
    ["تاريخ الفعالية", lead.eventDate ?? "—"],
    ["الموقع", lead.location ?? "—"],
    ["الميزانية", lead.budget ?? "—"],
    ["عدد الضيوف", lead.guests?.toString() ?? "—"],
    ["ملاحظات", lead.notes ?? "—"],
    ["المصدر", lead.source ?? "—"],
  ];

  const tableRows = rows
    .map(
      ([label, value]) => `
      <tr>
        <td style="padding:8px 12px;background:#1a1a1a;color:#b89c5e;font-weight:bold;border:1px solid #2a2a2a;text-align:right;">${label}</td>
        <td style="padding:8px 12px;background:#111;color:#e8dcc8;border:1px solid #2a2a2a;text-align:right;">${value}</td>
      </tr>`
    )
    .join("");

  const html = `
<!DOCTYPE html>
<html dir="rtl" lang="ar">
<head><meta charset="UTF-8"></head>
<body style="margin:0;padding:24px;background:#0a0a0a;font-family:Arial,sans-serif;">
  <div style="max-width:560px;margin:0 auto;background:#111;border:1px solid #2a2a2a;border-radius:12px;overflow:hidden;">
    <div style="background:linear-gradient(135deg,#b89c5e,#8a7240);padding:24px;text-align:center;">
      <h1 style="margin:0;color:#fff;font-size:20px;">🔔 طلب حجز جديد</h1>
      <p style="margin:8px 0 0;color:#fff9;font-size:14px;">مشاريع جودة الإنطلاقة — رقم #${lead.id}</p>
    </div>
    <div style="padding:24px;">
      <table style="width:100%;border-collapse:collapse;border-radius:8px;overflow:hidden;">
        ${tableRows}
      </table>
    </div>
    <div style="padding:16px 24px;background:#0a0a0a;text-align:center;">
      <p style="margin:0;color:#666;font-size:12px;">تم إرسال هذا الإشعار تلقائياً من نظام إدارة الحجوزات</p>
    </div>
  </div>
</body>
</html>`;

  try {
    await transporter.sendMail({
      from: `"مشاريع جودة الإنطلاقة" <${SMTP_USER}>`,
      to: NOTIFY_EMAIL,
      subject: `🔔 طلب حجز جديد — ${lead.name} (${serviceLabel})`,
      html,
    });
    console.log(`[mailer] Notification sent for lead #${lead.id} to ${NOTIFY_EMAIL}`);
  } catch (err) {
    console.error("[mailer] Failed to send notification:", err);
  }
}
