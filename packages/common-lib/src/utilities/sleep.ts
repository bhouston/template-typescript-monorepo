export function sleep(durationInMilliseconds: number): Promise<void> {
  return new Promise<void>((resolve) => {
    setTimeout(resolve, Math.round(durationInMilliseconds));
  });
}
