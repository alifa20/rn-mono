import {
  TransitionPresets,
  createStackNavigator
} from '@react-navigation/stack';
import { ProductDetailScreen } from '../productDetail/productDetail';
import { CheckoutStack } from './checkout/stack';
import { CartScreen } from './cart';
import { Icon } from '@app/components/Icon';
import { View } from 'react-native';

export type BagStackParamList = {
  CartScreen: undefined;
  Home: undefined;
  ProductDetailScreen: {
    productId: string;
  };
  CheckoutStack: undefined;
};

export const BagStack = () => {
  const Stack = createStackNavigator<BagStackParamList>();

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
        name="CartScreen"
        component={CartScreen}
        options={{
          headerTitle: 'Cart'
        }}
      />
      <Stack.Screen
        name="ProductDetailScreen"
        component={ProductDetailScreen}
        options={{
          headerShown: true,
          headerBackTitleVisible: false,
          headerTransparent: true,
          headerTitle: ''
        }}
      />
      <Stack.Screen
        name="CheckoutStack"
        component={CheckoutStack}
        options={{
          title: 'Checkout',
          headerShown: false,
          gestureEnabled: false,
          ...TransitionPresets.ModalSlideFromBottomIOS
        }}
      />
    </Stack.Navigator>
  );
};
