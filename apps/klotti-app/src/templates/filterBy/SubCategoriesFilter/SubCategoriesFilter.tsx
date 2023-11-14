import { useFilters } from '@/src/queries';
import { FilterFormData } from '@/src/queries/filters/type';
import { BackButton, Box, Button, CheckItem, Divider } from '@klotti/ui';
import { Stack, useRouter } from 'expo-router';
import React from 'react';
import { useFormContext, useForm, Controller } from 'react-hook-form';
import { FlatList } from 'react-native';

export const SubCategoriesFilter = () => {
  const router = useRouter();
  const filterForm = useFormContext<FilterFormData>();

  const subCategoriesForm = useForm({
    defaultValues: {
      subCategories: filterForm.getValues('subCategories') || []
    }
  });

  const { subCategoriesOptions, loading } = useFilters();

  return (
    <>
      <Stack.Screen
        options={{
          headerTitle: 'Sub Categories',
          headerLeft: () => (
            <BackButton
              onPress={() => {
                filterForm.setValue(
                  'subCategories',
                  subCategoriesForm.getValues('subCategories')
                );
                router.back();
              }}
            />
          )
        }}
      />
      <FlatList
        showsVerticalScrollIndicator={false}
        data={subCategoriesOptions}
        keyExtractor={item => item.value}
        renderItem={({ item }) => (
          <Controller
            key={item.value}
            name='subCategories'
            control={subCategoriesForm.control}
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
              'subCategories',
              subCategoriesForm.getValues('subCategories')
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
