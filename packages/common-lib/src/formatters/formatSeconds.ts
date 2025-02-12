import { formatUnit, type UnitArray } from './formatUnit.js';

const secondUnits: UnitArray = [
  {
    value: 30 * 25 * 60 * 60,
    notation: 'M',
  },
  {
    value: 7 * 24 * 60 * 60,
    notation: 'w',
  },
  {
    value: 24 * 60 * 60,
    notation: 'd',
  },
  {
    value: 60 * 60,
    notation: 'h',
  },
  {
    value: 60,
    notation: 'm',
  },
  {
    value: 1,
    notation: 's',
  },
  {
    value: 0.001,
    notation: 'ms',
  },
];

export const formatSeconds = (value: number | undefined) => {
  if (value === undefined) return '';
  return formatUnit(value, 3, secondUnits);
};
