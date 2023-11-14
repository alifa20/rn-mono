import { StackScreenProps } from '@react-navigation/stack';
import { FlatList, View } from 'react-native';
import { useLayoutEffect } from 'react';
import { Controller, useForm, useFormContext } from 'react-hook-form';
import { FilterStackParamList } from '../stack';

import { Button } from '@app/components/buttons/Button';
import Feather from 'react-native-vector-icons/Feather';
import { useFilters } from '../hooks/useFilters';
import { Checkbox } from '@app/components/Checkbox';
import { FilterFormData } from '../forms/types';

export type ColourFilterScreenNavigationProp = StackScreenProps<
  FilterStackParamList,
  'ColourFilterScreen'
>;

export const ColourFilterScreen = (props: ColourFilterScreenNavigationProp) => {
  const { navigation } = props;

  const filterForm = useFormContext<FilterFormData>();
  const coloursForm = useForm({
    defaultValues: {
      colours: filterForm.getValues('colours') || []
    }
  });

  const { colourOptions, loading } = useFilters();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button
          label="Clear all"
          type="none"
          disabled={!coloursForm.getValues?.length}
          onPress={() => {
            coloursForm.reset({
              colours: []
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
              filterForm.setValue('colours', coloursForm.getValues('colours'));
              onPress();
            }}
          />
        </View>
      )
    });
  }, [coloursForm, coloursForm.getValues?.length, filterForm, navigation]);

  return (
    <View className="flex flex-1">
      <FlatList
        showsVerticalScrollIndicator={false}
        data={colourOptions}
        keyExtractor={itemColour => itemColour.value}
        renderItem={({ item }) => (
          <View key={item.value}>
            <Controller
              name="colours"
              control={coloursForm.control}
              render={({ field }) => {
                return (
                  <Checkbox
                    label={item.label}
                    disabled={!item.count}
                    onValueChange={() => {
                      if (field.value.map(v => v.id).includes(item.value)) {
                        field.onChange(
                          field.value.filter(value => value.id !== item.value)
                        );
                      } else {
                        field.onChange([
                          ...field.value,
                          { id: item.value, type: item.type }
                        ]);
                      }
                    }}
                    checked={field.value
                      .map(val => val.id)
                      .includes(item.value)}
                  />
                );
              }}
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
            filterForm.setValue('colours', coloursForm.getValues('colours'));
            navigation.getParent()?.goBack();
          }}
          loading={loading}
          label="Show items"
        />
      </View>
    </View>
  );
};
