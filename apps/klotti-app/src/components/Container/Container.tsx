import { Box, BoxProps } from '@klotti/ui';
import React from 'react';

type ContainerProps = {
  children: React.ReactNode;
} & BoxProps;

export const Container = ({ children, ...props }: ContainerProps) => {
  return (
    <Box flex={1} marginTop={'2xs'} {...props}>
      {children}
    </Box>
  );
};
