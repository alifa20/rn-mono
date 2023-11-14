import React from 'react';
import { View } from 'react-native';

type SpacerProps = {
  size?: 'xsmall' | 'small' | 'medium' | 'large' | 'xlarge';
  direction?: 'row' | 'column';
};

export const sizes = {
  xsmall: 4,
  small: 8,
  medium: 12,
  large: 16,
  xlarge: 24
};

export const Spacer = ({
  direction = 'column',
  size = 'small'
}: SpacerProps) => {
  return direction === 'column' ? (
    <View style={{ height: sizes[size] }} />
  ) : (
    <View style={{ width: sizes[size] }} />
  );
};
