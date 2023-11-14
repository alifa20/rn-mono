import { CommonTypeType } from '@prisma/client';
import { ProductsInputFilter } from '../../__generated__/graphql';

type Props = {
  filters?: ProductsInputFilter | null;
  commonType?: CommonTypeType | null;
};

export const getFilter = ({ commonType, filters }: Props) => {
  // TODO: Add price range
  // TODO: Add tags
  // TODO: Add sales only

  return {
    ...(commonType && {
      commonTypes: {
        some: {
          name: {
            in: commonType
          }
        }
      }
    }),
    ...(filters?.name && {
      title: {
        search: filters?.name
      },
      description: {
        search: filters?.name
      }
    }),
    categoryId: {
      in: filters?.categoryIds?.length ? filters?.categoryIds : undefined
    },
    subCategoryId: {
      in: filters?.subCategoryIds?.length ? filters?.subCategoryIds : undefined
    },
    brandId: {
      in: filters?.brandIds?.length ? filters?.brandIds : undefined
    },
    productTypeId: {
      in: filters?.productTypeIds?.length ? filters?.productTypeIds : undefined
    },
    subProducts: {
      some: {
        colourId: {
          in: filters?.colourIds?.length ? filters?.colourIds : undefined
        },
        size: {
          in: filters?.size ? filters?.size : undefined
        },
        // we will have to rethink about whether we are showing the products although it's sold out
        quantity: {
          gt: 0
        }
      }
    }
    // TODO: Price range, Tags
  };
};

type CombinedFilterProps = {
  filters?: ProductsInputFilter | null;
  initialFilters?: ProductsInputFilter | null;
  commonType?: CommonTypeType | null;
};

export const getCombinedFilter = ({
  commonType,
  initialFilters,
  filters
}: CombinedFilterProps) => {
  const categoryIds = [
    ...(initialFilters?.categoryIds || []),
    ...(filters?.categoryIds || [])
  ];

  const subCategoryIds = [
    ...(initialFilters?.subCategoryIds || []),
    ...(filters?.subCategoryIds || [])
  ];

  const productTypeIds = [
    ...(initialFilters?.productTypeIds || []),
    ...(filters?.productTypeIds || [])
  ];

  const brandIds = [
    ...(initialFilters?.brandIds || []),
    ...(filters?.brandIds || [])
  ];

  const colourIds = [
    ...(initialFilters?.colourIds || []),
    ...(filters?.colourIds || [])
  ];

  const size = [...(initialFilters?.size || []), ...(filters?.size || [])];

  return {
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
      in: categoryIds.length ? categoryIds : undefined
    },
    subCategoryId: {
      in: subCategoryIds.length ? subCategoryIds : undefined
    },
    brandId: {
      in: brandIds.length ? brandIds : undefined
    },
    productTypeId: {
      in: productTypeIds.length ? productTypeIds : undefined
    },
    subProducts: {
      some: {
        colourId: {
          in: colourIds?.length ? colourIds : undefined
        },
        size: {
          in: size.length ? size : undefined
        },
        // we will have to rethink about whether we are showing the products although it's sold out
        quantity: {
          gt: 0
        }
      }
    }
    // TODO: Price range, Tags
  };
};
