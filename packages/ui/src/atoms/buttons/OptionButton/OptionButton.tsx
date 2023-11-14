import React from 'react';
import { Box, BoxProps } from '../../Box';
import { OptionType } from '../../Picker';
import { Text } from '../../Text';
import { Icon } from '../../Icon';
import { Pressable } from '../../Pressable';

type OptionButtonProps = BoxProps & {
  placeholder: string;
  option?: OptionType;
  onPress: () => void;
};

export const OptionButton = ({
  placeholder,
  option,
  onPress
}: OptionButtonProps) => {
  return (
    <Pressable onPress={onPress}>
      {({ pressed }) => (
        <Box
          borderRadius={'xs'}
          borderColor={'gray'}
          justifyContent={'space-between'}
          backgroundColor={'background'}
          {...(pressed && { backgroundColor: 'pressed' })}>
          <Box
            flexDirection={'row'}
            alignItems={'center'}
            justifyContent={'space-between'}
            padding={'2xs'}>
            <Box>
              {option ? (
                <Text>{option.label}</Text>
              ) : (
                <Text color={'gray'}>{placeholder}</Text>
              )}
            </Box>

            <Icon iconName='keyboard-arrow-down' iconType='materialicons' />
          </Box>
        </Box>
      )}
    </Pressable>
  );
};
