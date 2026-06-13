# OpenCode مع Vercel - دليل الإعداد الكامل

## نظرة عامة

هذا الدليل يشرح كيفية إعداد OpenCode AI ليعمل مع تطبيق Vercel بحيث تكون واجهة OpenCode متاحة على نفس الدومين.

## المتطلبات

1. تطبيق Next.js على Vercel ✅
2. خادم منفصل لتشغيل OpenCode (Railway, Render, أو VPS)
3. دومين مخصص (اختياري)

## الطريقة 1: استخدام Railway (الأسهل)

### الخطوة 1: إنشاء حساب Railway
1. اذهب إلى [railway.app](https://railway.app)
2. سجل دخول أو أنشئ حساب جديد

### الخطوة 2: إنشاء مشروع جديد
1. اضغط "New Project"
2. اختر "Deploy from GitHub"
3. اختر هذا المشروع أو أنشئ مشروع جديد فقط لـ OpenCode

### الخطوة 3: إنشاء Dockerfile
أنشئ ملف `Dockerfile` في الجذر:

```dockerfile
FROM node:20-alpine

WORKDIR /app

# تثبيت OpenCode
RUN npm install -g opencode-ai

# تثبيت تبعيات الحزمة
COPY package*.json ./
RUN npm install

# كشف البورت
EXPOSE 8080

# متغيرات البيئة المطلوبة
ENV OPENCODE_SERVER_PASSWORD=${OPENCODE_SERVER_PASSWORD:-admin123}
ENV OPENCODE_USERNAME=${OPENCODE_USERNAME:-opencode}

# تشغيل OpenCode
CMD ["opencode", "web", "--hostname", "0.0.0.0", "--port", "8080"]
```

### الخطوة 4: إضافة متغيرات البيئة في Railway
في لوحة تحكم Railway:
1. اذهب إلى Variables
2. أضف:
   - `OPENCODE_SERVER_PASSWORD`: (كلمة مرور قوية)
   - `OPENCODE_USERNAME`: opencode

### الخطوة 5: الحصول على رابط الخادم
1. في Railway، اذهب إلى Networking
2. انسخ رابط الخادم العام (Domain)
3. سيكون بصيغة: `https://your-service-name-production.railway.app`

## الطريقة 2: استخدام Render

### الخطوة 1: إنشاء خدمة جديدة
1. اذهب إلى [render.com](https://render.com)
2. اضغط "New +"
3. اختر "Web Service"

### الخطوة 2: إنشاء Dockerfile
استخدم نفس الـ Dockerfile أعلاه

### الخطوة 3: إضافة متغيرات البيئة
في إعدادات الخدمة:
```
OPENCODE_SERVER_PASSWORD=your-secure-password
OPENCODE_USERNAME=opencode
```

### الخطوة 4: النشر والحصول على الرابط
بعد النشر، ستجد رابط الخادم في Overview

## الطريقة 3: VPS خاص (DigitalOcean, Linode, إلخ)

### الخطوة 1: إعداد الخادم
```bash
# تحديث النظام
sudo apt update && sudo apt upgrade -y

# تثبيت Node.js
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs

# تثبيت OpenCode
sudo npm install -g opencode-ai
```

### الخطوة 2: إنشاء خدمة systemd
أنشئ `/etc/systemd/system/opencode.service`:

```ini
[Unit]
Description=OpenCode AI Server
After=network.target

[Service]
Type=simple
User=opencode
WorkingDirectory=/home/opencode
Environment="OPENCODE_SERVER_PASSWORD=your-secure-password"
Environment="OPENCODE_USERNAME=opencode"
ExecStart=/usr/local/bin/opencode web --hostname 0.0.0.0 --port 8080
Restart=on-failure
RestartSec=10

[Install]
WantedBy=multi-user.target
```

### الخطوة 3: تشغيل الخدمة
```bash
sudo systemctl daemon-reload
sudo systemctl start opencode
sudo systemctl enable opencode
```

### الخطوة 4: إعداد Nginx Reverse Proxy (اختياري)
```nginx
server {
    listen 80;
    server_name opencode.yourdomain.com;

    location / {
        proxy_pass http://localhost:8080;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

## إعداد Vercel

### الخطوة 1: إضافة متغير البيئة
في Vercel Dashboard:
1. اذهب إلى Project Settings
2. اختر Environment Variables
3. أضف:
   - اسم: `NEXT_PUBLIC_OPENCODE_URL`
   - القيمة: رابط خادم OpenCode (مثلاً: `https://your-service-name-production.railway.app`)

**ملاحظة**: استخدم `NEXT_PUBLIC_` prefix لجعل المتغير متاحاً في الـ Client-side

### الخطوة 2: إضافة رابط OpenCode في الصفحة الرئيسية
قم بتحديث صفحتك بحيث توجه المستخدمين إلى `/opencode-web`

## الوصول إلى OpenCode

### محلياً (في بيئة التطوير)
```
http://localhost:3000/opencode-web
```

### في الإنتاج
```
https://your-vercel-domain.vercel.app/opencode-web
```

كلمة المرور: `admin123` (أو ما قمت بتعيينه في متغيرات البيئة)

## التعامل مع CORS

إذا واجهت مشاكل CORS عند محاولة الوصول إلى OpenCode، أضف رابط Vercel إلى قائمة CORS المسموحة:

```bash
opencode web --cors https://your-vercel-domain.vercel.app
```

أو في ملف الإعدادات:

```json
{
  "server": {
    "cors": ["https://your-vercel-domain.vercel.app"]
  }
}
```

## التخزين الدائم

جميع الجلسات والملفات يتم حفظها في خادم OpenCode.

إذا كنت تستخدم Railway أو Render:
- الملفات محفوظة في `/root/.opencode` (داخل الحاوية)
- بعد إعادة تشغيل الحاوية قد تُفقد البيانات

### الحل: استخدام Persistent Disk
في Railway أو Render، قم بإنشاء Persistent Volume:
```
Mount: /root/.opencode
Size: 1GB أو أكثر
```

## استكشاف الأخطاء

### OpenCode لا يستجيب
```bash
# تحقق من حالة الخدمة
curl -I https://your-opencode-url/health

# عرض السجلات في Railway/Render
# أو تحقق من سجلات الخدمة في VPS:
journalctl -u opencode -f
```

### مشاكل CORS
تأكد من أن `NEXT_PUBLIC_OPENCODE_URL` يحتوي على الرابط الصحيح بدون slash في النهاية

### مشاكل المصادقة
تأكد من أن كلمة المرور الصحيحة موضوعة في `OPENCODE_SERVER_PASSWORD`

## الأمان

### كلمة مرور قوية
استخدم كلمة مرور قوية:
```bash
openssl rand -base64 32
```

### HTTPS مجاني
استخدم Let's Encrypt مع Certbot:
```bash
sudo certbot certonly --standalone -d opencode.yourdomain.com
```

### جدار حماية
قيّد الوصول للبورت 8080 إذا كنت تستخدم VPS:
```bash
sudo ufw allow 80/tcp  # للـ reverse proxy
sudo ufw allow 443/tcp # للـ HTTPS
```

## الخطوات التالية

1. ✅ أعد نشر Vercel بعد إضافة متغيرات البيئة
2. ✅ اختبر الوصول إلى `/opencode-web`
3. ✅ تحقق من أن الجلسات تُحفظ بشكل صحيح
4. ✅ أضف دومين مخصص إذا كان لديك واحد

## الدعم

للمساعدة أكثر:
- [وثائق OpenCode](https://opencode.ai/docs)
- [Railway Documentation](https://docs.railway.app)
- [Render Documentation](https://render.com/docs)
