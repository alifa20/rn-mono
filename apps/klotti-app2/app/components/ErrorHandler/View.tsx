import { Button, View } from 'react-native';
import React from 'react';

type ErrorHandlerViewProps = {
  errorMessage: string;
  signOut: () => void;
};

export const ErrorHandlerView = ({
  errorMessage,
  signOut
}: ErrorHandlerViewProps) => {
  return (
    <View className="flex justify-center">
      {errorMessage}
      <Button title="Logout" onPress={signOut} />
    </View>
  );
};
