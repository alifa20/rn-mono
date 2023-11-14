import { Icon } from '@app/components/Icon';
import {
  StackScreenProps,
  TransitionPresets,
  createStackNavigator
} from '@react-navigation/stack';
import { View } from 'react-native';
import { FilterScreen, FilterScreenProps } from './filter';
import { BrandFilterScreen } from './by/brandFilter';
import { CategoryFilterScreen } from './by/categoryFilter';
import { ColourFilterScreen } from './by/colourFilter';
import { PriceRangeFilterScreen } from './by/priceRangeFilter';
import { ProductTypeFilterScreen } from './by/productTypeFilter';
import { SizeFilterScreen } from './by/sizeFilter';
import { SubCategoryFilterScreen } from './by/subCategoryFilter';
import { ProductsInputFilter } from '@app/__graphql__/generated';
import { ListingStackParamList } from '../listings/stack';

export type FilterStackParamList = {
  FilterScreen: FilterScreenProps;

  CategoryFilterScreen: undefined;
  SubCategoryFilterScreen: undefined;
  ProductTypeFilterScreen: undefined;
  BrandFilterScreen: undefined;
  PriceRangeFilterScreen: undefined;
  SizeFilterScreen: undefined;
  ColourFilterScreen: undefined;
};

export type FilterStackProps = {
  initialFilters?: ProductsInputFilter;
};

type Props = StackScreenProps<
  ListingStackParamList | ListingStackParamList,
  'FilterStack'
>;

export const FilterStack = (props?: Props) => {
  const Stack = createStackNavigator<FilterStackParamList>();

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
        name="FilterScreen"
        component={FilterScreen}
        initialParams={{
          initialFilters: props?.route.params?.initialFilters
        }}
        options={{
          title: 'Filter',
          ...TransitionPresets.ModalSlideFromBottomIOS
        }}
      />

      <Stack.Screen
        name="CategoryFilterScreen"
        component={CategoryFilterScreen}
        options={{
          headerTitle: 'Categories'
        }}
      />
      <Stack.Screen
        name="SubCategoryFilterScreen"
        component={SubCategoryFilterScreen}
        options={{
          headerTitle: 'Sub Categories'
        }}
      />
      <Stack.Screen
        name="ProductTypeFilterScreen"
        component={ProductTypeFilterScreen}
        options={{
          headerTitle: 'Product Types'
        }}
      />
      <Stack.Screen
        name="BrandFilterScreen"
        component={BrandFilterScreen}
        options={{
          headerTitle: 'Brands'
        }}
      />
      <Stack.Screen
        name="ColourFilterScreen"
        component={ColourFilterScreen}
        options={{
          headerTitle: 'Colours'
        }}
      />
      <Stack.Screen
        name="SizeFilterScreen"
        component={SizeFilterScreen}
        options={{
          headerTitle: 'Size'
        }}
      />
      <Stack.Screen
        name="PriceRangeFilterScreen"
        component={PriceRangeFilterScreen}
        options={{
          headerTitle: 'Price Range'
        }}
      />
    </Stack.Navigator>
  );
};
