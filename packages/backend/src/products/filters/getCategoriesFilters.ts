import { CommonTypeType, PrismaClient } from '@prisma/client';
import { Filter, ProductsInputFilter } from '../../__generated__/graphql';
import { getFilter } from './getFilters';

type Props = {
  filters?: ProductsInputFilter | null;
  initialFilters?: ProductsInputFilter | null;
  commonType?: CommonTypeType | null;
};

const prisma = new PrismaClient();

export const getCategoriesFilters = async ({
  filters,
  initialFilters,
  commonType
}: Props): Promise<Filter> => {
  const grouped = await prisma.product.groupBy({
    by: ['categoryId'],
    _count: {
      categoryId: true
    },
    where: {
      ...getFilter({ commonType, filters: initialFilters })
    }
  });

  const categories = await prisma.category.findMany({
    where: {
      id: {
        in: grouped.map((group) => group.categoryId)
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
              brandId: {
                in: filters?.brandIds?.length ? filters?.brandIds : undefined
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
    id: 'category',
    name: 'Category',
    filterValues: categories.map((category) => ({
      id: category.id,
      name: category.name,
      count: category._count.products
    }))
  };
};
