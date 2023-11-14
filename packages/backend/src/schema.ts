import lodash from 'lodash';
import { mergeTypeDefs } from '@graphql-tools/merge';
import { userResolvers, userTypeDefs } from './users';
import { productResolvers, productTypeDefs } from './products';
import { brandResolvers, brandTypeDefs } from './brands';
import { categoryResolvers, categoryTypeDefs } from './categories';
import { searchResolvers, searchTypeDefs } from './search';
import { collectionResolvers, collectionTypeDefs } from './collections';
import { orderResolvers, orderTypeDefs } from './order';

// Think about merge typedefs "@graphql-tools/merge": "^8.2.3",
// as to can we get by by not using it and just use array?
export const rootTypeDefs = mergeTypeDefs([
  userTypeDefs,
  productTypeDefs,
  brandTypeDefs,
  categoryTypeDefs,
  searchTypeDefs,
  collectionTypeDefs,
  orderTypeDefs
]);

// Not sure what the type should be
export const rootResolvers: any = lodash.merge(
  userResolvers,
  productResolvers,
  brandResolvers,
  categoryResolvers,
  searchResolvers,
  collectionResolvers,
  orderResolvers
);
