import { StackScreenProps } from '@react-navigation/stack';
import { HomeStackParamList } from '../home/stack';
import { ApolloError } from '@apollo/client';
import { useProductQuery, Colour, Size } from '@app/__graphql__/generated';
import { useAuthStore } from '@app/auth';
import { Loading } from '@app/components/Loading';
import { useEffect, useLayoutEffect, useMemo, useState } from 'react';
import { Alert, Pressable, ScrollView, Text, View } from 'react-native';
import { useCart } from '../cart/hooks/useCart';
import { useWishlist } from '../wishlist/hooks/useWishlist';
// import Swiper from 'react-native-swiper';
import { Image } from '@app/components/Image';
import { Button } from '@app/components/buttons/Button';
import { SelectOption } from '@app/components/SelectOption';
import { IconButton } from '@app/components/buttons/IconButton';

import { Icon } from '@app/components/Icon';
import { showToast } from '@app/utils/toast';
import { Carousel } from '@app/components/Carousel';

export type ProductDetailScreenProps = { productId: string };
type Props = StackScreenProps<HomeStackParamList, 'ProductDetailScreen'>;
import { faker } from '@faker-js/faker';

export const ProductDetailScreen = (props: Props) => {
  const navigation = props.navigation;
  const { productId } = props.route.params;
  const { userId } = useAuthStore();

  const imageUrls = Array.from({ length: 6 }, () =>
    faker.image.url({
      height: 500
    })
  );

  const [selectedColour, setSelectedColour] = useState<Colour>();
  const [selectedSize, setSelectedSize] = useState<Size>();

  const [showSizeActionSheet, setShowSizeActionSheet] = useState(false);

  const {
    mutations: { addProductToUserCart }
  } = useCart();

  const {
    userWishlistedProducts,
    mutations: { addProductToUserWishlist, removeProductFromUserWishlist }
  } = useWishlist();

  const { data, loading, error } = useProductQuery({
    variables: {
      productId
    }
  });

  const sizes = useMemo(
    () => [
      ...new Set(data?.product?.subProducts.map(subProduct => subProduct.size))
    ],
    [data?.product?.subProducts]
  );

  const colours = useMemo(
    () => [
      ...new Set(
        data?.product?.subProducts.map(subProduct => subProduct.colour)
      )
    ],
    [data?.product?.subProducts]
  );

  const sizeOptions = useMemo(
    () =>
      sizes.map(size => ({
        label: size,
        value: size
      })) || [],
    [sizes]
  );

  const isProductWishlisted = useMemo(() => {
    return userWishlistedProducts?.find(w => w?.product.id === productId);
  }, [productId, userWishlistedProducts]);

  useEffect(() => {
    setSelectedColour(colours[0]);
  }, [colours]);

  useLayoutEffect(() => {
    const addOrRemoveWishList = async () => {
      if (!userId) {
        return Alert.alert(
          'TODO: You are not logged in yet, please login to proceed'
        );
      }

      try {
        if (isProductWishlisted) {
          await removeProductFromUserWishlist(productId);
          showToast({
            type: 'info',
            description: 'Removed from wishlist'
          });
        } else {
          await addProductToUserWishlist(productId);
          showToast({
            type: 'success',
            description: 'Added to wishlist',
            icon: {
              iconName: 'check'
            }
          });
        }
      } catch (e: unknown) {
        if (e instanceof ApolloError) {
          Alert.alert('Error', e.message);
        }
      }
    };

    navigation.setOptions({
      headerRight: () => (
        <View className="mr-2">
          <Icon
            iconName={isProductWishlisted ? 'heart' : 'heart-outline'}
            iconType="ionicons"
            onPress={addOrRemoveWishList}
          />
        </View>
      )
    });
  }, [
    addProductToUserWishlist,
    isProductWishlisted,
    navigation,
    productId,
    removeProductFromUserWishlist,
    userId
  ]);

  const selectSize = async (value: Size) => {
    setSelectedSize(value);

    if (!showSizeActionSheet) {
      return;
    }

    setShowSizeActionSheet(false);
  };

  const addToCart = async () => {
    if (!userId) {
      return Alert.alert(
        'TODO: You are not logged in yet, please login to proceed'
      );
    }

    if (!selectedSize) {
      return setShowSizeActionSheet(true);
    }

    try {
      await addProductToUserCart({
        productId,
        quantity: 1,
        size: selectedSize
      });

      showToast({
        type: 'success',
        description: 'Added to cart',
        icon: {
          iconName: 'check'
        }
      });
    } catch (e: unknown) {
      if (e instanceof ApolloError) {
        Alert.alert('Error', e.message);
      }
    }
  };

  if (loading) {
    return <Loading fullScreen />;
  }

  if (error) {
    return <Text>Error</Text>;
  }

  if (!data?.product) {
    return <Text>No data found</Text>;
  }

  return (
    <>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Carousel imageUrls={imageUrls} />

        <View className="m-6 gap-y-4 pt-4">
          <View className="flex-row items-center justify-between">
            <View className="gap-y-2">
              <Text className="text-xl font-bold">{data.product.title}</Text>
              <Text className="text-md">{data.product.brand.name}</Text>
            </View>

            <Text className="text-xl font-bold text-orange-500">
              ${data.product.price}
            </Text>
          </View>

          <View>
            <Text className="text-gray-400">{data.product.description}</Text>
          </View>

          <View className="gap-2">
            <Text className="text-sm font-semibold text-gray-600">
              Colour:{' '}
              {selectedColour ? (
                <Text className="text-black">{selectedColour.name}</Text>
              ) : null}
            </Text>
            <View className="row">
              {colours.map(colour => (
                <Pressable
                  key={colour.id}
                  onPress={() => {
                    setSelectedColour(colour);
                  }}>
                  <Image
                    className={
                      'mr-2 h-14 w-14 rounded-md border border-orange-600'
                    }
                    source={''}
                  />
                </Pressable>
              ))}
            </View>
          </View>

          <View className="gap-2">
            <Text className="text-sm font-semibold text-gray-600">
              Size & Fit
            </Text>
            <View>
              <SelectOption
                title="Size"
                innerTitle="Size"
                options={sizeOptions}
                onValueChange={selectSize}
                showActionSheet={showSizeActionSheet}
                // @ts-ignore
                selectedValue={selectedSize}
                renderCustomButton={
                  <IconButton
                    onPress={() => {}}
                    label={selectedSize || 'Select Size'}
                    icon={{
                      name: 'chevron-down',
                      iconSize: 'small'
                    }}
                  />
                }
              />
            </View>
          </View>

          <View className="gap-2">
            <Text className="text-sm font-semibold text-gray-600">
              Composition
            </Text>
            <Text>{data?.product?.compositions}</Text>
          </View>

          {data?.product?.washingInstructions ? (
            <View className="gap-2">
              <Text className="text-sm font-semibold text-gray-600">
                Washing instruction
              </Text>
              <Text>{data?.product?.washingInstructions}</Text>
            </View>
          ) : null}

          <View>
            <Button onPress={addToCart} label=" Add To Cart" />
          </View>
        </View>
      </ScrollView>
    </>
  );
};
