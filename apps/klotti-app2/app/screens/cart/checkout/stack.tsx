import { createStackNavigator } from '@react-navigation/stack';
import { ChooseAddressScreen } from './chooseAddress';
import { View } from 'react-native';
import { Icon } from '@app/components/Icon';
import { SelectCardScreen } from './SelectCard';
import { AddNewCardScreen } from './AddNewCardScreen';
import { CheckoutScreen } from './checkout';
import {
  ManageAddressAddEditScreen,
  ManageAddressAddEditScreenProps
} from '@app/screens/setting/address/manageAddressAddEdit';
import { PaymentMethodScreen } from './paymentMethod';
import { OrderSuccessScreen } from './orderSuccess';

export type CheckoutStackParamList = {
  CheckoutScreen: { addressId?: string };
  ChooseAddressScreen: undefined;
  ManageAddressAddEditScreen: ManageAddressAddEditScreenProps;
  PaymentMethodScreen: undefined;
  SelectCardScreen: undefined;
  AddNewCardScreen: undefined;
  OrderSuccessScreen: undefined;
};

export const CheckoutStack = () => {
  const Stack = createStackNavigator<CheckoutStackParamList>();

  return (
    <Stack.Navigator
      screenOptions={{
        headerTitle: 'Checkout',
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
        name="CheckoutScreen"
        component={CheckoutScreen}
        options={{
          headerTitle: 'Checkout'
        }}
      />
      <Stack.Screen
        name="ChooseAddressScreen"
        component={ChooseAddressScreen}
        options={{
          headerTitle: 'Delivery Address'
        }}
      />
      <Stack.Screen
        name="ManageAddressAddEditScreen"
        component={ManageAddressAddEditScreen}
        options={{
          headerTitle: 'Manage Address'
        }}
      />
      <Stack.Screen
        name="PaymentMethodScreen"
        component={PaymentMethodScreen}
        options={{
          headerTitle: 'Payment Method'
        }}
      />
      <Stack.Screen
        name="SelectCardScreen"
        component={SelectCardScreen}
        options={{
          headerTitle: 'Select Card'
        }}
      />
      <Stack.Screen
        name="AddNewCardScreen"
        component={AddNewCardScreen}
        options={{
          headerTitle: 'Add New Card'
        }}
      />
      <Stack.Screen name="OrderSuccessScreen" component={OrderSuccessScreen} />
    </Stack.Navigator>
  );
};
