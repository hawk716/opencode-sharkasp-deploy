const { spawn } = require('child_process');
const http = require('http');

// الحصول على المنفذ من متغيرات البيئة (مهم جداً لـ IIS/SharkASP)
const port = process.env.PORT || 3000;
const opencodePort = 8080;

console.log(`Starting OpenCode server on port ${opencodePort}...`);

// تشغيل opencode كعملية فرعية
const opencode = spawn('npx', ['opencode-ai', 'web', '--hostname', '127.0.0.1', '--port', opencodePort.toString()], {
  env: { ...process.env, OPENCODE_SERVER_PASSWORD: process.env.OPENCODE_SERVER_PASSWORD || 'admin123' },
  shell: true
});

opencode.stdout.on('data', (data) => {
  console.log(`OpenCode: ${data}`);
});

opencode.stderr.on('data', (data) => {
  console.error(`OpenCode Error: ${data}`);
});

// إنشاء خادم وكيل بسيط (Proxy) لتوجيه الطلبات من المنفذ العام (IIS) إلى opencode
const server = http.createServer((req, res) => {
  const options = {
    hostname: '127.0.0.1',
    port: opencodePort,
    path: req.url,
    method: req.method,
    headers: req.headers
  };

  const proxyReq = http.request(options, (proxyRes) => {
    res.writeHead(proxyRes.statusCode, proxyRes.headers);
    proxyRes.pipe(res, { end: true });
  });

  req.pipe(proxyReq, { end: true });

  proxyReq.on('error', (err) => {
    console.error(`Proxy Error: ${err.message}`);
    res.writeHead(502);
    res.end('Bad Gateway: OpenCode server might not be ready yet.');
  });
});

server.listen(port, () => {
  console.log(`Main Proxy Server listening on port ${port}`);
});
