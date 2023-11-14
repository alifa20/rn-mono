import { gql } from 'apollo-server-core';

export const userTypeDefs = gql`
  scalar ISODate

  type Query {
    user: User
    users: [User!]!
  }

  enum PaymentType {
    STRIPE
    CASH_ON_DELIVERY
  }

  type User {
    id: String!
    dateOfBirth: ISODate
    email: String
    firstName: String
    gender: Gender
    lastName: String
    phoneNumber: String
    username: String
    loginMethod: LoginMethod
    socialId: String
    addresses: [UserAddress]!
    cart: Cart
    wishlist: [WishlistItem]
    preferredPaymentType: PaymentType
  }

  type WishlistItem {
    id: String!
    product: Product!
    createdAt: ISODate!
    updatedAt: ISODate!
  }

  type Cart {
    items: [CartItem]
    taxRate: TaxRate!
    shippingFee: Float!
    freeShippingThreshold: Float!
    subTotal: Float!
    total: Float!
    taxAmount: Float!
  }

  type TaxRate {
    rate: Float!
    rateLabel: String!
    ratePercentage: Float!
  }

  type CartItem {
    id: String!
    quantity: Int!
    size: Size!
    product: Product
    createdAt: ISODate!
    updatedAt: ISODate!
  }

  input UserInput {
    email: String
    firstName: String
    lastName: String
    gender: Gender
    dateOfBirth: ISODate
    phoneNumber: String
    preferredPaymentType: PaymentType
  }

  input CreateUserInput {
    id: String
    email: String
    password: String
    firstName: String
    lastName: String
    gender: Gender
    phoneNumber: String
  }

  input AddProductToUserCartInput {
    productId: String!
    quantity: Int!
    size: Size!
  }

  input UpdateUserCartProductInput {
    id: String!
    productId: String!
    quantity: Int!
    originalSize: Size!
    size: Size
  }

  input RemoveProductFromUserCartInput {
    id: String!
    size: Size!
  }

  enum Gender {
    MALE
    FEMALE
  }

  enum LoginMethod {
    EMAIL
    PHONE_NUMBER
    FACEBOOK
    GOOGLE
    APPLE
  }
  enum AddressType {
    PRIMARY
    OTHER
  }
  input UserAddressInput {
    firstName: String!
    lastName: String!
    addressLine1: String!
    addressLine2: String
    city: String!
    state: String
    zipCode: String!
    addressType: AddressType!
    phoneNumber: String!
    preferred: Boolean
  }

  type UserAddress {
    id: String!
    firstName: String!
    lastName: String!
    addressLine1: String!
    addressLine2: String
    city: String!
    state: String
    zipCode: String!
    addressType: AddressType!
    phoneNumber: String!
    preferred: Boolean
  }

  type MutationResponsePayload {
    id: String
    message: String
  }

  input CheckoutInput {
    addressId: String!
    paymentType: PaymentType!
  }

  enum PaymentType {
    STRIPE
    CASH_ON_DELIVERY
  }

  input PaymentMethodInput {
    paymentType: PaymentType!
  }

  input updatePaymentMethodInput {
    id: String!
    paymentType: PaymentType!
  }

  input SSOSignOnInput {
    loginMethod: LoginMethod!
    socialId: String!
    userId: String!
  }

  type Mutation {
    updateUser(input: UserInput): User!
    createUser(input: CreateUserInput!): User!
    ssoSignOn(input: SSOSignOnInput!): User!
    addUserAddress(input: UserAddressInput!): UserAddress!
    updateUserAddress(
      addressId: String!
      input: UserAddressInput!
    ): UserAddress!
    deleteUserAddress(addressId: String!): MutationResponsePayload!
    addProductToUserWishlist(productId: String!): WishlistItem!
    removeProductFromUserWishlist(productId: String!): MutationResponsePayload!
    addProductToUserCart(
      input: AddProductToUserCartInput!
    ): MutationResponsePayload!
    updateUserCartProduct(
      input: UpdateUserCartProductInput!
    ): MutationResponsePayload!
    removeProductFromUserCart(id: String!): MutationResponsePayload!
    checkout(input: CheckoutInput!): MutationResponsePayload!
    addPaymentMethod(input: PaymentMethodInput!): MutationResponsePayload!
    updatePaymentMethod(
      input: updatePaymentMethodInput!
    ): MutationResponsePayload!
    removePaymentMethod(id: String!): MutationResponsePayload!
  }
`;
