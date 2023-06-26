/* eslint-disable no-promise-executor-return */
export function sleep(durationInMilliseconds: number) {
  return new Promise((resolve) =>
    setTimeout(resolve, Math.round(durationInMilliseconds))
  );
}
