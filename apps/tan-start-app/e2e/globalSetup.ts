import { spawn } from 'node:child_process';
import process from 'node:process';

const E2E_PORT = 4180;
const APP_URL = `http://localhost:${E2E_PORT}`;

async function waitForServer(url: string, maxAttempts = 30): Promise<void> {
  for (let i = 0; i < maxAttempts; i++) {
    try {
      const res = await fetch(url, { signal: AbortSignal.timeout(1000) });
      if (res.ok) return;
    } catch {
      await new Promise((r) => setTimeout(r, 500));
    }
  }
  throw new Error(`Server at ${url} did not become ready in time`);
}

export default async function globalSetup(): Promise<() => Promise<void>> {
  process.env.E2E_APP_URL = APP_URL;

  const child = spawn('pnpm', ['exec', 'vite', 'dev', '--port', String(E2E_PORT)], {
    cwd: process.cwd(),
    stdio: 'pipe',
    env: { ...process.env, PORT: String(E2E_PORT) },
  });

  let resolved = false;
  const exitPromise = new Promise<number | null>((resolve) => {
    child.on('exit', (code) => {
      if (!resolved) resolve(code ?? null);
    });
  });

  try {
    await waitForServer(APP_URL);
  } catch (err) {
    child.kill('SIGTERM');
    throw err;
  }

  resolved = true;

  return async function teardown() {
    child.kill('SIGTERM');
    await exitPromise;
  };
}
