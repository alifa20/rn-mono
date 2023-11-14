import { CommonTypeType, PrismaClient } from '@prisma/client';
import { Filter, ProductsInputFilter } from '../../__generated__/graphql';
import { getFilter } from './getFilters';

type Props = {
  filters?: ProductsInputFilter | null;
  initialFilters?: ProductsInputFilter | null;
  commonType?: CommonTypeType | null;
};

const prisma = new PrismaClient();

export const getProductTypesFilters = async ({
  filters,
  initialFilters,
  commonType
}: Props): Promise<Filter> => {
  const grouped = await prisma.product.groupBy({
    by: ['productTypeId'],
    _count: {
      categoryId: true
    },
    where: {
      ...getFilter({ commonType, filters: initialFilters })
    }
  });

  const productTypes = await prisma.productType.findMany({
    where: {
      id: {
        in: grouped
          .filter((group) => group.productTypeId !== null)
          .map((group) => group.productTypeId) as string[]
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
              brandId: {
                in: filters?.brandIds?.length ? filters?.brandIds : undefined
              },
              subCategoryId: {
                in: filters?.subCategoryIds?.length
                  ? filters?.subCategoryIds
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
    id: 'productType',
    name: 'ProductType',
    filterValues: productTypes.map((productType) => ({
      id: productType.id,
      name: productType.name,
      count: productType._count.products
    }))
  };
};
