# OpenCode + Vercel - الحل النهائي

## المشكلة الأصلية
`localhost:8080` لا يعمل في بيئة الإنتاج. OpenCode يحتاج إلى خادم منفصل.

## الحل
نشر OpenCode على خادم منفصل (Railway, Render, أو VPS) والربط معه عبر `NEXT_PUBLIC_OPENCODE_URL`.

## الخطوات السريعة

### 1. النشر على Railway (الأسهل)

```bash
# 1. انشئ حساب Railway: https://railway.app
# 2. أنشئ مشروع جديد
# 3. انسخ محتوى Dockerfile من هذا المشروع
# 4. Railway سيكتشف Dockerfile تلقائياً
# 5. أضف متغيرات البيئة:
OPENCODE_SERVER_PASSWORD = your-secure-password
OPENCODE_USERNAME = opencode

# 6. انسخ رابط الدومين من Railway Dashboard
```

### 2. إضافة الرابط إلى Vercel

في Vercel Dashboard:
```
Settings → Environment Variables

اسم: NEXT_PUBLIC_OPENCODE_URL
القيمة: https://your-railway-domain.railway.app

أعد نشر المشروع
```

### 3. اختبر
افتح: `https://your-vercel-domain.vercel.app/opencode-web`

## البنية الجديدة

```
https://your-vercel-domain.vercel.app/          ← الصفحة الرئيسية
https://your-vercel-domain.vercel.app/opencode-web  ← OpenCode UI
                                                      ↓
                                            يفتح iframe يشير إلى
                                                      ↓
        https://your-railway-domain.railway.app  ← خادم OpenCode
```

## التخزين الدائم

جميع البيانات محفوظة في خادم OpenCode:
- الجلسات
- الملفات المُنشأة
- الإعدادات

### لتفعيل التخزين الدائم في Railway:

1. اذهب إلى Railway Dashboard
2. اختر مشروع OpenCode
3. اضغط "Add Volume"
4. Mount Path: `/root/.opencode`
5. Size: 1GB أو أكثر

## الملفات المضافة

- `app/opencode-web/page.tsx` - صفحة OpenCode المدمجة
- `app/api/opencode/health/route.ts` - Health check
- `Dockerfile` - للنشر على Railway/Render
- `docker-compose.yml` - للتطوير المحلي
- `OPENCODE_VERCEL_SETUP.md` - دليل شامل
- `OPENCODE_IMPLEMENTATION.md` - ملخص التنفيذ

## التطوير المحلي

### الطريقة 1: بدون Docker
```bash
# Terminal 1: تشغيل OpenCode
OPENCODE_SERVER_PASSWORD=admin123 opencode web --hostname 0.0.0.0 --port 8080

# Terminal 2: تشغيل Vercel
pnpm dev

# افتح: http://localhost:3000/opencode-web
```

### الطريقة 2: مع Docker
```bash
# تشغيل OpenCode في Docker
docker-compose up -d

# في terminal آخر
pnpm dev

# افتح: http://localhost:3000/opencode-web
```

## معالجة المشاكل

### خطأ: "OpenCode is not responding"
- تحقق من أن الخادم يعمل
- تأكد من صحة الرابط في `NEXT_PUBLIC_OPENCODE_URL`

### خطأ CORS
- أضف Vercel domain إلى قائمة CORS في OpenCode

### الملفات لا تُحفظ
- أضف Persistent Volume في Railway/Render

## الأمان

- استخدم كلمة مرور قوية: `openssl rand -base64 32`
- استخدم HTTPS في الإنتاج (Railway/Render يوفرانه)
- احدّ الوصول للخادم من Vercel فقط

## الخطوات التالية

1. ✅ انشئ حساب Railway
2. ✅ نشّر Dockerfile
3. ✅ احصل على رابط الخادم
4. ✅ أضفه إلى Vercel Environment Variables
5. ✅ أعد نشر Vercel
6. ✅ جرّب `/opencode-web`

## المساعدة

- [Railway Docs](https://docs.railway.app)
- [Vercel Docs](https://vercel.com/docs)
- [OpenCode Docs](https://opencode.ai/docs)

---

**تم إكمال الإعداد! الآن OpenCode يعمل بشكل احترافي مع Vercel.**
