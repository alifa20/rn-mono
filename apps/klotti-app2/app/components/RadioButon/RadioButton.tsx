import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { Pressable, Text, View } from 'react-native';

export const RadioButton = ({
  label,
  selected,
  onPress
}: {
  label: string;
  selected: boolean;
  onPress: () => void;
}) => {
  return (
    <Pressable className="active:bg-gray-200" onPress={onPress}>
      <View className="mx-5 flex h-12 flex-row items-center justify-between space-x-2">
        <Text>{label}</Text>
        <MaterialIcons
          name={selected ? 'radio-button-on' : 'radio-button-off'}
          size={24}
          color="black"
        />
      </View>
    </Pressable>
  );
};
