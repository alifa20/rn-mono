import { SafeAreaProvider } from 'react-native-safe-area-context';
import {
  ApolloClient,
  ApolloProvider,
  createHttpLink,
  InMemoryCache,
  from
} from '@apollo/client';
import Toast from 'react-native-toast-message';

import { LogBox } from 'react-native';
import { setContext } from '@apollo/client/link/context';
import { useAuthStore } from './auth';
import { Routes } from './screens/app/routes';
import { concatPagination } from '@apollo/client/utilities';
import { GRAPHQL_API } from '@env';

import { toastConfig } from './config/toastConfig';

console.log('GRAPHQL_API1', GRAPHQL_API);

const httpLink = createHttpLink({
  uri: GRAPHQL_API
});

const AppContainer = () => {
  LogBox.ignoreLogs(['NativeBase: The contrast ratio of']);
  const { token } = useAuthStore();

  const authMiddleware = setContext(async (_, { headers }) => {
    return {
      headers: {
        ...headers,
        authorization: token
      }
    };
  });

  const client = new ApolloClient({
    link: from([authMiddleware, httpLink]),
    cache: new InMemoryCache({
      typePolicies: {
        Query: {
          fields: {
            products: concatPagination([
              'id',
              'filters',
              'initialFilters',
              'sortBy',
              'commonTypes'
            ])
          }
        }
      }
    }),
    connectToDevTools: true
  });

  return (
    <>
      <SafeAreaProvider>
        <ApolloProvider client={client}>
          <Routes />
        </ApolloProvider>
      </SafeAreaProvider>
      <Toast config={toastConfig} />
    </>
  );
};

export default AppContainer;
