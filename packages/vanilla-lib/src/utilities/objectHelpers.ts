import { stringToMd5Hash } from './md5Hash';

export function pick<T, K extends keyof T>(obj: T, keys: K[]): Pick<T, K> {
  let newObj = {} as Pick<T, K>;

  for (let key of keys) {
    newObj[key] = obj[key];
  }

  return newObj;
}

export function filter<T>(
  obj: T,
  condition: (value: T[keyof T]) => boolean
): Partial<T> {
  let newObj = {} as Partial<T>;

  for (let key in obj) {
    if (condition(obj[key])) {
      newObj[key] = obj[key];
    }
  }

  return newObj;
}

export function isEmpty(obj: object): boolean {
  return Object.keys(obj).length === 0;
}

export function objectToMd5Hash(parameters: object): string {
  return stringToMd5Hash(JSON.stringify(parameters));
}
