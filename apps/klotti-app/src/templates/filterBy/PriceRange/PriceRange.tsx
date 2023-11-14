import { useFilters } from '@/src/queries';
import { FilterFormData } from '@/src/queries/filters/type';
import { BackButton, Box, Button, RadioItem, Divider } from '@klotti/ui';
import { Stack, useRouter } from 'expo-router';
import React from 'react';
import { useFormContext, useForm, Controller } from 'react-hook-form';
import { FlatList } from 'react-native';

export const PriceRangeFilter = () => {
  const router = useRouter();
  const filterForm = useFormContext<FilterFormData>();

  const priceRangeForm = useForm({
    defaultValues: {
      priceRange: filterForm.getValues('priceRange')
    }
  });

  const { priceRangeOptions, loading } = useFilters();

  return (
    <>
      <Stack.Screen
        options={{
          headerTitle: 'PriceRange',
          headerLeft: () => (
            <BackButton
              onPress={() => {
                filterForm.setValue(
                  'priceRange',
                  priceRangeForm.getValues('priceRange')
                );
                router.back();
              }}
            />
          )
        }}
      />
      <FlatList
        showsVerticalScrollIndicator={false}
        data={priceRangeOptions}
        keyExtractor={item => item.value}
        renderItem={({ item }) => (
          <Controller
            name='priceRange'
            control={priceRangeForm.control}
            render={({ field }) => (
              <RadioItem
                selected={field.value === item.value}
                onValueChange={() => {
                  field.onChange(item.value);
                }}
                label={item.label}
                marginHorizontal={'s'}
              />
            )}
          />
        )}
        ItemSeparatorComponent={() => (
          <Box marginHorizontal={'xs'}>
            <Divider />
          </Box>
        )}
      />

      <Box margin={'xs'}>
        <Button
          onPress={() => {
            filterForm.setValue(
              'priceRange',
              priceRangeForm.getValues('priceRange')
            );
            router.back();
            router.back();
          }}
          loading={loading}
          label='Show items'
        />
      </Box>
    </>
  );
};
