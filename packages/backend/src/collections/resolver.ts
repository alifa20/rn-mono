import { Resolvers } from '../__generated__/graphql';

export const collectionResolvers: Resolvers = {
  Query: {
    collection: async (parent, args, context) => {
      const response = await context.prisma.collection.findUnique({
        where: {
          id: args.id
        }
      });

      return response;
    },
    collections: async (parent, args, context) => {
      // TODO: add additional logic of how we should be displaying the collection
      const response = await context.prisma.collection.findMany();
      return response;
    }
  },
  Collection: {
    products: async (parent, args, context) => {
      const productsInCollection =
        await context.prisma.productsInCollection.findMany({
          where: {
            collectionId: parent.id
          },
          include: {
            product: {
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
            }
          }
        });

      return productsInCollection.map(
        (productInCollection) => productInCollection.product
      );
    }
  },
  Mutation: {
    createCollection: async (_, args, context) => {
      const response = await context.prisma.collection.create({
        data: {
          title: args.input.title,
          description: args.input.description,
          imageUrl: args.input.imageUrl,
          productsInCollection: {
            createMany: {
              data:
                args.input.productIds?.map((productId) => ({
                  productId
                })) || []
            }
          }
        }
      });

      return response;
    },
    updateCollection: async (parent, args, context) => {
      const response = await context.prisma.collection.update({
        where: {
          id: args.input.id
        },
        data: {
          title: args.input.title,
          description: args.input.description,
          imageUrl: 'TBD'
        }
      });

      const deleteProductsInCollection =
        context.prisma.productsInCollection.deleteMany({
          where: {
            collectionId: args.input.id
          }
        });

      const createProductsInCollection =
        context.prisma.productsInCollection.createMany({
          data:
            args.input.productIds?.map((productId) => ({
              productId,
              collectionId: args.input.id
            })) || []
        });

      await context.prisma.$transaction([
        deleteProductsInCollection,
        createProductsInCollection
      ]);

      return response;
    },
    deleteCollection: async (_, args, context) => {
      await context.prisma.collection.delete({
        where: {
          id: args.input.id
        }
      });

      return {
        id: args.input.id,
        message: `Collection has been delete ${args.input.id}`
      };
    }
  }
};
