import React, { useMemo } from 'react';
import {
  Text,
  ScrollView,
  SafeAreaView,
  View
  // TouchableOpacity
} from 'react-native';
// import { Image } from '@app/components/Image';
// import Swiper from 'react-native-swiper';
import { StackScreenProps } from '@react-navigation/stack';
// import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import { HomeStackParamList } from './stack';
import { useHomeListingsQuery } from '../../__graphql__/generated';
import { CategoryListingSlider } from '../../components/Products/CategoryListingSlider';
import { ProductListingSlider } from '../../components/Products/ProductListingSlider';
// import { useCollection } from '../hook/useCollection';
import { useScrollToTop } from '@react-navigation/native';
import { Loading } from '@app/components/Loading';
import { useCommonType } from '@app/store/commonType/useCommonType';

export type Props = StackScreenProps<HomeStackParamList, 'HomeScreen'>;

export const HomeScreen = (props: Props) => {
  const { navigation } = props;
  const ref = React.useRef(null);
  const { commonType } = useCommonType();

  useScrollToTop(ref);

  const { data, loading } = useHomeListingsQuery({
    variables: {
      pagination: { limit: 10, offset: 0 },
      commonType
    }
  });

  console.log('data', data);

  // const { collectionData, loadingCollection } = useCollection();

  const discountedProducts = useMemo(
    () => data?.products.filter(product => product.discount),
    [data?.products]
  );

  const navigateToProductDetailScreen = (productId: string) => {
    navigation.navigate('ProductDetailScreen', {
      productId
    });
  };

  const navigateToTrendingScreen = () => {
    navigation.navigate('ListingStack', {
      title: 'Trending',
      description:
        'Trending items that Klotti users into and purchases for the last 4 weeks.'
    });
  };

  const navigateToDiscountScreen = () => {
    navigation.navigate('ListingStack', {
      title: 'Discount',
      description:
        'Prices as marked. Discount is subject to availability of stock, Limited time only.',
      initialFilters: {
        isDiscountProductsOnly: true
      }
    });
  };

  if (loading) {
    return <Loading fullScreen />;
  }

  return (
    <SafeAreaView>
      <ScrollView ref={ref}>
        <View className="m-5">
          <Text className="text-lg font-medium">
            Welcome back <Text className="text-sky-500">@TEST</Text>{' '}
            <Text className="text-black">Env:DEV</Text>
          </Text>
        </View>

        <View className="flex-1 items-center justify-center bg-white">
          <Text className="text-black">Hello</Text>
        </View>

        <View>
          {/* <View className="mx-5 my-2">
            {loadingCollection ? (
              <>
                <SkeletonPlaceholder>
                  <SkeletonPlaceholder.Item
                    width={'100%'}
                    height={200}
                    borderRadius={16}
                  />
                </SkeletonPlaceholder>
              </>
            ) : (
              <Swiper
                autoplay
                autoplayTimeout={3}
                dotColor="(rgba(255,255,255,.4)"
                activeDotColor="white"
                style={{ height: 200 }}
                showsPagination
                paginationStyle={{
                  start: 300
                }}>
                {collectionData?.collections?.map(collection => (
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate('CollectionDetailScreen', {
                        collection
                      })
                    }
                    key={collection.id}
                    style={{
                      backgroundColor: 'gray',
                      height: '100%',
                      borderRadius: 16
                    }}>
                    <Image
                      source={{
                        uri: collection.imageUrl || ''
                      }}
                      style={{
                        zIndex: 0,
                        height: '100%',
                        width: '100%',
                        borderRadius: 16
                      }}
                    />
                    <Text
                      className="text-lg font-semibold text-black"
                      style={{
                        zIndex: 1,
                        position: 'absolute',
                        bottom: 16,
                        left: 16,
                        color: 'white'
                      }}>
                      {collection.title}
                    </Text>
                  </TouchableOpacity>
                ))}
              </Swiper>
            )}
          </View> */}

          <View className="mx-5 my-2 h-px bg-gray-100" />

          {data?.products ? (
            <ProductListingSlider
              header="Trending Products"
              navigateToProductDetailScreen={navigateToProductDetailScreen}
              navigateToHeaderSection={navigateToTrendingScreen}
              products={data?.products}
            />
          ) : (
            <Text className="text-black">Loading...</Text>
          )}

          <CategoryListingSlider
            header="New Arrival"
            categories={['streetwear', 'winter 2022']}
          />

          {data?.products ? (
            (discountedProducts?.length && (
              <ProductListingSlider
                navigateToProductDetailScreen={navigateToProductDetailScreen}
                navigateToHeaderSection={navigateToDiscountScreen}
                header="Sales"
                products={discountedProducts}
              />
            )) ||
            null
          ) : (
            <Text className="text-black">Loading...</Text>
          )}

          <CategoryListingSlider
            header="Categories"
            categories={['womenswear', 'menswear']}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
