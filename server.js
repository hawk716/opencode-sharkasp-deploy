const { spawn } = require('child_process');
const path = require('path');

// SharkASP/IIS passes the port via the PORT environment variable
const port = process.env.PORT || 3000;

const startOpenCode = (customPath = false) => {
    console.log(`Attempting to start opencode ${customPath ? 'using custom PATH' : 'using default PATH'} on port ${port}...`);

    const env = { ...process.env };
    if (customPath) {
        const homeDir = process.env.HOME || process.env.USERPROFILE;
        const opencodeBinPath = path.join(homeDir, '.opencode', 'bin');
        env.PATH = `${opencodeBinPath}${path.delimiter}${env.PATH}`;
    }

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
        if (!customPath) {
            console.log('Failed to start using default PATH. Retrying with custom PATH...');
            startOpenCode(true);
        } else {
            console.error(`Failed to start opencode even with custom PATH: ${err.message}`);
        }
    });

    opencode.on('close', (code) => {
        if (code !== 0 && !customPath) {
            console.log(`Process exited with code ${code}. Retrying with custom PATH...`);
            startOpenCode(true);
        } else {
            console.log(`OpenCode process exited with code ${code}`);
        }
    });
};

// Start the initial attempt
startOpenCode(false);

// Keep the process alive
setInterval(() => {}, 1000);
