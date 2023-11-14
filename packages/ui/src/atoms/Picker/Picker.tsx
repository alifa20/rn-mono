import React, { forwardRef } from 'react';
import { Picker as RNPicker } from '@react-native-picker/picker';
import { Platform } from 'react-native';

export type OptionType = { readonly label: string; readonly value: string };

export type PickerProps = {
  options: OptionType[];
  selectedValue?: string;
  onValueChange: (value: string) => void;
};

export const Picker = forwardRef<RNPicker<any>, PickerProps>(
  ({ options, selectedValue, onValueChange }, ref) => {
    return (
      <RNPicker
        ref={ref}
        selectedValue={selectedValue}
        onValueChange={value => {
          onValueChange(value);
        }}
        {...(Platform.OS === 'android' && {
          style: {
            position: 'absolute',
            top: -1000,
            left: -1000,
            width: 0,
            height: 0
          }
        })}>
        {options.map(option => (
          <RNPicker.Item
            key={option.value}
            color='black'
            label={option.label}
            value={option.value}
          />
        ))}
      </RNPicker>
    );
  }
);
