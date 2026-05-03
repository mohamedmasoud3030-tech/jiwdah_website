import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

function getOAuthUrl() {
  const kimiAuthUrl = import.meta.env.VITE_KIMI_AUTH_URL;
  const appID = import.meta.env.VITE_APP_ID;
  const redirectUri = `${window.location.origin}/api/oauth/callback`;
  const state = btoa(redirectUri);

  const url = new URL(`${kimiAuthUrl}/api/oauth/authorize`);
  url.searchParams.set("client_id", appID);
  url.searchParams.set("redirect_uri", redirectUri);
  url.searchParams.set("response_type", "code");
  url.searchParams.set("scope", "profile");
  url.searchParams.set("state", state);

  return url.toString();
}

export default function Login() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-surface" dir="rtl">
      <Card className="w-full max-w-sm border-gold/20 bg-surface-light">
        <CardHeader className="text-center">
          <CardTitle className="text-cream text-xl" style={{ fontFamily: "'Noto Serif Arabic', serif" }}>
            مرحباً بك
          </CardTitle>
          <CardDescription className="text-cream-muted text-sm">
            سجّل دخولك للوصول إلى لوحة التحكم
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button
            className="w-full btn-gold"
            size="lg"
            onClick={() => {
              window.location.href = getOAuthUrl();
            }}
          >
            تسجيل الدخول
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
