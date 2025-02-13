export function sleep(durationInMilliseconds: number) {
  return new Promise((resolve) =>
    setTimeout(resolve, Math.round(durationInMilliseconds)),
  );
}
