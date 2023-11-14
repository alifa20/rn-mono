import { Size } from '@/src/__graphql__/generated';
import { useAuthStore } from '@/src/auth';
import { Container } from '@/src/components';
import { useWishlist } from '@/src/queries';
import {
  List,
  Loading,
  OptionType,
  Text,
  WishlistProductItem,
  useToast
} from '@klotti/ui';
import { useRouter, useSegments } from 'expo-router';
import { useMemo } from 'react';

export const WishlistScreen = () => {
  const segments = useSegments();
  const { userId } = useAuthStore();
  const errorToast = useToast({
    type: 'error'
  });

  const successToast = useToast({
    type: 'success'
  });

  const router = useRouter();
  const { userWishlistedProducts, loading, error, mutations } = useWishlist();

  const data = useMemo(() => {
    return userWishlistedProducts?.map(item => {
      const sizes = [
        ...new Set(
          item?.product?.subProducts.map(subProduct => subProduct.size)
        )
      ];

      return {
        ...item,
        sizeOptions: sizes.map(size => ({
          label: size,
          value: size
        }))
      };
    });
  }, [userWishlistedProducts]);

  const handleAddToBag = async (id: string, size: Size) => {
    const response = await mutations.addWishlistedProductToCart({
      productId: id,
      quantity: 1,
      size: size
    });

    if (response.errors) {
      errorToast.show({
        title: 'Something went wrong',
        description: response.errors[0].message
      });
      return;
    }

    successToast.show({
      title: 'Added to bag'
    });
  };

  const handleRemove = async (id: string) => {
    const response = await mutations.removeProductFromUserWishlist(id);
    if (response.errors) {
      errorToast.show({
        title: 'Something went wrong',
        description: response.errors[0].message
      });
      return;
    }
  };

  if (!userId) return <Text>UNauthenticated</Text>;
  if (error) return <Text>ERror</Text>;
  if (loading) return <Loading />;

  return (
    <Container>
      <List
        data={data}
        estimatedItemSize={300}
        ItemComponent={({ item }) => (
          <WishlistProductItem
            title={item?.product?.title || ''}
            price={item?.product?.price || 0}
            description={item?.product?.description || ''}
            onAddToBag={async ({ size }: { size: OptionType['value'] }) => {
              if (!item?.product?.id) return;
              await handleAddToBag(item.product.id, size as Size);
            }}
            onRemove={async () => {
              if (!item?.product?.id) return;
              await handleRemove(item.product.id);
            }}
            onItemPress={() => {
              if (!item?.product?.id) return;
              // @ts-ignore
              router.push(`${segments[0]}/product/${item.product.id}`);
            }}
            sizeOptions={item.sizeOptions}
          />
        )}
        numColumns={1}
      />
    </Container>
  );
};

export default WishlistScreen;
