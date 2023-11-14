import { Unauthenticated } from '@/src/templates';
import { useRouter } from 'expo-router';
import React from 'react';

export const UnAuthenticatedScreen = () => {
  const { push } = useRouter();
  return (
    <Unauthenticated
      onLogin={() => push('/settings/login')}
      onRegister={() => push('/settings/register')}
    />
  );
};

export default UnAuthenticatedScreen;
