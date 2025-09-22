import { sum } from './sum.js';

export const cumulativeDistribution = (values: number[]): number[] => {
  const inverseSum = 1 / sum(values);
  let cumulativeSum = 0;
  return values.map((value) => {
    cumulativeSum += value * inverseSum;
    return cumulativeSum;
  });
};
