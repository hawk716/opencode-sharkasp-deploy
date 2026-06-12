# OpenCode AI Setup Guide

هذا المشروع يتضمن تكامل كامل مع OpenCode AI مع التخزين الدائم للجلسات والملفات.

## المميزات

✅ **واجهة ويب OpenCode**: وصول مباشر إلى opencode-ai عبر البورت 8080
✅ **التخزين الدائم**: حفظ الجلسات والملفات باستخدام Vercel Blob
✅ **إدارة الجلسات**: عرض، حذف، واسترجاع الجلسات السابقة
✅ **النشر على Vercel**: دومين مخصص وتدفق نشر تلقائي
✅ **الأمان**: حماية بكلمة مرور للوصول إلى واجهة الويب

## البدء السريع

### 1. تثبيت المتطلبات

```bash
npm install -g opencode-ai
pnpm install
```

### 2. تشغيل التطبيق محلياً

```bash
pnpm dev
```

ثم افتح `http://localhost:3000` في المتصفح.

### 3. تشغيل OpenCode

انقر على زر "Start OpenCode" على الصفحة الرئيسية، أو قم بتشغيل الأمر مباشرة:

```bash
OPENCODE_SERVER_PASSWORD=admin123 opencode web --hostname 0.0.0.0 --port 8080
```

ثم افتح `http://localhost:8080` في المتصفح.

## الملفات والمجلدات

```
app/
├── page.tsx                          # الصفحة الرئيسية
├── sessions/
│   └── page.tsx                      # صفحة إدارة الجلسات
├── api/
│   └── opencode/
│       ├── start/route.ts            # API لتشغيل opencode
│       └── storage/route.ts          # API للتخزين الدائم
```

## متغيرات البيئة

أضف هذه المتغيرات إلى `.env.local` أو في إعدادات Vercel:

```env
# اختياري - كلمة مرور opencode
OPENCODE_SERVER_PASSWORD=admin123
```

## API Endpoints

### POST /api/opencode/start
تشغيل opencode-ai

**الرد:**
```json
{
  "message": "OpenCode started successfully",
  "url": "http://localhost:8080",
  "password": "admin123"
}
```

### GET /api/opencode/start
التحقق من حالة opencode

**الرد:**
```json
{
  "status": "running",
  "url": "http://localhost:8080"
}
```

### POST /api/opencode/storage
حفظ جلسة أو ملف

**الطلب:**
```json
{
  "action": "save-session",
  "data": { "name": "My Project" }
}
```

### GET /api/opencode/storage
استرجاع الجلسات أو الملفات

**المعاملات:**
- `action=list-sessions` - قائمة الجلسات
- `action=get-session&sessionId=xyz` - الحصول على جلسة معينة
- `action=list-files&sessionId=xyz` - الملفات في جلسة

### DELETE /api/opencode/storage
حذف جلسة

**الطلب:**
```json
{
  "sessionId": "xyz"
}
```

## التخزين الدائم

يستخدم التطبيق **Vercel Blob** لتخزين:

- **الجلسات**: `sessions/{sessionId}/data.json`
- **الملفات**: `sessions/{sessionId}/files/{fileId}-{fileName}`

جميع البيانات مشفرة وخاصة.

## النشر على Vercel

### 1. ربط المشروع بـ Vercel

```bash
vercel
```

### 2. إضافة متغيرات البيئة

في لوحة تحكم Vercel:
1. اذهب إلى Settings → Environment Variables
2. أضف `OPENCODE_SERVER_PASSWORD=admin123` (اختياري)

### 3. ربط دومين مخصص

1. اذهب إلى Domains في لوحة تحكم Vercel
2. أضف دومينك وأكمل التحقق

### 4. النشر

```bash
git push
```

سيتم النشر تلقائياً على Vercel.

## استخدام OpenCode

بعد تشغيل `opencode web`، يمكنك:

1. **الوصول إلى واجهة الويب**: http://localhost:8080
2. **تسجيل الدخول**: استخدم كلمة المرور `admin123`
3. **تهيئة المشروع**: قم بتشغيل `/init` من داخل opencode
4. **طلب المساعدة**: اكتب أسئلتك وسيقوم opencode بمساعدتك

### أمثلة استخدام

```
# شرح الكود
How is authentication handled in @app/api/auth/route.ts

# إضافة ميزة
Add a dark mode toggle to the navbar

# إنشاء خطة
/plan
When a user deletes a post, flag it as deleted in the database

# الرجوع عن التغييرات
/undo
```

## الموارد

- [OpenCode Documentation](https://opencode.ai/docs)
- [Vercel Blob Documentation](https://vercel.com/docs/storage/vercel-blob)
- [Next.js Documentation](https://nextjs.org/docs)

## التحكم في المشروع

### متابعة السجلات

```bash
vercel logs
```

### التحقق من حالة الخادم

```bash
curl http://localhost:3000/api/opencode/start
```

### إعادة تشغيل opencode

قم بإيقاف الخادم وتشغيل الأمر مرة أخرى:

```bash
OPENCODE_SERVER_PASSWORD=admin123 opencode web --hostname 0.0.0.0 --port 8080
```

## استكشاف الأخطاء

### opencode لا يبدأ
- تحقق من أن البورت 8080 غير مشغول
- تحقق من تثبيت opencode-ai: `npm list -g opencode-ai`

### لا يمكن الوصول إلى Blob
- تحقق من أن تكامل Blob متصل في Vercel
- تحقق من متغيرات البيئة

### مشاكل الجلسات
- امسح ذاكرة التخزين المؤقت في المتصفح
- تحقق من أن Blob يحتوي على البيانات

## الدعم

للمزيد من المساعدة:
- 📚 [وثائق OpenCode](https://opencode.ai/docs)
- 💬 [مجتمع OpenCode](https://github.com/anomalyco/opencode)
- 🆘 [Vercel Support](https://vercel.com/help)
