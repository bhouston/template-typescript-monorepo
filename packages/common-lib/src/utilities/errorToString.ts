export function errorToString(error: any) {
  return JSON.stringify(error, Object.getOwnPropertyNames(error), 2);
}
