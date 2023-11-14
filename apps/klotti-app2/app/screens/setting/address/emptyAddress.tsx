import { Text, View } from 'react-native';

export const EmptyAddress = () => {
  return (
    <View className="h-full flex-1 justify-center space-y-3 p-4">
      <Text className="text-base text-gray-500">NO ADDRESSES SAVED</Text>
      <Text className="mb-4 text-sm text-gray-500">
        Add an address for an easy checkout process
      </Text>
    </View>
  );
};
