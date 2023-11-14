import React, { forwardRef } from 'react';
import { TextInput as RNTextInput } from 'react-native';
import { TextInput, TextInputProps } from './TextInput';

export type PasswordInputProps = TextInputProps;

export const PasswordInput = forwardRef<RNTextInput, PasswordInputProps>(
  ({ ...props }, ref) => {
    const [isPasswordVisible, setIsPasswordVisible] = React.useState(false);

    return (
      <TextInput
        ref={ref}
        iconSuffix={{
          icon: {
            iconName: isPasswordVisible ? 'eye' : 'eye-off',
            iconType: 'feather',
            size: 'small'
          },
          onPress: () => setIsPasswordVisible(!isPasswordVisible)
        }}
        secureTextEntry={!isPasswordVisible}
        {...props}
      />
    );
  }
);
