import {
  createHttpLink,
  ApolloClient,
  from,
  InMemoryCache,
  ApolloProvider
} from '@apollo/client';
import { onError } from '@apollo/client/link/error';
import { setContext } from '@apollo/client/link/context';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { concatPagination } from '@apollo/client/utilities';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useFonts } from 'expo-font';
import { SplashScreen, Stack } from 'expo-router';
import { useEffect } from 'react';
import { NativeWindStyleSheet } from 'nativewind';
import { ThemeProvider as RNThemeProvider } from '@react-navigation/native';
import { ThemeProvider, ToastProvider } from '@klotti/ui';

import { GRAPHQL_API } from '@env';
import { UnauthenticatedSheetProvider } from '../components/UnauthenticatedSheet';
import { useAuthStore } from '../auth';
import { useCommonTypeStore } from '../store/commonType/useCommonTypeStore';
import { auth } from '@/firebase/auth';
import { StatusBar } from 'react-native';

NativeWindStyleSheet.setOutput({
  default: 'native'
});

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary
} from 'expo-router';

// export const unstable_settings = {
//   // Ensure that reloading on `/modal` keeps a back button present.
//   initialRouteName: 'home'
// };

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

const httpLink = createHttpLink({
  uri: GRAPHQL_API
});

export default function RootLayout() {
  const { token } = useAuthStore();
  const { commonType } = useCommonTypeStore();

  const errorLink = onError(
    ({ graphQLErrors, networkError, operation, forward }) => {
      if (graphQLErrors) {
        for (let err of graphQLErrors) {
          switch (err.extensions.code) {
            // Apollo Server sets code to UNAUTHENTICATED
            // when an AuthenticationError is thrown in a resolver
            case 'UNAUTHENTICATED':
              // Modify the operation context with a new token
              const oldHeaders = operation.getContext().headers;
              // const newToken = getNewToken();
              operation.setContext({
                headers: {
                  ...oldHeaders,
                  // authorization: getNewToken()
                  authorization: token
                }
              });
              return forward(operation);
          }
        }
      }

      // To retry on network errors, we recommend the RetryLink
      // instead of the onError link. This just logs the error.
      if (networkError) {
        // eslint-disable-next-line no-console
        console.log(`[Network error]: ${networkError}`);
      }
    }
  );

  const authMiddleware = setContext(async (_, { headers }) => {
    return {
      headers: {
        ...headers,
        authorization: token
      }
    };
  });

  const client = new ApolloClient({
    link: from([authMiddleware, errorLink, httpLink]),
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
    defaultOptions: {
      watchQuery: {
        errorPolicy: 'all'
      },
      query: {
        errorPolicy: 'all'
      },
      mutate: {
        errorPolicy: 'all'
      }
    },
    connectToDevTools: true
  });

  const [loaded, error] = useFonts({
    SpaceMono: require('../../assets/fonts/SpaceMono-Regular.ttf'),
    ...FontAwesome.font
  });

  const { setToken, setUserId, clearStore } = useAuthStore();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async user => {
      if (user) {
        const userToken = await user.getIdToken();

        setUserId(user.uid);
        setToken(userToken);
      } else {
        clearStore();
      }
    });
    return () => unsubscribe();
  }, [clearStore, setToken, setUserId]);

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    SplashScreen.hideAsync();

    if (loaded) {
      setTimeout(
        () => {
          SplashScreen.hideAsync();
        },
        // FIXME: This is a hack when commonType is set, therefore we need to navigate to the next screen
        commonType ? 2000 : 0
      );
    }
  }, [commonType, loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ApolloProvider client={client}>
      <GestureHandlerRootView
        style={{
          flex: 1
        }}>
        <ThemeProvider>
          <StatusBar barStyle={'dark-content'} />

          {/* TODO: Fix it later */}
          <RNThemeProvider
            value={{
              dark: false,
              colors: {
                primary: '#000000',
                background: '#ffffff',
                card: '#ffffff',
                text: '#000000',
                border: 'rgb(216, 216, 216)',
                notification: 'rgb(255, 59, 48)'
              }
            }}>
            <BottomSheetModalProvider>
              <ToastProvider>
                <UnauthenticatedSheetProvider>
                  <Stack>
                    <Stack.Screen
                      name='index'
                      options={{
                        headerShown: false
                      }}
                    />
                    <Stack.Screen
                      name='(tabs)'
                      options={{ headerShown: false }}
                    />
                  </Stack>
                </UnauthenticatedSheetProvider>
              </ToastProvider>
            </BottomSheetModalProvider>
          </RNThemeProvider>
        </ThemeProvider>
      </GestureHandlerRootView>
    </ApolloProvider>
  );
}
