import { useAuthStore } from '@/src/auth';
import { Authenticated, Unauthenticated } from '@/src/templates';
import { useRouter } from 'expo-router';

export const SettingsScreen = () => {
  const { userId } = useAuthStore();
  const { push } = useRouter();

  return userId ? (
    <Authenticated />
  ) : (
    <Unauthenticated
      onRegister={() => {
        push('/settings/register');
      }}
      onLogin={() => {
        push('/settings/login');
      }}
    />
  );
};

export default SettingsScreen;
