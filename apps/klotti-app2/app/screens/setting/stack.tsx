import {
  createStackNavigator,
  TransitionPresets
} from '@react-navigation/stack';
import { SettingsRootScreen } from './setting';
import { UnauthenticatedScreen } from './account/unauthenticatedScreen';
import { AccountDetailScreen } from './profile/AccountDetail';
import { EditAccountDetailScreen } from './profile/EditAccountDetail';
import { ManageAddressAddEditScreen } from './address/manageAddressAddEdit';
import { AccountStack, AccountStackParamList } from './account/stack';
import { Icon } from '@app/components/Icon';
import { View } from 'react-native';
import { useAuthStore } from '@app/auth';
import { NavigatorScreenParams } from '@react-navigation/core';
import { HelpAndSupportScreen } from './account/helpAndSupport';
import { ManageAddressAddEditScreenProps } from './address/manageAddressAddEdit';
import { ManageAddressRootScreen } from './address/manageAddress';

export type SettingsStackParamList = {
  LoginScreen: undefined;
  RegisterScreen: undefined;
  EditAccountDetailScreen: undefined;
  UnauthenticatedScreen: undefined;
  ManageAddressRootScreen: undefined;
  ManageAddressAddEditScreen: ManageAddressAddEditScreenProps;
  SettingsScreen: undefined;
  AccountDetailScreen: undefined;
  HelpAndSupportScreen: undefined;
  AccountStack: NavigatorScreenParams<AccountStackParamList>;
};

export const SettingsStack = () => {
  const Stack = createStackNavigator<SettingsStackParamList>();

  const { userId } = useAuthStore();

  return (
    <Stack.Navigator
      screenOptions={{
        headerTitle: 'Setting',
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
      {userId ? (
        <>
          <Stack.Screen
            name="SettingsScreen"
            component={SettingsRootScreen}
            options={{ headerLeft: () => null }}
          />
          <Stack.Screen
            name="AccountDetailScreen"
            component={AccountDetailScreen}
            options={{
              headerTitle: 'Account'
            }}
          />
          <Stack.Screen
            name="ManageAddressRootScreen"
            component={ManageAddressRootScreen}
            options={{
              headerTitle: 'Manage Address'
            }}
          />
          <Stack.Screen
            name="ManageAddressAddEditScreen"
            component={ManageAddressAddEditScreen}
          />
          <Stack.Screen
            name="EditAccountDetailScreen"
            component={EditAccountDetailScreen}
            options={{
              headerTitle: 'Edit Account'
            }}
          />
          <Stack.Screen
            name="HelpAndSupportScreen"
            component={HelpAndSupportScreen}
            options={{
              headerTitle: 'Help and support'
            }}
          />
        </>
      ) : (
        <>
          <Stack.Screen
            name="UnauthenticatedScreen"
            options={{ headerLeft: () => null }}
            component={UnauthenticatedScreen}
          />

          <Stack.Screen
            name="AccountStack"
            component={AccountStack}
            options={{
              headerShown: false,
              ...TransitionPresets.ModalSlideFromBottomIOS
            }}
          />
        </>
      )}
    </Stack.Navigator>
  );
};
