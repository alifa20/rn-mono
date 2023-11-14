import { CommonTypeType, PrismaClient } from '@prisma/client';
import { Filter, ProductsInputFilter } from '../../__generated__/graphql';
import { getFilter } from './getFilters';

type Props = {
  filters?: ProductsInputFilter | null;
  initialFilters?: ProductsInputFilter | null;
  commonType?: CommonTypeType | null;
};

const prisma = new PrismaClient();

export const getSubCategoriesFilters = async ({
  filters,
  initialFilters,
  commonType
}: Props): Promise<Filter> => {
  const grouped = await prisma.product.groupBy({
    by: ['subCategoryId'],
    _count: {
      subCategoryId: true
    },
    where: {
      ...getFilter({ commonType, filters: initialFilters })
    }
  });

  const subCategories = await prisma.subCategory.findMany({
    where: {
      id: {
        in: grouped.map((group) => group.subCategoryId)
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
              productTypeId: {
                in: filters?.productTypeIds?.length
                  ? filters?.productTypeIds
                  : undefined
              },
              brandId: {
                in: filters?.brandIds?.length ? filters?.brandIds : undefined
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
              // TODO: Price range, Tags
            }
          }
        }
      }
    }
  });

  return {
    id: 'subCategory',
    name: 'SubCategory',
    filterValues: subCategories.map((subCategory) => ({
      id: subCategory.id,
      name: subCategory.name,
      count: subCategory._count.products
    }))
  };
};
