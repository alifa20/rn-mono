import React from 'react';
import { View } from 'react-native';

type Thickness = 'light' | 'medium' | 'heavy';
type Colour = 'gray' | 'white' | 'black';

type Props = {
  thickness?: Thickness;
  color?: Colour;
  spacing?: number;
};

export const Divider = ({
  thickness = 'light',
  color = 'gray',
  spacing = 0
}: Props) => {
  const size: Record<Thickness, string> = {
    light: 'px',
    medium: '1',
    heavy: '2'
  };

  const colourInput: Record<Colour, string> = {
    gray: 'gray-100',
    white: 'white',
    black: 'black'
  };

  return (
    <View
      className={`h-${size[thickness]} bg-${
        colourInput[color]
      } my-${spacing.toString()} rounded-xl`}
    />
  );
};
