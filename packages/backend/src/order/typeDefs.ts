import { gql } from 'apollo-server-core';

export const orderTypeDefs = gql`
  scalar ISODate

  type Query {
    orders: [Order]
    order(id: String!): Order
  }

  type Order {
    id: String!
    createdAt: ISODate!
    updatedAt: ISODate!
    status: String!
    total: Float!
    items: [Item]!
    user: User!
    promoCode: String
    discount: Discount
    paid: Boolean!
  }

  type Item {
    id: String!
    createdAt: ISODate!
    updatedAt: ISODate!
    quantity: Int!
    size: Size!
    product: Product!
  }

  type Mutation {
    createOrder(input: CreateOrderInput!): Order!
  }

  input CreateOrderInput {
    items: [CreateOrderItemInput!]!
    promoCode: String
    addressId: String!
    paymentType: PaymentType!
  }

  input CreateOrderItemInput {
    productId: String!
    size: Size!
    quantity: Int!
  }
`;
