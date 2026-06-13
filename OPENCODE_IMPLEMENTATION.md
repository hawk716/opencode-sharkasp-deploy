# تطبيق OpenCode مع Vercel - ملخص التنفيذ

## ما تم إنجازه

تم إنشاء تطبيق كامل يدمج OpenCode AI مع Vercel بطريقة احترافية:

### 1. صفحة OpenCode المدمجة
- **المسار**: `/opencode-web`
- **الملف**: `app/opencode-web/page.tsx`
- تعرض واجهة OpenCode مباشرة داخل iframe
- تحميل ديناميكي للرابط من متغيرات البيئة
- معالجة الأخطاء والتحميل

### 2. صفحة رئيسية محدثة
- **المسار**: `/`
- **الملف**: `app/page.tsx`
- رابط مباشر إلى `/opencode-web`
- تصميم احترافي يعكس OpenCode

### 3. Health Check API
- **المسار**: `/api/opencode/health`
- **الملف**: `app/api/opencode/health/route.ts`
- التحقق من توفر خادم OpenCode
- معلومات حالة الخادم

### 4. توثيق شاملة
- `OPENCODE_VERCEL_SETUP.md` - دليل كامل للإعداد
- يتضمن 3 طرق مختلفة للنشر:
  - Railway (الأسهل والأرخص)
  - Render
  - VPS خاص

## متطلبات الإنتاج

لتشغيل OpenCode في الإنتاج، تحتاج إلى:

### الخيار 1: Railway (موصى به)

```bash
# 1. أنشئ حساب في railway.app
# 2. أنشئ مشروع جديد
# 3. انسخ ملف Dockerfile من OPENCODE_VERCEL_SETUP.md
# 4. ادفع الكود
# 5. أضف متغيرات البيئة:
#    - OPENCODE_SERVER_PASSWORD
#    - OPENCODE_USERNAME
# 6. احصل على رابط الخادم (Domain)
```

### الخيار 2: Render

```bash
# نفس الخطوات مثل Railway لكن على render.com
```

### الخيار 3: VPS خاص

```bash
# قم بتثبيت Node.js وOpenCode على الخادم
# وقم بتشغيل OpenCode كخدمة systemd
```

## إعداد Vercel

### الخطوة 1: متغيرات البيئة
في Vercel Dashboard، أضف:

```
NEXT_PUBLIC_OPENCODE_URL = https://your-opencode-server.railway.app
```

### الخطوة 2: إعادة النشر
```bash
git add .
git commit -m "feat: add OpenCode integration"
git push origin main
```

Vercel سيقوم بإعادة البناء والنشر تلقائياً.

## الاستخدام

### بيئة التطوير
```bash
# 1. شغّل OpenCode محلياً
OPENCODE_SERVER_PASSWORD=admin123 opencode web --hostname 0.0.0.0 --port 8080

# 2. في terminal آخر، شغّل Vercel
pnpm dev

# 3. افتح http://localhost:3000/opencode-web
```

### بيئة الإنتاج
```
https://your-vercel-domain.vercel.app/opencode-web
```

كلمة المرور: اضبطها من متغيرات البيئة

## التخزين الدائم

جميع الجلسات والملفات التي ينشئها OpenCode يتم حفظها في الخادم.

في Railway/Render، استخدم Persistent Volume:
```
Mount: /root/.opencode
Size: 1GB أو أكثر
```

## معالجة المشاكل

### OpenCode لا يظهر
1. تحقق من أن خادم OpenCode يعمل
2. تأكد من أن `NEXT_PUBLIC_OPENCODE_URL` صحيح
3. افحص console في DevTools

### مشاكل CORS
```bash
# أضف Vercel domain إلى CORS
opencode web --cors https://your-vercel-domain.vercel.app
```

### مشاكل الأداء
- استخدم Persistent Volume للملفات الكبيرة
- راقب استهلاك الموارد في Railway/Render

## الملفات المهمة

```
app/
├── page.tsx                    # الصفحة الرئيسية
├── opencode-web/
│   └── page.tsx               # صفحة OpenCode المدمجة
└── api/
    └── opencode/
        └── health/
            └── route.ts       # Health check API

.env.development              # متغيرات البيئة للتطوير
OPENCODE_VERCEL_SETUP.md      # دليل الإعداد الكامل
```

## الخطوات التالية

1. ✅ اختر خادم لـ OpenCode (Railway, Render, أو VPS)
2. ✅ انسخ ملف Dockerfile من OPENCODE_VERCEL_SETUP.md
3. ✅ نشّر خادم OpenCode
4. ✅ أضف رابط الخادم إلى Vercel Environment Variables
5. ✅ أعد نشر Vercel
6. ✅ جرّب `/opencode-web`

## الدعم والمراجع

- [وثائق OpenCode](https://opencode.ai/docs)
- [وثائق Vercel](https://vercel.com/docs)
- [Railway Docs](https://docs.railway.app)
- [Render Docs](https://render.com/docs)

---

**ملاحظة**: هذا التطبيق يدعم التخزين الدائم للجلسات والملفات في خادم OpenCode.
