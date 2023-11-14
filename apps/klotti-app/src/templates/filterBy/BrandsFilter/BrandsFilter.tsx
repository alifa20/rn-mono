import { useFilters } from '@/src/queries';
import { FilterFormData } from '@/src/queries/filters/type';
import { BackButton, Box, Button, CheckItem, Divider } from '@klotti/ui';
import { Stack, useRouter } from 'expo-router';
import React from 'react';
import { useFormContext, useForm, Controller } from 'react-hook-form';
import { FlatList } from 'react-native';

export const BrandsFilter = () => {
  const router = useRouter();
  const filterForm = useFormContext<FilterFormData>();

  const brandsForm = useForm({
    defaultValues: {
      brands: filterForm.getValues('brands') || []
    }
  });

  const { brandsOptions, loading } = useFilters();

  return (
    <>
      <Stack.Screen
        options={{
          headerTitle: 'Brands',
          headerLeft: () => (
            <BackButton
              onPress={() => {
                filterForm.setValue('brands', brandsForm.getValues('brands'));
                router.back();
              }}
            />
          )
        }}
      />
      <FlatList
        showsVerticalScrollIndicator={false}
        data={brandsOptions}
        keyExtractor={item => item.value}
        renderItem={({ item }) => (
          <Controller
            key={item.value}
            name='brands'
            control={brandsForm.control}
            render={({ field }) => (
              <CheckItem
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
                marginHorizontal={'s'}
                checked={field.value.includes(item.value)}
              />
            )}
          />
        )}
        ItemSeparatorComponent={() => <Divider marginHorizontal={'xs'} />}
      />

      <Box margin={'xs'}>
        <Button
          onPress={() => {
            filterForm.setValue('brands', brandsForm.getValues('brands'));
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
