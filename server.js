const { spawn } = require('child_process');

// الحصول على المنفذ من متغيرات البيئة أو استخدام 3000 كافتراضي
const port = process.env.PORT || 3000;

console.log(`Launching OpenCode AI directly on port ${port}...`);

// تشغيل opencode كعملية فرعية تستخدم المنفذ المخصص مباشرة
// نستخدم 0.0.0.0 للسماح بالوصول الخارجي إذا لزم الأمر
const opencode = spawn('npx', [
    'opencode-ai', 
    'web', 
    '--hostname', '0.0.0.0', 
    '--port', port.toString()
], {
    env: { 
        ...process.env, 
        OPENCODE_SERVER_PASSWORD: process.env.OPENCODE_SERVER_PASSWORD || 'admin123' 
    },
    shell: true,
    stdio: 'inherit' // تمرير المدخلات والمخرجات مباشرة للمساعدة في تصحيح الأخطاء
});

opencode.on('close', (code) => {
    console.log(`OpenCode process exited with code ${code}`);
    process.exit(code);
});

// التعامل مع إنهاء العملية بشكل نظيف
process.on('SIGTERM', () => opencode.kill());
process.on('SIGINT', () => opencode.kill());
