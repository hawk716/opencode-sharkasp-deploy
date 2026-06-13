FROM node:20-alpine

WORKDIR /app

# تثبيت OpenCode عالمياً
RUN npm install -g opencode-ai

# نسخ ملفات المشروع (اختياري إذا كان لديك تبعيات)
# COPY package*.json ./
# RUN npm install

# فتح البورت
EXPOSE 8080

# متغيرات البيئة الافتراضية
ENV OPENCODE_SERVER_PASSWORD=${OPENCODE_SERVER_PASSWORD:-admin123}
ENV OPENCODE_USERNAME=${OPENCODE_USERNAME:-opencode}
ENV NODE_ENV=production

# صحة الفحص
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
    CMD wget --no-verbose --tries=1 --spider http://localhost:8080/health || exit 1

# تشغيل OpenCode
CMD ["opencode", "web", "--hostname", "0.0.0.0", "--port", "8080"]
