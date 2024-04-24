import { sum } from './sum.js';

export const normalizeDistribution = (values: number[]): number[] => {
  const inverseSum = 1 / sum(values);
  return values.map((value) => value * inverseSum);
};
