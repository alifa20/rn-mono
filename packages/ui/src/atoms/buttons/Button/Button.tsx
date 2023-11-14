import React from 'react';
import { Text } from '../../Text';
import { createBox } from '@shopify/restyle';
import { ThemeType } from '../../../theme';
import { TouchableOpacity, TouchableOpacityProps } from 'react-native';
import { Box } from '../../Box';
import { Loading } from '../../Loading';

const BaseButton = createBox<ThemeType, TouchableOpacityProps>(
  TouchableOpacity
);

type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'tertiary'
  | 'critical'
  | 'outline'
  | 'none';

type ButtonSize = 'small' | 'medium' | 'large';

const sizeVariants: Record<
  ButtonSize,
  {
    labelSize: 'smallButton' | 'mediumButton' | 'largeButton';
    minWidth: number;
    minHeight: number;
  }
> = {
  small: {
    labelSize: 'smallButton',
    minWidth: 95,
    minHeight: 40
  },
  medium: {
    labelSize: 'mediumButton',
    minWidth: 200,
    minHeight: 56
  },
  large: {
    labelSize: 'largeButton',
    minWidth: 240,
    minHeight: 72
  }
};

const buttonVariants: Record<
  ButtonVariant,
  {
    text?: keyof ThemeType['colors'];
    backgroundColor: keyof ThemeType['colors'];
    borderWidth?: number;
  }
> = {
  primary: {
    backgroundColor: 'primary',
    text: 'background'
  },
  secondary: {
    backgroundColor: 'secondary',
    text: 'background'
  },
  tertiary: {
    backgroundColor: 'blue',
    text: 'background'
  },
  critical: {
    backgroundColor: 'danger',
    text: 'background'
  },
  outline: {
    backgroundColor: 'transparent',
    text: 'primary',
    borderWidth: 1
  },
  none: {
    backgroundColor: 'transparent',
    text: 'primary'
  }
};

export type ButtonProps = React.ComponentProps<typeof BaseButton> & {
  label: string;
  variants?: ButtonVariant;
  loading?: boolean;
  disabled?: boolean;
  size?: ButtonSize;
  onPress: () => void;
};

export const Button = ({
  onPress,
  variants = 'primary',
  label,
  loading,
  disabled,
  size = 'medium',
  ...props
}: ButtonProps) => {
  return (
    <BaseButton
      flexDirection='row'
      columnGap='s'
      backgroundColor={buttonVariants[variants].backgroundColor}
      borderRadius={'s'}
      onPress={onPress}
      disabled={disabled || loading}
      minWidth={sizeVariants[size].minWidth}
      minHeight={sizeVariants[size].minHeight}
      borderWidth={buttonVariants[variants].borderWidth}
      justifyContent={'center'}
      alignItems={'center'}
      {...props}>
      {loading ? (
        <Box
          position={'absolute'}
          bottom={0}
          left={0}
          right={0}
          top={0}
          alignItems={'center'}
          justifyContent={'center'}>
          <Loading />
        </Box>
      ) : (
        <Text
          color={buttonVariants[variants].text}
          variant={sizeVariants[size].labelSize}>
          {label}
        </Text>
      )}
    </BaseButton>
  );
};
