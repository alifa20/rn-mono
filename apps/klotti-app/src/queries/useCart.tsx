import { useMemo } from 'react';
import {
  useCartQuery,
  useMoveToWishlistMutation,
  useAddProductToUserCartMutation,
  useRemoveProductFromUserCartMutation,
  useUpdateUserCartProductMutation,
  AddProductToUserCartInput,
  UpdateUserCartProductInput
} from '../__graphql__/generated';
import { useAuthStore } from '../auth';

export const useCart = () => {
  const { userId } = useAuthStore();

  const { data, refetch, loading } = useCartQuery({
    skip: !userId
  });

  const [moveToWishlistMutation, moveToWishlistMutationStatus] =
    useMoveToWishlistMutation();

  const bagItems = useMemo(
    () => data?.user?.cart?.items?.map(userCartProduct => userCartProduct),
    [data]
  );

  const [addProductToUserCartMutation, addProductToUserCartStatus] =
    useAddProductToUserCartMutation();

  const [removeProductFromUserCartMutation, removeProductFromUserCartStatus] =
    useRemoveProductFromUserCartMutation();

  const [
    updateProductInUserCartMutation,
    updateProductInUserCartMutationStatus
  ] = useUpdateUserCartProductMutation();

  const addProductToUserCart = async (input: AddProductToUserCartInput) => {
    return addProductToUserCartMutation({
      variables: {
        input: input
      },
      refetchQueries: ['Cart']
      // update: (cache, { data: addData }) => {
      //   cache.modify({
      //     id: cache.identify({ __typename: 'User', id: userId }),
      //     fields: {
      //       cart(existingCartRef) {
      //         console.log('add', addData?.addProductToUserCart);

      //         const newCartRef = cache.writeFragment({
      //           data: addData?.addProductToUserCart,
      //           fragment: CartFragmentFragmentDoc
      //         });

      //         console.log('newCartRef', newCartRef);

      //         return {
      //           ...existingCartRef,
      //           items: [...existingCartRef.items, addData?.addProductToUserCart]
      //         };
      //       }
      //     }
      //   });
      // }
    });
  };

  const removeProductFromUserCart = async (cartId: string) => {
    return removeProductFromUserCartMutation({
      variables: {
        cartId: cartId
      },
      refetchQueries: ['Cart']
      // update: (cache, { data: removeData }) => {
      //   cache.modify({
      //     id: cache.identify({ __typename: 'User', id: userId }),
      //     fields: {
      //       cart(existingCartRef, { readField }) {
      //         return {
      //           ...existingCartRef,
      //           items: existingCartRef.items.filter((ref: Reference) => {
      //             return (
      //               readField('id', ref) !==
      //               removeData?.removeProductFromUserCart.id
      //             );
      //           })
      //         };
      //       }
      //     }
      //   });
      // }
    });
  };

  const updateProductInUserCart = async (input: UpdateUserCartProductInput) => {
    return updateProductInUserCartMutation({
      variables: {
        input: input
      },
      refetchQueries: ['Cart'],
      awaitRefetchQueries: true
      // TODO: Update cache
    });
  };

  const moveToWishlist = async ({
    cartId,
    productId
  }: {
    cartId: string;
    productId: string;
  }) => {
    return moveToWishlistMutation({
      variables: {
        productId: productId,
        cartId: cartId
      },
      refetchQueries: ['Cart', 'Wishlist']
      // update: (cache, { data: updateData }) => {
      //   cache.modify({
      //     id: cache.identify({ __typename: 'User', id: userId }),
      //     fields: {
      //       cart(existingCartRef, { readField }) {
      //         return {
      //           ...existingCartRef,
      //           items: existingCartRef.items.filter((ref: Reference) => {
      //             return (
      //               readField('id', ref) !==
      //               updateData?.removeProductFromUserCart.id
      //             );
      //           })
      //         };
      //       },
      //       wishlist(prevRef) {
      //         // Might need to change when colour is introduced
      //         return [...prevRef, updateData?.addProductToUserWishlist];
      //       }
      //     }
      //   });
      // }
    });
  };

  return {
    bagItems,
    refetch,
    loading,
    loadingMutation:
      addProductToUserCartStatus.loading ||
      removeProductFromUserCartStatus.loading ||
      updateProductInUserCartMutationStatus.loading ||
      moveToWishlistMutationStatus.loading,
    mutations: {
      addProductToUserCart,
      removeProductFromUserCart,
      updateProductInUserCart,
      moveToWishlist
    }
  };
};
