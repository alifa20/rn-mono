import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'react-native';
// import * as SplashScreen from 'expo-splash-screen';
import { AppTabs } from './AppTabs';

import { GenderSelectionScreen } from '../initialSetup/genderSelection';
import auth from '@react-native-firebase/auth';

import { useAuthStore } from '@app/auth';
import { useCommonTypeStore } from '@app/store/commonType/useCommonTypeStore';

export type RootStackParamList = {
  CheckSetupScreen: undefined;
  LanguageSelection: undefined;
  GenderSelectionScreen: undefined;
  InitialSetupStack: undefined;
  ProductDetailScreen: {
    productId: string;
  };
  App: undefined;
};

export const Routes = () => {
  const RootStack = createStackNavigator<RootStackParamList>();
  const { commonType } = useCommonTypeStore();

  const { setUserId, setToken, clearStore } = useAuthStore();

  // This hook is used to run when the user is just signed in
  useEffect(() => {
    const subscribe = auth().onAuthStateChanged(async user => {
      if (user) {
        const token = await user.getIdToken();
        setUserId(user.uid);
        setToken(token);
      } else {
        clearStore();
      }
    });

    return subscribe;
  }, [clearStore, setToken, setUserId]);

  // This is when the token expires, this will grab the new token from the firebase
  useEffect(() => {
    const subscribe = auth().onIdTokenChanged(async user => {
      if (user) {
        const token = await user.getIdToken();
        setToken(token);
      }
    });

    return subscribe;
  }, [setToken]);

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <NavigationContainer
        theme={{
          ...DefaultTheme,
          colors: {
            ...DefaultTheme.colors,
            background: 'white'
          }
        }}>
        <RootStack.Navigator
          screenOptions={{
            headerShown: false,
            gestureEnabled: false
          }}>
          {!commonType && (
            <RootStack.Screen
              name="GenderSelectionScreen"
              component={GenderSelectionScreen}
            />
          )}
          <RootStack.Screen name="App" component={AppTabs} />
        </RootStack.Navigator>
      </NavigationContainer>
    </>
  );
};
