import React from 'react';
import { Box, BoxProps } from '../../Box';
import { Text } from '../../Text';
import { Pressable } from '../../Pressable';
import { useTheme } from '../../../theme';
import { IconButton, IconButtonProps } from '../../buttons';

type Size = 'small' | 'medium' | 'large';

export type SectionItemProps = {
  label: string | React.ReactNode;
  disabled?: boolean;
  onPress: () => void;
  size?: Size;
  suffixIcon?: IconButtonProps;
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

export const SectionItem = ({
  label,
  disabled,
  onPress,
  size = 'medium',
  suffixIcon,
  ...props
}: SectionItemProps) => {
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
      onPress={onPress}>
      <Box
        height={sizeVariants[size].height}
        flex={1}
        justifyContent={'center'}
        {...props}>
        <Box
          flexDirection={'row'}
          justifyContent={'space-between'}
          alignItems={'center'}>
          {typeof label === 'string' ? (
            <Text textAlign={'center'}>{label}</Text>
          ) : React.isValidElement(label) ? (
            React.cloneElement(label)
          ) : null}

          {suffixIcon ? <IconButton {...suffixIcon} /> : null}
        </Box>
      </Box>
    </Pressable>
  );
};
