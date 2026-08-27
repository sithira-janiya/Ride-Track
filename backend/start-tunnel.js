const { spawn } = require('child_process');
const http = require('http');
const path = require('path');
const localtunnel = require('localtunnel');

const backendPort = Number(process.env.PORT || 4000);
const projectRoot = path.resolve(__dirname, '..');
let backendProcess;
let expoProcess;
let apiTunnel;
let isShuttingDown = false;

function waitForBackend() {
  return new Promise((resolve, reject) => {
    const deadline = Date.now() + 15000;

    const check = () => {
      const request = http.get(`http://127.0.0.1:${backendPort}/api/health`, (response) => {
        response.resume();
        if (response.statusCode === 200) {
          resolve();
          return;
        }
        retry();
      });

      request.on('error', retry);
      request.setTimeout(1000, () => request.destroy());
    };

    const retry = () => {
      if (Date.now() >= deadline) {
        reject(new Error(`Backend did not become ready on port ${backendPort}.`));
        return;
      }
      setTimeout(check, 250);
    };

    check();
  });
}

async function shutdown(exitCode = 0) {
  if (isShuttingDown) return;
  isShuttingDown = true;

  if (apiTunnel) {
    await apiTunnel.close();
  }

  if (expoProcess && !expoProcess.killed) {
    expoProcess.kill();
  }

  if (backendProcess && !backendProcess.killed) {
    backendProcess.kill();
  }

  process.exit(exitCode);
}

async function start() {
  backendProcess = spawn(process.execPath, [path.join(__dirname, 'server.js')], {
    cwd: projectRoot,
    env: process.env,
    stdio: 'inherit',
  });

  backendProcess.on('error', (error) => {
    console.error(`Unable to start backend: ${error.message}`);
    shutdown(1);
  });

  await waitForBackend();

  apiTunnel = await localtunnel({ port: backendPort });
  const apiUrl = apiTunnel.url.replace(/\/$/, '');

  console.log(`RideTrack API tunnel: ${apiUrl}`);

  apiTunnel.on('error', (error) => {
    console.error(`API tunnel error: ${error.message}`);
    shutdown(1);
  });

  expoProcess = spawn(process.platform === 'win32' ? 'npx.cmd' : 'npx', ['expo', 'start', '--tunnel', '-c'], {
    cwd: projectRoot,
    env: { ...process.env, EXPO_PUBLIC_API_URL: apiUrl },
    shell: process.platform === 'win32',
    stdio: 'inherit',
  });

  expoProcess.on('exit', (code) => shutdown(code || 0));
  expoProcess.on('error', (error) => {
    console.error(`Unable to start Expo: ${error.message}`);
    shutdown(1);
  });
}

process.on('SIGINT', () => shutdown(0));
process.on('SIGTERM', () => shutdown(0));

start().catch((error) => {
  console.error(error.message);
  shutdown(1);
});
