const { spawn, execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

// SharkASP/IIS passes the port via the PORT environment variable
const port = process.env.PORT || 3000;

console.log(`Starting OpenCode Setup on port ${port}...`);

const homeDir = process.env.HOME || process.env.USERPROFILE;
const opencodeBinPath = path.join(homeDir, '.opencode', 'bin');
const opencodeExe = path.join(opencodeBinPath, 'opencode');

// Function to ensure installation via curl
const ensureInstallation = () => {
    if (!fs.existsSync(opencodeExe)) {
        console.log('OpenCode not found. Installing via curl...');
        try {
            execSync('curl -fsSL https://opencode.ai/install | bash', { stdio: 'inherit' });
            console.log('Installation completed.');
        } catch (err) {
            console.error('Installation failed:', err.message);
        }
    } else {
        console.log('OpenCode is already installed.');
    }
};

const startOpenCode = () => {
    ensureInstallation();

    console.log(`Launching: opencode web --hostname 0.0.0.0 --port ${port} --password o`);

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
        // Optional: Restart if it crashes
        setTimeout(startOpenCode, 5000);
    });
};

startOpenCode();

// Keep the Node process alive
setInterval(() => {}, 1000);
