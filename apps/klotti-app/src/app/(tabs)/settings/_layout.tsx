import { BackButton } from '@klotti/ui';
import { Stack, useRouter } from 'expo-router';

export const SettingsLayout = () => {
  const { back } = useRouter();

  return (
    <Stack
      screenOptions={{
        headerLeft: () => <BackButton onPress={back} />
      }}>
      <Stack.Screen
        name='index'
        options={{
          title: 'Settings',
          headerLeft: () => null
        }}
      />
      <Stack.Screen
        name='login'
        options={{
          title: 'Login',
          headerTitle: ''
        }}
      />
      <Stack.Screen
        name='register'
        options={{
          title: 'Register',
          headerTitle: ''
        }}
      />
    </Stack>
  );
};

export default SettingsLayout;
