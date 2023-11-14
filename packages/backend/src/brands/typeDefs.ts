import { gql } from 'apollo-server-core';

export const brandTypeDefs = gql`
  type Query {
    brand(id: String!): Brand
    brands: [Brand!]!
  }

  type Brand {
    id: String!
    name: String!
  }

  type Mutation {
    createBrand(input: CreateBrandInput!): MutationResponsePayload
    deleteBrand(input: DeleteBrandInput!): MutationResponsePayload
  }

  input CreateBrandInput {
    name: String!
  }

  input DeleteBrandInput {
    id: String!
  }
`;
