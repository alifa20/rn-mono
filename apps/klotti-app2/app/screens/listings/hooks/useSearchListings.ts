import {
  ProductsInputFilter,
  useSearchListingsQuery
} from '@app/__graphql__/generated';
import { useFormContext } from 'react-hook-form';
import { NetworkStatus } from '@apollo/client';
import { FilterFormData } from '@app/screens/filter/forms/types';
import { useCommonType } from '@app/store/commonType/useCommonType';
import { useCustomCommonTypeStore } from './useSearchCommonType';

export const useSearchListings = (initialFilters?: ProductsInputFilter) => {
  const { customCommonType } = useCustomCommonTypeStore();
  const { commonType } = useCommonType();

  const filterForm = useFormContext<FilterFormData>();
  const filterFormValue = filterForm.getValues();
  const priceRange = filterForm.getValues('priceRange')?.split('-');

  const { data, refetch, networkStatus, fetchMore, client, error } =
    useSearchListingsQuery({
      variables: {
        initialFilters: initialFilters,
        filters: {
          name: filterFormValue.name,
          categoryIds: filterFormValue.categories,
          subCategoryIds: filterFormValue.subCategories,
          productTypeIds: filterFormValue.productTypes,
          brandIds: filterFormValue.brands,
          colourIds:
            filterFormValue.colours
              ?.filter(colour => colour.type === 'colour')
              .map(colour => colour.id) || [],
          // tag: route.params?.tag,
          ...(filterFormValue.priceRange &&
            priceRange && {
              priceRange: {
                min: parseFloat(priceRange[0]),
                max: parseFloat(priceRange[1])
              }
            })
        },
        pagination: {
          offset: 0,
          limit: 10
        },
        sortBy: filterFormValue.sortBy,
        commonType: customCommonType || commonType
      },
      notifyOnNetworkStatusChange: true
    });

  const loading =
    networkStatus === NetworkStatus.setVariables ||
    networkStatus === NetworkStatus.loading ||
    networkStatus === NetworkStatus.refetch;

  const loadingFetchMore = networkStatus === NetworkStatus.fetchMore;

  return {
    data,
    client,
    refetch,
    status: {
      loading,
      loadingFetchMore,
      networkStatus
    },
    error,
    fetchMore
  };
};
