import { FilterFormData, useFilters } from '@/src/queries';
import {
  BottomSheet,
  Box,
  Button,
  Divider,
  Loading,
  NavigationItem,
  RadioItem,
  Text,
  useBottomSheet
} from '@klotti/ui';
import { useRouter } from 'expo-router';
import React, { useMemo } from 'react';
import { FlatList, ScrollView } from 'react-native';
import { FilterType } from './filterBy';
import { Controller, useFormContext } from 'react-hook-form';
import { SortBy } from '@/src/__graphql__/generated';
import { useFilterRouter } from '@/src/navigation/useFilterRouter';

const filtersMapper: Record<FilterType, string> = {
  categories: 'Categories',
  'sub-categories': 'Sub categories',
  'product-types': 'Product types',
  brands: 'Brands',
  colors: 'Colors',
  'price-range': 'Price range',
  sizes: 'Sizes'
};

const sortByMapper: Record<SortBy, string> = {
  RECOMMENDATION: 'Recommendation',
  NEW_ITEMS: 'New Items',
  PRICE_LOW: 'Price (low first)',
  PRICE_HIGH: 'Price (high first)'
};

export const FilterScreen = () => {
  const { ref, show } = useBottomSheet();
  const router = useRouter();
  const filterRouter = useFilterRouter();

  const { control } = useFormContext<FilterFormData>();

  const { loading } = useFilters();

  const mappers = useMemo(() => {
    return Object.entries(filtersMapper)
      .map(([key, label]) => {
        if (
          key === 'categories' &&
          filterRouter.categoryId &&
          filterRouter.categoryId !== 'all'
        )
          return false;
        if (
          key === 'sub-categories' &&
          filterRouter.categoryId &&
          filterRouter.subCategoryId &&
          filterRouter.subCategoryId !== 'all'
        )
          return false;
        if (
          key === 'product-types' &&
          filterRouter.categoryId &&
          filterRouter.subCategoryId &&
          filterRouter.productTypeId &&
          filterRouter.productTypeId !== 'all'
        )
          return false;
        if (
          key === 'brands' &&
          filterRouter.categoryId &&
          filterRouter.subCategoryId &&
          filterRouter.productTypeId &&
          filterRouter.brandId &&
          filterRouter.brandId !== 'all'
        )
          return false;
        return {
          value: key as FilterType,
          label: label
        };
      })
      .filter(Boolean) as { value: FilterType; label: string }[];
  }, [filterRouter]);

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <ScrollView>
        <FlatList
          data={mappers}
          keyExtractor={item => item.value}
          ListHeaderComponent={() => (
            <Box marginBottom={'2xs'}>
              <Box marginHorizontal={'xs'} marginVertical={'2xs'}>
                <Text variant={'label'}>Filter</Text>
              </Box>
              <Divider marginHorizontal={'2xs'} />
            </Box>
          )}
          renderItem={({ item }) => (
            <NavigationItem
              label={item.label}
              onPress={() => {
                if (item.value === 'price-range' || item.value === 'sizes') {
                  return show();
                }
                router.push(`/products/filterBy?type=${item.value}`);
              }}
              marginHorizontal={'xs'}
            />
          )}
          ItemSeparatorComponent={() => <Divider marginHorizontal={'2xs'} />}
        />

        <Box marginVertical={'3xs'} />

        <FlatList
          data={Object.entries(sortByMapper)}
          keyExtractor={item => item[0]}
          ListHeaderComponent={() => (
            <Box marginBottom={'2xs'}>
              <Box marginHorizontal={'xs'} marginVertical={'2xs'}>
                <Text variant={'label'}>Sort by</Text>
              </Box>
              <Divider marginHorizontal={'2xs'} />
            </Box>
          )}
          renderItem={({ item }) => (
            <Controller
              name='sortBy'
              control={control}
              render={({ field }) => (
                <RadioItem
                  label={item[1]}
                  onValueChange={() => {
                    field.onChange(item[0]);
                  }}
                  marginHorizontal={'xs'}
                  selected={field.value === item[0]}
                />
              )}
            />
          )}
          ItemSeparatorComponent={() => <Divider marginHorizontal={'2xs'} />}
        />
      </ScrollView>

      <BottomSheet ref={ref}>
        <Text>TODO:</Text>
      </BottomSheet>

      <Box margin={'xs'}>
        <Button
          onPress={() => {
            router.back();
          }}
          loading={loading}
          label='Show items'
        />
      </Box>
    </>
  );
};
export default FilterScreen;
