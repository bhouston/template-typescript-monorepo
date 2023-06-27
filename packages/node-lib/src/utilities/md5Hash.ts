import crypto from 'node:crypto';

export function stringToMd5Hash(data: string): string {
  return crypto.createHash('md5').update(data).digest('hex');
}

export function objectToMd5Hash(parameters: object): string {
  return stringToMd5Hash(JSON.stringify(parameters));
}
