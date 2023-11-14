import { useMemo } from 'react';
import { useProductQuery } from '../__graphql__/generated';

export const useProduct = (id: string) => {
  const { data, loading, error } = useProductQuery({
    variables: {
      productId: id
    }
  });

  const sizes = useMemo(
    () => [
      ...new Set(data?.product?.subProducts.map(subProduct => subProduct.size))
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

  const colors = useMemo(
    () => [
      ...new Set(
        data?.product?.subProducts.map(subProduct => subProduct.colour)
      )
    ],
    [data?.product?.subProducts]
  );

  return {
    data,
    loading,
    error,
    sizeOptions,
    colors
  };
};
