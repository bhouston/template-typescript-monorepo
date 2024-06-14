import { roundTo } from '../math/roundTo.js';

export type Unit = {
  value: number;
  notation: string;
};

export type UnitArray = Unit[];

export const formatUnit = (
  value: number,
  significantDigits: number,
  units: UnitArray
) => {
  const unit =
    units.find((unit) => value >= unit.value) ?? units[units.length - 1];
  return `${roundTo(value / unit.value, 3)}${unit.notation}`;
};
