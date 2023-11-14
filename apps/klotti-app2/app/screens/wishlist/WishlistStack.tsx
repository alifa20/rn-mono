import { createStackNavigator } from '@react-navigation/stack';
import { View } from 'react-native';
import { WishlistScreen } from '@app/screens/wishlist/wishlist';
import { ProductDetailScreen } from '../productDetail/productDetail';

export type WishlistStackParamList = {
  WishlistScreen: undefined;
  Home: undefined;
  ProductDetailScreen: {
    productId: string;
  };
};

export const WishlistStack = () => {
  const Stack = createStackNavigator<WishlistStackParamList>();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="WishlistScreen"
        component={WishlistScreen}
        options={{
          headerTitle: 'Wishlist',
          headerShadowVisible: false,
          headerLeft: () => null,
          headerRight: () => (
            <View className="flex-row">
              {/* <Image source={WishListIcon} className="h-6 w-6" /> */}
              <View className="w-4" />
            </View>
          )
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
    </Stack.Navigator>
  );
};
