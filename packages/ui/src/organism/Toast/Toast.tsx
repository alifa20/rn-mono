import React from 'react';
import { Box, BoxProps, Icon, IconProps, Text } from '../../atoms';
import { BaseToastProps } from 'react-native-toast-message';

export type ToastProps = BaseToastProps &
  BoxProps & {
    props: { icon?: IconProps };
  };

export const Toast = ({ text1, text2, props, ...boxProps }: ToastProps) => {
  return (
    <Box
      borderRadius={'s'}
      justifyContent={'center'}
      backgroundColor={'black'}
      width={{
        phone: '85%',
        tablet: '70%',
        largeTablet: '50%'
      }}
      {...boxProps}>
      <Box flex={1} marginVertical={'xs'} marginHorizontal={'3xs'} gap={'2xs'}>
        <Box
          flexDirection={'row'}
          paddingHorizontal={'m'}
          justifyContent={'center'}
          alignItems={'center'}
          gap={'3xs'}>
          {props.icon ? (
            <Icon {...props.icon} size='medium' color={'white'} />
          ) : null}
          <Text color={'background'} variant={'title2'} textAlign={'center'}>
            {text1}
          </Text>
        </Box>

        {text2 ? (
          <Box marginBottom={'3xs'}>
            <Text
              variant={'paragraph2'}
              color={'background'}
              textAlign={'center'}>
              {text2}
            </Text>
          </Box>
        ) : null}
      </Box>
    </Box>
  );
};
