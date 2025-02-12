export function errorToString(error: unknown) {
  return JSON.stringify(error, Object.getOwnPropertyNames(error), 2);
}
