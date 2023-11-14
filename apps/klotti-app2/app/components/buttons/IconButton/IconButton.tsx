import { ActivityIndicator, Pressable, Text, View } from 'react-native';
import { Icon, IconProps } from '@app/components/Icon';

type IconType = {
  name: IconProps['iconName'];
  size?: IconProps['size'];
  iconSize?: IconProps['size'];
};

type Props = {
  label: string;
  onPress: () => void;
  disabled?: boolean | undefined;
  type?: keyof typeof typeVariants;
  size?: keyof typeof sizeVariants;
  prefixIcon?: IconType;
  icon: IconType;
  loading?: boolean;
};

export const IconButton = ({
  label,
  onPress,
  size = 'medium',
  type = 'primary',
  icon,
  prefixIcon,
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
      <View className="flex-row items-center justify-between px-4">
        <View className="flex-row items-center">
          {prefixIcon && (
            <View className="mr-2">
              <Icon
                iconName={prefixIcon.name}
                disabled
                size={prefixIcon.iconSize || sizeStyles.iconSize}
                onPress={() => {}}
              />
            </View>
          )}

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

        <Icon
          iconName={icon.name}
          disabled
          size={icon.iconSize || sizeStyles.iconSize}
          onPress={() => {}}
        />
      </View>
    </Pressable>
  );
};

const sharedStyles = {
  base: 'flex justify-center rounded-lg',
  disabled: 'bg-gray-200 text-gray-500 border border-gray-300',
  loading: 'opacity-0'
};

const sizeVariants: Record<
  'small' | 'medium' | 'large',
  {
    container: string;
    text: string;
    iconSize: IconProps['size'];
  }
> = {
  small: {
    container: 'min-w-20 h-10',
    text: 'text-xs',
    iconSize: 'xsmall'
  },
  medium: {
    container: 'min-w-40 h-12',
    text: 'text-sm',
    iconSize: 'xsmall'
  },
  large: {
    container: 'min-w-32 h-16',
    text: 'text-lg',
    iconSize: 'medium'
  }
};

const typeVariants = {
  primary: {
    container: 'bg-gray-100 active:bg-gray-300',
    text: 'text-black'
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
