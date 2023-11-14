import { gql } from 'apollo-server-core';

export const collectionTypeDefs = gql`
  scalar ISODate

  type Query {
    collections: [Collection!]
    collection(id: String!): Collection
  }

  type Collection {
    id: String!
    title: String!
    description: String!
    imageUrl: String!
    products: [Product!]
  }

  type Mutation {
    updateCollection(input: UpdateCollectionInput!): Collection
    createCollection(input: CreateCollectionInput!): Collection
    deleteCollection(input: DeleteCollectionInput!): MutationResponsePayload
  }

  input CreateCollectionInput {
    title: String!
    description: String!
    imageUrl: String!
    productIds: [String!]!
  }

  input UpdateCollectionInput {
    id: String!
    title: String!
    description: String!
    imageUrl: String!
    productIds: [String!]!
  }

  input DeleteCollectionInput {
    id: String!
  }
`;
