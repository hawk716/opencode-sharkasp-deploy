# البدء السريع - OpenCode AI

## ⚡ 3 خطوات للبدء

### 1️⃣ تشغيل التطبيق

```bash
pnpm install
pnpm dev
```

افتح: **http://localhost:3000**

### 2️⃣ تشغيل OpenCode

اختر إحدى الطريقتين:

#### الطريقة A: من الصفحة الرئيسية
- انقر على زر **"Start OpenCode"**
- سيفتح تلقائياً على http://localhost:8080

#### الطريقة B: من سطر الأوامر
```bash
OPENCODE_SERVER_PASSWORD=admin123 opencode web --hostname 0.0.0.0 --port 8080
```

افتح: **http://localhost:8080**

### 3️⃣ استخدم OpenCode!

كلمة المرور: `admin123`

---

## 📖 الأوامر الأساسية في OpenCode

```bash
/init              # تهيئة المشروع
/help              # عرض المساعدة
/share             # مشاركة المحادثة
/undo              # التراجع عن التغييرات
/redo              # إعادة التغييرات
<TAB>              # تبديل بين وضع البناء والتخطيط
```

## 💡 أمثلة الاستخدام

```
# اطلب من opencode تفسير الكود
How does authentication work in @app/api/auth/route.ts

# اطلب إضافة ميزة
Add a dark mode toggle to the navbar

# اطلب خطة قبل البناء (اضغط TAB أولاً)
Create a payment page with Stripe integration

# تراجع عن تغيير
/undo
```

## 🗂️ هيكل المشروع المهم

```
.
├── app/
│   ├── page.tsx              ← الصفحة الرئيسية (تشغيل opencode)
│   ├── sessions/page.tsx     ← إدارة الجلسات المحفوظة
│   └── api/opencode/         ← APIs للتكامل
├── QUICK_START.md            ← هذا الملف
├── README_OPENCODE.md        ← معلومات التكامل
├── DEPLOYMENT_GUIDE.md       ← نشر على Vercel
└── OPENCODE_SETUP.md         ← دليل تفصيلي
```

## 🔑 البيانات المعتمدة

| العنصر | القيمة |
|--------|--------|
| **عنوان البداية** | http://localhost:3000 |
| **عنوان OpenCode** | http://localhost:8080 |
| **كلمة المرور** | `admin123` |
| **البورت** | 8080 |
| **التخزين** | Vercel Blob (دائم) |

## 🌐 النشر على Vercel

```bash
# 1. رفع على GitHub
git add .
git commit -m "OpenCode AI integration"
git push

# 2. اذهب إلى Vercel Dashboard وانقر "New Project"

# 3. اختر repository وانقر "Deploy"

# 4. انتظر اكتمال النشر ثم افتح الرابط
```

أكمل في [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) لتفاصيل أكثر.

## ❓ الأسئلة الشائعة

**س: كيف أوقف opencode؟**
- اضغط `Ctrl+C` في terminal

**س: هل تُحفظ محادثاتي؟**
- نعم! في Vercel Blob (يمكن الوصول منها في صفحة `/sessions`)

**س: كيف أتغيير كلمة المرور؟**
- عدّل `OPENCODE_SERVER_PASSWORD` في `.env.local` أو Vercel Settings

**س: هل يمكن استخدام نموذج LLM آخر؟**
- نعم! في OpenCode، اكتب `/connect` واختر موفر النموذج الخاص بك

**س: كيف أستعيد جلسة قديمة؟**
- اذهب إلى `/sessions` واختر الجلسة المراد استعادتها

## 📚 المزيد

- **[OpenCode Documentation](https://opencode.ai/docs)** - الدليل الكامل
- **[README_OPENCODE.md](./README_OPENCODE.md)** - التكامل الكامل
- **[DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)** - النشر خطوة بخطوة
- **[OPENCODE_SETUP.md](./OPENCODE_SETUP.md)** - الإعداد المتقدم

---

**جاهز؟ شغّل `pnpm dev` والبدء الآن!** 🚀
