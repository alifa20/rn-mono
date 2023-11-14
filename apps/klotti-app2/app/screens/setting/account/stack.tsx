import {
  createStackNavigator,
  StackNavigationProp
} from '@react-navigation/stack';
import { ForgotPasswordScreen } from './forgotPassword';
import { Icon } from '@app/components/Icon';
import { View } from 'react-native';
import { LoginScreen } from './login';
import { RegisterScreen } from './register';

export type AccountStackParamList = {
  LoginScreen: undefined;
  RegisterScreen: undefined;
  ForgotPasswordScreen: undefined;
};

export type AccountStackNavigationProp =
  StackNavigationProp<AccountStackParamList>;

export const AccountStack = () => {
  const Stack = createStackNavigator<AccountStackParamList>();

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: true,
        headerShadowVisible: false,
        headerBackTitleVisible: false,
        headerTitleStyle: {
          fontSize: 24
        },
        headerLeft: ({ onPress }) =>
          onPress && (
            <View className="ml-2">
              <Icon iconName="arrow-left" onPress={onPress} />
            </View>
          )
      }}>
      <Stack.Screen
        name="LoginScreen"
        component={LoginScreen}
        options={{
          headerTitle: ''
        }}
      />
      <Stack.Screen
        name="RegisterScreen"
        component={RegisterScreen}
        options={{
          headerTitle: ''
        }}
      />
      <Stack.Screen
        name="ForgotPasswordScreen"
        component={ForgotPasswordScreen}
        options={{
          headerTitle: ''
        }}
      />
    </Stack.Navigator>
  );
};
