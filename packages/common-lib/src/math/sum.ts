const cSplitSumMinimumRange = 5;

const splitSum = (values: number[], start: number, end: number): number => {
  if (end - start < cSplitSumMinimumRange) {
    let sum = 0;
    for (let i = start; i <= end; i++) {
      sum += values[i];
    }
    return sum;
  }
  const middle = Math.floor((start + end) / 2);
  return splitSum(values, start, middle) + splitSum(values, middle + 1, end);
};

export const sum = (values: number[]): number =>
  splitSum(values, 0, values.length - 1);
