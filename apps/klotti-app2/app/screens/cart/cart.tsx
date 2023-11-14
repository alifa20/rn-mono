import {
  UpdateUserCartProductInput,
  useCartQuery
} from '@app/__graphql__/generated';
import { StackScreenProps } from '@react-navigation/stack';
import { useMemo } from 'react';
import { Alert, FlatList, Text, View } from 'react-native';
import { BagStackParamList } from './stack';
import { useCart } from './hooks/useCart';
import { BagCard } from './components/BagCard';
import { Button } from '@app/components/buttons/Button';
import { useWishlist } from '@app/screens/wishlist/hooks/useWishlist';
import { Divider } from '@app/components/Divider';
import { DashDivder } from '@app/screens/cart/checkout/DashDivider';
import { Loading } from '@app/components/Loading';
import { EmptyScreen } from '@app/components/EmptyScreen';
import { LoadingBlanket } from '@app/components/LoadingBlanket';
import { showAlertConfirm } from '@app/utils/alertUtil';
import { ApolloError } from '@apollo/client';
import { useAuthStore } from '@app/auth';
import { showToast } from '@app/utils/toast';

type CartScreenNavigationProp = StackScreenProps<
  BagStackParamList,
  'CartScreen'
>;

export const CartScreen = (props: CartScreenNavigationProp) => {
  const { userId } = useAuthStore();

  const { data } = useCartQuery();

  const {
    bagItems,
    loading,
    refetch,
    loadingMutation,
    mutations: {
      removeProductFromUserCart,
      updateProductInUserCart,
      moveToWishlist
    }
  } = useCart();

  const {
    loadingMutation: loadingAddProductToWishlistMutation,
    userWishlistedProducts
  } = useWishlist();

  const productsInBag = useMemo(
    () => bagItems?.map(item => item?.product) || [],
    [bagItems]
  );

  const removeItemFromBag = (id: string) => {
    showAlertConfirm(
      'Remove from Cart',
      'Are you sure you want to ',
      'Remove',
      'Keep',
      async () => {
        try {
          await removeProductFromUserCart(id);
          showToast({
            description: 'Removed from cart',
            type: 'info'
          });
        } catch (e: unknown) {
          if (e instanceof ApolloError) {
            Alert.alert('Error', e.message);
          }
        }
      }
    );
  };

  const moveToWishList = async ({
    cartId,
    productId
  }: {
    cartId: string;
    productId: string;
  }) => {
    showAlertConfirm(
      'Move to Wishlist',
      'Are you sure you want to',
      'Decline',
      'Accept',
      () => {},
      async () => {
        try {
          await moveToWishlist({ cartId, productId });
          showToast({
            description: 'Moved to wishlist',
            type: 'info'
          });
        } catch (e: unknown) {
          if (e instanceof ApolloError) {
            Alert.alert('Error', e.message);
          }
        }
      }
    );
  };

  const updateProductSize = async (input: UpdateUserCartProductInput) => {
    const isProductInWishlist = userWishlistedProducts?.find(
      p => p?.id === input.productId
    );

    try {
      isProductInWishlist
        ? await removeItemFromBag(input.id)
        : await updateProductInUserCart(input);
    } catch (e: unknown) {
      if (e instanceof ApolloError) {
        Alert.alert('Error', e.message);
      }
    }
  };

  const updateProductQty = async (input: UpdateUserCartProductInput) => {
    try {
      await updateProductInUserCart(input);
    } catch (e) {
      console.log('e', e);
    }
  };

  if (!userId) {
    return <Text className="text-black">No Logged in</Text>;
  }

  if (loading) {
    return <Loading fullScreen />;
  }

  if (!productsInBag?.length) {
    return (
      <EmptyScreen
        title="YOUR CART IS EMPTY"
        description="Items added to Cart, they’ll appear here."
        action={{
          label: 'Shop Now',
          onPress: () => props.navigation.navigate('Home')
        }}
      />
    );
  }

  return (
    <>
      {(loadingAddProductToWishlistMutation || loadingMutation) && (
        <LoadingBlanket />
      )}
      <FlatList
        className="px-5"
        contentContainerStyle={{
          paddingVertical: 24
        }}
        showsVerticalScrollIndicator={false}
        data={bagItems}
        refreshing={loading}
        keyExtractor={item => item?.id || ''}
        ItemSeparatorComponent={() => (
          <View className="my-5">
            <Divider />
          </View>
        )}
        renderItem={({ item }) =>
          item?.product ? (
            <BagCard
              // @ts-ignore: fix type
              product={item.product}
              selectedSize={item.size}
              onUpdateProductSize={(originalSize, value) => {
                item.product &&
                  updateProductSize({
                    id: item.id,
                    productId: item.product?.id,
                    size: value,
                    quantity: item.quantity,
                    originalSize
                  });
              }}
              onMoveProductToWishlist={async () => {
                item.product &&
                  (await moveToWishList({
                    cartId: item.id,
                    productId: item.product.id
                  }));
              }}
              onUpdateProductQuantity={async (qty, size) => {
                item.product &&
                  (await updateProductQty({
                    id: item.id,
                    productId: item.product.id,
                    size,
                    quantity: qty,
                    originalSize: size
                  }));
              }}
              selectedQuantity={item.quantity.toString()}
              onPress={() => {
                item.product &&
                  props.navigation.navigate('ProductDetailScreen', {
                    productId: item?.product.id
                  });
              }}
              onRemoveFromBag={() => {
                removeItemFromBag(item.id);
              }}
            />
          ) : null
        }
        ListFooterComponent={<View className="h-60" />}
        onRefresh={refetch}
      />

      <View className="absolute bottom-0 left-0 w-full bg-white">
        <Divider color="black" />

        <View className="space-y-4 p-4">
          <View className="w-full flex-row justify-between">
            <Text className="text-gray-500">Subtotal</Text>
            <Text className="text-gray-500">
              ${data?.user?.cart?.subTotal.toFixed(2)}
            </Text>
          </View>
          <DashDivder />
          <View className="w-full flex-row justify-between">
            <Text className="text-gray-500">Shipping</Text>
            <Text className="text-gray-500">
              {data?.user?.cart?.shippingFee === 0
                ? 'Free shipping'
                : `$${data?.user?.cart?.shippingFee.toFixed(2)}`}
            </Text>
          </View>
          <View className="w-full flex-row justify-between">
            <Text className="text-gray-500">Estimated tax</Text>
            <Text className="text-gray-500">
              ${data?.user?.cart?.taxAmount.toFixed(2)}
            </Text>
          </View>
          <View className="w-full flex-row justify-between">
            <Text className="text-black">Total</Text>
            <Text className="text-black">
              ${data?.user?.cart?.total.toFixed(2)}
            </Text>
          </View>
          <View className="h-2" />
          <Button
            type="primary"
            label="Checkout"
            onPress={() => {
              props.navigation.navigate('CheckoutStack');
            }}
          />
        </View>
      </View>
    </>
  );
};
