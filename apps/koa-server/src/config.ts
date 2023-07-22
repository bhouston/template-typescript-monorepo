import dotenv from 'dotenv';
import { createRequire } from 'module';
import path from 'path';

// load environment variables
dotenv.config();

export const PORT = Number.parseInt(process.env.PORT ?? '8080');
export const NODE_ENV = process.env.NODE_ENV ?? 'production';

const currentFileUrl = import.meta.url;
const require = createRequire(currentFileUrl);
const packageJson = require('../package.json');
export const NAME = packageJson.name;
export const VERSION = packageJson.version;
export const BASE_DIR =
  path.dirname(currentFileUrl.replace('file://', '')) + '/../';
