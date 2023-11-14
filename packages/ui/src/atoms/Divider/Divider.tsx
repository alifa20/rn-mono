import React from 'react';
import { Box, BoxProps } from '../Box';

type Thickness = 'light' | 'medium' | 'heavy';

type Props = {
  thickness?: Thickness;
} & Omit<BoxProps, 'height'>;

export const Divider = ({ thickness = 'light', ...props }: Props) => {
  const size: Record<Thickness, BoxProps['height']> = {
    light: 0.5,
    medium: 1,
    heavy: 2
  };

  return (
    <Box
      height={size[thickness]}
      borderRadius={'xl'}
      backgroundColor={props.backgroundColor || 'divider'}
      {...props}
    />
  );
};
