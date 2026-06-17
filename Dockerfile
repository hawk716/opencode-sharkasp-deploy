FROM node:20-alpine

WORKDIR /app

# تثبيت التبعيات الضرورية لـ curl و bash إذا تم استخدامهما
RUN apk add --no-cache curl bash

# تثبيت OpenCode عالمياً باستخدام npm كما هو مطلوب
RUN npm install -g opencode-ai

# فتح البورت 3000
EXPOSE 3000

# تشغيل OpenCode بالأوامر المحددة
# opencode.exe web --hostname 0.0.0.0 --port 3000 (تم استخدام opencode للينكس)
# كلمة السر "o"
CMD ["opencode", "web", "--hostname", "0.0.0.0", "--port", "3000", "--password", "o"]
