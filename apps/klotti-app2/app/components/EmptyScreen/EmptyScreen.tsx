import React from 'react';
import { View, Text } from 'react-native';
import { Button } from '@app/components/buttons/Button';

type Props = {
  title: string;
  description: string;
  action: {
    label: string;
    onPress: () => void;
  };
};

export const EmptyScreen = ({ title, description, action }: Props) => {
  return (
    <View className="flex h-full justify-center space-y-3 p-4">
      <Text className="text-base text-gray-500">{title}</Text>
      <Text className="mb-4 text-sm text-gray-500">{description}</Text>
      <Button label={action.label} onPress={action.onPress} />
    </View>
  );
};
