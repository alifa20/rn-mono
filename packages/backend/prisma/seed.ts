/* eslint-disable no-console */
import { CommonType, PrismaClient, Size } from '@prisma/client';
import { faker } from '@faker-js/faker';

import cuid from 'cuid';
import { upperFirst } from 'lodash';
import { brandsData } from './brandsData';
import { categoriesData } from './categoriesData';
import { commonTypesData } from './commonTypesData';
import { coloursData } from './coloursData';

const prisma = new PrismaClient();

const clothingItems = [
  'Shirt',
  'Pants',
  'Shoes',
  'Hat',
  'Jacket',
  'Sweater',
  'Socks',
  'Shorts',
  'Scarf',
  'Gloves'
];
const clothingMaterials = [
  'Cotton',
  'Wool',
  'Leather',
  'Denim',
  'Silk',
  'Linen',
  'Polyester',
  'Rayon',
  'Velvet',
  'Satin'
];

const styles = ['Casual', 'Formal', 'Sport', 'Vintage', 'Modern', 'Classic'];
const parts = ['Outer', 'Lining'];

const adjectives = [
  'Comfortable',
  'Stylish',
  'Durable',
  'Soft',
  'Versatile',
  'Trendy'
];

function generateProductDescription() {
  const material = faker.helpers.arrayElement(clothingMaterials);
  const style = faker.helpers.arrayElement(styles);
  const adjective = faker.helpers.arrayElement(adjectives);

  return `${adjective} and ${style.toLowerCase()} ${material.toLowerCase()} product.`;
}

function generateComposition() {
  // Special case: 100% single material
  if (Math.random() < 0.2) {
    const material = faker.helpers.arrayElement(clothingMaterials);
    return `${material} 100%`;
  }

  return parts
    .map((part) => {
      const material = faker.helpers.arrayElement(clothingMaterials);
      const percentage = faker.datatype.number({ min: 1, max: 100 });
      // Randomly decide whether to include the part or not
      if (Math.random() < 0.5) {
        return `${material} ${percentage}%`;
      }
      return `${part}: ${material} ${percentage}%`;
    })
    .join(', ');
}

const randomClothingItem = faker.helpers.arrayElement(clothingItems);
const randomClothingMaterial = faker.helpers.arrayElement(clothingMaterials);

const upsertCateogries = categoriesData.map((category) => {
  const categoryWithIds = {
    id: cuid(),
    ...category
  };

  return prisma.category.upsert({
    where: { name: upperFirst(categoryWithIds.name) },
    update: {},
    create: {
      id: categoryWithIds.id,
      name: upperFirst(categoryWithIds.name),
      subCategories: {
        create: categoryWithIds.subCategories.map((subCategory) => {
          return {
            name: subCategory.name,
            productTypes: {
              connectOrCreate: subCategory?.productTypes?.map((productType) => {
                return {
                  create: {
                    name: productType,
                    categoryId: categoryWithIds.id
                  },
                  where: {
                    name: productType
                  }
                };
              })
            }
          };
        })
      }
    },
    include: {
      subCategories: {
        include: {
          productTypes: true
        }
      }
    }
  });
});

function createProduct({
  brandId,
  categoryId,
  subCategoryId,
  productTypeId,
  colourId,
  productName,
  commonTypes,
  compositions,
  washingInstructions
}: {
  brandId: string;
  categoryId: string;
  subCategoryId: string;
  productTypeId?: string;
  colourId: string;
  productName: string;
  commonTypes: CommonType[];
  compositions: string;
  washingInstructions?: string;
}) {
  return prisma.product.create({
    data: {
      brandId,
      categoryId,
      subCategoryId,
      productTypeId,
      description: generateProductDescription(),
      price: Number(faker.commerce.price(5, 150)),
      title: productName,
      commonTypes: {
        connect: faker.helpers
          .arrayElements(commonTypes.map((i) => i?.name))
          .map((i) => ({ name: i }))
      },
      compositions,
      washingInstructions,
      subProducts: {
        create: faker.helpers.arrayElement([
          Object.values(Size)
            .filter((i) => i !== 'ONESIZE')
            .map((size) => ({
              size,
              quantity: faker.datatype.number({
                min: 1,
                max: 100
              }),
              colourId
            })),
          [
            {
              size: 'ONESIZE',
              quantity: faker.datatype.number({
                min: 1,
                max: 100
              }),
              colourId
            }
          ]
        ])
      }
    }
  });
}

// This is where we prepopulate junk data
async function main() {
  console.log(`Start seeding ...`);

  const colours = await prisma.$transaction(
    coloursData.map((colourData) => {
      return prisma.colour.create({
        data: {
          name: colourData.name,
          subColours: {
            create: colourData.subColours.map((subColour) => {
              return {
                name: subColour
              };
            })
          }
        }
      });
    })
  );

  const brands = await prisma.$transaction(
    brandsData.map((brand) =>
      prisma.brand.create({
        data: {
          name: brand.name
        }
      })
    )
  );

  const commonTypes = await prisma.$transaction(
    commonTypesData.map((commonType) =>
      prisma.commonType.create({
        data: {
          name: commonType
        }
      })
    )
  );

  const categories = await prisma.$transaction(upsertCateogries);

  const duplicateCategories = [...Array(1)].map(() => categories);

  const productOperations = duplicateCategories.flatMap(
    (duplicatedCategories) => {
      const colourIds = faker.helpers.arrayElements(colours).map((i) => i.id);

      return duplicatedCategories.flatMap((category) => {
        return category.subCategories.flatMap((subCategory) => {
          const brandId = faker.helpers.arrayElement(brands.map((i) => i?.id));
          const washingInstructions = faker.helpers.arrayElement([
            'Machine washable',
            'Hand wash only',
            'Dry clean only'
          ]);

          const productTypesOperations =
            subCategory.productTypes?.flatMap((productType) => {
              const productName = `${faker.commerce.productAdjective()} ${randomClothingMaterial} ${randomClothingItem}`;
              const compositions = generateComposition();

              return colourIds.map((colourId) => {
                return createProduct({
                  brandId,
                  categoryId: category.id,
                  subCategoryId: subCategory.id,
                  productTypeId: productType.id,
                  compositions,
                  colourId,
                  productName,
                  commonTypes,
                  washingInstructions
                });
              });
            }) ?? [];

          const compositions = generateComposition();
          const productName = `${faker.commerce.productAdjective()} ${randomClothingMaterial} ${randomClothingItem}`;
          const subCategoryOperations = colourIds.map((colourId) => {
            return createProduct({
              brandId,
              categoryId: category.id,
              subCategoryId: subCategory.id,
              compositions,
              colourId,
              productName,
              commonTypes,
              washingInstructions
            });
          });

          return [...productTypesOperations, ...subCategoryOperations];
        });
      });
    }
  );

  await Promise.all(
    productOperations.map(async (operation) => {
      try {
        return await operation;
      } catch (error) {
        console.error('Operation failed:', error);
        return null; // Return a value indicating a failure
      }
    })
  );

  console.log(`Seeding finished.`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.log(e);
    await prisma.$disconnect();
    process.exit(1);
  });
