import { BackButton } from '@klotti/ui';
import { Stack, useRouter } from 'expo-router';

type Group<T extends string> = `(${T})`;
export type SharedSegment = Group<'index'> | Group<'search'>;

export default function DynamicLayout({ segment }: { segment: SharedSegment }) {
  const { back } = useRouter();

  if (segment === '(index)') {
    return (
      <Stack
        screenOptions={{
          headerLeft: () => <BackButton onPress={back} />
        }}>
        <Stack.Screen
          name='index'
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen
          name='product/[id]'
          options={{
            headerTitle: ''
          }}
        />
        <Stack.Screen
          name='products'
          options={{
            headerShown: false
          }}
        />
      </Stack>
    );
  }

  if (segment === '(search)') {
    return (
      <Stack
        screenOptions={{
          headerLeft: () => <BackButton onPress={back} />
        }}>
        <Stack.Screen
          name='search'
          options={{
            // headerTitle: 'Search',
            // headerLeft: () => null
            headerShown: false
          }}
        />
        <Stack.Screen
          name='product/[id]'
          options={{
            headerTitle: '',
            headerTransparent: true
          }}
        />
        <Stack.Screen
          name='products'
          options={{
            headerShown: false
          }}
        />
      </Stack>
    );
  }

  if (segment === '(cart)') {
    return (
      <Stack
        screenOptions={{
          headerLeft: () => <BackButton onPress={back} />
        }}>
        <Stack.Screen
          name='cart'
          options={{
            title: 'Cart',
            headerLeft: () => null,
            headerShown: false
          }}
        />
        <Stack.Screen
          name='product/[id]'
          options={{
            headerTitle: '',
            headerTransparent: true
          }}
        />
      </Stack>
    );
  }

  if (segment === '(wishlist)') {
    return (
      <Stack
        screenOptions={{
          headerLeft: () => <BackButton onPress={back} />
        }}>
        <Stack.Screen
          name='wishlist'
          options={{
            title: 'Wishlist',
            headerLeft: () => null,
            headerShown: false
          }}
        />
        <Stack.Screen
          name='product/[id]'
          options={{
            headerTitle: '',
            headerTransparent: true
          }}
        />
      </Stack>
    );
  }
}
