import { createStackNavigator } from '@react-navigation/stack';
import {
  ProductDetailScreen,
  ProductDetailScreenProps
} from '../productDetail/productDetail';
import { Icon } from '@app/components/Icon';
import { Pressable, View, Image } from 'react-native';
import {
  CollectionDetailScreen,
  CollectionDetailScreenProps
} from './colectionDetail';
import { ListingStack, ListingStackProps } from '../listings/stack';
import { HomeScreen } from './home';

export type HomeStackParamList = {
  HomeScreen: undefined;
  TrendingScreen: undefined;
  ProductDetailScreen: ProductDetailScreenProps;
  CollectionDetailScreen: CollectionDetailScreenProps;
  ListingStack: ListingStackProps;
};

export const HomeStack = () => {
  const Stack = createStackNavigator<HomeStackParamList>();

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
        name="HomeScreen"
        component={HomeScreen}
        options={{
          headerShown: false
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
        name="CollectionDetailScreen"
        component={CollectionDetailScreen}
        options={{
          headerShown: true,
          headerBackTitleVisible: false,
          headerTransparent: false,
          headerTitle: '',
          headerLeft: ({ onPress }) =>
            onPress && (
              <Pressable onPress={onPress}>
                <Image
                  source={require('@assets/icons/app-logo-dark.png')}
                  className="ml-4 h-10 w-10"
                  resizeMode="contain"
                />
              </Pressable>
            ),
          headerRight: () => (
            <Image
              source={require('@assets/icons/box.png')}
              className="mr-4 h-8 w-8"
              resizeMode="contain"
            />
          )
        }}
      />

      <Stack.Screen
        name="ListingStack"
        component={ListingStack}
        options={{
          headerShown: false
        }}
      />
    </Stack.Navigator>
  );
};
