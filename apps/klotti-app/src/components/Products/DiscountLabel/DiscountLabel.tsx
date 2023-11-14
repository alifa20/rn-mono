import { View, Text } from 'react-native';
import React from 'react';

type DiscountLabelProps = {
  amount: number;
};

export const DiscountLabel = ({ amount }: DiscountLabelProps) => {
  return (
    <View
      className='h-8 w-16 rounded-3xl bg-orange-500'
      style={{ position: 'absolute', top: 10, right: 10, zIndex: 999 }}>
      <Text className='text-sm font-medium text-white'>{amount}% off</Text>
    </View>
  );
};
