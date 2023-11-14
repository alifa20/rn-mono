import React, { ReactNode } from 'react';
import { StyleProp, ViewStyle, View, Pressable } from 'react-native';

type SectionProps = {
  children: ReactNode;
  style?: StyleProp<ViewStyle> | undefined;
  onPress: () => void;
};

export const Section = ({ children, style, onPress }: SectionProps) => {
  return (
    <Pressable className="active:bg-gray-100" onPress={onPress}>
      <View
        style={[style]}
        className="mx-5 flex h-12 flex-grow flex-row	items-center justify-between">
        {children}
      </View>
    </Pressable>
  );
};
