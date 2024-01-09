import dotenv from 'dotenv';
import { createRequire } from 'module';
import path from 'path';

// load environment variables
dotenv.config();

type Config = {
  PORT: number;
  VITE_PORT: number;
  NODE_ENV: string;
  NAME: string;
  VERSION: string;
  BASE_DIR: string;
};

const PORT = Number.parseInt(process.env.PORT ?? '8080');
const VITE_PORT = Number.parseInt(process.env.VITE_PORT ?? '8000');
const NODE_ENV = process.env.NODE_ENV ?? 'PRODUCTION';

const currentFileUrl = import.meta.url;
const require = createRequire(currentFileUrl);
const packageJson = require('../../package.json');
const NAME = packageJson.name;
const VERSION = packageJson.version;
const BASE_DIR =
  path.dirname(currentFileUrl.replace('file://', '')) + '/../../';

export const config: Config = {
  PORT,
  VITE_PORT,
  NODE_ENV,
  NAME,
  VERSION,
  BASE_DIR
};
