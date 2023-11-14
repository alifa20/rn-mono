import { useSubCategoryQuery } from '@/src/__graphql__/generated';
import { useFilterRouter } from '@/src/navigation/useFilterRouter';
import { useSearchRouter } from '@/src/navigation/useSearchRouter';
import { CategoryList } from '@/src/templates';
import { Loading, Text } from '@klotti/ui';
import { Stack } from 'expo-router';
import React, { useMemo } from 'react';

export const ProductTypeScreen = () => {
  const searchRouter = useSearchRouter();
  const filterRouter = useFilterRouter();

  const { data, loading } = useSubCategoryQuery({
    variables: {
      subCategoryId: filterRouter.subCategoryId,
      commonType: filterRouter.commonType
    }
  });

  const productTypes = useMemo(() => {
    const productTypesItems = data?.subCategory?.productTypes?.map(item => {
      return {
        id: item.id ?? '',
        name: item.name ?? ''
      };
    });

    const all = {
      id: 'all',
      name: `Show all ${data?.subCategory?.name}`
    };

    return [all, ...(productTypesItems ?? [])];
  }, [data?.subCategory?.name, data?.subCategory?.productTypes]);

  if (loading) return <Loading />;
  return (
    <>
      <Stack
        screenOptions={{
          title: data?.subCategory?.name ?? ''
        }}
      />
      <CategoryList
        items={productTypes}
        EmptyComponent={<Text>No product types found</Text>}
        label={item => <Text>{item.name}</Text>}
        onPress={item => {
          const selectedItem = data?.subCategory?.productTypes?.find(
            subCategory => subCategory?.id === item.id
          );

          if (item.id === 'all') {
            return searchRouter.push({
              path: 'products',
              title: `All ${data?.subCategory?.name}` ?? '',
              categoryId: filterRouter.categoryId,
              subCategoryId: filterRouter.subCategoryId,
              productTypeId: filterRouter.productTypeId
            });
          }

          return searchRouter.push({
            path: 'products',
            title: selectedItem?.name ?? '',
            categoryId: filterRouter.categoryId,
            subCategoryId: filterRouter.subCategoryId ?? '',
            productTypeId: selectedItem?.id ?? ''
          });
        }}
      />
    </>
  );
};

export default ProductTypeScreen;
