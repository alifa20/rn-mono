import {
  ProductsInputFilter,
  useProductsQuery
} from '../__graphql__/generated';
import { useCommonType } from '../store/commonType/useCommonType';
import { useFormContext } from 'react-hook-form';
import { FilterFormData } from './filters/type';
import { NetworkStatus } from '@apollo/client';
import { useFilterRouter } from '../navigation/useFilterRouter';

export const useProducts = () => {
  const { commonType } = useCommonType();
  const filterRouter = useFilterRouter();

  const initFilters: ProductsInputFilter = {
    isDiscountProductsOnly: !!filterRouter.isSale,
    ...(filterRouter.search && {
      name: filterRouter.search
    }),
    ...(filterRouter.categoryId && {
      categoryIds:
        filterRouter.categoryId === 'all'
          ? undefined
          : [filterRouter.categoryId]
    }),
    ...(filterRouter.productTypeId && {
      productTypeIds:
        filterRouter.productTypeId === 'all'
          ? undefined
          : [filterRouter.productTypeId]
    }),
    ...(filterRouter.subCategoryId && {
      subCategoryIds:
        filterRouter.subCategoryId === 'all'
          ? undefined
          : [filterRouter.subCategoryId]
    }),
    ...(filterRouter.brandId && {
      brandIds:
        filterRouter.brandId === 'all' ? undefined : [filterRouter.brandId]
    })
  };

  const filterForm = useFormContext<FilterFormData>();
  const filterFormValue = filterForm.getValues();
  const priceRange = filterForm.getValues('priceRange')?.split('-');

  const { data, refetch, networkStatus, fetchMore, client, error } =
    useProductsQuery({
      variables: {
        initialFilters: initFilters,
        filters: {
          name: filterFormValue.name,
          categoryIds: filterFormValue.categories,
          subCategoryIds: filterFormValue.subCategories,
          productTypeIds: filterFormValue.productTypes,
          brandIds: filterFormValue.brands,
          colourIds:
            filterFormValue.colors
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
        commonType: commonType // TODO: add ability to grab commonType from router
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
