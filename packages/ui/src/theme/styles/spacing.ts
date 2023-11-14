export const spacingOrder = [
  '4xs',
  '3xs',
  '2xs',
  'xs',
  's',
  'm',
  'l',
  'xl',
  '2xl',
  '3xl',
  '4xl',
  '5xl'
] as const;

export type TSpacing = (typeof spacingOrder)[number];
export type SpacingType = Record<TSpacing, number>;

export const spacing: SpacingType = {
  ['4xs']: 4,
  ['3xs']: 8,
  ['2xs']: 12,
  xs: 16,
  s: 24,
  m: 32,
  l: 40,
  xl: 48,
  ['2xl']: 56,
  ['3xl']: 64,
  ['4xl']: 80,
  ['5xl']: 96
};
