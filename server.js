const { spawn } = require('child_process');
const path = require('path');

// SharkASP/IIS passes the port via the PORT environment variable
const port = process.env.PORT || 3000;

console.log(`Starting opencode on port ${port} with password "o"...`);

/**
 * التعديلات المطلوبة:
 * 1. دعم PATH=$HOME/.opencode/bin:$PATH
 * 2. أمر التشغيل: opencode web --hostname 0.0.0.0 --port 3000 --password o
 */

const homeDir = process.env.HOME || process.env.USERPROFILE;
const opencodeBinPath = path.join(homeDir, '.opencode', 'bin');

// تحديث بيئة التشغيل لتشمل المسار الجديد
const env = { ...process.env };
env.PATH = `${opencodeBinPath}${path.delimiter}${env.PATH}`;

const opencode = spawn('opencode', [
    'web',
    '--hostname', '0.0.0.0',
    '--port', port.toString(),
    '--password', 'o'
], {
    shell: true,
    stdio: 'inherit',
    env: env
});

opencode.on('error', (err) => {
    console.error(`Failed to start opencode: ${err.message}`);
});

opencode.on('close', (code) => {
    console.log(`OpenCode process exited with code ${code}`);
});

// Keep the process alive
setInterval(() => {}, 1000);
