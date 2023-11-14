import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: Date;
};

export type AddProductToUserCartInput = {
  productId: Scalars['String'];
  quantity: Scalars['Int'];
  size: Size;
};

export const AddressType = {
  Other: 'OTHER',
  Primary: 'PRIMARY'
} as const;

export type AddressType = (typeof AddressType)[keyof typeof AddressType];
export type Brand = {
  __typename?: 'Brand';
  id: Scalars['String'];
  name: Scalars['String'];
};

export type Cart = {
  __typename?: 'Cart';
  freeShippingThreshold: Scalars['Float'];
  items?: Maybe<Array<Maybe<CartItem>>>;
  shippingFee: Scalars['Float'];
  subTotal: Scalars['Float'];
  taxAmount: Scalars['Float'];
  taxRate: TaxRate;
  total: Scalars['Float'];
};

export type CartItem = {
  __typename?: 'CartItem';
  createdAt: Scalars['DateTime'];
  id: Scalars['String'];
  product?: Maybe<Product>;
  quantity: Scalars['Int'];
  size: Size;
  updatedAt: Scalars['DateTime'];
};

export type Category = {
  __typename?: 'Category';
  createdAt: Scalars['DateTime'];
  id: Scalars['String'];
  name: Scalars['String'];
  subCategories: Array<SubCategory>;
  updatedAt: Scalars['DateTime'];
};

export type CategoryForDisplayType = {
  __typename?: 'CategoryForDisplayType';
  id: Scalars['String'];
  name: Scalars['String'];
};

export type CheckoutInput = {
  addressId: Scalars['String'];
  paymentType: PaymentType;
};

export type Collection = {
  __typename?: 'Collection';
  description: Scalars['String'];
  id: Scalars['String'];
  imageUrl: Scalars['String'];
  products?: Maybe<Array<Product>>;
  title: Scalars['String'];
};

export type Colour = {
  __typename?: 'Colour';
  id: Scalars['String'];
  name: Scalars['String'];
};

export type CommonType = {
  __typename?: 'CommonType';
  id: Scalars['String'];
  name: CommonTypeType;
};

export const CommonTypeType = {
  Kids: 'KIDS',
  Mens: 'MENS',
  Womens: 'WOMENS'
} as const;

export type CommonTypeType =
  (typeof CommonTypeType)[keyof typeof CommonTypeType];
export type CreateBrandInput = {
  name: Scalars['String'];
};

export type CreateCategoryInput = {
  name: Scalars['String'];
  subCategories: Array<CreateSubCategoryInput>;
};

export type CreateCollectionInput = {
  description: Scalars['String'];
  imageUrl: Scalars['String'];
  productIds: Array<Scalars['String']>;
  title: Scalars['String'];
};

export type CreateOrderInput = {
  items: Array<CreateOrderItemInput>;
  promoCode?: InputMaybe<Scalars['String']>;
};

export type CreateOrderItemInput = {
  productId: Scalars['String'];
  quantity: Scalars['Int'];
  size: Size;
};

export type CreateProductInput = {
  brandId: Scalars['String'];
  categoryId: Scalars['String'];
  commonTypes: Array<CommonTypeType>;
  description: Scalars['String'];
  discountAmount?: InputMaybe<Scalars['Int']>;
  id?: InputMaybe<Scalars['String']>;
  price: Scalars['Float'];
  productTypeId?: InputMaybe<Scalars['String']>;
  rating?: InputMaybe<Scalars['Float']>;
  subCategoryId: Scalars['String'];
  subProducts: Array<SubProductInput>;
  title: Scalars['String'];
};

export type CreateProductTypeInput = {
  name: Scalars['String'];
};

export type CreateProductsInput = {
  products: Array<CreateProductInput>;
};

export type CreateSubCategoryInput = {
  name: Scalars['String'];
  productTypes?: InputMaybe<Array<Scalars['String']>>;
};

export type CreateUserInput = {
  email?: InputMaybe<Scalars['String']>;
  firstName?: InputMaybe<Scalars['String']>;
  gender?: InputMaybe<Gender>;
  id?: InputMaybe<Scalars['String']>;
  lastName?: InputMaybe<Scalars['String']>;
  password?: InputMaybe<Scalars['String']>;
  phoneNumber?: InputMaybe<Scalars['String']>;
};

export type DeleteBrandInput = {
  id: Scalars['String'];
};

export type DeleteCategoryInput = {
  id: Scalars['String'];
};

export type DeleteCollectionInput = {
  id: Scalars['String'];
};

export type DeleteProductInput = {
  id: Scalars['String'];
};

export type Discount = {
  __typename?: 'Discount';
  amount: Scalars['Float'];
  id: Scalars['String'];
};

export type Filter = {
  __typename?: 'Filter';
  filterValues: Array<FilterValue>;
  id: Scalars['String'];
  name: Scalars['String'];
};

export type FilterValue = {
  __typename?: 'FilterValue';
  count: Scalars['Int'];
  id: Scalars['String'];
  name: Scalars['String'];
};

export const Gender = {
  Female: 'FEMALE',
  Male: 'MALE'
} as const;

export type Gender = (typeof Gender)[keyof typeof Gender];
export type Item = {
  __typename?: 'Item';
  createdAt: Scalars['DateTime'];
  id: Scalars['String'];
  product: Product;
  quantity: Scalars['Int'];
  size: Size;
  updatedAt: Scalars['DateTime'];
};

export const LoginMethod = {
  Apple: 'APPLE',
  Email: 'EMAIL',
  Facebook: 'FACEBOOK',
  Google: 'GOOGLE',
  PhoneNumber: 'PHONE_NUMBER'
} as const;

export type LoginMethod = (typeof LoginMethod)[keyof typeof LoginMethod];
export type Mutation = {
  __typename?: 'Mutation';
  addPaymentMethod: MutationResponsePayload;
  addProductToUserCart: MutationResponsePayload;
  addProductToUserWishlist: WishlistItem;
  addUserAddress: UserAddress;
  checkout: MutationResponsePayload;
  createBrand?: Maybe<MutationResponsePayload>;
  createCategory?: Maybe<Category>;
  createCollection?: Maybe<Collection>;
  createOrder: Order;
  createProduct: Product;
  createProducts: Array<Product>;
  createUser: User;
  deleteBrand?: Maybe<MutationResponsePayload>;
  deleteCategory?: Maybe<MutationResponsePayload>;
  deleteCollection?: Maybe<MutationResponsePayload>;
  deleteProduct?: Maybe<MutationResponsePayload>;
  deleteUserAddress: MutationResponsePayload;
  removePaymentMethod: MutationResponsePayload;
  removeProductFromUserCart: MutationResponsePayload;
  removeProductFromUserWishlist: MutationResponsePayload;
  ssoSignOn: User;
  updateCollection?: Maybe<Collection>;
  updatePaymentMethod: MutationResponsePayload;
  updateProduct: Product;
  updateUser: User;
  updateUserAddress: UserAddress;
  updateUserCartProduct: MutationResponsePayload;
};

export type MutationAddPaymentMethodArgs = {
  input: PaymentMethodInput;
};

export type MutationAddProductToUserCartArgs = {
  input: AddProductToUserCartInput;
};

export type MutationAddProductToUserWishlistArgs = {
  productId: Scalars['String'];
};

export type MutationAddUserAddressArgs = {
  input: UserAddressInput;
};

export type MutationCheckoutArgs = {
  input: CheckoutInput;
};

export type MutationCreateBrandArgs = {
  input: CreateBrandInput;
};

export type MutationCreateCategoryArgs = {
  input: CreateCategoryInput;
};

export type MutationCreateCollectionArgs = {
  input: CreateCollectionInput;
};

export type MutationCreateOrderArgs = {
  input: CreateOrderInput;
};

export type MutationCreateProductArgs = {
  input: CreateProductInput;
};

export type MutationCreateProductsArgs = {
  input: CreateProductsInput;
};

export type MutationCreateUserArgs = {
  input: CreateUserInput;
};

export type MutationDeleteBrandArgs = {
  input: DeleteBrandInput;
};

export type MutationDeleteCategoryArgs = {
  input: DeleteCategoryInput;
};

export type MutationDeleteCollectionArgs = {
  input: DeleteCollectionInput;
};

export type MutationDeleteProductArgs = {
  input: DeleteProductInput;
};

export type MutationDeleteUserAddressArgs = {
  addressId: Scalars['String'];
};

export type MutationRemovePaymentMethodArgs = {
  id: Scalars['String'];
};

export type MutationRemoveProductFromUserCartArgs = {
  id: Scalars['String'];
};

export type MutationRemoveProductFromUserWishlistArgs = {
  productId: Scalars['String'];
};

export type MutationSsoSignOnArgs = {
  input: SsoSignOnInput;
};

export type MutationUpdateCollectionArgs = {
  input: UpdateCollectionInput;
};

export type MutationUpdatePaymentMethodArgs = {
  input: UpdatePaymentMethodInput;
};

export type MutationUpdateProductArgs = {
  input: UpdateProductInput;
};

export type MutationUpdateUserArgs = {
  input?: InputMaybe<UserInput>;
};

export type MutationUpdateUserAddressArgs = {
  addressId: Scalars['String'];
  input: UserAddressInput;
};

export type MutationUpdateUserCartProductArgs = {
  input: UpdateUserCartProductInput;
};

export type MutationResponsePayload = {
  __typename?: 'MutationResponsePayload';
  id?: Maybe<Scalars['String']>;
  message?: Maybe<Scalars['String']>;
};

export type Order = {
  __typename?: 'Order';
  createdAt: Scalars['DateTime'];
  discount?: Maybe<Discount>;
  id: Scalars['String'];
  items: Array<Maybe<Item>>;
  paid: Scalars['Boolean'];
  promoCode?: Maybe<Scalars['String']>;
  status: Scalars['String'];
  total: Scalars['Float'];
  updatedAt: Scalars['DateTime'];
  user: User;
};

export type Pagination = {
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
};

export type PaymentMethodInput = {
  paymentType: PaymentType;
};

export const PaymentType = {
  CashOnDelivery: 'CASH_ON_DELIVERY',
  Stripe: 'STRIPE'
} as const;

export type PaymentType = (typeof PaymentType)[keyof typeof PaymentType];
export type PriceRange = {
  max: Scalars['Float'];
  min: Scalars['Float'];
};

export type Product = {
  __typename?: 'Product';
  brand: Brand;
  category: CategoryForDisplayType;
  commonTypes: Array<CommonType>;
  compositions?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  description: Scalars['String'];
  discount?: Maybe<Discount>;
  id: Scalars['String'];
  imagesUrls: Array<Scalars['String']>;
  price: Scalars['Float'];
  productType?: Maybe<CategoryForDisplayType>;
  rating?: Maybe<Scalars['Float']>;
  subCategory: CategoryForDisplayType;
  subProducts: Array<SubProduct>;
  tags?: Maybe<Array<Maybe<Tag>>>;
  title: Scalars['String'];
  updatedAt?: Maybe<Scalars['DateTime']>;
  washingInstructions?: Maybe<Scalars['String']>;
};

export type ProductType = {
  __typename?: 'ProductType';
  createdAt: Scalars['DateTime'];
  id?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  updatedAt: Scalars['DateTime'];
};

export type ProductsInputFilter = {
  brandIds?: InputMaybe<Array<Scalars['String']>>;
  categoryIds?: InputMaybe<Array<Scalars['String']>>;
  colourIds?: InputMaybe<Array<Scalars['String']>>;
  isDiscountProductsOnly?: InputMaybe<Scalars['Boolean']>;
  name?: InputMaybe<Scalars['String']>;
  priceRange?: InputMaybe<PriceRange>;
  productTypeIds?: InputMaybe<Array<Scalars['String']>>;
  size?: InputMaybe<Array<Size>>;
  subCategoryIds?: InputMaybe<Array<Scalars['String']>>;
  tags?: InputMaybe<Array<Scalars['String']>>;
};

export type Query = {
  __typename?: 'Query';
  brand?: Maybe<Brand>;
  brands: Array<Brand>;
  categories: Array<Category>;
  category?: Maybe<Category>;
  collection?: Maybe<Collection>;
  collections?: Maybe<Array<Collection>>;
  filters: Array<Filter>;
  order?: Maybe<Order>;
  orders?: Maybe<Array<Maybe<Order>>>;
  product?: Maybe<Product>;
  products: Array<Product>;
  search?: Maybe<Array<Maybe<SearchResult>>>;
  subCategories: Array<SubCategory>;
  subCategory?: Maybe<SubCategory>;
  user?: Maybe<User>;
  users: Array<User>;
};

export type QueryBrandArgs = {
  id: Scalars['String'];
};

export type QueryCategoriesArgs = {
  commonType: CommonTypeType;
};

export type QueryCategoryArgs = {
  commonType: CommonTypeType;
  id: Scalars['String'];
};

export type QueryCollectionArgs = {
  id: Scalars['String'];
};

export type QueryFiltersArgs = {
  commonType: CommonTypeType;
  filters?: InputMaybe<ProductsInputFilter>;
  initialFilters?: InputMaybe<ProductsInputFilter>;
};

export type QueryOrderArgs = {
  id: Scalars['String'];
};

export type QueryProductArgs = {
  id: Scalars['String'];
};

export type QueryProductsArgs = {
  commonType: CommonTypeType;
  filters?: InputMaybe<ProductsInputFilter>;
  initialFilters?: InputMaybe<ProductsInputFilter>;
  pagination?: InputMaybe<Pagination>;
  sortBy?: InputMaybe<SortBy>;
};

export type QuerySearchArgs = {
  input: SearchInput;
};

export type QuerySubCategoriesArgs = {
  subCategoryId: Scalars['String'];
};

export type QuerySubCategoryArgs = {
  commonType: CommonTypeType;
  id: Scalars['String'];
};

export type RemoveProductFromUserCartInput = {
  id: Scalars['String'];
  size: Size;
};

export type SsoSignOnInput = {
  loginMethod: LoginMethod;
  socialId: Scalars['String'];
  userId: Scalars['String'];
};

export type SearchInput = {
  commonTypes: Array<CommonTypeType>;
  id?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
  select?: InputMaybe<Array<InputMaybe<SearchType>>>;
};

export type SearchResult = {
  __typename?: 'SearchResult';
  id: Scalars['String'];
  name: Scalars['String'];
  type: SearchType;
};

export const SearchType = {
  Brand: 'BRAND',
  Category: 'CATEGORY',
  Product: 'PRODUCT',
  ProductType: 'PRODUCT_TYPE',
  SubCategory: 'SUB_CATEGORY'
} as const;

export type SearchType = (typeof SearchType)[keyof typeof SearchType];
export const Size = {
  L: 'L',
  M: 'M',
  Onesize: 'ONESIZE',
  S: 'S',
  Xl: 'XL',
  Xxl: 'XXL'
} as const;

export type Size = (typeof Size)[keyof typeof Size];
export const SortBy = {
  NewItems: 'NEW_ITEMS',
  PriceHigh: 'PRICE_HIGH',
  PriceLow: 'PRICE_LOW',
  Recommendation: 'RECOMMENDATION'
} as const;

export type SortBy = (typeof SortBy)[keyof typeof SortBy];
export type SubCategory = {
  __typename?: 'SubCategory';
  createdAt: Scalars['DateTime'];
  id?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  productTypes?: Maybe<Array<ProductType>>;
  updatedAt: Scalars['DateTime'];
};

export type SubProduct = {
  __typename?: 'SubProduct';
  colour: Colour;
  id: Scalars['String'];
  quantity: Scalars['Int'];
  size: Size;
};

export type SubProductInput = {
  colourId: Scalars['String'];
  id?: InputMaybe<Scalars['String']>;
  productId?: InputMaybe<Scalars['String']>;
  quantity: Scalars['Int'];
  size: Size;
};

export type Tag = {
  __typename?: 'Tag';
  id: Scalars['String'];
  name: Scalars['String'];
};

export type TaxRate = {
  __typename?: 'TaxRate';
  rate: Scalars['Float'];
  rateLabel: Scalars['String'];
  ratePercentage: Scalars['Float'];
};

export type UpdateCollectionInput = {
  description: Scalars['String'];
  id: Scalars['String'];
  imageUrl: Scalars['String'];
  productIds: Array<Scalars['String']>;
  title: Scalars['String'];
};

export type UpdateProductInput = {
  brandId: Scalars['String'];
  categoryId: Scalars['String'];
  colourId: Scalars['String'];
  commonTypes: Array<CommonTypeType>;
  description: Scalars['String'];
  discountAmount?: InputMaybe<Scalars['Int']>;
  id: Scalars['String'];
  price: Scalars['Float'];
  productTypeId: Scalars['String'];
  rating?: InputMaybe<Scalars['Float']>;
  subProducts: Array<SubProductInput>;
  title: Scalars['String'];
};

export type UpdateUserCartProductInput = {
  id: Scalars['String'];
  originalSize: Size;
  productId: Scalars['String'];
  quantity: Scalars['Int'];
  size?: InputMaybe<Size>;
};

export type User = {
  __typename?: 'User';
  addresses: Array<Maybe<UserAddress>>;
  cart?: Maybe<Cart>;
  dateOfBirth?: Maybe<Scalars['DateTime']>;
  email?: Maybe<Scalars['String']>;
  firstName?: Maybe<Scalars['String']>;
  gender?: Maybe<Gender>;
  id: Scalars['String'];
  lastName?: Maybe<Scalars['String']>;
  loginMethod?: Maybe<LoginMethod>;
  phoneNumber?: Maybe<Scalars['String']>;
  preferredPaymentType?: Maybe<PaymentType>;
  socialId?: Maybe<Scalars['String']>;
  username?: Maybe<Scalars['String']>;
  wishlist?: Maybe<Array<Maybe<WishlistItem>>>;
};

export type UserAddress = {
  __typename?: 'UserAddress';
  addressLine1: Scalars['String'];
  addressLine2?: Maybe<Scalars['String']>;
  addressType: AddressType;
  city: Scalars['String'];
  firstName: Scalars['String'];
  id: Scalars['String'];
  lastName: Scalars['String'];
  phoneNumber: Scalars['String'];
  preferred?: Maybe<Scalars['Boolean']>;
  state?: Maybe<Scalars['String']>;
  zipCode: Scalars['String'];
};

export type UserAddressInput = {
  addressLine1: Scalars['String'];
  addressLine2?: InputMaybe<Scalars['String']>;
  addressType: AddressType;
  city: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  phoneNumber: Scalars['String'];
  preferred?: InputMaybe<Scalars['Boolean']>;
  state?: InputMaybe<Scalars['String']>;
  zipCode: Scalars['String'];
};

export type UserInput = {
  dateOfBirth?: InputMaybe<Scalars['DateTime']>;
  email?: InputMaybe<Scalars['String']>;
  firstName?: InputMaybe<Scalars['String']>;
  gender?: InputMaybe<Gender>;
  lastName?: InputMaybe<Scalars['String']>;
  phoneNumber?: InputMaybe<Scalars['String']>;
  preferredPaymentType?: InputMaybe<PaymentType>;
};

export type WishlistItem = {
  __typename?: 'WishlistItem';
  createdAt: Scalars['DateTime'];
  id: Scalars['String'];
  product: Product;
  updatedAt: Scalars['DateTime'];
};

export type UpdatePaymentMethodInput = {
  id: Scalars['String'];
  paymentType: PaymentType;
};

export type CreateUserMutationVariables = Exact<{
  input: CreateUserInput;
}>;

export type CreateUserMutation = {
  __typename?: 'Mutation';
  createUser: { __typename?: 'User'; id: string };
};

export type SsoSignOnMutationVariables = Exact<{
  input: SsoSignOnInput;
}>;

export type SsoSignOnMutation = {
  __typename?: 'Mutation';
  ssoSignOn: { __typename?: 'User'; id: string };
};

export type CheckoutMutationVariables = Exact<{
  input: CheckoutInput;
}>;

export type CheckoutMutation = {
  __typename?: 'Mutation';
  checkout: {
    __typename?: 'MutationResponsePayload';
    id?: string | null;
    message?: string | null;
  };
};

export type PaymentMethodFragmentFragment = {
  __typename?: 'User';
  id: string;
  preferredPaymentType?: PaymentType | null;
};

export type CartQueryVariables = Exact<{ [key: string]: never }>;

export type CartQuery = {
  __typename?: 'Query';
  user?: {
    __typename?: 'User';
    id: string;
    preferredPaymentType?: PaymentType | null;
    cart?: {
      __typename?: 'Cart';
      shippingFee: number;
      subTotal: number;
      total: number;
      freeShippingThreshold: number;
      taxAmount: number;
      taxRate: {
        __typename?: 'TaxRate';
        rate: number;
        rateLabel: string;
        ratePercentage: number;
      };
      items?: Array<{
        __typename?: 'CartItem';
        id: string;
        updatedAt: Date;
        createdAt: Date;
        quantity: number;
        size: Size;
        product?: {
          __typename?: 'Product';
          id: string;
          title: string;
          description: string;
          imagesUrls: Array<string>;
          price: number;
          brand: { __typename?: 'Brand'; id: string; name: string };
          discount?: {
            __typename?: 'Discount';
            id: string;
            amount: number;
          } | null;
          subProducts: Array<{
            __typename?: 'SubProduct';
            id: string;
            size: Size;
            quantity: number;
          }>;
        } | null;
      } | null> | null;
    } | null;
  } | null;
};

export type CartFragmentFragment = {
  __typename?: 'User';
  id: string;
  preferredPaymentType?: PaymentType | null;
  cart?: {
    __typename?: 'Cart';
    shippingFee: number;
    subTotal: number;
    total: number;
    freeShippingThreshold: number;
    taxAmount: number;
    taxRate: {
      __typename?: 'TaxRate';
      rate: number;
      rateLabel: string;
      ratePercentage: number;
    };
    items?: Array<{
      __typename?: 'CartItem';
      id: string;
      updatedAt: Date;
      createdAt: Date;
      quantity: number;
      size: Size;
      product?: {
        __typename?: 'Product';
        id: string;
        title: string;
        description: string;
        imagesUrls: Array<string>;
        price: number;
        brand: { __typename?: 'Brand'; id: string; name: string };
        discount?: {
          __typename?: 'Discount';
          id: string;
          amount: number;
        } | null;
        subProducts: Array<{
          __typename?: 'SubProduct';
          id: string;
          size: Size;
          quantity: number;
        }>;
      } | null;
    } | null> | null;
  } | null;
};

export type CartItemFragmentFragment = {
  __typename?: 'CartItem';
  id: string;
  updatedAt: Date;
  createdAt: Date;
  quantity: number;
  size: Size;
  product?: {
    __typename?: 'Product';
    id: string;
    title: string;
    description: string;
    imagesUrls: Array<string>;
    price: number;
    brand: { __typename?: 'Brand'; id: string; name: string };
    discount?: { __typename?: 'Discount'; id: string; amount: number } | null;
    subProducts: Array<{
      __typename?: 'SubProduct';
      id: string;
      size: Size;
      quantity: number;
    }>;
  } | null;
};

export type AddProductToUserCartMutationVariables = Exact<{
  input: AddProductToUserCartInput;
}>;

export type AddProductToUserCartMutation = {
  __typename?: 'Mutation';
  addProductToUserCart: {
    __typename?: 'MutationResponsePayload';
    id?: string | null;
  };
};

export type RemoveProductFromUserCartMutationVariables = Exact<{
  cartId: Scalars['String'];
}>;

export type RemoveProductFromUserCartMutation = {
  __typename?: 'Mutation';
  removeProductFromUserCart: {
    __typename?: 'MutationResponsePayload';
    id?: string | null;
  };
};

export type UpdateUserCartProductMutationVariables = Exact<{
  input: UpdateUserCartProductInput;
}>;

export type UpdateUserCartProductMutation = {
  __typename?: 'Mutation';
  updateUserCartProduct: {
    __typename?: 'MutationResponsePayload';
    id?: string | null;
  };
};

export type MoveToWishlistMutationVariables = Exact<{
  productId: Scalars['String'];
  cartId: Scalars['String'];
}>;

export type MoveToWishlistMutation = {
  __typename?: 'Mutation';
  addProductToUserWishlist: { __typename?: 'WishlistItem'; id: string };
  removeProductFromUserCart: {
    __typename?: 'MutationResponsePayload';
    id?: string | null;
  };
};

export type FiltersQueryVariables = Exact<{
  filters?: InputMaybe<ProductsInputFilter>;
  commonType: CommonTypeType;
}>;

export type FiltersQuery = {
  __typename?: 'Query';
  filters: Array<{
    __typename?: 'Filter';
    id: string;
    name: string;
    filterValues: Array<{
      __typename?: 'FilterValue';
      count: number;
      id: string;
      name: string;
    }>;
  }>;
};

export type HomeListingsQueryVariables = Exact<{
  commonType: CommonTypeType;
  filters?: InputMaybe<ProductsInputFilter>;
  initialFilters?: InputMaybe<ProductsInputFilter>;
  sortBy?: InputMaybe<SortBy>;
  pagination?: InputMaybe<Pagination>;
}>;

export type HomeListingsQuery = {
  __typename?: 'Query';
  products: Array<{
    __typename?: 'Product';
    id: string;
    title: string;
    description: string;
    imagesUrls: Array<string>;
    price: number;
    brand: { __typename?: 'Brand'; id: string; name: string };
    discount?: { __typename?: 'Discount'; id: string; amount: number } | null;
  }>;
};

export type ProductQueryVariables = Exact<{
  productId: Scalars['String'];
}>;

export type ProductQuery = {
  __typename?: 'Query';
  product?: {
    __typename?: 'Product';
    id: string;
    title: string;
    description: string;
    imagesUrls: Array<string>;
    rating?: number | null;
    price: number;
    compositions?: string | null;
    washingInstructions?: string | null;
    subProducts: Array<{
      __typename?: 'SubProduct';
      size: Size;
      quantity: number;
      id: string;
      colour: { __typename?: 'Colour'; id: string; name: string };
    }>;
    brand: { __typename?: 'Brand'; id: string; name: string };
    discount?: { __typename?: 'Discount'; id: string; amount: number } | null;
    category: {
      __typename?: 'CategoryForDisplayType';
      id: string;
      name: string;
    };
    subCategory: {
      __typename?: 'CategoryForDisplayType';
      id: string;
      name: string;
    };
    productType?: {
      __typename?: 'CategoryForDisplayType';
      id: string;
      name: string;
    } | null;
  } | null;
};

export type ProductDetailFragment = {
  __typename?: 'Product';
  id: string;
  title: string;
  description: string;
  imagesUrls: Array<string>;
  rating?: number | null;
  price: number;
  compositions?: string | null;
  washingInstructions?: string | null;
  subProducts: Array<{
    __typename?: 'SubProduct';
    size: Size;
    quantity: number;
    id: string;
    colour: { __typename?: 'Colour'; id: string; name: string };
  }>;
  brand: { __typename?: 'Brand'; id: string; name: string };
  discount?: { __typename?: 'Discount'; id: string; amount: number } | null;
  category: { __typename?: 'CategoryForDisplayType'; id: string; name: string };
  subCategory: {
    __typename?: 'CategoryForDisplayType';
    id: string;
    name: string;
  };
  productType?: {
    __typename?: 'CategoryForDisplayType';
    id: string;
    name: string;
  } | null;
};

export type CategoriesQueryVariables = Exact<{
  commonType: CommonTypeType;
}>;

export type CategoriesQuery = {
  __typename?: 'Query';
  categories: Array<{
    __typename?: 'Category';
    id: string;
    name: string;
    subCategories: Array<{
      __typename?: 'SubCategory';
      id?: string | null;
      name?: string | null;
      productTypes?: Array<{
        __typename?: 'ProductType';
        id?: string | null;
        name?: string | null;
      }> | null;
    }>;
  }>;
};

export type CategoryQueryVariables = Exact<{
  categoryId: Scalars['String'];
  commonType: CommonTypeType;
}>;

export type CategoryQuery = {
  __typename?: 'Query';
  category?: {
    __typename?: 'Category';
    id: string;
    name: string;
    subCategories: Array<{
      __typename?: 'SubCategory';
      id?: string | null;
      name?: string | null;
      productTypes?: Array<{
        __typename?: 'ProductType';
        id?: string | null;
        name?: string | null;
      }> | null;
    }>;
  } | null;
};

export type SearchListingsQueryVariables = Exact<{
  commonType: CommonTypeType;
  filters?: InputMaybe<ProductsInputFilter>;
  initialFilters?: InputMaybe<ProductsInputFilter>;
  sortBy?: InputMaybe<SortBy>;
  pagination?: InputMaybe<Pagination>;
}>;

export type SearchListingsQuery = {
  __typename?: 'Query';
  products: Array<{
    __typename?: 'Product';
    id: string;
    title: string;
    description: string;
    imagesUrls: Array<string>;
    price: number;
    brand: { __typename?: 'Brand'; id: string; name: string };
    discount?: { __typename?: 'Discount'; id: string; amount: number } | null;
  }>;
};

export type SearchQueryVariables = Exact<{
  input: SearchInput;
}>;

export type SearchQuery = {
  __typename?: 'Query';
  search?: Array<{
    __typename?: 'SearchResult';
    name: string;
    type: SearchType;
    id: string;
  } | null> | null;
};

export type SubCategoryQueryVariables = Exact<{
  subCategoryId: Scalars['String'];
  commonType: CommonTypeType;
}>;

export type SubCategoryQuery = {
  __typename?: 'Query';
  subCategory?: {
    __typename?: 'SubCategory';
    id?: string | null;
    name?: string | null;
    productTypes?: Array<{
      __typename?: 'ProductType';
      id?: string | null;
      name?: string | null;
    }> | null;
  } | null;
};

export type UserAddressQueryVariables = Exact<{ [key: string]: never }>;

export type UserAddressQuery = {
  __typename?: 'Query';
  user?: {
    __typename?: 'User';
    id: string;
    addresses: Array<{
      __typename?: 'UserAddress';
      id: string;
      firstName: string;
      lastName: string;
      addressLine1: string;
      addressLine2?: string | null;
      city: string;
      state?: string | null;
      zipCode: string;
      addressType: AddressType;
      phoneNumber: string;
      preferred?: boolean | null;
    } | null>;
  } | null;
};

export type UserAddressFragmentFragment = {
  __typename?: 'UserAddress';
  id: string;
  firstName: string;
  lastName: string;
  addressLine1: string;
  addressLine2?: string | null;
  city: string;
  state?: string | null;
  zipCode: string;
  addressType: AddressType;
  phoneNumber: string;
  preferred?: boolean | null;
};

export type AddUserAddressMutationVariables = Exact<{
  input: UserAddressInput;
}>;

export type AddUserAddressMutation = {
  __typename?: 'Mutation';
  addUserAddress: {
    __typename?: 'UserAddress';
    id: string;
    firstName: string;
    lastName: string;
    addressLine1: string;
    addressLine2?: string | null;
    city: string;
    state?: string | null;
    zipCode: string;
    addressType: AddressType;
    phoneNumber: string;
    preferred?: boolean | null;
  };
};

export type UpdateUserAddressMutationVariables = Exact<{
  addressId: Scalars['String'];
  input: UserAddressInput;
}>;

export type UpdateUserAddressMutation = {
  __typename?: 'Mutation';
  updateUserAddress: {
    __typename?: 'UserAddress';
    id: string;
    firstName: string;
    lastName: string;
    addressLine1: string;
    addressLine2?: string | null;
    city: string;
    state?: string | null;
    zipCode: string;
    addressType: AddressType;
    phoneNumber: string;
    preferred?: boolean | null;
  };
};

export type DeleteUserAddressMutationVariables = Exact<{
  addressId: Scalars['String'];
}>;

export type DeleteUserAddressMutation = {
  __typename?: 'Mutation';
  deleteUserAddress: {
    __typename?: 'MutationResponsePayload';
    id?: string | null;
    message?: string | null;
  };
};

export type UserQueryVariables = Exact<{ [key: string]: never }>;

export type UserQuery = {
  __typename?: 'Query';
  user?: {
    __typename?: 'User';
    id: string;
    firstName?: string | null;
    lastName?: string | null;
    email?: string | null;
    gender?: Gender | null;
    dateOfBirth?: Date | null;
    phoneNumber?: string | null;
    addresses: Array<{
      __typename?: 'UserAddress';
      id: string;
      firstName: string;
      lastName: string;
      addressLine1: string;
      addressLine2?: string | null;
      city: string;
      state?: string | null;
      zipCode: string;
      addressType: AddressType;
      phoneNumber: string;
      preferred?: boolean | null;
    } | null>;
  } | null;
};

export type UpdateUserMutationVariables = Exact<{
  input?: InputMaybe<UserInput>;
}>;

export type UpdateUserMutation = {
  __typename?: 'Mutation';
  updateUser: { __typename?: 'User'; id: string };
};

export type WishlistQueryVariables = Exact<{ [key: string]: never }>;

export type WishlistQuery = {
  __typename?: 'Query';
  user?: {
    __typename?: 'User';
    id: string;
    wishlist?: Array<{
      __typename?: 'WishlistItem';
      id: string;
      updatedAt: Date;
      createdAt: Date;
      product: {
        __typename?: 'Product';
        id: string;
        title: string;
        description: string;
        imagesUrls: Array<string>;
        price: number;
        brand: { __typename?: 'Brand'; id: string; name: string };
        discount?: {
          __typename?: 'Discount';
          id: string;
          amount: number;
        } | null;
        subProducts: Array<{
          __typename?: 'SubProduct';
          id: string;
          size: Size;
          quantity: number;
        }>;
      };
    } | null> | null;
  } | null;
};

export type WishlistItemFragmentFragment = {
  __typename?: 'WishlistItem';
  id: string;
  updatedAt: Date;
  createdAt: Date;
  product: {
    __typename?: 'Product';
    id: string;
    title: string;
    description: string;
    imagesUrls: Array<string>;
    price: number;
    brand: { __typename?: 'Brand'; id: string; name: string };
    discount?: { __typename?: 'Discount'; id: string; amount: number } | null;
    subProducts: Array<{
      __typename?: 'SubProduct';
      id: string;
      size: Size;
      quantity: number;
    }>;
  };
};

export type AddProductToUserWishlistMutationVariables = Exact<{
  productId: Scalars['String'];
}>;

export type AddProductToUserWishlistMutation = {
  __typename?: 'Mutation';
  addProductToUserWishlist: {
    __typename?: 'WishlistItem';
    id: string;
    updatedAt: Date;
    createdAt: Date;
    product: {
      __typename?: 'Product';
      id: string;
      title: string;
      description: string;
      imagesUrls: Array<string>;
      price: number;
      brand: { __typename?: 'Brand'; id: string; name: string };
      discount?: { __typename?: 'Discount'; id: string; amount: number } | null;
      subProducts: Array<{
        __typename?: 'SubProduct';
        id: string;
        size: Size;
        quantity: number;
      }>;
    };
  };
};

export type AddWishlistedProductToUserCartMutationVariables = Exact<{
  input: AddProductToUserCartInput;
  removeProductFromUserWishlistId: Scalars['String'];
}>;

export type AddWishlistedProductToUserCartMutation = {
  __typename?: 'Mutation';
  addProductToUserCart: {
    __typename?: 'MutationResponsePayload';
    id?: string | null;
  };
  removeProductFromUserWishlist: {
    __typename?: 'MutationResponsePayload';
    id?: string | null;
    message?: string | null;
  };
};

export type RemoveProductFromUserWishlistMutationVariables = Exact<{
  removeProductFromUserWishlistId: Scalars['String'];
}>;

export type RemoveProductFromUserWishlistMutation = {
  __typename?: 'Mutation';
  removeProductFromUserWishlist: {
    __typename?: 'MutationResponsePayload';
    id?: string | null;
    message?: string | null;
  };
};

export const CartItemFragmentFragmentDoc = gql`
  fragment CartItemFragment on CartItem {
    id
    updatedAt
    createdAt
    quantity
    size
    product {
      id
      title
      description
      imagesUrls
      price
      brand {
        id
        name
      }
      discount {
        id
        amount
      }
      subProducts {
        id
        size
        quantity
      }
    }
  }
`;
export const PaymentMethodFragmentFragmentDoc = gql`
  fragment PaymentMethodFragment on User {
    id
    preferredPaymentType
  }
`;
export const CartFragmentFragmentDoc = gql`
  fragment CartFragment on User {
    id
    cart {
      shippingFee
      subTotal
      total
      freeShippingThreshold
      taxAmount
      taxRate {
        rate
        rateLabel
        ratePercentage
      }
      items {
        ...CartItemFragment
      }
    }
    ...PaymentMethodFragment
  }
  ${CartItemFragmentFragmentDoc}
  ${PaymentMethodFragmentFragmentDoc}
`;
export const ProductDetailFragmentDoc = gql`
  fragment ProductDetail on Product {
    id
    subProducts {
      size
      quantity
      id
      colour {
        id
        name
      }
    }
    title
    description
    imagesUrls
    rating
    price
    brand {
      id
      name
    }
    discount {
      id
      amount
    }
    category {
      id
      name
    }
    subCategory {
      id
      name
    }
    productType {
      id
      name
    }
    compositions
    washingInstructions
  }
`;
export const UserAddressFragmentFragmentDoc = gql`
  fragment UserAddressFragment on UserAddress {
    id
    firstName
    lastName
    addressLine1
    addressLine2
    city
    state
    zipCode
    addressType
    phoneNumber
    preferred
  }
`;
export const WishlistItemFragmentFragmentDoc = gql`
  fragment WishlistItemFragment on WishlistItem {
    id
    updatedAt
    createdAt
    product {
      id
      title
      description
      imagesUrls
      price
      brand {
        id
        name
      }
      discount {
        id
        amount
      }
      subProducts {
        id
        size
        quantity
      }
    }
  }
`;
export const CreateUserDocument = gql`
  mutation CreateUser($input: CreateUserInput!) {
    createUser(input: $input) {
      id
    }
  }
`;
export type CreateUserMutationFn = Apollo.MutationFunction<
  CreateUserMutation,
  CreateUserMutationVariables
>;

/**
 * __useCreateUserMutation__
 *
 * To run a mutation, you first call `useCreateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createUserMutation, { data, loading, error }] = useCreateUserMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateUserMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreateUserMutation,
    CreateUserMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<CreateUserMutation, CreateUserMutationVariables>(
    CreateUserDocument,
    options
  );
}
export type CreateUserMutationHookResult = ReturnType<
  typeof useCreateUserMutation
>;
export type CreateUserMutationResult =
  Apollo.MutationResult<CreateUserMutation>;
export type CreateUserMutationOptions = Apollo.BaseMutationOptions<
  CreateUserMutation,
  CreateUserMutationVariables
>;
export const SsoSignOnDocument = gql`
  mutation SSOSignOn($input: SSOSignOnInput!) {
    ssoSignOn(input: $input) {
      id
    }
  }
`;
export type SsoSignOnMutationFn = Apollo.MutationFunction<
  SsoSignOnMutation,
  SsoSignOnMutationVariables
>;

/**
 * __useSsoSignOnMutation__
 *
 * To run a mutation, you first call `useSsoSignOnMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSsoSignOnMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [ssoSignOnMutation, { data, loading, error }] = useSsoSignOnMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useSsoSignOnMutation(
  baseOptions?: Apollo.MutationHookOptions<
    SsoSignOnMutation,
    SsoSignOnMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<SsoSignOnMutation, SsoSignOnMutationVariables>(
    SsoSignOnDocument,
    options
  );
}
export type SsoSignOnMutationHookResult = ReturnType<
  typeof useSsoSignOnMutation
>;
export type SsoSignOnMutationResult = Apollo.MutationResult<SsoSignOnMutation>;
export type SsoSignOnMutationOptions = Apollo.BaseMutationOptions<
  SsoSignOnMutation,
  SsoSignOnMutationVariables
>;
export const CheckoutDocument = gql`
  mutation Checkout($input: CheckoutInput!) {
    checkout(input: $input) {
      id
      message
    }
  }
`;
export type CheckoutMutationFn = Apollo.MutationFunction<
  CheckoutMutation,
  CheckoutMutationVariables
>;

/**
 * __useCheckoutMutation__
 *
 * To run a mutation, you first call `useCheckoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCheckoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [checkoutMutation, { data, loading, error }] = useCheckoutMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCheckoutMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CheckoutMutation,
    CheckoutMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<CheckoutMutation, CheckoutMutationVariables>(
    CheckoutDocument,
    options
  );
}
export type CheckoutMutationHookResult = ReturnType<typeof useCheckoutMutation>;
export type CheckoutMutationResult = Apollo.MutationResult<CheckoutMutation>;
export type CheckoutMutationOptions = Apollo.BaseMutationOptions<
  CheckoutMutation,
  CheckoutMutationVariables
>;
export const CartDocument = gql`
  query Cart {
    user {
      id
      ...CartFragment
    }
  }
  ${CartFragmentFragmentDoc}
`;

/**
 * __useCartQuery__
 *
 * To run a query within a React component, call `useCartQuery` and pass it any options that fit your needs.
 * When your component renders, `useCartQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCartQuery({
 *   variables: {
 *   },
 * });
 */
export function useCartQuery(
  baseOptions?: Apollo.QueryHookOptions<CartQuery, CartQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<CartQuery, CartQueryVariables>(CartDocument, options);
}
export function useCartLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<CartQuery, CartQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<CartQuery, CartQueryVariables>(
    CartDocument,
    options
  );
}
export type CartQueryHookResult = ReturnType<typeof useCartQuery>;
export type CartLazyQueryHookResult = ReturnType<typeof useCartLazyQuery>;
export type CartQueryResult = Apollo.QueryResult<CartQuery, CartQueryVariables>;
export const AddProductToUserCartDocument = gql`
  mutation AddProductToUserCart($input: AddProductToUserCartInput!) {
    addProductToUserCart(input: $input) {
      id
    }
  }
`;
export type AddProductToUserCartMutationFn = Apollo.MutationFunction<
  AddProductToUserCartMutation,
  AddProductToUserCartMutationVariables
>;

/**
 * __useAddProductToUserCartMutation__
 *
 * To run a mutation, you first call `useAddProductToUserCartMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddProductToUserCartMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addProductToUserCartMutation, { data, loading, error }] = useAddProductToUserCartMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useAddProductToUserCartMutation(
  baseOptions?: Apollo.MutationHookOptions<
    AddProductToUserCartMutation,
    AddProductToUserCartMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    AddProductToUserCartMutation,
    AddProductToUserCartMutationVariables
  >(AddProductToUserCartDocument, options);
}
export type AddProductToUserCartMutationHookResult = ReturnType<
  typeof useAddProductToUserCartMutation
>;
export type AddProductToUserCartMutationResult =
  Apollo.MutationResult<AddProductToUserCartMutation>;
export type AddProductToUserCartMutationOptions = Apollo.BaseMutationOptions<
  AddProductToUserCartMutation,
  AddProductToUserCartMutationVariables
>;
export const RemoveProductFromUserCartDocument = gql`
  mutation RemoveProductFromUserCart($cartId: String!) {
    removeProductFromUserCart(id: $cartId) {
      id
    }
  }
`;
export type RemoveProductFromUserCartMutationFn = Apollo.MutationFunction<
  RemoveProductFromUserCartMutation,
  RemoveProductFromUserCartMutationVariables
>;

/**
 * __useRemoveProductFromUserCartMutation__
 *
 * To run a mutation, you first call `useRemoveProductFromUserCartMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveProductFromUserCartMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeProductFromUserCartMutation, { data, loading, error }] = useRemoveProductFromUserCartMutation({
 *   variables: {
 *      cartId: // value for 'cartId'
 *   },
 * });
 */
export function useRemoveProductFromUserCartMutation(
  baseOptions?: Apollo.MutationHookOptions<
    RemoveProductFromUserCartMutation,
    RemoveProductFromUserCartMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    RemoveProductFromUserCartMutation,
    RemoveProductFromUserCartMutationVariables
  >(RemoveProductFromUserCartDocument, options);
}
export type RemoveProductFromUserCartMutationHookResult = ReturnType<
  typeof useRemoveProductFromUserCartMutation
>;
export type RemoveProductFromUserCartMutationResult =
  Apollo.MutationResult<RemoveProductFromUserCartMutation>;
export type RemoveProductFromUserCartMutationOptions =
  Apollo.BaseMutationOptions<
    RemoveProductFromUserCartMutation,
    RemoveProductFromUserCartMutationVariables
  >;
export const UpdateUserCartProductDocument = gql`
  mutation UpdateUserCartProduct($input: UpdateUserCartProductInput!) {
    updateUserCartProduct(input: $input) {
      id
    }
  }
`;
export type UpdateUserCartProductMutationFn = Apollo.MutationFunction<
  UpdateUserCartProductMutation,
  UpdateUserCartProductMutationVariables
>;

/**
 * __useUpdateUserCartProductMutation__
 *
 * To run a mutation, you first call `useUpdateUserCartProductMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateUserCartProductMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateUserCartProductMutation, { data, loading, error }] = useUpdateUserCartProductMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateUserCartProductMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdateUserCartProductMutation,
    UpdateUserCartProductMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    UpdateUserCartProductMutation,
    UpdateUserCartProductMutationVariables
  >(UpdateUserCartProductDocument, options);
}
export type UpdateUserCartProductMutationHookResult = ReturnType<
  typeof useUpdateUserCartProductMutation
>;
export type UpdateUserCartProductMutationResult =
  Apollo.MutationResult<UpdateUserCartProductMutation>;
export type UpdateUserCartProductMutationOptions = Apollo.BaseMutationOptions<
  UpdateUserCartProductMutation,
  UpdateUserCartProductMutationVariables
>;
export const MoveToWishlistDocument = gql`
  mutation MoveToWishlist($productId: String!, $cartId: String!) {
    addProductToUserWishlist(productId: $productId) {
      id
    }
    removeProductFromUserCart(id: $cartId) {
      id
    }
  }
`;
export type MoveToWishlistMutationFn = Apollo.MutationFunction<
  MoveToWishlistMutation,
  MoveToWishlistMutationVariables
>;

/**
 * __useMoveToWishlistMutation__
 *
 * To run a mutation, you first call `useMoveToWishlistMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useMoveToWishlistMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [moveToWishlistMutation, { data, loading, error }] = useMoveToWishlistMutation({
 *   variables: {
 *      productId: // value for 'productId'
 *      cartId: // value for 'cartId'
 *   },
 * });
 */
export function useMoveToWishlistMutation(
  baseOptions?: Apollo.MutationHookOptions<
    MoveToWishlistMutation,
    MoveToWishlistMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    MoveToWishlistMutation,
    MoveToWishlistMutationVariables
  >(MoveToWishlistDocument, options);
}
export type MoveToWishlistMutationHookResult = ReturnType<
  typeof useMoveToWishlistMutation
>;
export type MoveToWishlistMutationResult =
  Apollo.MutationResult<MoveToWishlistMutation>;
export type MoveToWishlistMutationOptions = Apollo.BaseMutationOptions<
  MoveToWishlistMutation,
  MoveToWishlistMutationVariables
>;
export const FiltersDocument = gql`
  query Filters($filters: ProductsInputFilter, $commonType: CommonTypeType!) {
    filters(filters: $filters, commonType: $commonType) {
      id
      name
      filterValues {
        count
        id
        name
      }
    }
  }
`;

/**
 * __useFiltersQuery__
 *
 * To run a query within a React component, call `useFiltersQuery` and pass it any options that fit your needs.
 * When your component renders, `useFiltersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFiltersQuery({
 *   variables: {
 *      filters: // value for 'filters'
 *      commonType: // value for 'commonType'
 *   },
 * });
 */
export function useFiltersQuery(
  baseOptions: Apollo.QueryHookOptions<FiltersQuery, FiltersQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<FiltersQuery, FiltersQueryVariables>(
    FiltersDocument,
    options
  );
}
export function useFiltersLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<FiltersQuery, FiltersQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<FiltersQuery, FiltersQueryVariables>(
    FiltersDocument,
    options
  );
}
export type FiltersQueryHookResult = ReturnType<typeof useFiltersQuery>;
export type FiltersLazyQueryHookResult = ReturnType<typeof useFiltersLazyQuery>;
export type FiltersQueryResult = Apollo.QueryResult<
  FiltersQuery,
  FiltersQueryVariables
>;
export const HomeListingsDocument = gql`
  query HomeListings(
    $commonType: CommonTypeType!
    $filters: ProductsInputFilter
    $initialFilters: ProductsInputFilter
    $sortBy: SortBy
    $pagination: Pagination
  ) {
    products(
      commonType: $commonType
      filters: $filters
      initialFilters: $initialFilters
      sortBy: $sortBy
      pagination: $pagination
    ) {
      id
      title
      description
      imagesUrls
      price
      brand {
        id
        name
      }
      discount {
        id
        amount
      }
    }
  }
`;

/**
 * __useHomeListingsQuery__
 *
 * To run a query within a React component, call `useHomeListingsQuery` and pass it any options that fit your needs.
 * When your component renders, `useHomeListingsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useHomeListingsQuery({
 *   variables: {
 *      commonType: // value for 'commonType'
 *      filters: // value for 'filters'
 *      initialFilters: // value for 'initialFilters'
 *      sortBy: // value for 'sortBy'
 *      pagination: // value for 'pagination'
 *   },
 * });
 */
export function useHomeListingsQuery(
  baseOptions: Apollo.QueryHookOptions<
    HomeListingsQuery,
    HomeListingsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<HomeListingsQuery, HomeListingsQueryVariables>(
    HomeListingsDocument,
    options
  );
}
export function useHomeListingsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    HomeListingsQuery,
    HomeListingsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<HomeListingsQuery, HomeListingsQueryVariables>(
    HomeListingsDocument,
    options
  );
}
export type HomeListingsQueryHookResult = ReturnType<
  typeof useHomeListingsQuery
>;
export type HomeListingsLazyQueryHookResult = ReturnType<
  typeof useHomeListingsLazyQuery
>;
export type HomeListingsQueryResult = Apollo.QueryResult<
  HomeListingsQuery,
  HomeListingsQueryVariables
>;
export const ProductDocument = gql`
  query Product($productId: String!) {
    product(id: $productId) {
      id
      ...ProductDetail
    }
  }
  ${ProductDetailFragmentDoc}
`;

/**
 * __useProductQuery__
 *
 * To run a query within a React component, call `useProductQuery` and pass it any options that fit your needs.
 * When your component renders, `useProductQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProductQuery({
 *   variables: {
 *      productId: // value for 'productId'
 *   },
 * });
 */
export function useProductQuery(
  baseOptions: Apollo.QueryHookOptions<ProductQuery, ProductQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<ProductQuery, ProductQueryVariables>(
    ProductDocument,
    options
  );
}
export function useProductLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<ProductQuery, ProductQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<ProductQuery, ProductQueryVariables>(
    ProductDocument,
    options
  );
}
export type ProductQueryHookResult = ReturnType<typeof useProductQuery>;
export type ProductLazyQueryHookResult = ReturnType<typeof useProductLazyQuery>;
export type ProductQueryResult = Apollo.QueryResult<
  ProductQuery,
  ProductQueryVariables
>;
export const CategoriesDocument = gql`
  query Categories($commonType: CommonTypeType!) {
    categories(commonType: $commonType) {
      id
      name
      subCategories {
        id
        name
        productTypes {
          id
          name
        }
      }
    }
  }
`;

/**
 * __useCategoriesQuery__
 *
 * To run a query within a React component, call `useCategoriesQuery` and pass it any options that fit your needs.
 * When your component renders, `useCategoriesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCategoriesQuery({
 *   variables: {
 *      commonType: // value for 'commonType'
 *   },
 * });
 */
export function useCategoriesQuery(
  baseOptions: Apollo.QueryHookOptions<
    CategoriesQuery,
    CategoriesQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<CategoriesQuery, CategoriesQueryVariables>(
    CategoriesDocument,
    options
  );
}
export function useCategoriesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    CategoriesQuery,
    CategoriesQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<CategoriesQuery, CategoriesQueryVariables>(
    CategoriesDocument,
    options
  );
}
export type CategoriesQueryHookResult = ReturnType<typeof useCategoriesQuery>;
export type CategoriesLazyQueryHookResult = ReturnType<
  typeof useCategoriesLazyQuery
>;
export type CategoriesQueryResult = Apollo.QueryResult<
  CategoriesQuery,
  CategoriesQueryVariables
>;
export const CategoryDocument = gql`
  query Category($categoryId: String!, $commonType: CommonTypeType!) {
    category(id: $categoryId, commonType: $commonType) {
      id
      name
      subCategories {
        id
        name
        productTypes {
          id
          name
        }
      }
    }
  }
`;

/**
 * __useCategoryQuery__
 *
 * To run a query within a React component, call `useCategoryQuery` and pass it any options that fit your needs.
 * When your component renders, `useCategoryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCategoryQuery({
 *   variables: {
 *      categoryId: // value for 'categoryId'
 *      commonType: // value for 'commonType'
 *   },
 * });
 */
export function useCategoryQuery(
  baseOptions: Apollo.QueryHookOptions<CategoryQuery, CategoryQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<CategoryQuery, CategoryQueryVariables>(
    CategoryDocument,
    options
  );
}
export function useCategoryLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    CategoryQuery,
    CategoryQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<CategoryQuery, CategoryQueryVariables>(
    CategoryDocument,
    options
  );
}
export type CategoryQueryHookResult = ReturnType<typeof useCategoryQuery>;
export type CategoryLazyQueryHookResult = ReturnType<
  typeof useCategoryLazyQuery
>;
export type CategoryQueryResult = Apollo.QueryResult<
  CategoryQuery,
  CategoryQueryVariables
>;
export const SearchListingsDocument = gql`
  query SearchListings(
    $commonType: CommonTypeType!
    $filters: ProductsInputFilter
    $initialFilters: ProductsInputFilter
    $sortBy: SortBy
    $pagination: Pagination
  ) {
    products(
      commonType: $commonType
      filters: $filters
      initialFilters: $initialFilters
      sortBy: $sortBy
      pagination: $pagination
    ) {
      id
      title
      description
      imagesUrls
      price
      brand {
        id
        name
      }
      discount {
        id
        amount
      }
    }
  }
`;

/**
 * __useSearchListingsQuery__
 *
 * To run a query within a React component, call `useSearchListingsQuery` and pass it any options that fit your needs.
 * When your component renders, `useSearchListingsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSearchListingsQuery({
 *   variables: {
 *      commonType: // value for 'commonType'
 *      filters: // value for 'filters'
 *      initialFilters: // value for 'initialFilters'
 *      sortBy: // value for 'sortBy'
 *      pagination: // value for 'pagination'
 *   },
 * });
 */
export function useSearchListingsQuery(
  baseOptions: Apollo.QueryHookOptions<
    SearchListingsQuery,
    SearchListingsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<SearchListingsQuery, SearchListingsQueryVariables>(
    SearchListingsDocument,
    options
  );
}
export function useSearchListingsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    SearchListingsQuery,
    SearchListingsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<SearchListingsQuery, SearchListingsQueryVariables>(
    SearchListingsDocument,
    options
  );
}
export type SearchListingsQueryHookResult = ReturnType<
  typeof useSearchListingsQuery
>;
export type SearchListingsLazyQueryHookResult = ReturnType<
  typeof useSearchListingsLazyQuery
>;
export type SearchListingsQueryResult = Apollo.QueryResult<
  SearchListingsQuery,
  SearchListingsQueryVariables
>;
export const SearchDocument = gql`
  query Search($input: SearchInput!) {
    search(input: $input) {
      name
      type
      id
    }
  }
`;

/**
 * __useSearchQuery__
 *
 * To run a query within a React component, call `useSearchQuery` and pass it any options that fit your needs.
 * When your component renders, `useSearchQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSearchQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useSearchQuery(
  baseOptions: Apollo.QueryHookOptions<SearchQuery, SearchQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<SearchQuery, SearchQueryVariables>(
    SearchDocument,
    options
  );
}
export function useSearchLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<SearchQuery, SearchQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<SearchQuery, SearchQueryVariables>(
    SearchDocument,
    options
  );
}
export type SearchQueryHookResult = ReturnType<typeof useSearchQuery>;
export type SearchLazyQueryHookResult = ReturnType<typeof useSearchLazyQuery>;
export type SearchQueryResult = Apollo.QueryResult<
  SearchQuery,
  SearchQueryVariables
>;
export const SubCategoryDocument = gql`
  query SubCategory($subCategoryId: String!, $commonType: CommonTypeType!) {
    subCategory(id: $subCategoryId, commonType: $commonType) {
      id
      name
      productTypes {
        id
        name
      }
    }
  }
`;

/**
 * __useSubCategoryQuery__
 *
 * To run a query within a React component, call `useSubCategoryQuery` and pass it any options that fit your needs.
 * When your component renders, `useSubCategoryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSubCategoryQuery({
 *   variables: {
 *      subCategoryId: // value for 'subCategoryId'
 *      commonType: // value for 'commonType'
 *   },
 * });
 */
export function useSubCategoryQuery(
  baseOptions: Apollo.QueryHookOptions<
    SubCategoryQuery,
    SubCategoryQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<SubCategoryQuery, SubCategoryQueryVariables>(
    SubCategoryDocument,
    options
  );
}
export function useSubCategoryLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    SubCategoryQuery,
    SubCategoryQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<SubCategoryQuery, SubCategoryQueryVariables>(
    SubCategoryDocument,
    options
  );
}
export type SubCategoryQueryHookResult = ReturnType<typeof useSubCategoryQuery>;
export type SubCategoryLazyQueryHookResult = ReturnType<
  typeof useSubCategoryLazyQuery
>;
export type SubCategoryQueryResult = Apollo.QueryResult<
  SubCategoryQuery,
  SubCategoryQueryVariables
>;
export const UserAddressDocument = gql`
  query UserAddress {
    user {
      id
      addresses {
        ...UserAddressFragment
      }
    }
  }
  ${UserAddressFragmentFragmentDoc}
`;

/**
 * __useUserAddressQuery__
 *
 * To run a query within a React component, call `useUserAddressQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserAddressQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserAddressQuery({
 *   variables: {
 *   },
 * });
 */
export function useUserAddressQuery(
  baseOptions?: Apollo.QueryHookOptions<
    UserAddressQuery,
    UserAddressQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<UserAddressQuery, UserAddressQueryVariables>(
    UserAddressDocument,
    options
  );
}
export function useUserAddressLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    UserAddressQuery,
    UserAddressQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<UserAddressQuery, UserAddressQueryVariables>(
    UserAddressDocument,
    options
  );
}
export type UserAddressQueryHookResult = ReturnType<typeof useUserAddressQuery>;
export type UserAddressLazyQueryHookResult = ReturnType<
  typeof useUserAddressLazyQuery
>;
export type UserAddressQueryResult = Apollo.QueryResult<
  UserAddressQuery,
  UserAddressQueryVariables
>;
export const AddUserAddressDocument = gql`
  mutation AddUserAddress($input: UserAddressInput!) {
    addUserAddress(input: $input) {
      id
      ...UserAddressFragment
    }
  }
  ${UserAddressFragmentFragmentDoc}
`;
export type AddUserAddressMutationFn = Apollo.MutationFunction<
  AddUserAddressMutation,
  AddUserAddressMutationVariables
>;

/**
 * __useAddUserAddressMutation__
 *
 * To run a mutation, you first call `useAddUserAddressMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddUserAddressMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addUserAddressMutation, { data, loading, error }] = useAddUserAddressMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useAddUserAddressMutation(
  baseOptions?: Apollo.MutationHookOptions<
    AddUserAddressMutation,
    AddUserAddressMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    AddUserAddressMutation,
    AddUserAddressMutationVariables
  >(AddUserAddressDocument, options);
}
export type AddUserAddressMutationHookResult = ReturnType<
  typeof useAddUserAddressMutation
>;
export type AddUserAddressMutationResult =
  Apollo.MutationResult<AddUserAddressMutation>;
export type AddUserAddressMutationOptions = Apollo.BaseMutationOptions<
  AddUserAddressMutation,
  AddUserAddressMutationVariables
>;
export const UpdateUserAddressDocument = gql`
  mutation UpdateUserAddress($addressId: String!, $input: UserAddressInput!) {
    updateUserAddress(addressId: $addressId, input: $input) {
      id
      ...UserAddressFragment
    }
  }
  ${UserAddressFragmentFragmentDoc}
`;
export type UpdateUserAddressMutationFn = Apollo.MutationFunction<
  UpdateUserAddressMutation,
  UpdateUserAddressMutationVariables
>;

/**
 * __useUpdateUserAddressMutation__
 *
 * To run a mutation, you first call `useUpdateUserAddressMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateUserAddressMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateUserAddressMutation, { data, loading, error }] = useUpdateUserAddressMutation({
 *   variables: {
 *      addressId: // value for 'addressId'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateUserAddressMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdateUserAddressMutation,
    UpdateUserAddressMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    UpdateUserAddressMutation,
    UpdateUserAddressMutationVariables
  >(UpdateUserAddressDocument, options);
}
export type UpdateUserAddressMutationHookResult = ReturnType<
  typeof useUpdateUserAddressMutation
>;
export type UpdateUserAddressMutationResult =
  Apollo.MutationResult<UpdateUserAddressMutation>;
export type UpdateUserAddressMutationOptions = Apollo.BaseMutationOptions<
  UpdateUserAddressMutation,
  UpdateUserAddressMutationVariables
>;
export const DeleteUserAddressDocument = gql`
  mutation DeleteUserAddress($addressId: String!) {
    deleteUserAddress(addressId: $addressId) {
      id
      message
    }
  }
`;
export type DeleteUserAddressMutationFn = Apollo.MutationFunction<
  DeleteUserAddressMutation,
  DeleteUserAddressMutationVariables
>;

/**
 * __useDeleteUserAddressMutation__
 *
 * To run a mutation, you first call `useDeleteUserAddressMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteUserAddressMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteUserAddressMutation, { data, loading, error }] = useDeleteUserAddressMutation({
 *   variables: {
 *      addressId: // value for 'addressId'
 *   },
 * });
 */
export function useDeleteUserAddressMutation(
  baseOptions?: Apollo.MutationHookOptions<
    DeleteUserAddressMutation,
    DeleteUserAddressMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    DeleteUserAddressMutation,
    DeleteUserAddressMutationVariables
  >(DeleteUserAddressDocument, options);
}
export type DeleteUserAddressMutationHookResult = ReturnType<
  typeof useDeleteUserAddressMutation
>;
export type DeleteUserAddressMutationResult =
  Apollo.MutationResult<DeleteUserAddressMutation>;
export type DeleteUserAddressMutationOptions = Apollo.BaseMutationOptions<
  DeleteUserAddressMutation,
  DeleteUserAddressMutationVariables
>;
export const UserDocument = gql`
  query User {
    user {
      id
      firstName
      lastName
      email
      gender
      dateOfBirth
      phoneNumber
      addresses {
        id
        ...UserAddressFragment
      }
    }
  }
  ${UserAddressFragmentFragmentDoc}
`;

/**
 * __useUserQuery__
 *
 * To run a query within a React component, call `useUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserQuery({
 *   variables: {
 *   },
 * });
 */
export function useUserQuery(
  baseOptions?: Apollo.QueryHookOptions<UserQuery, UserQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<UserQuery, UserQueryVariables>(UserDocument, options);
}
export function useUserLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<UserQuery, UserQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<UserQuery, UserQueryVariables>(
    UserDocument,
    options
  );
}
export type UserQueryHookResult = ReturnType<typeof useUserQuery>;
export type UserLazyQueryHookResult = ReturnType<typeof useUserLazyQuery>;
export type UserQueryResult = Apollo.QueryResult<UserQuery, UserQueryVariables>;
export const UpdateUserDocument = gql`
  mutation UpdateUser($input: UserInput) {
    updateUser(input: $input) {
      id
    }
  }
`;
export type UpdateUserMutationFn = Apollo.MutationFunction<
  UpdateUserMutation,
  UpdateUserMutationVariables
>;

/**
 * __useUpdateUserMutation__
 *
 * To run a mutation, you first call `useUpdateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateUserMutation, { data, loading, error }] = useUpdateUserMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateUserMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdateUserMutation,
    UpdateUserMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<UpdateUserMutation, UpdateUserMutationVariables>(
    UpdateUserDocument,
    options
  );
}
export type UpdateUserMutationHookResult = ReturnType<
  typeof useUpdateUserMutation
>;
export type UpdateUserMutationResult =
  Apollo.MutationResult<UpdateUserMutation>;
export type UpdateUserMutationOptions = Apollo.BaseMutationOptions<
  UpdateUserMutation,
  UpdateUserMutationVariables
>;
export const WishlistDocument = gql`
  query Wishlist {
    user {
      id
      wishlist {
        id
        ...WishlistItemFragment
      }
    }
  }
  ${WishlistItemFragmentFragmentDoc}
`;

/**
 * __useWishlistQuery__
 *
 * To run a query within a React component, call `useWishlistQuery` and pass it any options that fit your needs.
 * When your component renders, `useWishlistQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useWishlistQuery({
 *   variables: {
 *   },
 * });
 */
export function useWishlistQuery(
  baseOptions?: Apollo.QueryHookOptions<WishlistQuery, WishlistQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<WishlistQuery, WishlistQueryVariables>(
    WishlistDocument,
    options
  );
}
export function useWishlistLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    WishlistQuery,
    WishlistQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<WishlistQuery, WishlistQueryVariables>(
    WishlistDocument,
    options
  );
}
export type WishlistQueryHookResult = ReturnType<typeof useWishlistQuery>;
export type WishlistLazyQueryHookResult = ReturnType<
  typeof useWishlistLazyQuery
>;
export type WishlistQueryResult = Apollo.QueryResult<
  WishlistQuery,
  WishlistQueryVariables
>;
export const AddProductToUserWishlistDocument = gql`
  mutation AddProductToUserWishlist($productId: String!) {
    addProductToUserWishlist(productId: $productId) {
      id
      ...WishlistItemFragment
    }
  }
  ${WishlistItemFragmentFragmentDoc}
`;
export type AddProductToUserWishlistMutationFn = Apollo.MutationFunction<
  AddProductToUserWishlistMutation,
  AddProductToUserWishlistMutationVariables
>;

/**
 * __useAddProductToUserWishlistMutation__
 *
 * To run a mutation, you first call `useAddProductToUserWishlistMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddProductToUserWishlistMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addProductToUserWishlistMutation, { data, loading, error }] = useAddProductToUserWishlistMutation({
 *   variables: {
 *      productId: // value for 'productId'
 *   },
 * });
 */
export function useAddProductToUserWishlistMutation(
  baseOptions?: Apollo.MutationHookOptions<
    AddProductToUserWishlistMutation,
    AddProductToUserWishlistMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    AddProductToUserWishlistMutation,
    AddProductToUserWishlistMutationVariables
  >(AddProductToUserWishlistDocument, options);
}
export type AddProductToUserWishlistMutationHookResult = ReturnType<
  typeof useAddProductToUserWishlistMutation
>;
export type AddProductToUserWishlistMutationResult =
  Apollo.MutationResult<AddProductToUserWishlistMutation>;
export type AddProductToUserWishlistMutationOptions =
  Apollo.BaseMutationOptions<
    AddProductToUserWishlistMutation,
    AddProductToUserWishlistMutationVariables
  >;
export const AddWishlistedProductToUserCartDocument = gql`
  mutation AddWishlistedProductToUserCart(
    $input: AddProductToUserCartInput!
    $removeProductFromUserWishlistId: String!
  ) {
    addProductToUserCart(input: $input) {
      id
    }
    removeProductFromUserWishlist(productId: $removeProductFromUserWishlistId) {
      id
      message
    }
  }
`;
export type AddWishlistedProductToUserCartMutationFn = Apollo.MutationFunction<
  AddWishlistedProductToUserCartMutation,
  AddWishlistedProductToUserCartMutationVariables
>;

/**
 * __useAddWishlistedProductToUserCartMutation__
 *
 * To run a mutation, you first call `useAddWishlistedProductToUserCartMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddWishlistedProductToUserCartMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addWishlistedProductToUserCartMutation, { data, loading, error }] = useAddWishlistedProductToUserCartMutation({
 *   variables: {
 *      input: // value for 'input'
 *      removeProductFromUserWishlistId: // value for 'removeProductFromUserWishlistId'
 *   },
 * });
 */
export function useAddWishlistedProductToUserCartMutation(
  baseOptions?: Apollo.MutationHookOptions<
    AddWishlistedProductToUserCartMutation,
    AddWishlistedProductToUserCartMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    AddWishlistedProductToUserCartMutation,
    AddWishlistedProductToUserCartMutationVariables
  >(AddWishlistedProductToUserCartDocument, options);
}
export type AddWishlistedProductToUserCartMutationHookResult = ReturnType<
  typeof useAddWishlistedProductToUserCartMutation
>;
export type AddWishlistedProductToUserCartMutationResult =
  Apollo.MutationResult<AddWishlistedProductToUserCartMutation>;
export type AddWishlistedProductToUserCartMutationOptions =
  Apollo.BaseMutationOptions<
    AddWishlistedProductToUserCartMutation,
    AddWishlistedProductToUserCartMutationVariables
  >;
export const RemoveProductFromUserWishlistDocument = gql`
  mutation RemoveProductFromUserWishlist(
    $removeProductFromUserWishlistId: String!
  ) {
    removeProductFromUserWishlist(productId: $removeProductFromUserWishlistId) {
      id
      message
    }
  }
`;
export type RemoveProductFromUserWishlistMutationFn = Apollo.MutationFunction<
  RemoveProductFromUserWishlistMutation,
  RemoveProductFromUserWishlistMutationVariables
>;

/**
 * __useRemoveProductFromUserWishlistMutation__
 *
 * To run a mutation, you first call `useRemoveProductFromUserWishlistMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveProductFromUserWishlistMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeProductFromUserWishlistMutation, { data, loading, error }] = useRemoveProductFromUserWishlistMutation({
 *   variables: {
 *      removeProductFromUserWishlistId: // value for 'removeProductFromUserWishlistId'
 *   },
 * });
 */
export function useRemoveProductFromUserWishlistMutation(
  baseOptions?: Apollo.MutationHookOptions<
    RemoveProductFromUserWishlistMutation,
    RemoveProductFromUserWishlistMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    RemoveProductFromUserWishlistMutation,
    RemoveProductFromUserWishlistMutationVariables
  >(RemoveProductFromUserWishlistDocument, options);
}
export type RemoveProductFromUserWishlistMutationHookResult = ReturnType<
  typeof useRemoveProductFromUserWishlistMutation
>;
export type RemoveProductFromUserWishlistMutationResult =
  Apollo.MutationResult<RemoveProductFromUserWishlistMutation>;
export type RemoveProductFromUserWishlistMutationOptions =
  Apollo.BaseMutationOptions<
    RemoveProductFromUserWishlistMutation,
    RemoveProductFromUserWishlistMutationVariables
  >;
