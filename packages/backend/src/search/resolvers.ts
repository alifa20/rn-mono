import { Resolvers, SearchType } from '../__generated__/graphql';

export const searchResolvers: Resolvers = {
  Query: {
    search: async (parent, args, context) => {
      let { name } = args.input;
      let commonFilter = {};

      if (args.input.name === 'tshirt' || args.input.name === 't shirt') {
        name = 't-shirt';
      }

      if (args.input.commonTypes.length) {
        commonFilter = {
          products: {
            some: {
              commonTypes: {
                some: {
                  name: {
                    in: args.input.commonTypes
                  }
                }
              }
            }
          }
        };
      }

      const subCategories = await context.prisma.subCategory.findMany({
        where: {
          ...commonFilter,
          name: {
            contains: name
          }
        }
      });

      const brands = await context.prisma.brand.findMany({
        where: {
          ...commonFilter,
          name: {
            contains: name
          }
        }
      });

      const productTypes = await context.prisma.productType.findMany({
        where: {
          ...commonFilter,
          name: {
            contains: name
          }
        }
      });

      // TODO: Search by brand product????

      return [
        ...subCategories.map((item) => ({
          type: 'SUB_CATEGORY' as SearchType,
          id: item.id,
          name: item.name
        })),
        ...brands.map((item) => ({
          type: 'BRAND' as SearchType,
          id: item.id,
          name: item.name
        })),
        ...productTypes.map((item) => ({
          type: 'PRODUCT_TYPE' as SearchType,
          id: item.id,
          name: item.name
        }))
      ];
    }
  }
  // Mutation: {}
};
