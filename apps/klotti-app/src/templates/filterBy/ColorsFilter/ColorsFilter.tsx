import { useFilters } from '@/src/queries';
import { FilterFormData } from '@/src/queries/filters/type';
import { BackButton, Box, Button, CheckItem, Divider } from '@klotti/ui';
import { Stack, useRouter } from 'expo-router';
import React from 'react';
import { useFormContext, useForm, Controller } from 'react-hook-form';
import { FlatList } from 'react-native';

export const ColorsFilter = () => {
  const router = useRouter();
  const filterForm = useFormContext<FilterFormData>();

  const colorsForm = useForm({
    defaultValues: {
      colors: filterForm.getValues('colors') || []
    }
  });

  const { colourOptions, loading } = useFilters();

  return (
    <>
      <Stack.Screen
        options={{
          headerTitle: 'Colors',
          headerLeft: () => (
            <BackButton
              onPress={() => {
                filterForm.setValue('colors', colorsForm.getValues('colors'));
                router.back();
              }}
            />
          )
        }}
      />
      <FlatList
        showsVerticalScrollIndicator={false}
        data={colourOptions}
        keyExtractor={item => item.value}
        renderItem={({ item }) => (
          <Controller
            key={item.value}
            name='colors'
            control={colorsForm.control}
            render={({ field }) => (
              <CheckItem
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
                marginHorizontal={'s'}
                checked={field.value.map(val => val.id).includes(item.value)}
              />
            )}
          />
        )}
        ItemSeparatorComponent={() => <Divider marginHorizontal={'xs'} />}
      />

      <Box margin={'xs'}>
        <Button
          onPress={() => {
            filterForm.setValue('colors', colorsForm.getValues('colors'));
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
