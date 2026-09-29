import { execSync } from 'node:child_process';
import { existsSync, mkdtempSync, readFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';
import process from 'node:process';
import { fileURLToPath } from 'node:url';
import { beforeAll, describe, expect, it } from 'vitest';
import { commandLine, extendMatchers } from 'vitest-command-line';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const cliDir = path.resolve(__dirname, '..');

extendMatchers();

describe('CLI', () => {
  beforeAll(() => {
    const distIndex = path.join(cliDir, 'dist', 'index.js');
    if (!existsSync(distIndex)) {
      execSync('pnpm --filter cli build', {
        cwd: path.resolve(cliDir, '../..'),
        stdio: 'inherit',
      });
    }
  });

  const cli = commandLine({
    command: ['node', 'bin/cli.js'],
    name: 'cli',
    cwd: cliDir,
    env: { ...process.env, FORCE_COLOR: '0' },
  });

  it('prints version with --version', async () => {
    const result = await cli.run(['--version'], { timeout: 5_000 });
    expect(result).toSucceed();
    expect(result).toHaveStdout(/^\d+\.\d+\.\d+/);
  });

  it('prints help with --help', async () => {
    const result = await cli.run(['--help'], { timeout: 5_000 });
    expect(result).toSucceed();
    expect(result).toHaveStdout(/health/);
    expect(result).toHaveStdout(/hello/);
  });

  it('health command fails with message when API is unreachable', async () => {
    const result = await cli.run(['health'], {
      timeout: 5_000,
      env: { ...process.env, FORCE_COLOR: '0', API_HOST: 'http://127.0.0.1:99999' },
    });
    expect(result.exitCode).toBe(1);
    expect(result.stderr).toMatch(/Health check failed|ECONNREFUSED|fetch failed/i);
  });

  it('docgen prints an OpenCLI document covering nested commands', async () => {
    const result = await cli.run(['docgen'], { timeout: 5_000 });
    expect(result).toSucceed();
    const document = JSON.parse(result.stdout);
    expect(document.info).toMatchObject({ binary: 'cli', title: 'cli' });
    expect(Object.keys(document.commands)).toEqual(
      expect.arrayContaining(['cli hello', 'cli docgen', 'cli users get', 'cli users list', 'cli studio start']),
    );
  });

  it('docgen writes markdown to --output', async () => {
    const output = path.join(mkdtempSync(path.join(tmpdir(), 'cli-docgen-')), 'reference.md');
    const result = await cli.run(['docgen', '--format', 'markdown', '-o', output], { timeout: 5_000 });
    expect(result).toSucceed();
    expect(readFileSync(output, 'utf8')).toMatch(/## cli users list/);
  });
});
