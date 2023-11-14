import cuid from 'cuid';
import { upperFirst } from 'lodash';
import { Resolvers } from '../__generated__/graphql';

export const categoryResolvers: Resolvers = {
  Query: {
    category: async (parent, args, context) => {
      return context.prisma.category.findUnique({
        where: {
          id: args.id
        },
        include: {
          subCategories: {
            include: {
              productTypes: {
                where: {
                  products: {
                    some: {
                      commonTypes: {
                        some: {
                          name: {
                            in: args.commonType
                          }
                        }
                      }
                    }
                  }
                }
              }
            },
            where: {
              products: {
                some: {
                  commonTypes: {
                    some: {
                      name: {
                        in: args.commonType
                      }
                    }
                  }
                }
              }
            }
          }
        }
      });
    },
    categories: async (parent, args, context) => {
      return context.prisma.category.findMany({
        include: {
          subCategories: {
            include: {
              productTypes: {
                where: {
                  products: {
                    some: {
                      commonTypes: {
                        some: {
                          name: {
                            in: args.commonType
                          }
                        }
                      }
                    }
                  }
                }
              }
            },
            where: {
              products: {
                some: {
                  commonTypes: {
                    some: {
                      name: {
                        in: args.commonType
                      }
                    }
                  }
                }
              }
            }
          }
        },
        where: {
          products: {
            some: {
              commonTypes: {
                some: {
                  name: {
                    in: args.commonType
                  }
                }
              }
            }
          }
        }
      });
    },
    subCategory: async (parent, args, context) => {
      return context.prisma.subCategory.findUnique({
        where: {
          id: args.id
        },
        include: {
          productTypes: {
            where: {
              products: {
                some: {
                  commonTypes: {
                    some: {
                      name: {
                        in: args.commonType
                      }
                    }
                  }
                }
              }
            }
          }
        }
      });
    }
  },

  Mutation: {
    createCategory: async (parent, args, context) => {
      const dataWithIds = {
        id: cuid(),
        ...args.input
      };

      return context.prisma.category.create({
        include: {
          subCategories: {
            include: {
              productTypes: true
            }
          }
        },
        data: {
          id: dataWithIds.id,
          name: upperFirst(dataWithIds.name),
          subCategories: {
            create: dataWithIds.subCategories.map((subCategory) => {
              return {
                name: subCategory.name,
                productTypes: {
                  connectOrCreate:
                    subCategory?.productTypes?.map((productType) => {
                      return {
                        create: {
                          name: productType,
                          categoryId: dataWithIds.id
                        },
                        where: {
                          name: productType
                        }
                      };
                    }) || []
                }
              };
            })
          }
        }
      });
    },
    deleteCategory: async (_, args, context) => {
      await context.prisma.category.delete({
        where: {
          id: args.input.id
        }
      });

      return {
        id: args.input.id,
        message: `Category has been created ${args.input.id}`
      };
    }
  }
};
