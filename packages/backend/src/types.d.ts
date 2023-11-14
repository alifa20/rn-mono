export {
  Gender,
  CommonTypeType,
  Size,
  AddressType,
  Product,
  PaymentType,
  LoginMethod
} from '@prisma/client';

const SearchType: {
  CATEGORY: 'CATEGORY';
  BRAND: 'BRAND';
  PRODUCT: 'PRODUCT';
  PRODUCT_TYPE: 'PRODUCT_TYPE';
};

export type SearchType = (typeof SearchType)[keyof typeof SearchType];
