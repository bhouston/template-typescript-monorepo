// rounds to the number of most significant digits, thus it takes into account the magnitude of the input number
export const roundTo = (value: number, significantDigits: number) => {
  const magnitudeDigits = Math.floor(Math.log10(value));
  const scale = Math.pow(
    10,
    Math.max(significantDigits - 1, 0) - magnitudeDigits,
  );
  return Math.round(value * scale) / scale;
};
