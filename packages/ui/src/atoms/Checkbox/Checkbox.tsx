import { Pressable } from 'react-native';
import { Box } from '../Box';
import React from 'react';
import { Icon } from '../Icon';

type Props = {
  checked: boolean;
  disabled?: boolean;
  onValueChange: (checked: boolean) => void;
};

export const Checkbox = ({
  checked,
  onValueChange,
  disabled = false
}: Props) => {
  return (
    <Pressable
      style={{
        flexDirection: 'row',
        alignItems: 'center'
      }}
      disabled={disabled}
      onPress={() => onValueChange(!checked)}>
      {({ pressed }) => (
        <Box
          height={32}
          width={32}
          backgroundColor={
            pressed ? 'pressed' : disabled ? 'disabled' : 'white'
          }
          alignItems={'center'}
          justifyContent={'center'}
          borderRadius={'2xs'}
          borderWidth={1}>
          {checked && (
            <Box>
              <Icon iconName='check' iconType='antdesign' size='large' />
            </Box>
          )}
        </Box>
      )}
    </Pressable>
  );
};
