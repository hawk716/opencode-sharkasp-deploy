# دليل النشر الكامل - OpenCode AI على Vercel

هذا الدليل يشرح كيفية نشر OpenCode AI مع دومين مخصص على Vercel.

## 📋 المتطلبات

- ✅ حساب Vercel (مجاني)
- ✅ حساب GitHub (لربط المشروع)
- ✅ دومين (اختياري - يمكن استخدام نطاق Vercel المجاني)

## 🚀 خطوات النشر

### الخطوة 1: تجهيز المشروع محلياً

تأكد من أن المشروع يعمل محلياً:

```bash
pnpm install
pnpm dev
```

افتح `http://localhost:3000` وتحقق من أن الصفحة تعمل.

### الخطوة 2: اختبار OpenCode محلياً

```bash
# في terminal جديد
OPENCODE_SERVER_PASSWORD=admin123 opencode web --hostname 0.0.0.0 --port 8080
```

افتح `http://localhost:8080` والتحقق من أنه يعمل بشكل صحيح.

### الخطوة 3: رفع المشروع على GitHub

```bash
# تهيئة git
git init
git add .
git commit -m "Initial commit: OpenCode AI with Vercel integration"

# إنشاء repository على GitHub أولاً، ثم:
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git branch -M main
git push -u origin main
```

### الخطوة 4: ربط المشروع بـ Vercel

**الطريقة 1: عبر صفحة الويب**

1. اذهب إلى [Vercel Dashboard](https://vercel.com/dashboard)
2. انقر على "New Project"
3. اختر GitHub repository
4. اختر المشروع الخاص بك
5. اضغط "Deploy"

**الطريقة 2: باستخدام Vercel CLI**

```bash
vercel
```

واتبع التعليمات.

### الخطوة 5: إضافة متغيرات البيئة (اختياري)

في Vercel Dashboard:
1. اذهب إلى **Settings** → **Environment Variables**
2. أضف:
   ```
   OPENCODE_SERVER_PASSWORD=admin123
   ```
3. اضغط "Save"

### الخطوة 6: ربط دومين مخصص (اختياري)

#### خيار A: استخدام نطاق Vercel المجاني

سيحصل على URL تلقائي مثل: `your-project.vercel.app`

#### خيار B: ربط دومين مخصص

1. في Vercel Dashboard، اذهب إلى **Domains**
2. أضف دومينك
3. اتبع التعليمات:
   - إذا كان الدومين على Namecheap أو GoDaddy:
     - اذهب إلى DNS Settings
     - أضف CNAME records:
       ```
       CNAME  yourdomain.com     cname.vercel-dns.com
       CNAME  www.yourdomain.com cname.vercel-dns.com
       ```
   - انتظر حتى 24 ساعة للتحقق

4. تحقق من أن الدومين يعمل:
   ```bash
   nslookup yourdomain.com
   ```

## ✅ التحقق من النشر

بعد اكتمال النشر:

1. افتح `https://your-domain.com` (أو `your-project.vercel.app`)
2. تحقق من أن الصفحة الرئيسية تحمل بشكل صحيح
3. انقر على "Start OpenCode" أو تشغّل opencode من terminal
4. اختبر أن التخزين الدائم يعمل

## 🔧 إدارة النشر

### عرض سجلات النشر

```bash
vercel logs
```

### إعادة النشر

```bash
# تلقائي عند الـ git push
git push origin main

# أو يدويّاً
vercel --prod
```

### إلغاء النشر

```bash
vercel remove
```

## 📊 مراقبة الأداء

### في لوحة تحكم Vercel

1. اذهب إلى **Analytics** لعرض:
   - عدد الزيارات
   - البلدان
   - أنظمة التشغيل والمتصفحات

2. اذهب إلى **Monitoring** لعرض:
   - أداء الصفحات
   - الأخطاء
   - استخدام الموارد

### قياس Web Vitals

```bash
vercel analytics
```

## 🐛 استكشاف الأخطاء

### الصفحة تعرض 404

```bash
# تحقق من البناء
vercel build

# تحقق من السجلات
vercel logs --since 1h
```

### OpenCode لا يبدأ

- تحقق من أن البورت 8080 متاح
- تحقق من `OPENCODE_SERVER_PASSWORD` في متغيرات البيئة

### التخزين الدائم لا يعمل

- تحقق من أن Blob متصل في Vercel
- تحقق من صلاحيات IAM (إذا كنت تستخدم AWS)

## 🔐 الأمان

### كلمات المرور

```bash
# تغيير كلمة mpass opencode
# في Vercel Dashboard → Environment Variables
OPENCODE_SERVER_PASSWORD=your_strong_password
```

### تقييد الوصول

في `vercel.json`:

```json
{
  "middleware": {
    "auth": {
      "providers": ["github"],
      "redirectUrl": "/auth"
    }
  }
}
```

### HTTPS

Vercel توفر HTTPS تلقائياً لجميع النطاقات.

## 📈 الخطوات التالية

بعد النشر:

1. **إضافة CI/CD**
   ```bash
   # إضافة GitHub Actions للاختبارات التلقائية
   ```

2. **النسخ الاحتياطية**
   - Vercel Blob يتعامل مع النسخ الاحتياطية تلقائياً
   - يمكنك تصدير البيانات يدويّاً

3. **المراقبة**
   - إعداد تنبيهات للأخطاء
   - مراقبة الأداء بانتظام

4. **التحديثات**
   - تحديث OpenCode عند إطلاق نسخ جديدة
   ```bash
   npm install -g opencode-ai@latest
   ```

## 📞 الدعم

### للمشاكل

1. **Vercel**: [vercel.com/help](https://vercel.com/help)
2. **OpenCode**: [opencode.ai/docs](https://opencode.ai/docs)
3. **GitHub**: [github.com/anomalyco/opencode](https://github.com/anomalyco/opencode)

### الأسئلة الشائعة

**س: كم تكلفة النشر؟**
ج: مجاني تماماً! Vercel توفر خطة مجانية سخية.

**س: هل أحتاج دومين؟**
ج: لا، يمكنك استخدام النطاق المجاني `your-project.vercel.app`

**س: هل البيانات آمنة؟**
ج: نعم، Blob يشفر البيانات تلقائياً ولا أحد يمكنه الوصول إليها غيرك.

**س: كيف أحتفظ بسجلاتي؟**
ج: Vercel Blob يحتفظ بالبيانات بشكل دائم. يمكنك تصديرها في أي وقت.

---

**تم! OpenCode AI الآن متاح عبر الويب مع دومين مخصص! 🎉**
