import { View } from 'react-native';
import { ReactNode } from 'react';

// This is basically a grey wrapper around the icon
export const OuterIconWrapper = ({ children }: { children: ReactNode }) => {
  return (
    <View className="m-6 h-10 w-10">
      <View className="flex-1 justify-center rounded-md bg-gray-100">
        {children}
      </View>
    </View>
  );
};
