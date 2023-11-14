import { Loading, Text } from '@klotti/ui';
import { useLocalSearchParams, useRouter, useSegments } from 'expo-router';
import React, { useMemo, useState } from 'react';
import { useProducts } from '@/src/queries/useProducts';
import { SharedSegment } from '../_layout';
import { ProductList } from '@/src/components';
import { Product } from '@/src/__graphql__/generated';
import { useFilterRouter } from '@/src/navigation/useFilterRouter';

export const Products = () => {
  const [fullyLoaded, setFullyLoaded] = useState(false);
  const segments = useSegments() as [any, SharedSegment];
  const router = useRouter();
  const { title } = useLocalSearchParams();
  const filterRouter = useFilterRouter();

  const description = useMemo(() => {
    switch (title) {
      case 'trending':
        return 'Trending items that Klotti users into and purchases for the last 4 weeks.';
      default:
        return '';
    }
  }, [title]);

  const {
    data,
    fetchMore,
    status: { loading, loadingFetchMore },
    error
  } = useProducts();

  const products = useMemo(
    () => data?.products.map(product => product as Product) || [],
    [data?.products]
  );

  const navigateToFiltersScreen = () => {
    filterRouter.push();
  };

  const navigateToProductScreen = (productId: string) => {
    // @ts-ignore
    router.push(`${segments[1]}/product/${productId}`);
  };

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <Text>Error</Text>;
  }

  return (
    <>
      <ProductList
        products={products}
        description={description}
        navigateToFiltersScreen={navigateToFiltersScreen}
        navigateToProductScreen={navigateToProductScreen}
        onEndReached={async () => {
          const currentLength = data?.products?.length || 0;
          if (loadingFetchMore || fullyLoaded) {
            return;
          }
          const result = await fetchMore({
            variables: {
              pagination: {
                offset: currentLength,
                limit: 30
              }
            }
          });
          setFullyLoaded(!result.data.products.length);
        }}
        ListFooterComponent={() => (loadingFetchMore ? <Loading /> : null)}
      />
    </>
  );
};

export default Products;
