export const borderRadiiOrder = [
  '4xs',
  '3xs',
  '2xs',
  'xs',
  's',
  'm',
  'l',
  'xl',
  '2xl',
  '3xl'
] as const;

export type TBordierRadii = (typeof borderRadiiOrder)[number];
export type BordierRadiiType = Record<TBordierRadii, number>;

export const bordierRadii: BordierRadiiType = {
  ['4xs']: 2,
  ['3xs']: 4,
  ['2xs']: 6,
  xs: 8,
  s: 10,
  m: 12,
  l: 16,
  xl: 20,
  ['2xl']: 24,
  ['3xl']: 32
};
