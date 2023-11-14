import { BackButton } from '@klotti/ui';
import { Stack, useRouter } from 'expo-router';

export const CartLayout = () => {
  const { back } = useRouter();

  return (
    <Stack
      screenOptions={{
        headerLeft: () => <BackButton onPress={back} />
      }}>
      <Stack.Screen
        name='index'
        options={{
          title: 'Cart',
          headerLeft: () => null
        }}
      />
    </Stack>
  );
};

export default CartLayout;
