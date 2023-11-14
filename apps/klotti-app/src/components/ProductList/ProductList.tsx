import { Product } from '@/src/__graphql__/generated';
import {
  Box,
  Button,
  List,
  ListProps,
  ProductGrid,
  Text,
  useResponsiveValue
} from '@klotti/ui';
import React from 'react';

type ProductListProps = Partial<ListProps<Product>> & {
  description?: string;
  products: Product[];
  navigateToFiltersScreen: () => void;
  navigateToProductScreen: (productId: string) => void;
};

export const ProductList = ({
  description,
  products,
  navigateToFiltersScreen,
  navigateToProductScreen,
  ...props
}: ProductListProps) => {
  const ESTIMATED_ITEM_SIZE = 224;

  const numberOfColumns =
    useResponsiveValue<number>({
      largeTablet: 4,
      tablet: 3,
      phone: 2
    }) || 2;

  return (
    <List
      ListHeaderComponent={
        <Box
          justifyContent={'center'}
          alignItems={'center'}
          marginTop={'2xs'}
          marginBottom={'s'}
          marginHorizontal={'s'}
          gap='s'>
          {description ? (
            <Text variant={'caption'} textAlign={'center'}>
              {description}
            </Text>
          ) : null}

          <Button
            label='Filter'
            variants='outline'
            size='small'
            onPress={navigateToFiltersScreen}
          />
        </Box>
      }
      keyExtractor={item => item.id}
      numColumns={numberOfColumns}
      onEndReachedThreshold={5}
      estimatedItemSize={ESTIMATED_ITEM_SIZE}
      {...props}
      data={products}
      ItemComponent={({ item }) => (
        <ProductGrid
          brandName={item.brand.name}
          title={item.title}
          image={{
            source: item.imagesUrls[0]
          }}
          price={item.price}
          onPress={() => {
            navigateToProductScreen(item.id);
          }}
        />
      )}
    />
  );
};
