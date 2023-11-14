import { ActivityIndicator, Pressable, Text, View } from 'react-native';

type Props = {
  label: string;
  onPress: () => void;
  disabled?: boolean | undefined;
  type?: keyof typeof typeVariants;
  size?: keyof typeof sizeVariants;
  loading?: boolean;
};
export const Button = ({
  label,
  onPress,
  size = 'medium',
  type = 'primary',
  disabled = false,
  loading = false
}: Props) => {
  const sizeStyles = sizeVariants[size];
  const typeStyles = typeVariants[type];

  return (
    <Pressable
      className={`
        ${sharedStyles.base}
        ${sizeStyles.container}
        ${typeStyles.container}
        ${disabled && sharedStyles.disabled}
      `}
      disabled={disabled}
      onPress={onPress}>
      {loading && (
        <View
          className={`
         absolute bottom-0 left-0 right-0 top-0
         flex items-center justify-center
         `}>
          <ActivityIndicator />
        </View>
      )}
      <View className="p-2 px-5">
        <Text
          className={`
          ${typeStyles.text}
          ${sizeStyles.text}
          ${disabled && sharedStyles.disabled}
          ${loading && sharedStyles.loading}
        `}>
          {label}
        </Text>
      </View>
    </Pressable>
  );
};

const sharedStyles = {
  base: 'flex items-center justify-center rounded-lg',
  disabled: 'bg-gray-200 text-gray-500 border border-gray-300',
  loading: 'opacity-0'
};

const sizeVariants = {
  small: {
    container: 'min-w-20 h-10',
    text: 'text-sm'
  },
  medium: {
    container: 'min-w-40 h-12',
    text: 'text-md'
  },
  large: {
    container: 'min-w-32 h-16',
    text: 'text-lg'
  }
};

const typeVariants = {
  primary: {
    container: 'bg-black active:bg-gray-800',
    text: 'text-white'
  },
  outline: {
    container: 'border border-gray-300 active:bg-gray-200',
    text: 'text-black'
  },
  critical: {
    container: 'border border-red-400 active:bg-red-50',
    text: 'text-red-500'
  },
  none: {
    container: 'active:bg-gray-200',
    text: 'text-black'
  }
};
