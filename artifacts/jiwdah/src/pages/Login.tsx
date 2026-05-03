import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

function getOAuthUrl(): string | null {
  const kimiAuthUrl = import.meta.env.VITE_KIMI_AUTH_URL;
  const appID = import.meta.env.VITE_APP_ID;
  if (!kimiAuthUrl || !appID) return null;

  try {
    const redirectUri = `${window.location.origin}/api/oauth/callback`;
    const url = new URL(`${kimiAuthUrl}/api/oauth/authorize`);
    url.searchParams.set("client_id", appID);
    url.searchParams.set("redirect_uri", redirectUri);
    url.searchParams.set("response_type", "code");
    url.searchParams.set("scope", "profile");
    url.searchParams.set("state", btoa(redirectUri));
    return url.toString();
  } catch {
    return null;
  }
}

export default function Login() {
  const oauthUrl = getOAuthUrl();

  return (
    <div className="min-h-screen flex items-center justify-center bg-surface" dir="rtl">
      <Card className="w-full max-w-sm border-gold/20 bg-surface-light">
        <CardHeader className="text-center">
          <CardTitle className="text-cream text-xl" style={{ fontFamily: "'Noto Serif Arabic', serif" }}>
            مرحباً بك
          </CardTitle>
          <CardDescription className="text-cream-muted text-sm">
            {oauthUrl
              ? "سجّل دخولك للوصول إلى لوحة التحكم"
              : "لوحة التحكم غير متاحة — يرجى التواصل مع المسؤول لإعداد بيانات الدخول"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {oauthUrl ? (
            <Button
              className="w-full btn-gold"
              size="lg"
              onClick={() => {
                window.location.href = oauthUrl;
              }}
            >
              تسجيل الدخول
            </Button>
          ) : (
            <div className="text-center text-cream-muted/60 text-xs py-2 border border-gold/10 rounded-lg bg-surface/50">
              VITE_KIMI_AUTH_URL أو VITE_APP_ID غير محددة
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
