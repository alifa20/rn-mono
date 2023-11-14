import { Box, BoxProps } from '../Box';
import React from 'react';
import { Icon } from '../Icon';
import { Text } from '../Text';
import { useTheme } from '../../theme';
import { Pressable } from '../Pressable';

type Size = 'small' | 'medium' | 'large';

export type CheckItemProps = {
  label: string;
  checked: boolean;
  disabled?: boolean;
  onValueChange: (checked: boolean) => void;
  size?: Size;
} & BoxProps;

const sizeVariants: Record<
  Size,
  {
    height: number;
  }
> = {
  small: {
    height: 32
  },
  medium: {
    height: 48
  },
  large: {
    height: 64
  }
};

export const CheckItem = ({
  label,
  checked,
  onValueChange,
  disabled = false,
  size = 'medium',
  ...props
}: CheckItemProps) => {
  const { colors } = useTheme();

  return (
    <Pressable
      style={({ pressed }) => ({
        backgroundColor: pressed
          ? colors.pressed
          : disabled
          ? colors.disabled
          : 'transparent'
      })}
      flexDirection={'row'}
      alignItems={'center'}
      opacity={disabled ? 0.5 : 1}
      disabled={disabled}
      onPress={() => onValueChange(checked)}>
      <Box
        height={sizeVariants[size].height}
        flex={1}
        justifyContent={'center'}
        {...props}>
        <Box
          flexDirection={'row'}
          justifyContent={'space-between'}
          alignItems={'center'}>
          <Text textAlign={'center'}>{label}</Text>
          {checked ? (
            <Icon iconName='check' iconType='antdesign' size={size} />
          ) : null}
        </Box>
      </Box>
    </Pressable>
  );
};
