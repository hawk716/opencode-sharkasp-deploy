const { spawn } = require('child_process');
const PORT = process.env.PORT || 3000;

console.log(`Starting OpenCode on port ${PORT}...`);

// تشغيل أمر opencode web مع إضافة كلمة مرور
// ملاحظة: اسم المستخدم الافتراضي عادة ما يكون فارغاً أو 'admin' 
// وكلمة المرور هنا سنضعها 'o' كما كانت في الملف السابق لسهولة الدخول
const opencode = spawn('opencode', [
  'web',
  '--hostname', '0.0.0.0',
  '--port', PORT.toString(),
  '--password', 'o'
], {
  shell: true,
  stdio: 'inherit'
});

opencode.on('error', (err) => {
  console.error(`Failed to start opencode: ${err.message}`);
});

opencode.on('close', (code) => {
  console.log(`OpenCode process exited with code ${code}`);
  process.exit(code);
});
