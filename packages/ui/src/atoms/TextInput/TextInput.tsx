import {
  TextInput as RNTextInput,
  TextInputProps as RNTextInputProps
} from 'react-native';
import { forwardRef, useState } from 'react';
import { IconButton, IconButtonProps } from '../buttons';
import { Box } from '../Box';
import React from 'react';
import { Text } from '../Text';
import { ThemeType, useTheme } from '../../theme';
import { createBox } from '@shopify/restyle';

export type TextInputProps = RNTextInputProps & {
  label?: string;
  error?: string;
  placeholder: string;
  iconPrefix?: IconButtonProps;
  iconSuffix?: IconButtonProps;
  isReadOnly?: boolean;
  autoFocus?: boolean;
};

const TextInputBase = createBox<ThemeType, RNTextInputProps>(RNTextInput);

export const TextInput = forwardRef<RNTextInput, TextInputProps>(
  (
    {
      label,
      error,
      placeholder,
      iconPrefix,
      iconSuffix,
      isReadOnly,
      autoFocus,
      ...props
    },
    ref
  ) => {
    const [isFocused, setIsFocused] = useState(autoFocus);

    const { colors } = useTheme();
    return (
      <Box>
        {label ? (
          <Box
            focusable
            flexDirection={'row'}
            justifyContent={'space-between'}
            width={'100%'}>
            <Text marginBottom={'2xs'} variant={'label'}>
              {label}
            </Text>
          </Box>
        ) : null}

        <Box>
          <TextInputBase
            ref={ref}
            placeholder={placeholder}
            placeholderTextColor={error ? colors.danger : colors.gray}
            editable={!isReadOnly}
            autoCapitalize='none'
            backgroundColor={'background'}
            height={50}
            paddingLeft={iconPrefix ? 'l' : 'xs'}
            paddingRight={iconSuffix ? '2xl' : 'xs'}
            borderRadius={'m'}
            {...(isFocused && { borderWidth: 1, borderColor: 'primary' })}
            {...(error && { borderWidth: 1, borderColor: 'danger' })}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            {...props}
          />

          {iconPrefix && (
            <Box
              position={'absolute'}
              left={0}
              top={0}
              bottom={0}
              width={iconPrefix ? 46 : 16}
              justifyContent={'center'}
              alignItems={'center'}>
              <IconButton
                {...iconPrefix}
                icon={{
                  size: 'medium',
                  ...iconPrefix.icon
                }}
                onPress={iconPrefix.onPress}
              />
            </Box>
          )}

          <Box
            position={'absolute'}
            right={0}
            top={0}
            bottom={0}
            width={iconSuffix ? 46 : 16}
            justifyContent={'center'}
            alignItems={'center'}>
            {iconSuffix ? (
              <Box>
                <IconButton
                  {...iconSuffix}
                  icon={{
                    size: 'medium',
                    ...iconSuffix.icon
                  }}
                  onPress={iconSuffix.onPress}
                />
              </Box>
            ) : null}
          </Box>
        </Box>
        {error ? (
          <Text marginVertical={'2xs'} variant={'caption'} color={'danger'}>
            {error}
          </Text>
        ) : null}
      </Box>
    );
  }
);
