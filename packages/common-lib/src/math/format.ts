// Create a formatter with the default locale
const formatter = new Intl.NumberFormat(undefined, {
  style: 'decimal',
});

export function format(value: number | undefined): string {
  if (value === undefined) {
    return '';
  }
  // Format the number and return it
  return formatter.format(value);
}
