import { Size, SortBy } from '@app/__graphql__/generated';
import { PriceRanges } from '../by/types';

export type FilterFormData = {
  name?: string;
  categories?: string[];
  subCategories?: string[];
  productTypes?: string[];
  brands?: string[];
  colours?: Array<{
    id: string;
    type: 'colour' | 'subColour';
  }>;
  sizes?: Size[];
  priceRange?: PriceRanges;
  sortBy?: SortBy;
};
