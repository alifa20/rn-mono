import { useCategoryQuery } from '@/src/__graphql__/generated';
import { useFilterRouter } from '@/src/navigation/useFilterRouter';
import { useSearchRouter } from '@/src/navigation/useSearchRouter';
import { CategoryList } from '@/src/templates';
import { Loading, Text } from '@klotti/ui';
import { Stack } from 'expo-router';
import React, { useMemo } from 'react';

export const SubCategoryScreen = () => {
  const searchRouter = useSearchRouter();
  const filterRouter = useFilterRouter();

  const { data, loading } = useCategoryQuery({
    variables: {
      categoryId: filterRouter.categoryId,
      commonType: filterRouter.commonType
    }
  });

  const subCategories = useMemo(() => {
    const subCategoriesItems = data?.category?.subCategories?.map(item => {
      return {
        id: item.id ?? '',
        name: item.name ?? ''
      };
    });

    const all = {
      id: 'all',
      name: `Show all ${data?.category?.name}`
    };

    return [all, ...(subCategoriesItems ?? [])];
  }, [data?.category?.name, data?.category?.subCategories]);

  if (loading) return <Loading />;

  return (
    <>
      <Stack
        screenOptions={{
          title: data?.category?.name ?? ''
        }}
      />
      <CategoryList
        items={subCategories}
        EmptyComponent={<Text>No sub categories found</Text>}
        label={item => <Text>{item.name}</Text>}
        onPress={item => {
          const selectedItem = data?.category?.subCategories.find(
            subCategory => subCategory?.id === item.id
          );

          if (item.id === 'all') {
            return searchRouter.push({
              path: 'products',
              title: `All ${data?.category?.name}` ?? '',
              categoryId: filterRouter.categoryId
            });
          }

          if (
            selectedItem?.productTypes?.length &&
            selectedItem.id &&
            selectedItem.name
          ) {
            return searchRouter.push({
              path: 'product-type',
              title: selectedItem.name,
              categoryId: filterRouter.categoryId,
              subCategoryId: selectedItem.id
            });
          }

          return searchRouter.push({
            path: 'products',
            title: selectedItem?.name ?? '',
            categoryId: filterRouter.categoryId
          });
        }}
      />
    </>
  );
};

export default SubCategoryScreen;
