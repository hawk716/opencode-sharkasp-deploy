# OpenCode AI + Vercel Integration

**اجعل OpenCode AI متاحاً على الويب مع تخزين دائم والنشر على Vercel!**

## ⚡ البدء السريع

### 1. تشغيل التطبيق محلياً

```bash
pnpm install
pnpm dev
```

افتح `http://localhost:3000` ✨

### 2. تشغيل OpenCode Web Interface

من الصفحة الرئيسية، انقر على **"Start OpenCode"** أو شغّله مباشرة:

```bash
OPENCODE_SERVER_PASSWORD=admin123 opencode web --hostname 0.0.0.0 --port 8080
```

افتح `http://localhost:8080` 🚀

## 🎯 ما تم إعداده

✅ **صفحة رئيسية جميلة** لتشغيل OpenCode  
✅ **API لإدارة الجلسات** مع Vercel Blob  
✅ **صفحة إدارة الجلسات** لعرض وحذف الجلسات  
✅ **تخزين دائم** للملفات والجلسات  
✅ **إعدادات Vercel** جاهزة للنشر مع دومين مخصص  

## 📁 هيكل المشروع

```
.
├── app/
│   ├── page.tsx                    # صفحة البداية
│   ├── sessions/page.tsx           # إدارة الجلسات
│   └── api/opencode/
│       ├── start/route.ts          # تشغيل opencode
│       └── storage/route.ts        # التخزين الدائم
├── vercel.json                     # تكوين Vercel
├── OPENCODE_SETUP.md               # دليل تفصيلي
└── package.json
```

## 🌐 النشر على Vercel

### الخطوة 1: ربط GitHub

```bash
git init
git add .
git commit -m "Initial commit with OpenCode"
git remote add origin <your-repo-url>
git push -u origin main
```

### الخطوة 2: النشر على Vercel

زيارة [Vercel Dashboard](https://vercel.com/dashboard) وانقر على "Add New Project"

### الخطوة 3: ربط دومين (اختياري)

في لوحة تحكم Vercel:
1. اذهب إلى **Domains**
2. أضف دومينك
3. اتبع التعليمات للتحقق

### الخطوة 4: تشغيل OpenCode على Vercel

بعد النشر، يمكنك:
- الوصول إلى الصفحة الرئيسية: `https://your-domain.com`
- تشغيل OpenCode من الواجهة
- حفظ الجلسات والملفات بشكل دائم

## 🔐 الأمان

- **كلمة مرور OpenCode**: تُغيّر في متغيرات البيئة
- **Blob Storage**: تشفير تلقائي وخصوصي
- **CORS**: محمي من الوصول غير المصرح به

## 📊 APIs المتاحة

| الطريقة | المسار | الوصف |
|--------|--------|-------|
| POST | `/api/opencode/start` | تشغيل opencode |
| GET | `/api/opencode/start` | التحقق من الحالة |
| POST | `/api/opencode/storage` | حفظ جلسة/ملف |
| GET | `/api/opencode/storage` | استرجاع البيانات |
| DELETE | `/api/opencode/storage` | حذف جلسة |

## 🛠 متغيرات البيئة

```env
# اختياري - كلمة مرور opencode
OPENCODE_SERVER_PASSWORD=admin123
```

## 📚 موارد إضافية

- [OpenCode Documentation](https://opencode.ai/docs)
- [Vercel Blob Docs](https://vercel.com/docs/storage/vercel-blob)
- [دليل شامل](./OPENCODE_SETUP.md)

## 🤝 الدعم

للمساعدة، راجع:
- [وثائق OpenCode](https://opencode.ai/docs)
- [مجتمع OpenCode على GitHub](https://github.com/anomalyco/opencode)
- [Vercel Support](https://vercel.com/help)

---

**تم الإعداد بنجاح! ابدأ الآن مع OpenCode AI** 🎉
