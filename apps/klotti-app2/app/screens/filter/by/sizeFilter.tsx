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

export type SizeFilterScreenNavigationProp = StackScreenProps<
  FilterStackParamList,
  'SizeFilterScreen'
>;

export const SizeFilterScreen = (props: SizeFilterScreenNavigationProp) => {
  const { navigation } = props;

  const filterForm = useFormContext<FilterFormData>();
  const sizesForm = useForm({
    defaultValues: {
      sizes: filterForm.getValues('sizes') || []
    }
  });

  const { sizesOptions, loading } = useFilters();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button
          label="Clear all"
          type="none"
          disabled={!sizesForm.getValues?.length}
          onPress={() => {
            sizesForm.reset({
              sizes: []
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
              filterForm.setValue('sizes', sizesForm.getValues('sizes'));
              onPress();
            }}
          />
        </View>
      )
    });
  }, [sizesForm, sizesForm.getValues?.length, filterForm, navigation]);

  return (
    <View className="flex flex-1">
      <FlatList
        showsVerticalScrollIndicator={false}
        data={sizesOptions}
        renderItem={({ item }) => (
          <View key={item.value}>
            <Controller
              name="sizes"
              control={sizesForm.control}
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
            filterForm.setValue('sizes', sizesForm.getValues('sizes'));
            navigation.getParent()?.goBack();
          }}
          loading={loading}
          label="Show items"
        />
      </View>
    </View>
  );
};
