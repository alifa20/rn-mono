import { z } from 'zod';
import short from 'short-uuid';
import { auth } from '../utils/database';
import { Gender, Resolvers } from '../__generated__/graphql';
import { throwForbidden, throwUnAuthenticate } from '../utils/error';
import {
  FREE_SHIPPING_THRESHOLD,
  TAX_RATE,
  SHIPPING_FEE,
  LoginMethods
} from '../constants/types';

// const setDefaultPaymentMethod = async (paymentMethodId: string) => {
//   return context.prisma.user.update({
//     where: {
//       id: context.userId
//     },
//     data: {
//       preferredPayment: {
//         connect: {
//           id: paymentMethodId
//         }
//       }
//     }
//   });
// };

// This is the pattern we prolly should be following https://the-guild.dev/graphql/codegen/plugins/typescript/typescript-resolvers#use-your-model-types-mappers
// REF: https://firebase.google.com/docs/firestore/quickstart
export const userResolvers: Resolvers = {
  Query: {
    user: async (parent, args, context) => {
      if (!context.userId) {
        throw Error('You need to be logged in to user detail');
      }

      return context.prisma.user.findUnique({
        where: {
          id: context.userId
        },
        include: {
          addresses: true
        }
      });
    },
    users: async (parent, args, context) => {
      return context.prisma.user.findMany();
    }
  },
  User: {
    wishlist: async (parent, args, context) => {
      if (!context.userId) {
        return throwUnAuthenticate(
          'You need to be logged in to access to wishlist'
        );
      }

      return context.prisma.userWishlistProduct.findMany({
        where: {
          userId: context.userId
        }
      });
    },
    cart: async (parent, args, context) => {
      if (!context.userId) {
        return throwUnAuthenticate(
          'You need to be logged in to access to cart'
        );
      }

      const cartItems = await context.prisma.userCartProduct.findMany({
        where: {
          userId: context.userId
        },
        include: {
          product: {
            select: {
              price: true
            }
          }
        }
      });

      // Calculate the subtotal from the prices and quantities of the cart items
      const subTotalIncludingTax = cartItems.reduce((acc, item) => {
        return acc + item.product.price * item.quantity;
      }, 0);

      // Subtract the tax from the subtotal to get the original price
      const subTotal = subTotalIncludingTax / (1 + TAX_RATE);

      // Determine if the shipping fee applies
      const shippingFee = subTotal > FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_FEE;

      // Calculate the tax from the subtotal
      const tax = subTotal * TAX_RATE;

      // Calculate the total as the sum of the subtotal, tax, and shipping fee
      const total = subTotal + tax + shippingFee;

      return {
        items: cartItems.map((item) => ({
          id: item.id,
          createdAt: item.createdAt,
          updatedAt: item.updatedAt,
          quantity: item.quantity,
          size: item.size
        })),
        subTotal,
        taxAmount: tax,
        taxRate: {
          rate: TAX_RATE,
          rateLabel: `${TAX_RATE * 100}%`,
          ratePercentage: TAX_RATE * 100
        },
        freeShippingThreshold: FREE_SHIPPING_THRESHOLD,
        shippingFee,
        total
      };
    }
  },
  WishlistItem: {
    product: async (parent, args, context) => {
      const productData = await context.prisma.userWishlistProduct.findUnique({
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
  CartItem: {
    product: async (parent, args, context) => {
      const productData = await context.prisma.userCartProduct.findUnique({
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
    updateUser: async (parent, args, context) => {
      if (!context.userId) {
        return throwUnAuthenticate(
          'You need to be logged in to update user detail'
        );
      }

      const response = await context.prisma.user.update({
        where: {
          id: context.userId
        },
        data: {
          ...args.input
        }
      });
      return {
        id: response.id,
        message: `User has been created ${response.id}`
      };
    },
    createUser: async (parent, args, context) => {
      const userId = short.uuid();
      const Validator = z.object({
        email: z.string().email(),
        password: z.string(),
        firstName: z.string(),
        lastName: z.string(),
        phoneNumber: z.string().optional(),
        gender: z.nativeEnum({
          MALE: 'MALE',
          FEMALE: 'FEMALE'
        })
      });

      const user = Validator.parse({
        email: args.input.email,
        firstName: args.input.firstName,
        lastName: args.input.lastName,
        gender: args.input.gender,
        password: args.input.password,
        phoneNumber: args.input.phoneNumber
      });

      await auth.createUser({
        uid: userId,
        email: user.email,
        password: user.password,
        displayName: `${user.firstName}] ${user.lastName}`
      });

      const createUser = await context.prisma.user.create({
        data: {
          id: userId,
          email: user.email,
          username: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          gender: user.gender as Gender, // TODO: fix this
          phoneNumber: user.phoneNumber,
          credentialProviders: {
            create: {
              id: userId,
              loginMethod: 'EMAIL'
            }
          }
        }
      });

      return {
        id: userId,
        email: createUser.email,
        firstName: createUser.firstName,
        lastName: createUser.lastName,
        gender: createUser.gender
      };
    },
    ssoSignOn: async (parent, args, context) => {
      const { userId, loginMethod } = args.input;
      const providerId = LoginMethods[loginMethod];

      const ssoUser = await auth.getUserByProviderUid(providerId, userId);

      if (!ssoUser) {
        return throwForbidden('User not found');
      }

      const userCredential = await context.prisma.user.findFirst({
        where: {
          email: ssoUser.email
        },
        include: {
          credentialProviders: true
        }
      });

      if (!userCredential) {
        await context.prisma.user.create({
          data: {
            id: userId,
            email: ssoUser.email,
            username: ssoUser.email,
            firstName: ssoUser.displayName,
            lastName: ssoUser.displayName,
            phoneNumber: ssoUser.phoneNumber,
            credentialProviders: {
              create: {
                loginMethod,
                id: ssoUser.uid
              }
            }
          }
        });
      }

      const isSSONotRegistered =
        userCredential &&
        !userCredential.credentialProviders.find(
          (item) => item.loginMethod === loginMethod
        );

      if (isSSONotRegistered) {
        await context.prisma.user.update({
          where: {
            id: userCredential.id
          },
          data: {
            credentialProviders: {
              create: {
                loginMethod,
                id: ssoUser.uid
              }
            }
          }
        });
      }

      return {
        id: userId
      };
    },

    addUserAddress: async (parent, args, context) => {
      if (!context.userId) {
        return throwUnAuthenticate('You need to be logged in to add address');
      }

      if (args.input.addressType === 'PRIMARY') {
        await context.prisma.address.updateMany({
          where: {
            userId: context.userId,
            addressType: 'PRIMARY'
          },
          data: {
            addressType: 'OTHER'
          }
        });
      }

      return context.prisma.address.create({
        data: {
          ...args.input,
          preferred: args.input.preferred || false,
          userId: context.userId
        }
      });
    },
    updateUserAddress: async (parent, args, context) => {
      if (!context.userId) {
        return throwUnAuthenticate(
          'You need to be logged in to update address'
        );
      }

      if (args.input.addressType === 'PRIMARY') {
        await context.prisma.address.updateMany({
          where: {
            userId: context.userId,
            addressType: 'PRIMARY'
          },
          data: {
            addressType: 'OTHER'
          }
        });
      }

      if (args.input.preferred) {
        await context.prisma.address.updateMany({
          where: {
            userId: context.userId,
            preferred: true
          },
          data: {
            preferred: false
          }
        });
      }

      return context.prisma.address.update({
        where: {
          id: args.addressId
        },
        data: {
          ...args.input,
          preferred: args.input.preferred || false,
          userId: context.userId
        }
      });
    },
    deleteUserAddress: async (parent, args, context) => {
      if (!context.userId) {
        return throwUnAuthenticate(
          'You need to be logged in to update address'
        );
      }

      const address = await context.prisma.address.delete({
        where: {
          id: args.addressId
        }
      });

      if (address.addressType === 'PRIMARY') {
        const otherAddress = await context.prisma.address.findFirst({
          where: {
            userId: context.userId,
            addressType: 'OTHER'
          }
        });

        if (otherAddress) {
          await context.prisma.address.update({
            where: {
              id: otherAddress.id
            },
            data: {
              addressType: 'PRIMARY'
            }
          });
        }
      }

      return {
        id: args.addressId,
        message: `Address has been deleted ${args.addressId}`
      };
    },
    addProductToUserWishlist: async (parent, args, context) => {
      if (!context.userId) {
        return throwUnAuthenticate(
          'You need to be logged in to add to wishlist'
        );
      }

      return context.prisma.userWishlistProduct.create({
        data: {
          productId: args.productId,
          userId: context.userId
        }
      });
    },
    removeProductFromUserWishlist: async (parent, args, context) => {
      if (!context.userId) {
        return throwUnAuthenticate(
          'You need to be logged in to remove to wishlist'
        );
      }

      const response = await context.prisma.userWishlistProduct.delete({
        where: {
          userId_productId: {
            productId: args.productId,
            userId: context.userId
          }
        }
      });

      return {
        id: response.id,
        message: `Product has been removed from wishlist ${response.id}`
      };
    },
    addProductToUserCart: async (parent, args, context) => {
      if (!context.userId) {
        return throwUnAuthenticate('You need to be logged in to add to cart');
      }

      let response;

      const productInCart = await context.prisma.userCartProduct.findFirst({
        where: {
          size: args.input.size,
          productId: args.input.productId,
          userId: context.userId
        }
      });

      if (productInCart && productInCart.quantity >= 10) {
        return throwForbidden(
          'You already have maximum quantity of this product in your cart'
        );
      }

      if (productInCart) {
        response = await context.prisma.userCartProduct.update({
          where: {
            userId_productId_size: {
              productId: args.input.productId,
              userId: context.userId,
              size: args.input.size
            }
          },
          data: {
            quantity: {
              increment: args.input.quantity
            }
          }
        });
      } else {
        response = await context.prisma.userCartProduct.create({
          data: {
            quantity: args.input.quantity,
            size: args.input.size,
            productId: args.input.productId,
            userId: context.userId
          }
        });
      }

      return response;
    },
    updateUserCartProduct: async (parent, args, context) => {
      if (!context.userId) {
        return throwUnAuthenticate(
          'You need to be logged in to update in cart'
        );
      }
      let response;

      // This is when the user is updating the product size
      if (args.input.size && args.input.size !== args.input.originalSize) {
        const productInCart = await context.prisma.userCartProduct.findFirst({
          where: {
            size: args.input.size,
            productId: args.input.productId,
            userId: context.userId
          }
        });

        const deleteProductInCart = context.prisma.userCartProduct.delete({
          where: {
            userId_productId_size: {
              productId: args.input.productId,
              userId: context.userId,
              size: args.input.originalSize
            }
          }
        });

        // This is when they would like to update the product size to a size that is already in the cart
        if (productInCart) {
          if (args.input.quantity + productInCart.quantity >= 10) {
            return throwForbidden(
              'You already have maximum quantity of this product in your cart'
            );
          }

          const updateProductInCart = context.prisma.userCartProduct.update({
            where: {
              userId_productId_size: {
                productId: args.input.productId,
                userId: context.userId,
                size: args.input.size
              }
            },
            data: {
              quantity: args.input.quantity + productInCart.quantity,
              size: args.input.size
            }
          });
          const transaction = await context.prisma.$transaction([
            updateProductInCart,
            deleteProductInCart
          ]);

          response = transaction[0];
        } else {
          response = await context.prisma.userCartProduct.update({
            where: {
              userId_productId_size: {
                productId: args.input.productId,
                userId: context.userId,
                size: args.input.originalSize
              }
            },
            data: {
              quantity: args.input.quantity,
              size: args.input.size || args.input.originalSize
            }
          });
        }
      } else {
        response = await context.prisma.userCartProduct.update({
          where: {
            userId_productId_size: {
              productId: args.input.productId,
              userId: context.userId,
              size: args.input.originalSize
            }
          },
          data: {
            quantity: args.input.quantity,
            size: args.input.size || args.input.originalSize
          }
        });
      }

      return response;
    },
    removeProductFromUserCart: async (parent, args, context) => {
      if (!context.userId) {
        return throwUnAuthenticate(
          'You need to be logged in to remove from cart'
        );
      }

      const response = await context.prisma.userCartProduct.delete({
        where: {
          id: args.id
        }
      });

      return {
        id: response.id,
        message: `Product has been removed from cart ${response.id}`
      };
    },
    checkout: async (parent, args, context) => {
      if (!context.userId) {
        return throwUnAuthenticate(
          'You need to be logged in to remove from cart'
        );
      }

      const cartItems = await context.prisma.userCartProduct.findMany({
        where: {
          userId: context.userId
        },
        include: {
          product: {
            select: {
              price: true
            }
          }
        }
      });

      const total = cartItems.reduce(
        (acc, item) => acc + item.quantity * item.product.price,
        0
      );

      const checkout = await context.prisma.$transaction([
        context.prisma.userCartProduct.deleteMany({
          where: {
            userId: context.userId
          }
        }),
        context.prisma.order.create({
          data: {
            userId: context.userId,
            status: 'REVIEW',
            addressId: args.input.addressId,
            items: {
              createMany: {
                data: cartItems.map((item) => ({
                  productId: item.productId,
                  quantity: item.quantity,
                  size: item.size,
                  price: item.product.price
                }))
              }
            },
            total,
            paymentType: args.input.paymentType
          }
        }),
        ...cartItems.map((item) =>
          context.prisma.subProduct.updateMany({
            where: { productId: item.productId },
            data: { quantity: { decrement: item.quantity } }
          })
        )
      ]);

      return {
        id: checkout[1].id,
        message: 'Checkout successful'
      };
    }
  }
};
