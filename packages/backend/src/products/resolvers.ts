import { Resolvers, SortBy } from '../__generated__/graphql';
import { getProductImagesUrls } from './helpers';
import { getBrandFilters } from './filters/getBrandsFilters';
import { getCategoriesFilters } from './filters/getCategoriesFilters';
import { getColoursFilters } from './filters/getColourFilters';
import { getPriceRangeFilters } from './filters/getPriceRangeFilters';
import { getProductTypesFilters } from './filters/getProductTypesFilters';
import { getSizesFilters } from './filters/getSizesFilters';
import { getSubCategoriesFilters } from './filters/getSubCategoriesFilters';
import { getCombinedFilter } from './filters/getFilters';

const sortOptions: Record<SortBy, any> = {
  RECOMMENDATION: { createdAt: 'desc' },
  NEW_ITEMS: { createdAt: 'desc' },
  PRICE_HIGH: { price: 'desc' },
  PRICE_LOW: { price: 'asc' }
};

export const productResolvers: Resolvers = {
  Query: {
    product: async (_, args, context) => {
      return context.prisma.product.findUnique({
        where: {
          id: args.id
        },
        include: {
          subProducts: {
            include: {
              colour: true
            }
          },
          category: true,
          subCategory: true,
          productType: true,
          discount: true,
          tags: true,
          commonTypes: true,
          brand: true
        }
      });
    },
    products: async (parent, args, context) => {
      const { filters, sortBy, initialFilters, commonType } = args;

      const name = filters?.name || initialFilters?.name;

      let products = await context.prisma.product.findMany({
        ...(sortBy && {
          orderBy: { ...sortOptions[sortBy] }
        }),
        where: {
          ...getCombinedFilter({
            filters,
            initialFilters,
            commonType
          }),
          ...(name && {
            OR: [
              {
                title: {
                  search: name
                },
                description: {
                  search: name
                }
              },
              {
                brand: {
                  name: {
                    contains: name
                  }
                }
              }
            ]
          })
        },
        include: {
          brand: true,
          subProducts: {
            include: {
              colour: true
            }
          },
          category: true,
          subCategory: true,
          productType: true,
          discount: true,
          tags: true,
          commonTypes: true
        },
        take: args.pagination?.limit || undefined,
        skip: args.pagination?.offset || undefined
      });

      // FIXME: add tags????
      // Add discount products too
      if (
        filters?.priceRange &&
        filters?.priceRange?.min &&
        filters?.priceRange?.max
      ) {
        products = products.filter((product) => {
          const price = product?.discount?.amount
            ? product.price - product.price * (product.discount.amount / 100)
            : product.price;

          return (
            price >= (filters?.priceRange?.min || 0) &&
            price <= (filters?.priceRange?.max || 0)
          );
        });
      }
      return products;
    },
    filters: async (parent, args) => {
      const { filters, initialFilters, commonType } = args;

      const brandsFilters = await getBrandFilters({
        filters,
        initialFilters,
        commonType
      });

      const categoriesFilters = await getCategoriesFilters({
        filters,
        initialFilters,
        commonType
      });

      const subCategoriesFilters = await getSubCategoriesFilters({
        filters,
        initialFilters,
        commonType
      });

      const productTypesFilters = await getProductTypesFilters({
        filters,
        initialFilters,
        commonType
      });

      const sizeFilters = await getSizesFilters({
        filters,
        initialFilters,
        commonType
      });

      const priceRangeFilters = await getPriceRangeFilters({
        filters,
        initialFilters,
        commonType
      });

      const colourFilters = await getColoursFilters({
        filters,
        initialFilters,
        commonType
      });

      return [
        brandsFilters,
        categoriesFilters,
        subCategoriesFilters,
        productTypesFilters,
        sizeFilters,
        priceRangeFilters,
        colourFilters
      ];
    }
  },
  Product: {
    imagesUrls: async ({ id }) => {
      if (!id) throw Error('Product id is required');
      return getProductImagesUrls(id);
    }
  },
  Mutation: {
    createProduct: async (parent, args, context) => {
      const response = await context.prisma.product.create({
        data: {
          brandId: args.input.brandId,
          categoryId: args.input.categoryId,
          subCategoryId: args.input.subCategoryId,
          productTypeId: args.input.productTypeId,
          description: args.input.description,
          price: args.input.price,
          title: args.input.title,
          commonTypes: {
            connect:
              args.input.commonTypes.map((commonType) => ({
                name: commonType
              })) || []
          },
          subProducts: {
            create: args.input.subProducts.map((i) => ({
              quantity: i.quantity,
              size: i.size,
              colourId: i.colourId
            }))
          }
        },
        include: {
          brand: true,
          subProducts: {
            include: {
              colour: true
            }
          },
          category: true,
          subCategory: true,
          productType: true,
          discount: true,
          tags: true,
          commonTypes: true
        }
      });

      return {
        ...response,
        imagesUrls: ['TBD']
      };
    },
    createProducts: async (parent, args, context) => {
      const products = await Promise.all(
        args.input.products.map(async (product) => {
          const response = await context.prisma.product.create({
            data: {
              brandId: product.brandId,
              categoryId: product.categoryId,
              subCategoryId: product.subCategoryId,
              productTypeId: product.productTypeId,
              description: product.description,
              price: product.price,
              title: product.title,
              commonTypes: {
                connect:
                  product.commonTypes.map((commonType) => ({
                    name: commonType
                  })) || []
              },
              subProducts: {
                create: product.subProducts.map((i) => ({
                  quantity: i.quantity,
                  size: i.size,
                  colourId: i.colourId
                }))
              }
            },
            include: {
              brand: true,
              subProducts: {
                include: {
                  colour: true
                }
              },
              category: true,
              subCategory: true,
              productType: true,
              discount: true,
              tags: true,
              commonTypes: true
            }
          });

          return {
            ...response,
            imagesUrls: ['TBD']
          };
        })
      );

      return products;
    },
    updateProduct: async (parent, args, context) => {
      const updateProduct = await context.prisma.product.update({
        where: {
          id: args.input.id
        },
        data: {
          brandId: args.input.brandId,
          categoryId: args.input.categoryId,
          productTypeId: args.input.productTypeId,
          description: args.input.description,
          price: args.input.price,
          title: args.input.title,
          subProducts: {},
          commonTypes: {
            connect:
              args.input.commonTypes.map((commonType) => ({
                name: commonType
              })) || []
          }
        },
        include: {
          brand: true,
          subProducts: {
            include: {
              colour: true
            }
          },
          category: true,
          subCategory: true,
          productType: true,
          discount: true,
          tags: true,
          commonTypes: true
        }
      });

      // const updateSubProducts = await context.prisma.subProduct.update({
      //   where: {
      //     id: args.input.subProducts[0].id
      //   },
      //   data: {
      //     quantity: args.input.subProducts[0].quantity,
      //     size: args.input.subProducts[0].size
      //   }
      // });

      return {
        ...updateProduct,
        imagesUrls: ['TBD']
      };
    },
    deleteProduct: async (_, args, context) => {
      await context.prisma.product.delete({
        where: {
          id: args.input.id
        }
      });

      await context.prisma.subProduct.deleteMany({
        where: {
          productId: args.input.id
        }
      });

      return {
        id: args.input.id,
        message: `Product has been delete ${args.input.id}`
      };
    }
  }
};
