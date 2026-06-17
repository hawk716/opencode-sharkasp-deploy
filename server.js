const { spawn } = require('child_process');

// SharkASP/IIS يمرر المنفذ عبر متغير البيئة PORT
const port = process.env.PORT || 3000;

console.log(`Starting opencode.exe on port ${port} with password "o"...`);

/**
 * استخدام الأمر الذي طلبه المستخدم:
 * opencode.exe web --hostname 0.0.0.0 --port 3000
 * ملاحظة: قمنا بإضافة --password o كما هو مطلوب.
 */
const opencode = spawn('opencode.exe', [
    'web',
    '--hostname', '0.0.0.0',
    '--port', port.toString(),
    '--password', 'o'
], {
    shell: true,
    stdio: 'inherit'
});

opencode.on('error', (err) => {
    console.error(`Failed to start opencode.exe: ${err.message}`);
    console.log('Attempting fallback to npm install and run...');
    
    // محاولة تشغيل باستخدام npx كخيار بديل إذا لم يكن .exe متاحاً في المسار
    const fallback = spawn('npx', [
        'opencode-ai',
        'web',
        '--hostname', '0.0.0.0',
        '--port', port.toString(),
        '--password', 'o'
    ], {
        shell: true,
        stdio: 'inherit'
    });
});

opencode.on('close', (code) => {
    console.log(`OpenCode process exited with code ${code}`);
});

// الحفاظ على العملية نشطة
setInterval(() => {}, 1000);
