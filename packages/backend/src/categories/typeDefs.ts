import { gql } from 'apollo-server-core';

export const categoryTypeDefs = gql`
  scalar ISODate

  type Query {
    category(id: String!, commonType: CommonTypeType!): Category
    subCategory(id: String!, commonType: CommonTypeType!): SubCategory
    categories(commonType: CommonTypeType!): [Category!]!
    subCategories(subCategoryId: String!): [SubCategory!]!
  }

  type Mutation {
    createCategory(input: CreateCategoryInput!): Category
    deleteCategory(input: DeleteCategoryInput!): MutationResponsePayload
  }

  type Category {
    id: String!
    name: String!
    createdAt: ISODate!
    updatedAt: ISODate!
    subCategories: [SubCategory!]!
  }

  type SubCategory {
    id: String
    name: String
    createdAt: ISODate!
    updatedAt: ISODate!
    productTypes: [ProductType!] #This is kinda wrong in a way from graphql tools
  }

  type ProductType {
    id: String
    name: String
    createdAt: ISODate!
    updatedAt: ISODate!
  }

  input CreateCategoryInput {
    name: String!
    subCategories: [CreateSubCategoryInput!]!
  }

  input CreateSubCategoryInput {
    name: String!
    productTypes: [String!]
  }

  input CreateProductTypeInput {
    name: String!
  }

  input DeleteCategoryInput {
    id: String!
  }
`;
