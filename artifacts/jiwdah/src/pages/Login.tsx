import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

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
              window.location.href = "/api/oauth/login";
            }}
          >
            تسجيل الدخول
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}