const cSplitSumMinimumRange = 5;

const splitSum = (values: number[], start: number, end: number): number => {
  if (start < 0 || end >= values.length) {
    throw new Error('Invalid start or end');
  }
  if (end - start < cSplitSumMinimumRange) {
    let sum = 0;
    for (let i = start; i <= end; i++) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      sum += values[i]!; // okay since we checked the bounds above
    }
    return sum;
  }
  const middle = Math.floor((start + end) / 2);
  return splitSum(values, start, middle) + splitSum(values, middle + 1, end);
};

export const sum = (values: number[]): number =>
  splitSum(values, 0, values.length - 1);
