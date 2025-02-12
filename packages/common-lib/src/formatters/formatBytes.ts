import { formatUnit, type UnitArray } from './formatUnit.js';

const byteUnits: UnitArray = [
  {
    value: 1000 * 1000 * 1000 * 1000 * 1000,
    notation: 'PB',
  },
  {
    value: 1000 * 1000 * 1000 * 1000,
    notation: 'TB',
  },
  {
    value: 1000 * 1000 * 1000,
    notation: 'GB',
  },
  {
    value: 1000 * 1000,
    notation: 'MB',
  },
  {
    value: 1000,
    notation: 'KB',
  },
  {
    value: 1,
    notation: 'B',
  },
];

export const formatBytes = (value: number | undefined) => {
  if (value === undefined) return '';
  return formatUnit(value, 3, byteUnits);
};
