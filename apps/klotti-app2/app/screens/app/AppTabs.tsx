import { useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Feather from 'react-native-vector-icons/Feather';
import { DeviceEventEmitter } from 'react-native';
import { BagStack } from '../cart/stack';

import { SearchStack } from '../search/stack';

import { WishlistStack } from '../wishlist/WishlistStack';
import { HomeStack } from '../home/stack';
import { SettingsStack } from '../setting/stack';

export type AppStackParamList = {
  Home: undefined;
  Search: undefined;
  Bag: undefined;
  Wishlist: undefined;
  Settings: undefined;
};

export const Tabs = createBottomTabNavigator<AppStackParamList>();

export const AppTabs = () => {
  const [hideTabBar, sethideTabBar] = useState(false);

  DeviceEventEmitter.addListener('hideTabBar', event => {
    sethideTabBar(event);
  });

  return (
    <Tabs.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: 'black',
        tabBarStyle: {
          display: hideTabBar ? 'none' : 'flex'
        }
      }}>
      <Tabs.Screen
        name="Home"
        component={HomeStack}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Feather name="home" color={color} size={size} />
          )
        }}
      />
      <Tabs.Screen
        name="Search"
        component={SearchStack}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Feather name="search" color={color} size={size} />
          )
        }}
      />
      <Tabs.Screen
        name="Bag"
        component={BagStack}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Feather name="shopping-bag" color={color} size={size} />
          )
        }}
      />
      <Tabs.Screen
        name="Wishlist"
        component={WishlistStack}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Feather name="heart" color={color} size={size} />
          )
        }}
      />
      <Tabs.Screen
        name="Settings"
        component={SettingsStack}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Feather name="settings" color={color} size={size} />
          )
        }}
      />
    </Tabs.Navigator>
  );
};
