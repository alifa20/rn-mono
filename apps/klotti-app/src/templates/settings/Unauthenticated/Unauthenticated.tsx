import { Container } from '@/src/components';
import { Button, Text } from '@klotti/ui';
import React from 'react';

type Props = {
  onRegister: () => void;
  onLogin: () => void;
};

export const Unauthenticated = ({ onRegister, onLogin }: Props) => {
  return (
    <Container>
      <Text>Login or create an account?</Text>

      <Button label='Register' onPress={onRegister} />
      <Button label='Login' onPress={onLogin} />
      <Button label='Need Help?' onPress={() => {}} />
    </Container>
  );
};
