import { useFilters } from '@/src/queries';
import { FilterFormData } from '@/src/queries/filters/type';
import { BackButton, Box, Button, CheckItem, Divider } from '@klotti/ui';
import { Stack, useRouter } from 'expo-router';
import React from 'react';
import { useFormContext, useForm, Controller } from 'react-hook-form';
import { FlatList } from 'react-native';

export const CategoriesFilter = () => {
  const router = useRouter();
  const filterForm = useFormContext<FilterFormData>();

  const categoriesForm = useForm({
    defaultValues: {
      categories: filterForm.getValues('categories') || []
    }
  });

  const { categoriesOptions, loading } = useFilters();

  return (
    <>
      <Stack.Screen
        options={{
          headerTitle: 'Categories',
          headerLeft: () => (
            <BackButton
              onPress={() => {
                filterForm.setValue(
                  'categories',
                  categoriesForm.getValues('categories')
                );
                router.back();
              }}
            />
          )
        }}
      />
      <FlatList
        showsVerticalScrollIndicator={false}
        data={categoriesOptions}
        keyExtractor={item => item.value}
        renderItem={({ item }) => (
          <Controller
            key={item.value}
            name='categories'
            control={categoriesForm.control}
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
            filterForm.setValue(
              'categories',
              categoriesForm.getValues('categories')
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
