import AntDesign from 'react-native-vector-icons/AntDesign';
import { Pressable, Text, View } from 'react-native';

type Props = {
  label: string;
  checked: boolean;
  disabled?: boolean;
  onValueChange: (checked: boolean) => void;
};

export const Checkbox = ({
  label,
  checked,
  onValueChange,
  disabled = false
}: Props) => {
  return (
    <Pressable
      className={`
        ${sharedStyles.base}
        ${disabled && sharedStyles.disabled}
      `}
      disabled={disabled}
      onPress={() => onValueChange(!checked)}>
      <View className="mx-5 flex h-12 flex-grow flex-row items-center justify-between">
        <Text className={`${disabled && sharedStyles.disabled}`}>{label}</Text>
        {checked && <AntDesign name="check" size={16} color="black" />}
      </View>
    </Pressable>
  );
};

const sharedStyles = {
  base: 'active:bg-gray-200',
  disabled: 'text-gray-300'
};
