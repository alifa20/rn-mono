import { StackScreenProps } from '@react-navigation/stack';
import React, { useLayoutEffect } from 'react';
import { FlatList, View } from 'react-native';
import { Controller, useForm, useFormContext } from 'react-hook-form';
import { useFilters } from '../hooks/useFilters';
import { Button } from '@app/components/buttons/Button';
import { FilterStackParamList } from '../stack';
import { RadioButton } from '@app/components/RadioButon';
import { FilterFormData } from '../forms/types';

export type PriceRangeFilterScreenNavigationProp = StackScreenProps<
  FilterStackParamList,
  'PriceRangeFilterScreen'
>;

export const PriceRangeFilterScreen = (
  props: PriceRangeFilterScreenNavigationProp
) => {
  const { navigation } = props;

  const filterForm = useFormContext<FilterFormData>();
  const priceRangeForm = useForm({
    defaultValues: {
      priceRange: filterForm.getValues('priceRange')
    }
  });

  const { priceRangeOptions, loading } = useFilters();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button
          label="Clear all"
          type="none"
          disabled={!priceRangeForm.getValues?.length}
          onPress={() => {
            priceRangeForm.reset({
              priceRange: undefined
            });
          }}
        />
      )
    });
  }, [navigation, priceRangeForm]);

  return (
    <View className="flex flex-1">
      <FlatList
        showsVerticalScrollIndicator={false}
        data={priceRangeOptions}
        keyExtractor={item => item.value}
        renderItem={({ item }) => (
          <View key={item.value}>
            <Controller
              name="priceRange"
              control={priceRangeForm.control}
              render={({ field }) => (
                <RadioButton
                  selected={field.value === item.value}
                  onPress={() => {
                    field.onChange(item.value);
                  }}
                  label={item.label}
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
              'priceRange',
              priceRangeForm.getValues('priceRange')
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
