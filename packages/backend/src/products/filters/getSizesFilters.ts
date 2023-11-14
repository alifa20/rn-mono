import { CommonTypeType, PrismaClient } from '@prisma/client';
import { Filter, ProductsInputFilter } from '../../__generated__/graphql';
import { getFilter } from './getFilters';

type Props = {
  filters?: ProductsInputFilter | null;
  initialFilters?: ProductsInputFilter | null;
  commonType?: CommonTypeType | null;
};

const prisma = new PrismaClient();

export const getSizesFilters = async ({
  // filters,
  initialFilters,
  commonType
}: Props): Promise<Filter> => {
  // TODO: add more sophisticated logic for nested groupBY: https://github.com/prisma/prisma/issues/6653
  const allProducts = await prisma.product.findMany({
    where: {
      ...getFilter({ commonType, filters: initialFilters })
    },
    select: {
      subProducts: {
        where: {
          colour: {
            parentId: {
              equals: null
            }
          }
        },
        distinct: ['size', 'productId'],
        select: {
          size: true
        }
      },
      _count: true
    }
  });

  const allSizes = allProducts.reduce<
    {
      id: string;
      name: string;
      count: number;
    }[]
  >((acc, product) => {
    product.subProducts.forEach((subProduct) => {
      const { size } = subProduct;
      const existingIndex = acc.findIndex((item) => item.id === size);

      if (existingIndex !== -1) {
        acc[existingIndex].count += 1;
      } else {
        acc.push({ id: size, name: size, count: 1 });
      }
    });

    return acc;
  }, []);

  return {
    id: 'size',
    name: 'Size',
    filterValues: allSizes
  };
};
