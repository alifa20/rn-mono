import { gql } from 'apollo-server-core';

export const productTypeDefs = gql`
  scalar ISODate

  input Pagination {
    # Offset is the number of items to skip
    offset: Int
    # Limit is the number of items to return
    limit: Int
  }

  type Query {
    product(id: String!): Product
    products(
      filters: ProductsInputFilter
      initialFilters: ProductsInputFilter
      commonType: CommonTypeType!
      sortBy: SortBy
      pagination: Pagination
    ): [Product!]!
    filters(
      filters: ProductsInputFilter
      initialFilters: ProductsInputFilter
      commonType: CommonTypeType!
    ): [Filter!]!
  }

  type FilterValue {
    id: String!
    name: String!
    count: Int!
  }

  type Filter {
    id: String!
    name: String!
    filterValues: [FilterValue!]!
  }

  enum CommonTypeType {
    MENS
    WOMENS
    KIDS
  }

  type CommonType {
    id: String!
    name: CommonTypeType!
  }

  input ProductsInputFilter {
    name: String
    categoryIds: [String!]
    subCategoryIds: [String!]
    productTypeIds: [String!]
    brandIds: [String!]
    colourIds: [String!]
    priceRange: PriceRange
    size: [Size!]
    tags: [String!]
    isDiscountProductsOnly: Boolean
  }

  enum SortBy {
    RECOMMENDATION
    NEW_ITEMS
    PRICE_LOW
    PRICE_HIGH
  }

  input PriceRange {
    min: Float!
    max: Float!
  }

  type Product {
    id: String!
    title: String!
    description: String!
    imagesUrls: [String!]!
    rating: Float
    price: Float!
    brand: Brand!
    subProducts: [SubProduct!]!
    category: CategoryForDisplayType!
    subCategory: CategoryForDisplayType!
    productType: CategoryForDisplayType
    createdAt: ISODate
    updatedAt: ISODate
    discount: Discount
    commonTypes: [CommonType!]!
    tags: [Tag]
    compositions: String
    washingInstructions: String
  }

  type Colour {
    id: String!
    name: String!
  }

  type Discount {
    id: String!
    amount: Float!
  }

  type Tag {
    id: String!
    name: String!
  }

  type CategoryForDisplayType {
    id: String!
    name: String!
  }

  type SubProduct {
    id: String!
    quantity: Int!
    size: Size!
    colour: Colour!
  }

  type Mutation {
    createProduct(input: CreateProductInput!): Product!
    createProducts(input: CreateProductsInput!): [Product!]!
    updateProduct(input: UpdateProductInput!): Product!
    deleteProduct(input: DeleteProductInput!): MutationResponsePayload
  }

  input DeleteProductInput {
    id: String!
  }

  input CreateProductInput {
    id: String
    brandId: String!
    categoryId: String!
    subCategoryId: String!
    productTypeId: String
    discountAmount: Int
    title: String!
    description: String!
    price: Float!
    rating: Float
    commonTypes: [CommonTypeType!]!
    subProducts: [SubProductInput!]!
  }

  input CreateProductsInput {
    products: [CreateProductInput!]!
  }

  input UpdateProductInput {
    id: String!
    brandId: String!
    categoryId: String!
    productTypeId: String!
    discountAmount: Int
    title: String!
    description: String!
    price: Float!
    colourId: String!
    rating: Float
    commonTypes: [CommonTypeType!]!
    subProducts: [SubProductInput!]!
  }

  enum Size {
    S
    M
    L
    XL
    XXL
    ONESIZE
  }
  input SubProductInput {
    id: String
    productId: String
    quantity: Int!
    colourId: String!
    size: Size!
  }
`;
