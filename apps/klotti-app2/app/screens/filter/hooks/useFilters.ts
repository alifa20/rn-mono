import { Size, SortBy, useFiltersQuery } from '@app/__graphql__/generated';
import { useMemo } from 'react';
import { useFormContext } from 'react-hook-form';
import { FilterFormData } from '@app/screens/filter/forms/types';
import { useCustomCommonTypeStore } from '@app/screens/listings/hooks/useSearchCommonType';
import { useCommonType } from '@app/store/commonType/useCommonType';

type ColourSelection = 'colour' | 'subColour';

export const useFilters = () => {
  const { customCommonType } = useCustomCommonTypeStore();
  const { commonType } = useCommonType();

  const filterForm = useFormContext<FilterFormData>();
  const filterFormValue = filterForm.getValues();
  const priceRangeFormValue = filterForm.getValues('priceRange')?.split('-');

  const { data, loading } = useFiltersQuery({
    variables: {
      filters: {
        name: filterFormValue.name,
        categoryIds: filterFormValue.categories,
        subCategoryIds: filterFormValue.subCategories,
        productTypeIds: filterFormValue.productTypes,
        brandIds: filterFormValue.brands,
        colourIds: filterFormValue.colours
          ?.filter(colour => colour.type === 'colour')
          .map(colour => colour.id),
        // tag: route.params?.tag,
        ...(filterFormValue.priceRange &&
          priceRangeFormValue && {
            priceRange: {
              min: parseFloat(priceRangeFormValue[0]),
              max: parseFloat(priceRangeFormValue[1])
            }
          })
      },
      commonType: customCommonType || commonType
    },
    fetchPolicy: 'cache-and-network'
  });

  const filters = useMemo(() => data?.filters, [data?.filters]);

  const categoriesOptions = useMemo(() => {
    const category = filters?.find(filter => filter.id === 'category');

    return (
      category?.filterValues.map(value => ({
        label: value.name,
        value: value.id,
        count: value.count
      })) || []
    );
  }, [filters]);

  const subCategoriesOptions = useMemo(() => {
    const subCategory = filters?.find(filter => filter.id === 'subCategory');

    return (
      subCategory?.filterValues.map(value => ({
        label: value.name,
        value: value.id,
        count: value.count
      })) || []
    );
  }, [filters]);

  const brandsOptions = useMemo(() => {
    const subCategory = filters?.find(filter => filter.id === 'brand');

    return (
      subCategory?.filterValues.map(value => ({
        label: value.name,
        value: value.id,
        count: value.count
      })) || []
    );
  }, [filters]);

  const productTypesOptions = useMemo(() => {
    const subCategory = filters?.find(filter => filter.id === 'productType');

    return (
      subCategory?.filterValues.map(value => ({
        label: value.name,
        value: value.id,
        count: value.count
      })) || []
    );
  }, [filters]);

  const sizesOptions = useMemo(() => {
    const size = filters?.find(filter => filter.id === 'size');

    return (
      size?.filterValues.map(value => ({
        label: value.name as Size,
        value: value.id as Size,
        count: value.count
      })) || []
    );
  }, [filters]);

  const priceRangeOptions = useMemo(() => {
    return PriceRangeOptions.map(range => ({
      label: range.label,
      value: range.value,
      count: 0
    }));
  }, []);

  const colourOptions: Array<{
    label: string;
    value: string;
    count: number;
    type: ColourSelection;
  }> = useMemo(() => {
    const colour = filters?.find(filter => filter.id === 'colour');
    const subColour = filters?.find(filter => filter.id === 'subColour');

    return [
      ...(colour?.filterValues.map(value => ({
        label: value.name,
        value: value.id,
        count: value.count,
        type: 'colour' as ColourSelection
      })) || []),
      ...(subColour?.filterValues.map(value => ({
        label: value.name,
        value: value.id,
        count: value.count,
        type: 'subColour' as ColourSelection
      })) || [])
    ];
  }, [filters]);

  const sortByOptions = useMemo(() => {
    return Object.values(SortBy).map(value => {
      if (value === 'RECOMMENDATION') {
        return {
          label: 'Recommendation',
          value: value
        };
      }
      if (value === 'NEW_ITEMS') {
        return {
          label: 'New Items',
          value: value
        };
      }
      if (value === 'PRICE_LOW') {
        return {
          label: 'Price (low first)',
          value: value
        };
      }
      if (value === 'PRICE_HIGH') {
        return {
          label: 'Price (high first)',
          value: value
        };
      }
    });
  }, []);

  return {
    categoriesOptions,
    subCategoriesOptions,
    colourOptions,
    sizesOptions,
    productTypesOptions,
    brandsOptions,
    priceRangeOptions,
    sortByOptions,
    loading
  };
};

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
