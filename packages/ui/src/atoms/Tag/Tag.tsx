import React from 'react';
import { Box, BoxProps, Text } from '../../atoms';

export type TagProps = BoxProps & {
  amount: number;
  type?: 'percent' | 'amount';
};

export const Tag = ({ amount = 0, type = 'percent', ...props }: TagProps) => {
  const getDiscount = () => {
    if (type === 'percent') {
      return `${amount}%`;
    } else {
      return `${amount}$`;
    }
  };

  return (
    <Box
      borderRadius={'xl'}
      backgroundColor={'orange'}
      justifyContent={'center'}
      alignItems={'center'}>
      <Box marginVertical={'4xs'} marginHorizontal={'3xs'} {...props}>
        <Text variant={'mediumButton'} color={'white'}>
          {getDiscount()} OFF
        </Text>
      </Box>
    </Box>
  );
};
