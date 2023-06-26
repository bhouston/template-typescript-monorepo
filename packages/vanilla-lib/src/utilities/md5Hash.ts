import crypto from 'node:crypto';

export function stringToMd5Hash(data: string): string {
  return crypto.createHash('md5').update(data).digest('hex');
}
