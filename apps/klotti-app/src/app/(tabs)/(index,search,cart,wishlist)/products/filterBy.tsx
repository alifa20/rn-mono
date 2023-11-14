import {
  CategoriesFilter,
  BrandsFilter,
  ColorsFilter,
  SizesFilter,
  PriceRangeFilter,
  SubCategoriesFilter,
  ProductTypesFilter
} from '@/src/templates';
import { useLocalSearchParams } from 'expo-router';
import React from 'react';

export type FilterType =
  | 'categories'
  | 'sub-categories'
  | 'product-types'
  | 'brands'
  | 'colors'
  | 'sizes'
  | 'price-range';

const filterMapper: Record<FilterType, React.FC> = {
  categories: CategoriesFilter,
  'sub-categories': SubCategoriesFilter,
  'product-types': ProductTypesFilter,
  brands: BrandsFilter,
  colors: ColorsFilter,
  sizes: SizesFilter,
  'price-range': PriceRangeFilter
};

export const FilterBy = () => {
  const local = useLocalSearchParams();
  const type = local.type as FilterType;

  const SelectedFilter = filterMapper[type];

  return <SelectedFilter />;
};

export default FilterBy;
