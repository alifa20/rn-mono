import { StackScreenProps } from '@react-navigation/stack';
import { View, Text } from 'react-native';
import { Checkbox } from '@app/components/Checkbox';
import { FilterStackParamList } from '../stack';

import { useLayoutEffect, useMemo, useState } from 'react';
import { Controller, useForm, useFormContext } from 'react-hook-form';
import Feather from 'react-native-vector-icons/Feather';

import { useFilters } from '../hooks/useFilters';
import { Button } from '@app/components/buttons/Button';
import { TextInput } from '@app/components/TextInput';
import { SectionList } from 'react-native';
import _ from 'lodash';
import { FilterFormData } from '../forms/types';

export type BrandFilterScreenNavigationProp = StackScreenProps<
  FilterStackParamList,
  'BrandFilterScreen'
>;

export const BrandFilterScreen = (props: BrandFilterScreenNavigationProp) => {
  const { navigation } = props;

  const filterForm = useFormContext<FilterFormData>();
  const [searchText, setSearchText] = useState('');
  const brandsForm = useForm({
    defaultValues: {
      brands: filterForm.getValues('brands') || []
    }
  });

  const { brandsOptions, loading } = useFilters();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button
          label="Clear all"
          type="none"
          disabled={!brandsForm.getValues?.length}
          onPress={() => {
            brandsForm.reset({
              brands: []
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
              filterForm.setValue('brands', brandsForm.getValues('brands'));
              onPress();
            }}
          />
        </View>
      )
    });
  }, [brandsForm, brandsForm.getValues?.length, filterForm, navigation]);

  const sectionDataFilter = useMemo(() => {
    return _(brandsOptions)
      .filter(v => v.label.toLowerCase().includes(searchText.toLowerCase()))
      .groupBy(o => o.label[0].toUpperCase())
      .map((items, letter) => ({ title: letter, data: items }))
      .sort((e1, e2) => (e1.title > e2.title ? 1 : -1))
      .value();
  }, [searchText, brandsOptions]);

  return (
    <View className="flex flex-1">
      <View className="my-3 w-full justify-center px-3">
        <TextInput
          placeholder="Search..."
          value={searchText}
          onChangeText={v => {
            setSearchText(v);
          }}
        />
      </View>
      <SectionList
        sections={sectionDataFilter}
        renderItem={({ item }) => (
          <View key={item.value}>
            <Controller
              name="brands"
              control={brandsForm.control}
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
        renderSectionHeader={({ section }) => (
          <View className="mb-4 mt-6 bg-white">
            <Text className="pl-5 font-semibold text-black">
              {section.title}
            </Text>
            <View className="mx-5 mt-1">
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
            filterForm.setValue('brands', brandsForm.getValues('brands'));
            navigation.getParent()?.goBack();
          }}
          loading={loading}
          label="Show items"
        />
      </View>
    </View>
  );
};
