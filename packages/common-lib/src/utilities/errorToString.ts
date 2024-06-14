export function errorToString(error: Error) {
  return JSON.stringify(error, Object.getOwnPropertyNames(error), 2);
}
