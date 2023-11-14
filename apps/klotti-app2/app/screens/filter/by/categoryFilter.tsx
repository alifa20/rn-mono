import { StackScreenProps } from '@react-navigation/stack';
import React, { useLayoutEffect } from 'react';
import { Controller, useForm, useFormContext } from 'react-hook-form';
import Feather from 'react-native-vector-icons/Feather';
import { Checkbox } from '@app/components/Checkbox';
import { FlatList, View } from 'react-native';
import { FilterStackParamList } from '../stack';

import { useFilters } from '../hooks/useFilters';
import { Button } from '@app/components/buttons/Button';
import { FilterFormData } from '../forms/types';

export type CategoryFilterScreenNavigationProp = StackScreenProps<
  FilterStackParamList,
  'CategoryFilterScreen'
>;

export const CategoryFilterScreen = (
  props: CategoryFilterScreenNavigationProp
) => {
  const { navigation } = props;

  const filterForm = useFormContext<FilterFormData>();
  const categoriesForm = useForm({
    defaultValues: {
      categories: filterForm.getValues('categories') || []
    }
  });

  const { categoriesOptions, loading } = useFilters();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button
          label="Clear all"
          type="none"
          disabled={!categoriesForm.getValues?.length}
          onPress={() => {
            categoriesForm.reset({
              categories: []
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
                'categories',
                categoriesForm.getValues('categories')
              );
              onPress();
            }}
          />
        </View>
      )
    });
  }, [
    categoriesForm,
    categoriesForm.getValues?.length,
    filterForm,
    navigation
  ]);

  return (
    <View className="flex flex-1">
      <FlatList
        showsVerticalScrollIndicator={false}
        data={categoriesOptions}
        keyExtractor={item => item.value}
        renderItem={({ item }) => (
          <View key={item.value}>
            <Controller
              name="categories"
              control={categoriesForm.control}
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
              'categories',
              categoriesForm.getValues('categories')
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
