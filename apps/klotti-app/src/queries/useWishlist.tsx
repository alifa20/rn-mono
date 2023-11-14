import { NetworkStatus, Reference } from '@apollo/client';
import { useMemo } from 'react';
import {
  useWishlistQuery,
  useAddProductToUserWishlistMutation,
  useAddWishlistedProductToUserCartMutation,
  useRemoveProductFromUserWishlistMutation,
  AddProductToUserCartInput
} from '../__graphql__/generated';
import { useAuthStore } from '../auth';

export const useWishlist = () => {
  const { userId } = useAuthStore();

  const { data, error, refetch, networkStatus } = useWishlistQuery({
    skip: !userId
  });

  const loading =
    networkStatus === NetworkStatus.loading ||
    networkStatus === NetworkStatus.refetch;
  const fetchingMore = networkStatus === NetworkStatus.fetchMore;

  const userWishlistedProducts = useMemo(
    () => data?.user?.wishlist?.map(item => item) || [],
    [data]
  );

  const [
    addProductToUserWishlistMutation,
    addProductToUserWishlistMutationStatus
  ] = useAddProductToUserWishlistMutation();

  const [
    addWishlistedProductToCartMutation,
    addWishlistedProductToCartMutationStatus
  ] = useAddWishlistedProductToUserCartMutation();

  const [
    removeProductFromUserWishlistMutation,
    removeProductFromUserWishlistMutationStatus
  ] = useRemoveProductFromUserWishlistMutation();

  const addProductToUserWishlist = async (productId: string) => {
    return addProductToUserWishlistMutation({
      variables: {
        productId
      },
      update: (cache, { data: addData }) => {
        cache.modify({
          id: cache.identify({ __typename: 'User', id: userId }),
          fields: {
            wishlist(existingWishlistRefs) {
              return [
                ...existingWishlistRefs,
                addData?.addProductToUserWishlist
              ];
            }
          }
        });
      }
    });
  };

  const addWishlistedProductToCart = async ({
    productId,
    quantity,
    size
  }: AddProductToUserCartInput) => {
    return addWishlistedProductToCartMutation({
      variables: {
        input: {
          productId,
          quantity,
          size
        },
        removeProductFromUserWishlistId: productId
      },
      refetchQueries: ['Cart'],
      update: (cache, { data: addData }) => {
        cache.modify({
          id: cache.identify({ __typename: 'User', id: userId }),
          fields: {
            // cart(existingCartRef, { readField }) {
            //   const newCartItem = addData?.addProductToUserCart;
            //   const newCartItemId = readField('id', newCartItem);

            //   const itemAlreadyExists = existingCartRef.items.some(
            //     (ref: Reference) => readField('id', ref) === newCartItemId
            //   );

            //   return {
            //     ...existingCartRef,
            //     items: itemAlreadyExists
            //       ? existingCartRef.items.map((ref: Reference) =>
            //           readField('id', ref) === newCartItemId ? newCartItem : ref
            //         )
            //       : [...existingCartRef.items, newCartItem]
            //   };
            // },
            wishlist(prevRef, { readField }) {
              return prevRef.filter(
                (ref: Reference) =>
                  readField('id', ref) !==
                  addData?.removeProductFromUserWishlist.id
              );
            }
          }
        });
      }
    });
  };

  const removeProductFromUserWishlist = async (id: string) => {
    return removeProductFromUserWishlistMutation({
      variables: {
        removeProductFromUserWishlistId: id
      },
      update: (cache, { data: removeData }) => {
        cache.modify({
          id: cache.identify({ __typename: 'User', id: userId }),
          fields: {
            wishlist(prevRef, { readField }) {
              return prevRef.filter(
                (ref: Reference) =>
                  readField('id', ref) !==
                  removeData?.removeProductFromUserWishlist.id
              );
            }
          }
        });
      }
    });
  };

  const loadingMutation =
    addWishlistedProductToCartMutationStatus.loading ||
    removeProductFromUserWishlistMutationStatus.loading ||
    addProductToUserWishlistMutationStatus.loading;

  return {
    userWishlistedProducts,
    loading,
    error,
    loadingMutation,
    fetchingMore,
    mutations: {
      addProductToUserWishlist,
      removeProductFromUserWishlist,
      addWishlistedProductToCart,
      addWishlistedProductToCartMutationStatus,
      removeProductFromUserWishlistMutationStatus,
      addProductToUserWishlistMutationStatus
    },
    refetch
  };
};
