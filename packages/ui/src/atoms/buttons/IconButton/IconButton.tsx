import { Icon, IconProps } from '../../Icon';
import React from 'react';
import { Pressable } from '../../Pressable';
import { Box, BoxProps } from '../../Box';

export type IconButtonProps = BoxProps & {
  onPress?: () => void;
  disabled?: boolean | undefined;
  icon: IconProps;
  loading?: boolean;
  pressedBackgroundColor?: BoxProps['backgroundColor'];
  filled?: boolean;
};

export const IconButton = ({
  onPress,
  icon,
  disabled = false,
  pressedBackgroundColor = 'pressed',
  filled = false,
  loading = false,
  ...props
}: IconButtonProps) => {
  return (
    <Pressable
      justifyContent='center'
      disabled={disabled || loading}
      onPress={onPress}>
      {({ pressed }) => (
        <Box
          flexDirection='row'
          alignItems='center'
          borderRadius={'3xs'}
          {...(filled && {
            backgroundColor: 'background'
          })}
          {...props}
          {...(pressed && { backgroundColor: pressedBackgroundColor })}>
          <Box margin='3xs'>
            <Icon {...icon} />
          </Box>
        </Box>
      )}
    </Pressable>
  );
};
