import { CommonTypeType, PrismaClient } from '@prisma/client';
import { Filter, ProductsInputFilter } from '../../__generated__/graphql';

const prisma = new PrismaClient();

type Props = {
  filters?: ProductsInputFilter | null;
  initialFilters?: ProductsInputFilter | null;
  commonType?: CommonTypeType | null;
};

// TODO: make it more sophisticated
export const getPriceRangeFilters = async (
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  props: Props
): // commonType
// Props
Promise<Filter> => {
  const maxPrice = await prisma.product.findFirst({
    orderBy: {
      price: 'desc'
    },
    select: {
      price: true
    }
  });

  const minPrice = await prisma.product.findFirst({
    orderBy: {
      price: 'asc'
    },
    select: {
      price: true
    }
  });

  return {
    id: 'priceRange',
    name: 'Price Range',
    filterValues: [
      {
        id: 'min',
        name: minPrice?.price.toString() || '',
        count: 1
      },
      {
        id: 'max',
        name: maxPrice?.price.toString() || '',
        count: 1
      }
    ]
  };
};
