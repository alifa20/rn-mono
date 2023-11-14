import { Button } from '@app/components/buttons/Button';
import { Loading } from '@app/components/Loading';
import { RadioButton } from '@app/components/RadioButon';
import { StackScreenProps } from '@react-navigation/stack';
import { useLayoutEffect } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { ScrollView, Text, View } from 'react-native';
import { useFilters } from './hooks/useFilters';
import { FilterStackParamList } from './stack';
import { FilterFormData } from './forms/types';
import { FilterSelectionItem } from '@app/components/FilterSelectionItem/FilterSelectionItem';
import { ProductsInputFilter } from '@app/__graphql__/generated';

export type FilterScreenProps = {
  initialFilters?: ProductsInputFilter;
};

type Props = StackScreenProps<FilterStackParamList, 'FilterScreen'>;

export const FilterScreen = (props: Props) => {
  const { navigation } = props;
  const { initialFilters } = props.route.params;
  const { getValues, reset, control } = useFormContext<FilterFormData>();

  const {
    brandsOptions,
    categoriesOptions,
    sizesOptions,
    productTypesOptions,
    subCategoriesOptions,
    priceRangeOptions,
    colourOptions,
    sortByOptions,
    loading: loadingFilter
  } = useFilters();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button
          onPress={() => {
            reset();
          }}
          type="none"
          label="Clear all"
        />
      )
    });
  }, [navigation, reset]);

  const loading = loadingFilter;

  if (loading) {
    return <Loading fullScreen />;
  }

  return (
    <View className="flex flex-1">
      <ScrollView>
        <View>
          <View className="mx-5 mt-3">
            <Text className="font-bold">Filter By</Text>
            <View className="my-2 h-px w-full bg-gray-100" />
          </View>

          {!(
            initialFilters?.categoryIds?.length ||
            initialFilters?.subCategoryIds?.length ||
            initialFilters?.productTypeIds?.length ||
            initialFilters?.colourIds?.length
          ) ? (
            <>
              <FilterSelectionItem
                title="Categories"
                selectedSectionOptions={categoriesOptions
                  .filter(item => {
                    const selectedCategoriesIds = getValues('categories');
                    return selectedCategoriesIds?.includes(item.value);
                  })
                  .map(item => item.label)}
                navigateToSelectionItemScene={() =>
                  navigation.navigate('CategoryFilterScreen')
                }
              />
              <View className="h-px w-full bg-gray-100" />
            </>
          ) : null}

          {!(
            initialFilters?.subCategoryIds?.length ||
            initialFilters?.productTypeIds?.length ||
            initialFilters?.brandIds?.length
          ) ? (
            <>
              <FilterSelectionItem
                title="Sub Categories"
                selectedSectionOptions={subCategoriesOptions
                  .filter(item => {
                    const selectedSubCategoriesIds = getValues('subCategories');
                    return selectedSubCategoriesIds?.includes(item.value);
                  })
                  .map(item => item.label)}
                navigateToSelectionItemScene={() =>
                  navigation.navigate('SubCategoryFilterScreen')
                }
              />
              <View className="h-px w-full bg-gray-100" />
            </>
          ) : null}

          {!(
            initialFilters?.productTypeIds?.length ||
            initialFilters?.brandIds?.length
          ) ? (
            <>
              <FilterSelectionItem
                title="Product Types"
                selectedSectionOptions={productTypesOptions
                  .filter(item => {
                    const selectedProductTypesIds = getValues('productTypes');
                    return selectedProductTypesIds?.includes(item.value);
                  })
                  .map(item => item.label)}
                navigateToSelectionItemScene={() =>
                  navigation.navigate('ProductTypeFilterScreen')
                }
              />
              <View className="h-px w-full bg-gray-100" />
            </>
          ) : null}

          {!initialFilters?.brandIds?.length ? (
            <>
              <FilterSelectionItem
                title="Brands"
                selectedSectionOptions={brandsOptions
                  .filter(item => {
                    const selectedBrandsIds = getValues('brands');
                    return selectedBrandsIds?.includes(item.value);
                  })
                  .map(item => item.label)}
                navigateToSelectionItemScene={() =>
                  navigation.navigate('BrandFilterScreen')
                }
              />
              <View className="h-px w-full bg-gray-100" />
            </>
          ) : null}

          <FilterSelectionItem
            title="Colours"
            selectedSectionOptions={colourOptions
              .filter(item => {
                const selectedColoursIds = getValues('colours');
                return selectedColoursIds
                  ?.map(colour => colour.id)
                  ?.includes(item.value);
              })
              .map(item => item.label)}
            navigateToSelectionItemScene={() =>
              navigation.navigate('ColourFilterScreen')
            }
          />
          <View className="h-px w-full bg-gray-100" />

          <FilterSelectionItem
            title="Size"
            selectedSectionOptions={sizesOptions
              .filter(item => {
                const selectedSizes = getValues('sizes');
                return selectedSizes?.includes(item.value);
              })
              .map(item => item.label)}
            navigateToSelectionItemScene={() =>
              navigation.navigate('SizeFilterScreen')
            }
          />
          <View className="h-px w-full bg-gray-100" />

          <FilterSelectionItem
            title="Price Range"
            selectedSectionOptions={priceRangeOptions
              .filter(item => {
                const selectedPriceRange = getValues('priceRange');
                if (item.value === selectedPriceRange) {
                  return item.label;
                }
                return undefined;
              })
              .map(item => item.label)}
            navigateToSelectionItemScene={() =>
              navigation.navigate('PriceRangeFilterScreen')
            }
          />
        </View>

        <View className="h-px w-full bg-gray-100" />

        <View>
          <View className="my-5">
            <View className="mx-5 mt-3">
              <Text className="font-bold">Sort By</Text>
              <View className="my-2 h-px w-full bg-gray-100" />
            </View>

            {sortByOptions.map(item => (
              <View key={item?.label}>
                <Controller
                  name="sortBy"
                  control={control}
                  render={({ field }) => (
                    <View>
                      <RadioButton
                        key={item?.label}
                        onPress={() => {
                          field.onChange(item?.value);
                        }}
                        label={item?.label || ''}
                        selected={field.value === item?.value}
                      />
                      <View className="h-px w-full bg-gray-100" />
                    </View>
                  )}
                />
              </View>
            ))}
          </View>
        </View>
      </ScrollView>

      <View className="m-3">
        <Button
          onPress={() => {
            navigation.goBack();
          }}
          loading={loading}
          label="Show items"
        />
      </View>
    </View>
  );
};
