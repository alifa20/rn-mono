import { gql } from 'apollo-server-core';

export const searchTypeDefs = gql`
  type Query {
    search(input: SearchInput!): [SearchResult]
  }

  input SearchInput {
    id: String
    name: String!
    commonTypes: [CommonTypeType!]!
    select: [SearchType]
  }

  type SearchResult {
    id: String!
    name: String!
    type: SearchType!
  }

  enum SearchType {
    CATEGORY
    BRAND
    SUB_CATEGORY
    PRODUCT_TYPE
    PRODUCT
  }

  # type Mutation {
  # }
`;
