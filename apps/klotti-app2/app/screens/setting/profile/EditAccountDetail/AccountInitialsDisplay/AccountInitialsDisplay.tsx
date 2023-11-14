import React from 'react';
import { View, Text } from 'react-native';

type AccountInitialsDisplayProps = {
  firstName: string;
  lastName: string;
  size?: 'small' | 'large';
};

export const AccountInitialsDisplay = ({
  firstName,
  lastName,
  size = 'small'
}: AccountInitialsDisplayProps) => {
  return (
    <View
      className={`justify-center self-center rounded-lg bg-[#838C9E] ${
        size === 'large' ? 'h-28 w-28' : 'h-32 w-32'
      }`}>
      <Text className="text-center text-2xl font-bold text-white">
        {firstName.charAt(0).toUpperCase()} {lastName.charAt(0).toUpperCase()}
      </Text>
    </View>
  );
};
