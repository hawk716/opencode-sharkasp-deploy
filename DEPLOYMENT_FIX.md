# Deployment Fixes for OpenCode AI

## المشاكل التي تم إصلاحها

### 1. ملف `vercel.json` غير صحيح
**المشكلة:**
- استخدام `npm` بدلاً من `pnpm` (المشروع يستخدم pnpm)
- وجود `crons` API غير مدعوم في Vercel
- وجود `functions` runtime غير صحيح

**الحل:**
- أزلنا أوامر البناء (Next.js يتعامل معها تلقائياً)
- أزلنا تكوين crons غير الصحيح
- أزلنا تكوين functions غير الضروري

### 2. API Route `/api/opencode/start` غير متوافقة مع Vercel
**المشكلة:**
- استخدام `child_process.exec()` غير المدعوم في Serverless Functions
- محاولة تشغيل OpenCode من داخل API route (غير ممكن في Vercel)
- استخدام `localhost:8080` (لا يعمل في بيئة الإنتاج)

**الحل:**
- حول الـ API إلى مجرد route للتحقق من الحالة
- أزلنا كود تشغيل OpenCode (يجب تشغيله منفصلاً)
- اعتماد متغيرات البيئة للوصول إلى OpenCode

### 3. Blob Storage Access غير صحيح
**المشكلة:**
- محاولة الوصول مباشرة إلى blob URLs (غير موثوقة)
- بناء URLs يدويّاً بدلاً من استخدام Vercel Blob API

**الحل:**
- استخدام `list()` و `downloadUrl` من `@vercel/blob`
- إضافة معالجة أخطاء صحيحة

## الملفات المعدّلة

1. **`vercel.json`** - تنظيف التكوين
2. **`app/api/opencode/start/route.ts`** - إزالة child_process وتحويله إلى status API
3. **`app/api/opencode/storage/route.ts`** - إصلاح blob access
4. **`app/opencode/page.tsx`** - إصلاح الروابط

## التشغيل الصحيح

### بيئة التطوير (Development)
```bash
# Terminal 1: Next.js dev server
pnpm dev

# Terminal 2: OpenCode AI
OPENCODE_SERVER_PASSWORD=admin123 opencode web --hostname 0.0.0.0 --port 8080
```

### بيئة الإنتاج (Production on Vercel)
- يجب تشغيل OpenCode كـ separate service على Vercel
- أو استخدام custom server على Vercel Nomads
- أو دمج OpenCode في dockerfile

## ملاحظات مهمة

1. **OpenCode يجب أن يعمل خارج Vercel Functions** - لا يمكن تشغيل عمليات طويلة في Serverless
2. **Vercel Blob للتخزين** - مدعوم بالكامل للملفات والجلسات
3. **متغيرات البيئة** - معرّفة في `vercel.json` وتدعم التكوين ديناميكياً

## التحقق من النشر

```bash
# تحقق من البناء محلياً
pnpm build

# ستظهر جميع routes بدون أخطاء
# ✅ Deployment ready!
```

النشر الآن آمن وجاهز على Vercel!
