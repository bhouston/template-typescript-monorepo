
export type AsyncForEachOptions = {
  concurrencyLimit?: number;
  profileName?: string;
};

export const asyncForEach = async <T>(
  items: T[],
  callback: (item: T) => Promise<void>,
  options: AsyncForEachOptions = {}
): Promise<void> => {
  const concurrencyLimit = options.concurrencyLimit || 10;
  const profileName = `'asyncForEach[${options.profileName}]` || 'asyncForEach';

  return profile(profileName, async () => {
    const actions = [];
    for (const item of items) {
      actions.push(() => callback(item));
    }
    await pAll(actions, { concurrency: concurrencyLimit });
  });
};
