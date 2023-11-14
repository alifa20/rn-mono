import { createStackNavigator } from '@react-navigation/stack';
import { SearchScreen } from './search';
import { ProductDetailScreen } from '../productDetail/productDetail';
import {
  SearchSubCategoryScreenProps,
  SearchSubCategoryScreen
} from './searchSubCategory';
import {
  SearchProductTypeScreen,
  SearchProductTypeScreenProps
} from './searchProductTypes';
import { Icon } from '@app/components/Icon';
import { View } from 'react-native';
import { ListingStack, ListingStackProps } from '../listings/stack';

export type SearchStackParamList = {
  SearchScreen: undefined;
  SearchSubCategoryScreen: SearchSubCategoryScreenProps;
  SearchProductTypeScreen: SearchProductTypeScreenProps;
  ProductDetailScreen: {
    productId: string;
  };
  FilterStack: undefined;
  ListingStack: ListingStackProps;
};

export const SearchStack = () => {
  const Stack = createStackNavigator<SearchStackParamList>();

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
        name="SearchScreen"
        component={SearchScreen}
        options={{
          title: 'Search',
          headerLeft: () => null
        }}
      />
      <Stack.Screen
        name="SearchSubCategoryScreen"
        component={SearchSubCategoryScreen}
      />
      <Stack.Screen
        name="SearchProductTypeScreen"
        component={SearchProductTypeScreen}
      />
      <Stack.Screen
        name="ProductDetailScreen"
        component={ProductDetailScreen}
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
