import { StackScreenProps } from '@react-navigation/stack';
import { Alert, FlatList, Text, TouchableOpacity, View } from 'react-native';
import { useWishlist } from './hooks/useWishlist';
import { WishlistStackParamList } from './WishlistStack';
import { Divider } from '@app/components/Divider';
import { Loading } from '@app/components/Loading';
import { Size } from '@app/__graphql__/generated';
import { WishListCard } from './components/WishListCard';
import { LoadingBlanket } from '@app/components/LoadingBlanket';
import { EmptyScreen } from '@app/components/EmptyScreen';
import { useAuthStore } from '@app/auth';
import { showToast } from '@app/utils/toast';

type WishlistScreenNavigationProp = StackScreenProps<
  WishlistStackParamList,
  'WishlistScreen'
>;

export const WishlistScreen = (props: WishlistScreenNavigationProp) => {
  const { userId } = useAuthStore();
  const {
    userWishlistedProducts,
    loading,
    loadingMutation,
    refetch,
    mutations: { addWishlistedProductToCart, removeProductFromUserWishlist }
  } = useWishlist();

  const onPressRemove = (id: string) => {
    Alert.alert('Remove from Wishlist', 'Are you sure you want to ', [
      {
        text: 'Remove',
        onPress: async () => {
          try {
            await removeProductFromUserWishlist(id);
            showToast({
              description: 'Removed from wishlist',
              type: 'info'
            });
          } catch (err) {
            Alert.alert('Something went wrong');
          }
        },
        style: 'destructive'
      },
      {
        text: 'Keep',
        onPress: () => {}
      }
    ]);
  };

  const onPressAddProductToCart = async ({
    productId,
    size
  }: {
    id: string;
    productId: string;
    size: Size;
  }) => {
    try {
      await addWishlistedProductToCart({
        productId,
        quantity: 1,
        size: size as Size
      });
      showToast({
        description: 'Added to cart',
        type: 'success'
      });
    } catch (e) {
      if (e instanceof Error) {
        Alert.alert('Something went wrong', e.message);
      }
    }
  };

  if (!userId) {
    return <Text className="text-black">No Logged in</Text>;
  }

  if (loading) {
    return <Loading fullScreen />;
  }

  if (!userWishlistedProducts?.length) {
    return (
      <EmptyScreen
        title="YOUR WISHLIST IS EMPTY"
        description="Items added to your Wishlist will be saved here."
        action={{
          label: 'Explore Now',
          onPress: () => props.navigation.navigate('Home')
        }}
      />
    );
  }

  return (
    <>
      {loadingMutation && <LoadingBlanket />}
      <View className="mx-5 flex flex-1">
        <FlatList
          contentContainerStyle={{
            paddingVertical: 24
          }}
          showsVerticalScrollIndicator={false}
          data={userWishlistedProducts}
          keyExtractor={item => item?.id || ''}
          renderItem={({ item }) =>
            item &&
            item.product && (
              <>
                <WishListCard
                  // @ts-ignore: fix type
                  product={item?.product}
                  onPress={() => {
                    props.navigation.navigate('ProductDetailScreen', {
                      productId: item.product.id
                    });
                  }}
                  onAddToCartPress={async () =>
                    await onPressAddProductToCart({
                      id: item.id,
                      productId: item.product.id,
                      size: item.product.subProducts[0].size as Size
                    })
                  }
                  onRemovePress={() => onPressRemove(item.product.id)}
                />

                <TouchableOpacity
                  onPress={() => {
                    props.navigation.navigate('ProductDetailScreen', {
                      productId: item.product.id
                    });
                  }}
                />
              </>
            )
          }
          ItemSeparatorComponent={() => <Divider spacing={5} />}
          onRefresh={refetch}
          refreshing={loading}
          onEndReachedThreshold={0.1}
        />
      </View>
    </>
  );
};
