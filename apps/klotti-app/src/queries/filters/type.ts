import { Size, SortBy } from '@/src/__graphql__/generated';

export const productSortByOptions: Array<{ value: SortBy; label: string }> = [
  { label: 'Recommendation', value: 'RECOMMENDATION' },
  { label: 'New Items', value: 'NEW_ITEMS' },
  { label: 'Price (low first)', value: 'PRICE_LOW' },
  { label: 'Price (high first)', value: 'PRICE_HIGH' }
];

export const PriceRangeOptions = [
  {
    value: '0-10',
    label: 'Under $10'
  },
  {
    value: '10-50',
    label: '$10 - $50'
  },
  {
    value: '50-100',
    label: '$50 - $100'
  },
  {
    value: '100-200',
    label: '$100 - $200'
  },
  {
    value: '200-300',
    label: '$200 - $300'
  },
  {
    value: '300-max',
    label: '$300+'
  }
] as const;

export type PriceRanges = (typeof PriceRangeOptions)[number]['value'];
export type PriceRangesValue = (typeof PriceRangeOptions)[number]['label'];

export type FilterFormData = {
  name?: string;
  categories?: string[];
  subCategories?: string[];
  productTypes?: string[];
  brands?: string[];
  colors?: Array<{
    id: string;
    type: 'colour' | 'subColour';
  }>;
  sizes?: Size[];
  priceRange?: PriceRanges;
  sortBy?: SortBy;
};
