import Feather from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import IonIcons from 'react-native-vector-icons/Ionicons';
import AntDesignIcons from 'react-native-vector-icons/AntDesign';
import { ColorValue } from 'react-native';

export type IconProps = {
  iconType?: 'feather' | 'materialicons' | 'ionicons';
  iconName: string | keyof typeof MaterialIcons | keyof typeof Feather;
  onPress?: () => void;
  disabled?: boolean | undefined;
  size?: 'xsmall' | 'small' | 'medium' | 'large';
  className?: string;
  color?: number | ColorValue | undefined;
};

export const Icon = ({
  iconType = 'feather',
  iconName,
  onPress,
  size = 'medium',
  disabled = false,
  color
}: IconProps) => {
  const sizeStyle = {
    xsmall: 16,
    small: 24,
    medium: 32,
    large: 40
  };

  if (iconType === 'feather') {
    return (
      <Feather
        color={color}
        name={iconName}
        disabled={disabled}
        size={sizeStyle[size]}
        onPress={onPress}
      />
    );
  }

  if (iconType === 'materialicons') {
    return (
      <MaterialIcons
        color={color}
        name={iconName}
        disabled={disabled}
        size={sizeStyle[size]}
        onPress={onPress}
      />
    );
  }

  if (iconType === 'ionicons') {
    return (
      <IonIcons
        color={color}
        name={iconName}
        disabled={disabled}
        size={sizeStyle[size]}
        onPress={onPress}
      />
    );
  }

  return (
    <AntDesignIcons
      color={color}
      name={iconName}
      disabled={disabled}
      size={sizeStyle[size]}
      onPress={onPress}
    />
  );
};
