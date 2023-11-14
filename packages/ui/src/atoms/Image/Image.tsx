import { createBox } from '@shopify/restyle';
import { Image as ExpoImage } from 'expo-image';
import React from 'react';
import { ThemeType } from '../../theme';

const ExpoBaseImage = createBox<ThemeType, ExpoImage['props']>(ExpoImage);

export type ImageProps = Omit<
  React.ComponentProps<typeof ExpoBaseImage>,
  'backgroundColor'
> & {
  backgroundColor?: keyof ThemeType['colors'];
  loading?: boolean;
};

export const Image = ({
  backgroundColor = 'secondary',
  borderRadius,
  ...props
}: ImageProps) => {
  return (
    <ExpoBaseImage
      backgroundColor={backgroundColor}
      borderRadius={borderRadius}
      width={'100%'}
      height={'100%'}
      {...props}
    />
  );
};
