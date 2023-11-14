import { useLocalSearchParams, useRouter } from 'expo-router';
import { CommonTypeType } from '../__graphql__/generated';

export const useFilterRouter = () => {
  const localSearch = useLocalSearchParams();
  const router = useRouter();

  const categoryId = localSearch.categoryId as string;
  const subCategoryId = localSearch.subCategoryId as string;
  const productTypeId = localSearch.productTypeId as string;
  const brandId = localSearch.brandId as string;
  const commonType = localSearch.commonType as CommonTypeType;
  const isSale = localSearch.isSale === 'true';
  const search = localSearch.search as string;

  const push = () => {
    const commonTypeInner =
      commonType || (localSearch.commonType as CommonTypeType);

    const params = new URLSearchParams({
      categoryId: categoryId || 'all',
      subCategoryId: subCategoryId || 'all',
      productTypeId: productTypeId || 'all',
      ...(commonTypeInner && { commonType: commonTypeInner }),
      ...(isSale && { isSale: 'true' }),
      ...(search && { search: search })
    });

    // @ts-ignore
    router.push(`products/filters?${params.toString()}`);
  };

  return {
    categoryId,
    subCategoryId,
    productTypeId,
    brandId,
    commonType,
    isSale,
    search,
    push
  };
};
