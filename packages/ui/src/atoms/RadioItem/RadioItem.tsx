import { Box, BoxProps } from '../Box';
import React from 'react';
import { Icon } from '../Icon';
import { Text } from '../Text';
import { useTheme } from '../../theme';
import { Pressable } from '../Pressable';

type Size = 'small' | 'medium' | 'large';

type RadioItemProps = {
  label: string;
  selected: boolean;
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

export const RadioItem = ({
  label,
  selected,
  onValueChange,
  disabled = false,
  size = 'medium',
  ...props
}: RadioItemProps) => {
  const { colors } = useTheme();

  return (
    <Pressable
      style={({ pressed }) => ({
        backgroundColor: pressed
          ? colors.pressed
          : disabled
          ? colors.disabled
          : 'white'
      })}
      flexDirection={'row'}
      alignItems={'center'}
      opacity={disabled ? 0.5 : 1}
      disabled={disabled}
      onPress={() => onValueChange(!selected)}>
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
          {selected ? (
            <Icon
              iconName='radio-button-on-outline'
              iconType='ionicons'
              size={size}
            />
          ) : (
            <Icon
              iconName='radio-button-off-outline'
              iconType='ionicons'
              size={size}
            />
          )}
        </Box>
      </Box>
    </Pressable>
  );
};
