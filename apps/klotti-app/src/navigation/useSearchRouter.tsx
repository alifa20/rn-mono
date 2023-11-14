import { useLocalSearchParams, useRouter, useSegments } from 'expo-router';
import { CommonTypeType } from '../__graphql__/generated';

export const useSearchRouter = () => {
  const localSearch = useLocalSearchParams();
  const segments = useSegments();
  const router = useRouter();

  const push = ({
    path,
    title,
    categoryId,
    subCategoryId,
    productTypeId,
    brandId,
    commonType,
    sale,
    search
  }: {
    path: 'products' | 'sub-category' | '[search]' | 'product-type';
    title: string;
    categoryId?: string;
    subCategoryId?: string;
    productTypeId?: string;
    commonType?: CommonTypeType;
    brandId?: string;
    sale?: boolean;
    search?: string;
  }) => {
    const commonTypeInner =
      commonType || (localSearch.commonType as CommonTypeType);

    const searchParams = new URLSearchParams({
      title: title,
      categoryId: categoryId || 'all',
      subCategoryId: subCategoryId || 'all',
      productTypeId: productTypeId || 'all',
      brandId: brandId || 'all',
      ...(commonTypeInner && { commonType: commonTypeInner }),
      ...(sale && { isSale: 'true' }),
      ...(search && { search: search })
    });

    if (path === '[search]') {
      // @ts-ignore
      router.push(`search/[search]`);
    }

    if (path === 'products') {
      return router.push(
        // @ts-ignore
        `${segments[0]}/${path}?${searchParams.toString()}`
      );
    }

    if (path === 'sub-category') {
      return router.push(`/search/${path}?${searchParams.toString()}`);
    }

    if (path === 'product-type') {
      return router.push(`/search/${path}?${searchParams.toString()}`);
    }
  };

  return {
    push
  };
};
