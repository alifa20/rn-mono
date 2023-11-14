import { CommonTypeType, PrismaClient } from '@prisma/client';
import { Filter, ProductsInputFilter } from '../../__generated__/graphql';
import { getFilter } from './getFilters';

type Props = {
  filters?: ProductsInputFilter | null;
  initialFilters?: ProductsInputFilter | null;
  commonType?: CommonTypeType | null;
};

const prisma = new PrismaClient();

export const getBrandFilters = async ({
  filters,
  initialFilters,
  commonType
}: Props): Promise<Filter> => {
  const grouped = await prisma.product.groupBy({
    by: ['brandId'],
    where: {
      ...getFilter({ commonType, filters: initialFilters })
    }
  });

  const brands = await prisma.brand.findMany({
    where: {
      id: {
        in: grouped.map((group) => group.brandId)
      }
    },
    select: {
      id: true,
      name: true,
      _count: {
        select: {
          products: {
            where: {
              ...(commonType && {
                commonTypes: {
                  some: {
                    name: {
                      in: commonType
                    }
                  }
                }
              }),
              categoryId: {
                in: filters?.categoryIds?.length
                  ? filters?.categoryIds
                  : undefined
              },
              subCategoryId: {
                in: filters?.subCategoryIds?.length
                  ? filters?.subCategoryIds
                  : undefined
              },
              productTypeId: {
                in: filters?.productTypeIds?.length
                  ? filters?.productTypeIds
                  : undefined
              },
              subProducts: {
                some: {
                  colourId: {
                    in: filters?.colourIds?.length
                      ? filters?.colourIds
                      : undefined
                  },
                  size: {
                    in: filters?.size?.length ? filters?.size : undefined
                  },
                  quantity: {
                    gt: 0
                  }
                }
              }
              // TODO: Price range, Tags
            }
          }
        }
      }
    }
  });

  return {
    id: 'brand',
    name: 'Brand',
    filterValues: brands.map((brand) => ({
      id: brand.id,
      name: brand.name,
      count: brand._count.products
    }))
  };
};
