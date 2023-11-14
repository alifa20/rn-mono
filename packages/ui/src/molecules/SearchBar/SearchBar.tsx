import React, { forwardRef } from 'react';
import {
  TextInput as RNTextInput,
  TextInputProps as RNTextInputProps
} from 'react-native';
import { Box, Text, TextInput } from '../../atoms';

export type SearchBarProps = RNTextInputProps & {
  testID?: string;
  onCancel?: () => void;
  onClear?: () => void;
  placeholder: string;
  isSearching?: boolean;
  error?: string;
};

export const SearchBar = forwardRef<RNTextInput, SearchBarProps>(
  ({ onCancel, onClear, isSearching, error, ...props }, ref) => {
    return (
      <Box flexDirection={'row'} alignItems={'center'} gap={'2xs'}>
        <Box flex={1}>
          <TextInput
            ref={ref}
            {...props}
            autoFocus={true}
            focusable={true}
            {...(isSearching && {
              iconSuffix: {
                icon: {
                  iconName: 'cross',
                  iconType: 'entypo'
                },
                onPress: () => {
                  onClear?.();
                }
              }
            })}
            editable={isSearching}
            iconPrefix={{
              icon: {
                iconName: 'search',
                iconType: 'materialicons'
              },
              disabled: true
            }}
            error={error}
          />
        </Box>
        {isSearching ? (
          <Text
            onPress={() => {
              onCancel?.();
            }}>
            Cancel
          </Text>
        ) : null}
      </Box>
    );
  }
);
