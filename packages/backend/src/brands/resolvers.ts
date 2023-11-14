import { Resolvers } from '../__generated__/graphql';

export const brandResolvers: Resolvers = {
  Query: {
    brand: async (_, args, context) => {
      return context.prisma.brand.findUnique({
        where: {
          id: args.id
        }
      });
    },
    brands: async (_, __, context) => {
      return context.prisma.brand.findMany();
    }
  },
  Mutation: {
    createBrand: async (_, args, context) => {
      const response = await context.prisma.brand.create({
        data: {
          name: args.input.name
        }
      });

      return {
        id: response.id,
        message: `Brand has been created ${response.id}`
      };
    },
    deleteBrand: async (_, args, context) => {
      await context.prisma.brand.delete({
        where: {
          id: args.input.id
        }
      });

      return {
        id: args.input.id,
        message: `Brand has been delete ${args.input.id}`
      };
    }
  }
};
