import { StackScreenProps } from '@react-navigation/stack';
import { useLayoutEffect } from 'react';
import { Controller, useForm, useFormContext } from 'react-hook-form';
import Feather from 'react-native-vector-icons/Feather';
import { Checkbox } from '@app/components/Checkbox';
import { FlatList, View } from 'react-native';
import { FilterStackParamList } from '../stack';
import { useFilters } from '../hooks/useFilters';
import { Button } from '@app/components/buttons/Button';
import { FilterFormData } from '../forms/types';

export type ProductTypeFilterScreenNavigationProp = StackScreenProps<
  FilterStackParamList,
  'ProductTypeFilterScreen'
>;

export const ProductTypeFilterScreen = (
  props: ProductTypeFilterScreenNavigationProp
) => {
  const { navigation } = props;

  const filterForm = useFormContext<FilterFormData>();
  const productTypesForm = useForm({
    defaultValues: {
      productTypes: filterForm.getValues('productTypes') || []
    }
  });

  const { productTypesOptions, loading } = useFilters();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button
          disabled={!productTypesForm.getValues?.length}
          label="Clear all"
          type="none"
          onPress={() => {
            productTypesForm.reset({
              productTypes: []
            });
          }}
        />
      ),
      headerLeft: ({ onPress }) => (
        <View className="ml-2">
          <Feather
            name="arrow-left"
            size={32}
            onPress={() => {
              if (!onPress) {
                return;
              }
              filterForm.setValue(
                'productTypes',
                productTypesForm.getValues('productTypes')
              );
              onPress();
            }}
          />
        </View>
      )
    });
  }, [
    productTypesForm,
    productTypesForm.getValues?.length,
    filterForm,
    navigation
  ]);

  return (
    <View className="flex flex-1">
      <FlatList
        showsVerticalScrollIndicator={false}
        data={productTypesOptions}
        renderItem={({ item }) => (
          <View key={item.value}>
            <Controller
              name="productTypes"
              control={productTypesForm.control}
              render={({ field }) => (
                <Checkbox
                  label={item.label}
                  disabled={!item.count}
                  onValueChange={() => {
                    if (field.value.includes(item.value)) {
                      field.onChange(
                        field.value.filter(
                          (value: string) => value !== item.value
                        )
                      );
                    } else {
                      field.onChange([...field.value, item.value]);
                    }
                  }}
                  checked={field.value.includes(item.value)}
                />
              )}
            />
            <View className="mx-5">
              <View
                className=" bg-gray-200"
                style={{
                  height: 0.5
                }}
              />
            </View>
          </View>
        )}
      />

      <View className="m-3">
        <Button
          onPress={() => {
            filterForm.setValue(
              'productTypes',
              productTypesForm.getValues('productTypes')
            );
            navigation.getParent()?.goBack();
          }}
          loading={loading}
          label="Show items"
        />
      </View>
    </View>
  );
};
