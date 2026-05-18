# Jiwdah Website

موقع جودة هو مشروع ويب عربي لشركة ضيافة وخدمات مناسبات في سلطنة عمان. المشروع يحتوي على واجهة تسويقية، نموذج استقبال حجوزات، ولوحة تحكم لإدارة العملاء المحتملين، البورتفوليو، ومنشورات إنستغرام.

## هيكل المشروع

```text
.
├── artifacts/
│   ├── jiwdah/        # React + Vite frontend
│   └── api-server/    # Express + tRPC API server
├── lib/
│   ├── db/            # Drizzle/PostgreSQL schema and client
│   ├── api-zod/       # Shared validation/types
│   └── api-client-react/
├── scripts/
├── package.json
└── pnpm-workspace.yaml
```

## المتطلبات

- Node.js 24+
- pnpm
- PostgreSQL database

> ملاحظة: المشروع يجبر استخدام `pnpm` عن طريق `preinstall`، لذلك لا تستخدم `npm install` أو `yarn`.

## متغيرات البيئة المطلوبة

انسخ `.env.example` إلى `.env` أو أضف هذه المتغيرات في بيئة النشر:

```env
DATABASE_URL=
PORT=3000
APP_ID=
APP_SECRET=
KIMI_AUTH_URL=
KIMI_OPEN_URL=
OWNER_UNION_ID=
BASE_PATH=/
```

### شرح سريع

- `DATABASE_URL`: رابط PostgreSQL المستخدم بواسطة Drizzle.
- `PORT`: بورت تشغيل API server.
- `APP_ID`: معرف تطبيق OAuth.
- `APP_SECRET`: سر التطبيق المستخدم لتوقيع جلسات الدخول. يجب أن يكون قيمة قوية وغير فارغة.
- `KIMI_AUTH_URL`: رابط مزود OAuth.
- `KIMI_OPEN_URL`: رابط API الخاص بجلب بيانات المستخدم.
- `OWNER_UNION_ID`: معرف المستخدم الذي يحصل على صلاحية admin.
- `BASE_PATH`: مسار بناء الواجهة، الافتراضي `/`.

## التثبيت

```bash
pnpm install
```

## فحص المشروع

```bash
pnpm run typecheck
pnpm run build
```

## تشغيل الواجهة أثناء التطوير

```bash
pnpm --filter @workspace/jiwdah dev
```

## تشغيل السيرفر أثناء التطوير

```bash
pnpm --filter @workspace/api-server dev
```

## قاعدة البيانات

مخطط قاعدة البيانات موجود في:

```text
lib/db/src/schema/index.ts
```

أوامر Drizzle المتاحة:

```bash
pnpm --filter @workspace/db generate
pnpm --filter @workspace/db migrate
pnpm --filter @workspace/db push
```

## ملاحظات إنتاج مهمة

قبل النشر النهائي، راجع النقاط التالية:

1. تأكد من ضبط `APP_SECRET` بقيمة قوية.
2. تأكد من ضبط `DATABASE_URL` في بيئة الإنتاج.
3. لا تعتمد على تخزين الملفات المحلي `uploads/` في بيئات autoscale/serverless؛ الأفضل نقل الملفات إلى object storage.
4. اضبط OAuth callback على نفس دومين الإنتاج.
5. شغل `pnpm run typecheck` و `pnpm run build` قبل الدمج إلى `main`.
