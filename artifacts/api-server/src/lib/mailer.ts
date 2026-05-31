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

export interface InquiryData {
  id: number;
  name: string;
  email?: string | null;
  phone?: string | null;
  service?: string | null;
  message: string;
  source?: string | null;
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function renderValue(value?: string | null): string {
  return value && value.trim() ? escapeHtml(value.trim()) : "—";
}

function renderSubjectValue(value: string): string {
  return value.replace(/[\r\n]+/g, " ").trim();
}

export async function sendNewInquiryNotification(inquiry: InquiryData): Promise<void> {
  if (!SMTP_USER || !SMTP_PASS) {
    console.warn("[mailer] SMTP credentials not configured — skipping notification");
    return;
  }

  const rows = [
    ["الاسم", renderValue(inquiry.name)],
    ["البريد الإلكتروني", renderValue(inquiry.email)],
    ["الهاتف", renderValue(inquiry.phone)],
    ["الخدمة المطلوبة", renderValue(inquiry.service)],
    ["الرسالة", renderValue(inquiry.message)],
    ["المصدر", renderValue(inquiry.source)],
  ];

  const tableRows = rows
    .map(
      ([label, value]) => `
      <tr>
        <td style="padding:8px 12px;background:#eef4ff;color:#164e9b;font-weight:bold;border:1px solid #d9e6fb;text-align:right;">${label}</td>
        <td style="padding:8px 12px;background:#fff;color:#172033;border:1px solid #d9e6fb;text-align:right;white-space:pre-wrap;">${value}</td>
      </tr>`
    )
    .join("");

  const html = `
<!DOCTYPE html>
<html dir="rtl" lang="ar">
<head><meta charset="UTF-8"></head>
<body style="margin:0;padding:24px;background:#f5f8fc;font-family:Arial,sans-serif;">
  <div style="max-width:620px;margin:0 auto;background:#fff;border:1px solid #d9e6fb;border-radius:16px;overflow:hidden;">
    <div style="background:linear-gradient(135deg,#2563eb,#0f4ca8);padding:24px;text-align:center;">
      <h1 style="margin:0;color:#fff;font-size:20px;">استفسار جديد من المنصة</h1>
      <p style="margin:8px 0 0;color:#ffffffcc;font-size:14px;">Mohamed Masoud Digital Platform — رقم #${inquiry.id}</p>
    </div>
    <div style="padding:24px;">
      <table style="width:100%;border-collapse:collapse;border-radius:8px;overflow:hidden;">
        ${tableRows}
      </table>
    </div>
    <div style="padding:16px 24px;background:#f8fbff;text-align:center;">
      <p style="margin:0;color:#64748b;font-size:12px;">تم إرسال هذا الإشعار تلقائيًا من نموذج الاستفسارات.</p>
    </div>
  </div>
</body>
</html>`;

  try {
    await transporter.sendMail({
      from: `"Mohamed Masoud Digital Platform" <${SMTP_USER}>`,
      to: NOTIFY_EMAIL,
      subject: `استفسار جديد — ${renderSubjectValue(inquiry.name)}`,
      html,
    });
    console.log(`[mailer] Notification sent for inquiry #${inquiry.id} to ${NOTIFY_EMAIL}`);
  } catch (error) {
    console.error("[mailer] Failed to send notification:", error);
  }
}
