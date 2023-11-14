import { useUserAddressQuery } from '@app/__graphql__/generated';
import { useMemo } from 'react';

export const useUserAddress = (addressId?: string) => {
  const { data, loading, error } = useUserAddressQuery();

  const addresses = useMemo(
    () => data?.user?.addresses,
    [data?.user?.addresses]
  );

  const address = useMemo(
    () =>
      data?.user?.addresses?.find(userAddress => userAddress?.id === addressId),
    [addressId, data?.user?.addresses]
  );

  return {
    address,
    addresses,
    loading,
    error
  };
};
