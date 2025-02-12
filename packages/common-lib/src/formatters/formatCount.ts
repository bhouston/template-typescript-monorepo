import { formatUnit, type UnitArray } from './formatUnit.js';

const countUnits: UnitArray = [
  {
    value: 1000 * 1000 * 1000 * 1000 * 1000,
    notation: 'P',
  },
  {
    value: 1000 * 1000 * 1000 * 1000,
    notation: 'T',
  },
  {
    value: 1000 * 1000 * 1000,
    notation: 'B',
  },
  {
    value: 1000 * 1000,
    notation: 'M',
  },
  {
    value: 1000,
    notation: 'K',
  },
  {
    value: 1,
    notation: '',
  },
];

export const formatCount = (value: number | undefined) => {
  if (value === undefined) return '';
  return formatUnit(value, 3, countUnits);
};
