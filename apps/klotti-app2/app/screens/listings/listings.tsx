import { ProductsInputFilter } from '@app/__graphql__/generated';
import {
  ActivityIndicator,
  Text,
  View,
  useWindowDimensions
} from 'react-native';
import { FlashList } from '@shopify/flash-list';

import { StackScreenProps } from '@react-navigation/stack';
import { ListingStackParamList } from './stack';
import { ProductDisplay } from '@app/components/Products/ProductDisplay';
import { useLayoutEffect, useState } from 'react';
import { Button } from '@app/components/buttons/Button';
import { Loading } from '@app/components/Loading';
import { useSearchListings } from './hooks/useSearchListings';

export type ListingsScreenProps = {
  title: string;
  description?: string;
  initialFilters?: ProductsInputFilter;
  commonType?: string;
};

type Props = StackScreenProps<ListingStackParamList, 'Listings'>;

export const ListingsScreen = (props: Props) => {
  const { navigation } = props;
  const { initialFilters, title, description } = props.route.params;
  const { width } = useWindowDimensions();

  const numColumns = width > 600 ? 3 : 2;

  const [fullyLoaded, setFullyLoaded] = useState(false);
  const estimatedItemSize = 224;

  const {
    data,
    fetchMore,
    status: { loading, loadingFetchMore },
    error
  } = useSearchListings(initialFilters);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: title
    });
  }, [navigation, title]);

  const navigateToFilterStack = () => {
    navigation.navigate('FilterStack');
  };

  const navigateToProductDetailScreen = (productId: string) => {
    navigation.navigate('ProductDetailScreen', { productId });
  };

  if (loading) {
    return <Loading fullScreen />;
  }

  if (error) {
    return <Text>Error</Text>;
  }

  const cardWidth = (width / numColumns) * 0.9;

  return (
    <FlashList
      data={data?.products}
      snapToAlignment="center"
      renderItem={({ item }) => (
        <View
          style={{
            paddingLeft: (width / numColumns - cardWidth) / 2,
            paddingRight: (width / numColumns - cardWidth) / 2,
            marginVertical: 10
          }}>
          <ProductDisplay
            product={item}
            cardWidth={cardWidth}
            onPress={() => navigateToProductDetailScreen(item.id)}
          />
        </View>
      )}
      showsVerticalScrollIndicator={false}
      keyExtractor={item => item.id}
      numColumns={numColumns}
      onEndReachedThreshold={5}
      ListHeaderComponent={
        <View className="m-5">
          <View className="mx-10">
            <Text className="text-center text-xs text-gray-500">
              {description}
            </Text>
          </View>

          <View className="my-4 flex-row content-center items-center justify-center">
            <Button
              onPress={navigateToFilterStack}
              label="Filter"
              type="outline"
            />
          </View>
        </View>
      }
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
      ListFooterComponent={() =>
        loadingFetchMore ? (
          <View className="pv-4 flex-1 items-center justify-center">
            <ActivityIndicator />
          </View>
        ) : null
      }
      estimatedItemSize={estimatedItemSize}
    />
  );
};
