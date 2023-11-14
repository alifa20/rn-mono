import { BackButton } from '@klotti/ui';
import { Stack, useRouter } from 'expo-router';

export const WishlistLayout = () => {
  const { back } = useRouter();

  return (
    <Stack
      screenOptions={{
        headerLeft: () => <BackButton onPress={back} />
      }}>
      <Stack.Screen
        name='index'
        options={{
          title: 'Wishlist',
          headerLeft: () => null
        }}
      />
    </Stack>
  );
};

export default WishlistLayout;
