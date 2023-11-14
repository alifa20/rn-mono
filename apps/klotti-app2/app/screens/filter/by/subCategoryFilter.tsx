import { StackScreenProps } from '@react-navigation/stack';
import React, { useLayoutEffect } from 'react';
import { Controller, useForm, useFormContext } from 'react-hook-form';
import Feather from 'react-native-vector-icons/Feather';
import { Checkbox } from '@app/components/Checkbox';
import { FlatList, View } from 'react-native';
import { useFilters } from '../hooks/useFilters';
import { Button } from '@app/components/buttons/Button';
import { FilterStackParamList } from '../stack';
import { FilterFormData } from '../forms/types';

export type SubCategoryFilterScreenNavigationProp = StackScreenProps<
  FilterStackParamList,
  'SubCategoryFilterScreen'
>;

export const SubCategoryFilterScreen = (
  props: SubCategoryFilterScreenNavigationProp
) => {
  const { navigation } = props;

  const filterForm = useFormContext<FilterFormData>();
  const subCategoriesForm = useForm({
    defaultValues: {
      subCategories: filterForm.getValues('subCategories') || []
    }
  });

  const { subCategoriesOptions, loading } = useFilters();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button
          label="Clear all"
          type="none"
          disabled={!subCategoriesForm.getValues?.length}
          onPress={() => {
            subCategoriesForm.reset({
              subCategories: []
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
                'subCategories',
                subCategoriesForm.getValues('subCategories')
              );
              onPress();
            }}
          />
        </View>
      )
    });
  }, [
    subCategoriesForm,
    subCategoriesForm.getValues?.length,
    filterForm,
    navigation
  ]);

  return (
    <View className="flex flex-1">
      <FlatList
        showsVerticalScrollIndicator={false}
        data={subCategoriesOptions}
        renderItem={({ item }) => (
          <View key={item.value}>
            <Controller
              name="subCategories"
              control={subCategoriesForm.control}
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
              'subCategories',
              subCategoriesForm.getValues('subCategories')
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
