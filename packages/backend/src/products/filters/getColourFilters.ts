import { CommonTypeType, PrismaClient } from '@prisma/client';
import { Filter, ProductsInputFilter } from '../../__generated__/graphql';
import { getFilter } from './getFilters';

type Props = {
  filters?: ProductsInputFilter | null;
  initialFilters?: ProductsInputFilter | null;
  commonType?: CommonTypeType | null;
};

const prisma = new PrismaClient();

export const getColoursFilters = async ({
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
        distinct: ['colourId', 'productId'],
        select: {
          colour: true
        }
      }
    }
  });

  const allColours = allProducts.reduce<
    {
      id: string;
      name: string;
      parentId: string | null;
      _count: number;
    }[]
  >((acc, product) => {
    product.subProducts.forEach((subProduct) => {
      const { id, name, parentId } = subProduct.colour;
      const existingIndex = acc.findIndex((item) => item.id === id);

      if (existingIndex !== -1) {
        acc[existingIndex]._count += 1;
      } else {
        acc.push({ id, name, parentId, _count: 1 });
      }
    });

    return acc;
  }, []);

  return {
    id: 'colour',
    name: 'Colour',
    filterValues: allColours.map((colour) => ({
      id: colour.id,
      name: colour.name,
      count: colour._count
    }))
  };
};
