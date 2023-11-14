import { Feather } from '@expo/vector-icons';
import { Tabs } from 'expo-router';

export default function TabLayout() {
  return (
    <Tabs
      backBehavior='none'
      screenOptions={{
        headerShown: false
      }}>
      <Tabs.Screen
        name='(index)'
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size }) => (
            <Feather name='home' color={color} size={size} />
          ),
          headerShown: false
        }}
      />
      <Tabs.Screen
        name='(search)'
        options={{
          title: 'Search',
          tabBarIcon: ({ color, size }) => (
            <Feather name='search' color={color} size={size} />
          )
        }}
      />
      <Tabs.Screen
        name='(cart)'
        options={{
          title: 'Cart',
          tabBarIcon: ({ color, size }) => (
            <Feather name='shopping-bag' color={color} size={size} />
          )
        }}
      />
      <Tabs.Screen
        name='(wishlist)'
        options={{
          title: 'Wishlist',
          tabBarIcon: ({ color, size }) => (
            <Feather name='heart' color={color} size={size} />
          )
        }}
      />
      <Tabs.Screen
        name='settings'
        options={{
          title: 'Settings',
          tabBarIcon: ({ color, size }) => (
            <Feather name='settings' color={color} size={size} />
          )
        }}
      />
    </Tabs>
  );
}
