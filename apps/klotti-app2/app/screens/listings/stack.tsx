import {
  StackScreenProps,
  TransitionPresets,
  createStackNavigator
} from '@react-navigation/stack';
import { FormProvider, useForm } from 'react-hook-form';
import { View } from 'react-native';
import { Icon } from '@app/components/Icon';
import { ListingsScreen, ListingsScreenProps } from './listings';
import { FilterStack, FilterStackProps } from '@app/screens/filter/stack';
import {
  ProductDetailScreen,
  ProductDetailScreenProps
} from '@app/screens/productDetail/productDetail';
import { FilterFormData } from '@app/screens/filter/forms/types';
import { SearchStackParamList } from '../search/stack';
import { HomeStackParamList } from '../home/stack';

export type ListingStackProps = ListingsScreenProps;

export type ListingStackParamList = {
  Listings: ListingsScreenProps;
  ProductDetailScreen: ProductDetailScreenProps;
  FilterStack?: FilterStackProps;
};

type Props = StackScreenProps<
  SearchStackParamList | HomeStackParamList,
  'ListingStack'
>;

export const ListingStack = (props: Props) => {
  const Stack = createStackNavigator<ListingStackParamList>();
  const methods = useForm<FilterFormData>({
    defaultValues: {
      sortBy: 'RECOMMENDATION'
    }
  });

  return (
    <FormProvider {...methods}>
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
          name="Listings"
          initialParams={props.route.params}
          options={{
            title: props.route.params.title
          }}
          component={ListingsScreen}
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
          name="FilterStack"
          component={FilterStack}
          initialParams={{
            initialFilters: props.route.params.initialFilters
          }}
          options={{
            title: 'Filter',
            headerShown: false,
            gestureEnabled: false,
            ...TransitionPresets.ModalSlideFromBottomIOS
          }}
        />
      </Stack.Navigator>
    </FormProvider>
  );
};
