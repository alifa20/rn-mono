import { auth } from '@/firebase/auth';
import { Box, Button, Text } from '@klotti/ui';
import React from 'react';

export const Authenticated = () => {
  return (
    <Box>
      <Text>Authenticated</Text>
      <Button
        onPress={() => {
          auth.signOut();
        }}
        label='logout'
      />
    </Box>
  );
};
