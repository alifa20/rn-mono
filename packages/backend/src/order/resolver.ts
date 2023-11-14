import { Resolvers } from '../__generated__/graphql';
import { throwUnAuthenticate } from '../utils/error';

export const orderResolvers: Resolvers = {
  Query: {
    order: async (parent, args, context) => {
      if (!context.userId) {
        return throwUnAuthenticate('You need to be logged in to view order');
      }

      const order = await context.prisma.order.findUnique({
        where: {
          id: args.id
        }
      });

      return {
        ...order,
        discount: {
          id: '1',
          code: '10OFF',
          amount: 10
        }
      };
    },
    orders: async (parent, args, context) => {
      if (!context.userId) {
        return throwUnAuthenticate('You need to be logged in to view orders');
      }

      const orders = await context.prisma.order.findMany({
        where: {
          userId: context.userId
        }
      });

      return orders.map((order) => ({
        ...order,
        discount: {
          id: '1',
          code: '10OFF',
          amount: 10
        }
      }));
    }
  },
  Order: {
    items: async (parent, args, context) => {
      const order = await context.prisma.order.findUnique({
        where: {
          id: parent.id
        },
        include: {
          items: true
        }
      });

      return order?.items || [];
    }
  },
  Item: {
    product: async (parent, args, context) => {
      const productData = await context.prisma.productsInOrder.findUnique({
        where: {
          id: parent.id
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
      if (!productData) {
        throw Error('Product not found');
      }
      return productData.product;
    }
  },

  Mutation: {
    createOrder: async (parent, args, context) => {
      const { input } = args;

      if (!context.userId) {
        return throwUnAuthenticate('You need to be logged in to create order');
      }

      // get prices from products
      const products = await context.prisma.product.findMany({
        where: {
          id: {
            in: input.items.map((item) => item.productId)
          }
        }
      });

      const total = products.reduce((acc, product) => {
        acc += product.price;
        return acc;
      }, 0);

      // TODO: promo code and deduct from the total

      const order = await context.prisma.order.create({
        data: {
          userId: context.userId,
          items: {
            create: input.items.map((item) => {
              const productDetail = products.find(
                (product) => product.id === item.productId
              );

              if (!productDetail?.price) {
                throw Error('Product price not found');
              }

              return {
                productId: item.productId,
                size: item.size,
                quantity: item.quantity,
                price: productDetail.price
              };
            })
          },
          addressId: args.input.addressId,
          paymentType: args.input.paymentType,
          status: 'REVIEW',
          total
        }
      });

      return {
        ...order,
        // FIXME: this is a temporary fix
        discount: {
          id: '1',
          code: '10OFF',
          amount: 10
        }
      };
    }
  }
};
