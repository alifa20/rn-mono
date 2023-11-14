import { Stack, useLocalSearchParams, useNavigation } from 'expo-router';
import { Pressable, ScrollView } from 'react-native';
import {
  Box,
  Button,
  ImageCarousel,
  Image,
  Text,
  SelectOption,
  IconButton,
  BackButton,
  useToast
} from '@klotti/ui';
import { faker } from '@faker-js/faker';
import React, { useEffect, useMemo, useState } from 'react';
import { Colour, Size } from '@/src/__graphql__/generated';
import { useAuthStore } from '@/src/auth';
import { useCart } from '@/src/queries/useCart';
import { useUnauthenticatedSheet } from '@/src/components/UnauthenticatedSheet';
import { useWishlist } from '@/src/queries';
import { useProduct } from '@/src/queries/useProduct';

export const ProductScreen = () => {
  const searchParams = useLocalSearchParams();
  const id = searchParams?.id as string;

  const [selectedColour, setSelectedColour] = useState<Colour>();
  const [selectedSize, setSelectedSize] = useState<Size>();
  const [showSizeActionSheet, setShowSizeActionSheet] = useState(false);

  const addedCartToast = useToast();
  const errorToast = useToast({
    type: 'error'
  });
  const unauthenticatedSheet = useUnauthenticatedSheet();
  const { goBack } = useNavigation();

  const { userId } = useAuthStore();

  const imageUrls = Array.from({ length: 6 }, () =>
    faker.image.url({
      height: 500
    })
  );

  const {
    mutations: { addProductToUserCart }
  } = useCart();

  // const {
  //   userWishlistedProducts,
  //   mutations: { addProductToUserWishlist, removeProductFromUserWishlist }
  const {
    userWishlistedProducts,
    mutations: { addProductToUserWishlist, removeProductFromUserWishlist },
    loadingMutation: loadingWishlistMutation
  } = useWishlist();

  const { data, loading, error, sizeOptions, colors } = useProduct(id);

  const isProductWishlisted = useMemo(() => {
    return userWishlistedProducts?.find(w => w?.product.id === id);
  }, [id, userWishlistedProducts]);

  useEffect(() => {
    setSelectedColour(colors[0]);
  }, [colors]);

  const addToCart = async () => {
    if (!userId) {
      unauthenticatedSheet.show();
      return;
    }
    if (!selectedSize) {
      return setShowSizeActionSheet(true);
    }

    const response = await addProductToUserCart({
      productId: id,
      quantity: 1,
      size: selectedSize
    });

    if (response.errors) {
      return errorToast.show({
        title: 'Something went wrong',
        description: response.errors[0].message
      });
    }

    return addedCartToast.show({
      title: 'Added to cart',
      icon: {
        iconName: 'check',
        iconType: 'feather'
      }
    });
  };

  const selectSize = async (value: Size) => {
    setSelectedSize(value);
  };

  if (loading) {
    return <Text>Loading</Text>;
  }

  if (error) {
    return <Text>Error</Text>;
  }

  if (!data?.product) {
    return <Text>No data found</Text>;
  }

  return (
    <>
      <Stack.Screen
        options={{
          headerTransparent: true,
          headerRight: () => (
            <IconButton
              icon={{
                iconName: isProductWishlisted ? 'heart' : 'heart-outline',
                iconType: 'ionicons'
              }}
              filled
              loading={loadingWishlistMutation}
              onPress={async () => {
                if (!userId) {
                  return unauthenticatedSheet.show();
                }

                if (isProductWishlisted) {
                  await removeProductFromUserWishlist(id);
                } else {
                  await addProductToUserWishlist(id);
                }
              }}
            />
          ),
          headerLeft: () => <BackButton filled onPress={goBack} />
        }}
      />

      <ScrollView showsVerticalScrollIndicator={false}>
        <ImageCarousel data={imageUrls} />

        <Box marginHorizontal={'s'} marginBottom='s' gap='s' paddingTop={'xs'}>
          <Box gap='s'>
            <Box
              flexDirection={'row'}
              alignItems={'center'}
              justifyContent={'space-between'}>
              <Box gap='3xs'>
                <Text variant={'title2'}>{data.product.title}</Text>
                <Text variant={'paragraph1'}>{data.product.brand.name}</Text>
              </Box>

              <Text variant={'title1'} color={'orange'}>
                ${data.product.price}
              </Text>
            </Box>

            <Text variant={'paragraph2'} color={'gray'}>
              {data.product.description}
            </Text>

            <Box gap='3xs'>
              <Text variant={'label'} color='gray'>
                Colour:{' '}
                {selectedColour ? (
                  <Text variant={'label'} color={'primary'}>
                    {selectedColour.name}
                  </Text>
                ) : null}
              </Text>
              <Box flexDirection={'row'}>
                {colors.map(colour => (
                  <Pressable
                    key={colour.id}
                    onPress={() => {
                      setSelectedColour(colour);
                    }}>
                    <Image
                      marginRight={'3xs'}
                      height={56}
                      width={56}
                      borderRadius='m'
                      borderColor={'orange'}
                      borderWidth={selectedColour?.id === colour.id ? 1 : 0}
                      source={'https://picsum.photos/seed/696/3000/2000'}
                    />
                  </Pressable>
                ))}
              </Box>
            </Box>

            <Box gap='3xs'>
              <Text variant={'label'} color='gray'>
                Size & Fit
              </Text>
              <Box>
                <SelectOption
                  title='Size & Fit'
                  placeholder={'Select size'}
                  options={sizeOptions}
                  onValueChange={selectSize}
                  selectedValue={selectedSize}
                  showActionSheet={showSizeActionSheet}
                />
              </Box>
            </Box>

            <Box gap='3xs'>
              <Text variant='label' color='gray'>
                Composition
              </Text>
              <Text variant='paragraph2'>{data?.product?.compositions}</Text>
            </Box>

            {data?.product?.washingInstructions ? (
              <Box gap={'3xs'}>
                <Text variant='label' color='gray'>
                  Washing instruction
                </Text>
                <Text variant='paragraph2'>
                  {data?.product?.washingInstructions}
                </Text>
              </Box>
            ) : null}

            <Box>
              <Button onPress={addToCart} label='Add To Cart' />
            </Box>
          </Box>
        </Box>
      </ScrollView>
    </>
  );
};

export default ProductScreen;
