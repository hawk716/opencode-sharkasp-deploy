const { spawn } = require('child_process');

// الحصول على المنفذ من متغيرات البيئة أو استخدام 3000 كافتراضي
const port = process.env.PORT || 3000;

console.log(`Launching OpenCode AI (Executable) directly on port ${port}...`);

/**
 * ملاحظة: في بيئة Windows/IIS (مثل SharkASP.NET)، يفضل استخدام الملف التنفيذي مباشرة.
 * سيحاول السكريبت تشغيل opencode.exe المتوفر في المسار.
 */
const opencode = spawn('opencode.exe', [
    'web', 
    '--hostname', '0.0.0.0', 
    '--port', port.toString()
], {
    env: { 
        ...process.env, 
        OPENCODE_SERVER_PASSWORD: process.env.OPENCODE_SERVER_PASSWORD || 'admin123' 
    },
    shell: true,
    stdio: 'inherit'
});

opencode.on('error', (err) => {
    console.error(`Failed to start opencode.exe: ${err.message}`);
    console.log('Falling back to npx opencode-ai...');
    
    // محاولة بديلة في حال عدم توفر الملف التنفيذي مباشرة
    const fallback = spawn('npx', [
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
        stdio: 'inherit'
    });
});

opencode.on('close', (code) => {
    if (code !== 0) {
        console.log(`OpenCode process exited with code ${code}`);
    }
});

// التعامل مع إنهاء العملية بشكل نظيف
process.on('SIGTERM', () => opencode.kill());
process.on('SIGINT', () => opencode.kill());
